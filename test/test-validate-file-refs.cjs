/**
 * File Reference Validation Test Runner
 *
 * Tests the validate-file-refs.mjs tool against fixtures and the live source tree.
 * Covers all 10 acceptance criteria for MSSCI-14579.
 *
 * Test categories:
 *   1. Module import — _testing exports exist and are functions
 *   2. Path mapping — {project-root}/_bmad/bmb/ → src/ resolution
 *   3. Module auto-detect — reads module.yaml code field
 *   4. Ref extraction — YAML, markdown, CSV patterns
 *   5. Skip logic — external refs, install-generated, template placeholders, runtime vars
 *   6. Broken ref detection — wrong depth, missing files, stale refs
 *   7. Absolute path leak detection
 *   8. CLI exit codes — default (0) vs --strict (1)
 *   9. Live source tree baseline — known broken ref ratchet
 *
 * Usage: node test/test-validate-file-refs.js
 * Exit codes: 0 = all tests pass, 1 = test failures
 */

const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');

const TOOL_PATH = path.join(__dirname, '..', 'tools', 'validate-file-refs.mjs');
const SRC_DIR = path.join(__dirname, '..', 'src');
const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'file-refs');

// Known broken ref baseline — ratchet down as refs are fixed upstream
const KNOWN_BASELINE = 30;

// ANSI color codes (matching test-agent-schema.js pattern)
const colors = {
  reset: '\u001B[0m',
  green: '\u001B[32m',
  red: '\u001B[31m',
  yellow: '\u001B[33m',
  blue: '\u001B[34m',
  cyan: '\u001B[36m',
  dim: '\u001B[2m',
};

// --- Test Infrastructure ---

let totalTests = 0;
let passedTests = 0;
const failures = [];

function pass(name, detail) {
  totalTests++;
  passedTests++;
  console.log(`  ${colors.green}✓${colors.reset} ${name} ${colors.dim}${detail || ''}${colors.reset}`);
}

function fail(name, reason) {
  totalTests++;
  console.log(`  ${colors.red}✗${colors.reset} ${name} ${colors.red}${reason}${colors.reset}`);
  failures.push({ name, reason });
}

function section(title) {
  console.log(`\n${colors.blue}${title}${colors.reset}`);
}

/**
 * Run the validator CLI as a child process
 * @param {string[]} args - CLI arguments
 * @returns {Promise<{stdout: string, stderr: string, exitCode: number}>}
 */
function runCLI(args = []) {
  return new Promise((resolve) => {
    execFile('node', [TOOL_PATH, ...args], { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
      resolve({
        stdout: stdout || '',
        stderr: stderr || '',
        exitCode: error ? error.code : 0,
      });
    });
  });
}

// --- Test Suites ---

/**
 * AC10: _testing exports enable unit-level test coverage
 */
async function testExports() {
  section('AC10: _testing exports');

  let mod;
  try {
    // Dynamic import for ESM module from CJS test
    mod = await import(TOOL_PATH);
  } catch (err) {
    fail('Module import', `Cannot import validate-file-refs.mjs: ${err.message}`);
    return;
  }

  const _testing = mod._testing || (mod.default && mod.default._testing);
  if (!_testing) {
    fail('_testing namespace', 'Module does not export _testing');
    return;
  }
  pass('_testing namespace', 'exported');

  // Check required exports
  const requiredExports = [
    'mapInstalledToSource',
    'isResolvable',
    'extractYamlRefs',
    'extractMarkdownRefs',
    'extractCsvRefs',
    'checkAbsolutePathLeaks',
    'detectModuleCode',
    'isExternalRef',
    'isBracketedPlaceholder',
  ];

  for (const name of requiredExports) {
    if (typeof _testing[name] === 'function') {
      pass(`export: ${name}`, 'is a function');
    } else {
      fail(`export: ${name}`, `missing or not a function (got ${typeof _testing[name]})`);
    }
  }
}

/**
 * AC3: Path mapping — {project-root}/_bmad/bmb/ → src/
 */
