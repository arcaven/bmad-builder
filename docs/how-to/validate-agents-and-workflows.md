---
title: "Validate Agents and Workflows"
description: Check existing agents and workflows for BMad compliance and best practices
---

Validate your agents and workflows to ensure they follow best practices and comply with standards. Validation catches issues before they cause problems.

## Why Validate

Validation catches issues before they cause problems:

| Benefit | Example |
|---------|---------|
| **Catch errors** | Missing required fields, invalid YAML |
| **Best practices** | Menu structure, persona quality |
| **Compliance** | BMad Core standards |
| **Performance** | Optimized structure |
| **Quality** | Cohesive workflow design |

:::note[When to Validate]
Validate after creating, editing, or updating any agent or workflow. Also validate before publishing modules.
:::

## Validating Workflows

Use Wendy's validation workflow:

```
[VW] or "validate-workflow"
```

### What Wendy Checks

| Category | Checks |
|----------|--------|
| **Frontmatter** | Name, description, goal, completeness |
| **Structure** | Workflow.md, step files, templates present |
| **Menus** | Menu handling, options, triggers valid |
| **Steps** | Sequential ordering, nextStep references correct |
| **Output format** | Output configuration valid |
| **Cohesiveness** | Steps connect logically |
| **Instruction style** | Intent vs prescriptive appropriate |
| **Collaborative experience** | Facilitation quality |
| **Validation design** | Proper validation steps if critical |

### Validation Output

Wendy provides a comprehensive report:

```
PASS: Frontmatter is complete
PASS: Step sequence is valid
WARN: step-03 has no nextStep defined
FAIL: step-02 references non-existent step
```

### Max-Parallel Validation

For high-capability LLMs (like Claude) that support extensive parallel processing:

```
[MV] or "validate-max-parallel-workflow"
```

This hyper-optimized validation uses task agents to validate multiple workflow aspects simultaneously in sub-processes for dramatically faster results.

**Additional checks:**
- Parallel compatibility
- Sub-process optimization opportunities
- Task agent orchestration
- LLM parallel capability utilization

### Validation Categories

**Frontmatter Validation**
- Required fields present
- Name is valid kebab-case
- All frontmatter variables used in step body
- Path variables follow correct format

**Step Structure Validation**
- Step files exist and numbered sequentially
- `nextStepFile` references are valid
- Steps under 250 lines
- Step type matches content

**Menu Handling Validation**
- Display section present
- Handler section follows display
- EXECUTION RULES section present
- "Halt and wait" instruction included
- A/P options appropriate for step type
- Non-C options redisplay menu
- C option: save → update → load next

**Output Format Validation**
- Output format specified
- Template type appropriate
- State tracking for continuable workflows
- StepsCompleted tracking correct

**Instruction Style Validation**
- Intent vs prescriptive appropriate for domain
- "Think before responding" language present
- Multi-turn conversation approach
- Progressive questioning

**Collaborative Experience Validation**
- Facilitation vs generation approach
- User expertise acknowledged
- Partnership language
- Non-command-response pattern

**Validation Design Check**
- Validation steps exist if critical
- Validation steps load from data/
- Systematic check sequence
- "DO NOT BE LAZY" language present
- Auto-proceed through checks

**Cohesive Review**
- Entire workflow reviewed end-to-end
- Quality assessed across dimensions
- Strengths and weaknesses documented
- Thoughtful recommendation provided

## Validating Agents

Use Bond's validation workflow:

```
[VA] or "validate-agent"
```

### What Bond Checks

| Category | Checks |
|----------|--------|
| **Metadata** | Name, description, module, path correctness |
| **Persona** | Role, identity, communication style, principles present |
| **Menu** | Triggers formatted correctly, commands valid |
| **Structure** | YAML valid, required fields present |
| **Compliance** | BMad Core standards followed |

### Validation Output

Bond provides a detailed report:

```
PASS: Agent structure is valid
PASS: Persona is complete
WARN: Principles could be more specific
FAIL: Menu trigger has invalid characters
```

### Fixing Issues

