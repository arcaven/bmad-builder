---
title: "Skills Standard Reference"
description: How BMad workflows align with the open Skills standard
---

BMad workflows are designed to be compatible with the open Skills standard, enabling maximum portability across AI platforms.

:::tip[Quick Path]
The open Skills standard is an Anthropic-led specification for packaging AI workflows as portable skill folders. Install BMad workflows as Skills in Claude Code, Claude.ai, and via the Claude API.
:::

## Official Skills Documentation

The Skills standard is maintained by Anthropic. For authoritative documentation, refer to these official sources:

| Resource | Link |
|----------|------|
| **Best Practices Guide** | [Skill Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) |
| **Complete Guide** | [The Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf) |
| **Skills Overview** | [Agent Skills Documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills) |

## Why Skills Matter for BMad Workflows

### Portability

Skills work identically across Claude.ai, Claude Code, and the Claude API. A BMad workflow packaged as a skill can be used anywhere without modification.

### Progressive Disclosure

The Skills standard uses a three-level loading system to minimize token usage:

| Level | Content | When Loaded |
|-------|---------|-------------|
| **Frontmatter** | Name and description | Always (in system prompt) |
| **SKILL.md body** | Main instructions | When skill becomes relevant |
| **Bundled files** | References, data, scripts | Only as needed |

This design maintains specialized expertise while minimizing token usage.

### MCP Integration

For workflows that use Model Context Protocol (MCP) servers, Skills provide the knowledge layer above tool access:

- **MCP provides** connectivity to external services
- **Skills provide** workflows and best practices for using those services

## BMad Workflow to Skill Alignment

### Structural Parallels

BMad workflows and Skills share similar architectural principles:

| BMad Workflow | Skill Standard |
|---------------|----------------|
| `workflow.md` frontmatter | `SKILL.md` YAML frontmatter |
| Step files in `steps-c/`, `steps-e/`, `steps-v/` | Main instructions in SKILL.md |
| `/data/` reference materials | `/references/` documentation |
| `/templates/` output templates | `/assets/` templates |
| `module.yaml` configuration | `metadata` in frontmatter |

### Key Differences

| Aspect | BMad Workflow | Skill Standard |
|--------|---------------|----------------|
| **Entry point** | `workflow.md` | `SKILL.md` (required filename) |
| **Organization** | Tri-modal (Create/Edit/Validate) | Single-flow or progressive |
| **State tracking** | Frontmatter in output files | Not specified |
| **Menu system** | A/P/C with execution rules | No standard (custom) |
| **BMad-specific** | Agent assignments, communication styles | Not applicable |

## Making Workflows Skill-Compatible

### Essential Requirements

To make a BMad workflow installable as a Skill:

1. **Rename or create `SKILL.md`** - Required entry point for Skills
2. **Add YAML frontmatter** - Include `name` (kebab-case) and `description`
3. **Use forward slashes** - Use in all file paths for cross-platform compatibility
4. **Avoid reserved words** - Do not use "claude" or "anthropic" in skill name

### Frontmatter Format

```yaml
---
name: my-bmad-workflow
description: Generates production-ready documents using BMad methodology. Use when creating PRDs, technical specs, or project documentation.
metadata:
  author: your-name
  version: 1.0.0
  bmad-workflow: true
---
```

### Naming Rules

| Rule | Requirement |
|------|-------------|
| Folder name | kebab-case only |
| SKILL.md | Exact case-sensitive filename |
| `name` field | Maximum 64 characters, lowercase/hyphens only |
| `description` field | Maximum 1024 characters; describe "what" and "when to use" |
| Reserved words | Do not use "claude" or "anthropic" |

## Practical Examples

### Example 1: Basic BMad Workflow as a Skill

```markdown
---
name: prd-generator
description: Creates Product Requirements Documents using BMad methodology. Use when user asks for PRD, product spec, or requirements document.
web_bundle: true
---

# PRD Generator

This workflow guides you through creating a complete PRD.

## Quick Start

1. Run: `python scripts/init-prd.py --project {project_name}`
2. Fill in the template sections
3. Validate: `python scripts/validate-prd.py prd.md`

## Workflow Steps

**Step 1: Problem Discovery**
- Identify user pain points
- Define success criteria

**Step 2: Solution Definition**
- Outline core features
- Specify technical requirements

**Step 3: Validation**
- Review against BMad PRD standards
- Check for completeness

## References

- [BMad PRD Template](references/prd-template.md)
- [Validation Checklist](references/checklist.md)
```