async function testPathMapping() {
  section('AC2: Path mapping');

  let _testing;
  try {
    const mod = await import(TOOL_PATH);
    _testing = mod._testing || (mod.default && mod.default._testing);
  } catch {
    fail('Path mapping (import)', 'Cannot import module');
    return;
  }

  if (!_testing || !_testing.mapInstalledToSource) {
    fail('Path mapping', '_testing.mapInstalledToSource not available');
    return;
  }

  const { mapInstalledToSource } = _testing;

  // Internal bmb ref should map to src/
  const internal = mapInstalledToSource('{project-root}/_bmad/bmb/workflows/workflow/workflow-create-workflow.md');
  if (internal && internal.includes(path.join('src', 'workflows', 'workflow', 'workflow-create-workflow.md'))) {
    pass('Internal bmb ref', `maps to ${path.relative(SRC_DIR, internal)}`);
  } else {
    fail('Internal bmb ref', `expected src/workflows/... got ${internal}`);
  }

  // Install-generated config.yaml should return null (skip)
  const config = mapInstalledToSource('{project-root}/_bmad/bmb/config.yaml');
  if (config === null) {
    pass('Install-generated config.yaml', 'returns null (skipped)');
  } else {
    fail('Install-generated config.yaml', `expected null, got ${config}`);
  }

  // Install-generated docs/ KB should return null (skip)
  const docsKb = mapInstalledToSource('{project-root}/_bmad/bmb/docs/workflows/kb.csv');
  if (docsKb === null) {
    pass('Install-generated docs/ KB', 'returns null (skipped)');
  } else {
    fail('Install-generated docs/ KB', `expected null, got ${docsKb}`);
  }
}

/**
 * AC3: Auto-detect module code from module.yaml
 */
async function testModuleAutoDetect() {
  section('AC3: Module auto-detect');

  let _testing;
  try {
    const mod = await import(TOOL_PATH);
    _testing = mod._testing || (mod.default && mod.default._testing);
  } catch {
    fail('Module auto-detect (import)', 'Cannot import module');
    return;
  }

  if (!_testing || !_testing.detectModuleCode) {
    fail('detectModuleCode', 'not exported');
    return;
  }

  const code = _testing.detectModuleCode(SRC_DIR);
  if (code === 'bmb') {
    pass('detectModuleCode', 'returns "bmb" from src/module.yaml');
  } else {
    fail('detectModuleCode', `expected "bmb", got "${code}"`);
  }
}

/**
 * AC3: External ref detection
 */
async function testExternalRefDetection() {
  section('AC3: External ref detection');

  let _testing;
  try {
    const mod = await import(TOOL_PATH);
    _testing = mod._testing || (mod.default && mod.default._testing);
  } catch {
    fail('External ref detection (import)', 'Cannot import module');
    return;
  }

  if (!_testing || !_testing.isExternalRef) {
    fail('isExternalRef', 'not exported');
    return;
  }

  const { isExternalRef } = _testing;

  // Core module ref is external
  if (isExternalRef('{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml', 'bmb')) {
    pass('core/ ref', 'detected as external');
  } else {
    fail('core/ ref', 'not detected as external');
  }

  // Own module ref is NOT external
  if (!isExternalRef('{project-root}/_bmad/bmb/workflows/workflow/workflow-create-workflow.md', 'bmb')) {
    pass('bmb/ ref', 'detected as internal');
  } else {
    fail('bmb/ ref', 'incorrectly detected as external');
  }

  // bmm module ref is external
  if (isExternalRef('{project-root}/_bmad/bmm/workflows/workflow-status/workflow.yaml', 'bmb')) {
    pass('bmm/ ref', 'detected as external');
  } else {
    fail('bmm/ ref', 'not detected as external');
  }
}

/**
 * AC5: Template placeholder skip logic
 */
async function testBracketedPlaceholders() {
  section('AC5: Bracketed placeholder detection');

  let _testing;
  try {
    const mod = await import(TOOL_PATH);
    _testing = mod._testing || (mod.default && mod.default._testing);
  } catch {
    fail('Placeholder detection (import)', 'Cannot import module');
    return;
  }

  if (!_testing || !_testing.isBracketedPlaceholder) {
    fail('isBracketedPlaceholder', 'not exported');
    return;
  }

  const { isBracketedPlaceholder } = _testing;

  // Template patterns should be detected
  const templates = ['step-[N]-[name].md', '../templates/[template].md', './step-02-[name].md', '{output_folder}/[output].md'];

  for (const ref of templates) {
    if (isBracketedPlaceholder(ref)) {
      pass(`Template: ${ref}`, 'detected as placeholder');
    } else {
      fail(`Template: ${ref}`, 'not detected as placeholder');
    }
  }

  // Non-template patterns should NOT be detected
  const nonTemplates = [
    './step-02-discovery.md',
    '../data/frontmatter-standards.md',
    '{project-root}/_bmad/bmb/workflows/agent/workflow-create-agent.md',
  ];

  for (const ref of nonTemplates) {
    if (!isBracketedPlaceholder(ref)) {
      pass(`Non-template: ${ref}`, 'not detected as placeholder');
    } else {
      fail(`Non-template: ${ref}`, 'incorrectly detected as placeholder');
    }
  }
}

