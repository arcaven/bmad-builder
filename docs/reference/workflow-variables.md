---
title: "Workflow Variables Reference"
description: Frontmatter variables and path rules for workflows
---

Reference for workflow frontmatter variables and path rules.

## Standard Variables

| Variable | Description |
|----------|-------------|
| `{project-root}` | Project root directory |
| `{output_folder}` | Configured output folder |
| `{user_name}` | User name from configuration |
| `{communication_language}` | Language for AI responses |

## Path Rules

| Type | Format | Example |
|------|--------|---------|
| Step to step | `./filename.md` | `./step-02-vision.md` |
| Step to template | `../filename.md` | `../template.md` |
| Step to subfolder | `./subfolder/file.md` | `./data/config.csv` |
| External ref | `{project-root}/_bmad/...` | `{project-root}/_bmad/core/...` |
| Output file | `{output_folder}/file.md` | `{output_folder}/output.md` |

## Frontmatter Structure

```yaml
---
name: 'step-01-init'
description: 'What this step does'
nextStepFile: './step-02-discovery.md'
outputFile: '{output_folder}/workflow-plan.md'
---
```

**Critical Rule:** Only include variables actually used in the step body.

## Continuable Workflows

Track progress in output file frontmatter:

```yaml
---
stepsCompleted: ['step-01-init', 'step-02-discovery']
lastStep: 'step-02-discovery'
status: IN_PROGRESS
---
```

## Template Variables

Templates use placeholder syntax:

```markdown
# {{title}}

Created: {{date}}

{{summary}}
```

| Syntax | Example |
|--------|---------|
| `{{variable}}` | Preferred format |
| `[variable]` | Also supported |