After validation, Bond offers to fix issues:

- **[A] Apply fixes** — Automatically correct what Bond can
- **[M] Manual review** — See what needs manual fixing
- **[R] Revalidate** — Run validation again after fixes

## Validating Modules

Use Morgan's validation workflow:

```
[VM] or "validate-module"
```

### What Morgan Checks

| Category | Checks |
|----------|--------|
| **module.yaml** | Metadata, install questions, config valid |
| **module-help.csv** | Proper CSV format and required columns (if present) |
| **Structure** | Agents, workflows, tools folders present |
| **Agents** | All agent files valid |
| **Workflows** | All workflow files valid |

## Common Validation Issues

### Workflow Issues

| Issue | Fix |
|-------|-----|
| **Incomplete frontmatter** | Add all required fields (name, description) |
| **Broken step references** | Ensure nextStep files exist |
| **Missing menus** | Add menu where workflow requires user choice |
| **Invalid output format** | Specify correct output format in frontmatter |
| **Unused frontmatter variables** | Remove variables not used in step body |
| **Missing handler section** | Add handler after menu display |
| **No "halt and wait"** | Add to EXECUTION RULES |
| **A/P in step 1** | Remove A/P (inappropriate for init) |
| **Step exceeds 250 lines** | Split steps or extract to data/ |
| **Hardcoded paths** | Use `{variable}` format |

### Agent Issues

| Issue | Fix |
|-------|-----|
| **Missing persona fields** | Add role, identity, communication style, principles |
| **Invalid menu triggers** | Use kebab-case, no spaces, no special chars |
| **Empty principles** | Add at least 2-3 meaningful principles |
| **Missing metadata** | Add name, description, module |

### Module Issues

| Issue | Fix |
|-------|-----|
| **Invalid module.yaml** | Check YAML syntax, required fields |
| **Missing install questions** | Add at least one install question or mark optional |
| **Package.json errors** | Add name, version, description |
| **Folder structure** | Ensure src/ folder with proper structure |

## Validation Workflow

Recommended validation process:

1. **Create** your agent/workflow/module
2. **Validate** immediately after creation
3. **Fix** any issues found
4. **Revalidate** to confirm fixes
5. **Test** by actually using the agent/workflow
6. **Validate again** before publishing

## Sub-process Optimization

For complex workflows, validation checks for sub-process optimization opportunities:

**Pattern 1: Single sub-process for grep/regex**
- Use when finding patterns across many files
- Returns only matches/failures
- Context savings: 1000:1 ratio

**Pattern 2: Separate sub-process per file for deep analysis**
- Use when analyzing prose, logic, quality
- Returns structured findings
- Context savings: 10:1 ratio

**Pattern 3: Sub-process for data file operations**
- Use when loading reference data, matching
- Returns only relevant rows
- Context savings: 100:1 ratio

## Tips for Passing Validation

| Tip | How |
|-----|-----|
| **Follow templates** | Use existing agents/workflows as examples |
| **Use the builders** | Bond, Wendy, Morgan create compliant content |
| **Read error messages** | Validation tells you exactly what's wrong |
| **Fix incrementally** | Address one issue at a time, revalidate |
| **Test thoroughly** | Validation checks structure, not behavior |

## Getting Help

If validation fails and you're not sure why:

- **[Discord Community](https://discord.gg/gk8jAdXWmj)** — Ask in #bmad-method-help
- **[GitHub Issues](https://github.com/bmad-code-org/bmad-builder/issues)** — Report suspected bugs
- **[Reference Examples](https://github.com/bmad-code-org/BMAD-METHOD)** — Study valid examples

## Related Guides

| Guide | Description |
|-------|-------------|
| [Edit Agents and Workflows](/docs/how-to/edit-agents-and-workflows.md) | Fixing validation issues |
| [Create a Custom Agent](/docs/tutorials/create-custom-agent.md) | Agent creation |
| [Create Your First Workflow](/docs/tutorials/create-your-first-workflow.md) | Workflow creation |
| [Workflow Schema](/docs/reference/workflow-schema.md) | Technical reference |