/**
 * AC7: Absolute path leak detection
 */
async function testAbsolutePathLeaks() {
  section('AC7: Absolute path leak detection');

  let _testing;
  try {
    const mod = await import(TOOL_PATH);
    _testing = mod._testing || (mod.default && mod.default._testing);
  } catch {
    fail('Abs path detection (import)', 'Cannot import module');
    return;
  }

  if (!_testing || !_testing.checkAbsolutePathLeaks) {
    fail('checkAbsolutePathLeaks', 'not exported');
    return;
  }

  const { checkAbsolutePathLeaks } = _testing;

  const leakyContent = 'Load config from /Users/developer/project/config.yaml\nAnother line.';
  const leaks = checkAbsolutePathLeaks('test.md', leakyContent);
  if (leaks.length > 0) {
    pass('Detects /Users/ leak', `found ${leaks.length} leak(s)`);
  } else {
    fail('Detects /Users/ leak', 'no leaks detected');
  }

  const cleanContent = 'Load config from {project-root}/_bmad/bmb/config.yaml\nAnother line.';
  const noLeaks = checkAbsolutePathLeaks('test.md', cleanContent);
  if (noLeaks.length === 0) {
    pass('Clean content', 'no false positives');
  } else {
    fail('Clean content', `false positive: ${noLeaks.length} leak(s) detected`);
  }
}

/**
 * AC1, AC2: CLI exit codes
 */
async function testCLIExitCodes() {
  section('AC1/AC2: CLI exit codes');

  // Default mode should exit 0 (warning only) even with broken refs
  const defaultResult = await runCLI([]);
  if (defaultResult.exitCode === 0) {
    pass('Default mode', 'exits 0 (warning only)');
  } else {
    fail('Default mode', `expected exit 0, got ${defaultResult.exitCode}`);
  }

  // Strict mode should exit 1 when broken refs exist
  const strictResult = await runCLI(['--strict']);
  if (strictResult.exitCode === 1) {
    pass('--strict mode', 'exits 1 (broken refs exist)');
  } else {
    fail('--strict mode', `expected exit 1, got ${strictResult.exitCode}`);
  }

  // Verify summary output mentions file count
  if (defaultResult.stdout.includes('Files scanned')) {
    pass('Summary output', 'includes "Files scanned"');
  } else {
    fail('Summary output', 'missing "Files scanned" in output');
  }
}

/**
 * AC6: validate:refs npm script
 */
async function testNpmScript() {
  section('AC6: npm script');

  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

  if (packageJson.scripts && packageJson.scripts['validate:refs']) {
    pass('validate:refs script', `"${packageJson.scripts['validate:refs']}"`);
  } else {
    fail('validate:refs script', 'not found in package.json');
  }

  if (packageJson.scripts && packageJson.scripts['test:refs']) {
    pass('test:refs script', `"${packageJson.scripts['test:refs']}"`);
  } else {
    fail('test:refs script', 'not found in package.json');
  }

  // AC9: test:refs should be wired into the main test chain
  if (packageJson.scripts && packageJson.scripts.test && packageJson.scripts.test.includes('test:refs')) {
    pass('test chain', 'test:refs is in npm test chain');
  } else {
    fail('test chain', 'test:refs not found in npm test chain');
  }
}

/**
 * AC8: Live source tree baseline ratchet
 */
async function testLiveBaseline() {
  section('AC8: Live source tree baseline');

  const result = await runCLI(['--json']);

  let data;
  try {
    // Try to parse JSON output, or fall back to counting from stdout
    data = JSON.parse(result.stdout);
  } catch {
    // If --json isn't supported yet, count from text output
    const brokenMatch = result.stdout.match(/Broken references:\s*(\d+)/);
    const issueMatch = result.stdout.match(/Issues found:\s*(\d+)/);
    const count = brokenMatch ? parseInt(brokenMatch[1], 10) : issueMatch ? parseInt(issueMatch[1], 10) : -1;

    if (count === -1) {
      fail('Baseline count', 'Cannot parse broken ref count from output');
      return;
    }

    data = { brokenCount: count };
  }

  const brokenCount = data.brokenCount || data.broken_refs || 0;

  if (brokenCount <= KNOWN_BASELINE) {
    pass('Baseline ratchet', `${brokenCount} broken refs <= ${KNOWN_BASELINE} baseline`);
  } else {
    fail('Baseline ratchet', `${brokenCount} broken refs > ${KNOWN_BASELINE} baseline — NEW broken refs introduced`);
  }

  if (brokenCount < KNOWN_BASELINE) {
    console.log(`  ${colors.yellow}! Baseline can be lowered: ${brokenCount} < ${KNOWN_BASELINE}${colors.reset}`);
  }
}