### Example 2: Multi-File BMad Workflow

```
my-bmad-skill/
├── SKILL.md                    # Entry point (renamed from workflow.md)
├── steps/                      # Workflow steps
│   ├── step-01-init.md
│   ├── step-02-gather.md
│   └── step-03-complete.md
├── references/                 # Progressive disclosure
│   ├── prd-template.md
│   └── validation-rules.md
├── scripts/                    # Utility scripts
│   ├── init.py
│   └── validate.py
└── templates/                  # Output templates
    └── prd-output.md
```

### Example 3: MCP-Enhanced BMad Workflow as a Skill

```markdown
---
name: issue-tracker-integration
description: Manages GitHub issues using BMad workflows. Use when user mentions issues, bugs, or task tracking.
metadata:
  mcp-server: github
---

# GitHub Issue Management

Coordinates GitHub MCP tools with BMad workflow methodology.

## Workflow: Bug Report to Issue

**Step 1: Analyze Bug Report**
- Read the bug description
- Identify reproduction steps
- Determine severity and priority

**Step 2: Create GitHub Issue**
Call MCP tool: `GitHub:create_issue`
Parameters:
- title: Bug summary
- body: Structured from template
- labels: bug, priority

**Step 3: Verify Creation**
- Confirm issue created
- Provide issue link
- Update tracking document
```

## Best Practices for Skill-Compatible Workflows

### Description Writing

The `description` field enables skill discovery.

**Good description:**
```
description: Creates Product Requirements Documents using BMad methodology. Use when user asks for PRD, product spec, or requirements documentation.
```

**Poor description:**
```
description: Helps with documents.
```

### Progressive Disclosure

Keep SKILL.md concise. Move detailed content to separate files loaded on demand:

```markdown
## Quick Start

Generate PRD with: `python scripts/create-prd.py`

## Advanced Features

**Custom sections**: See [references/custom-sections.md](references/custom-sections.md)
**Validation rules**: See [references/validation.md](references/validation.md)
**Examples**: See [references/examples.md](references/examples.md)
```

### Error Handling

Include troubleshooting in your skill:

```markdown
## Troubleshooting

**Error: Template not found**
Cause: Output folder not configured
Solution: Set `{output_folder}` in project config

**Error: Validation failed**
Cause: Missing required sections
Solution: Run `python scripts/check-prd.py --list-required`
```

### Testing Skills

Before distributing a BMad workflow as a skill:

1. **Triggering tests** - Verify skill loads on relevant queries
2. **Functional tests** - Confirm workflow produces correct outputs
3. **Cross-platform tests** - Test in Claude.ai, Claude Code, and via API

## Distribution

### As BMad Module

Package skill-compatible workflows in BMad modules for distribution:

```
my-module/
├── module.yaml
├── agents/
├── workflows/
│   └── my-workflow/
│       ├── SKILL.md          # Dual-purpose entry point
│       ├── steps/
│       └── references/
```

### Standalone Skill

Distribute independently via GitHub:

1. Create repository with skill folder
2. Add repo-level README for humans
3. Include installation instructions
4. Link from MCP documentation if applicable

## Common Questions

### Do all BMad workflows need to be skills?

No. Skills are optional but recommended for maximum compatibility. Internal workflows can remain BMad-specific.

### Can I use BMad-specific features in skills?

Yes. The `metadata` field can include BMad-specific configuration like agent assignments or communication styles.

### How do I handle BMad's tri-modal structure in skills?

Skills do not mandate a specific workflow structure. You can:
- Implement Create flow as the main skill
- Add Edit/Validate as separate skills or referenced workflows
- Document all three modes in references/

### What about BMad variables like `{output_folder}`?

BMad variables work in Skills. Ensure they are defined in the environment or documented as prerequisites.

## Resources

| Resource | Description |
|----------|-------------|
| [Workflow Schema](/reference/workflow-schema.md) | BMad workflow structure reference |
| [Workflow Variables](/reference/workflow-variables.md) | Variable reference for Skills |
| [What Are Workflows](/explanation/what-are-workflows.md) | Workflow concepts in BMad |
| [Add Workflows to Modules](/how-to/add-workflows-to-modules.md) | Packaging workflows for distribution