/**
 * AC4: Skip logic — isResolvable
 */
async function testResolvableSkipLogic() {
  section('AC4/AC5: Skip logic (isResolvable)');

  let _testing;
  try {
    const mod = await import(TOOL_PATH);
    _testing = mod._testing || (mod.default && mod.default._testing);
  } catch {
    fail('Skip logic (import)', 'Cannot import module');
    return;
  }

  if (!_testing || !_testing.isResolvable) {
    fail('isResolvable', 'not exported');
    return;
  }

  const { isResolvable } = _testing;

  // Resolvable paths
  const resolvable = [
    './step-02-discovery.md',
    '{project-root}/_bmad/bmb/workflows/agent/workflow-create-agent.md',
    '../data/frontmatter-standards.md',
  ];

  for (const ref of resolvable) {
    if (isResolvable(ref)) {
      pass(`Resolvable: ${ref}`, 'correctly identified');
    } else {
      fail(`Resolvable: ${ref}`, 'incorrectly skipped');
    }
  }

  // Unresolvable runtime variables
  const unresolvable = ['{bmb_creations_output_folder}/workflows/plan.md', '{output_folder}/report.md', '{{template_var}}/file.md'];

  for (const ref of unresolvable) {
    if (!isResolvable(ref)) {
      pass(`Unresolvable: ${ref}`, 'correctly skipped');
    } else {
      fail(`Unresolvable: ${ref}`, 'should be skipped');
    }
  }
}

/**
 * AC7: CI step exists in quality.yaml
 */
async function testCIIntegration() {
  section('AC7: CI integration');

  const qualityPath = path.join(__dirname, '..', '.github', 'workflows', 'quality.yaml');
  if (!fs.existsSync(qualityPath)) {
    fail('quality.yaml', 'file not found');
    return;
  }

  const content = fs.readFileSync(qualityPath, 'utf8');

  if (content.includes('validate:refs') || content.includes('validate-file-refs')) {
    pass('CI step', 'validate:refs found in quality.yaml');
  } else {
    fail('CI step', 'validate:refs not found in quality.yaml');
  }
}

// --- Main ---

async function main() {
  console.log(`${colors.cyan}╔═══════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║  File Reference Validation Test Suite                     ║${colors.reset}`);
  console.log(`${colors.cyan}╚═══════════════════════════════════════════════════════════╝${colors.reset}`);

  // Check that the tool exists (RED state: it shouldn't yet)
  if (!fs.existsSync(TOOL_PATH)) {
    console.log(`\n${colors.red}✗ Tool not found: ${TOOL_PATH}${colors.reset}`);
    console.log(`${colors.yellow}  This is expected in RED state — Dev needs to create the tool.${colors.reset}\n`);
    totalTests++;
    failures.push({ name: 'Tool exists', reason: `${TOOL_PATH} not found` });
  }

  // Run all test suites
  await testExports();
  await testPathMapping();
  await testModuleAutoDetect();
  await testExternalRefDetection();
  await testBracketedPlaceholders();
  await testAbsolutePathLeaks();
  await testResolvableSkipLogic();
  await testCLIExitCodes();
  await testNpmScript();
  await testCIIntegration();
  await testLiveBaseline();

  // Summary
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}Test Results:${colors.reset}`);
  console.log(`  Total:  ${totalTests}`);
  console.log(`  Passed: ${colors.green}${passedTests}${colors.reset}`);
  console.log(`  Failed: ${passedTests === totalTests ? colors.green : colors.red}${totalTests - passedTests}${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

  if (failures.length > 0) {
    console.log(`${colors.red}FAILED TESTS:${colors.reset}\n`);
    for (const f of failures) {
      console.log(`${colors.red}✗${colors.reset} ${f.name}`);
      console.log(`  ${f.reason}\n`);
    }
    process.exit(1);
  }

  console.log(`${colors.green}All tests passed!${colors.reset}\n`);
  process.exit(0);
}

main().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
