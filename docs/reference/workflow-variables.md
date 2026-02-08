---
title: "Workflow Variables Reference"
description: Frontmatter variables and path rules for BMad workflows
---

Complete reference for workflow frontmatter variables, path rules, and naming conventions.

## Standard Variables

Available to all workflows regardless of module affiliation:

| Variable | Example | Description |
|----------|---------|-------------|
| `{project-root}` | `/Users/user/dev/my-project` | Project root directory |
| `{project_name}` | `my-project` | Project name from configuration |
| `{output_folder}` | `/Users/user/dev/my-project/output` | Configured output folder |
| `{user_name}` | `Brian` | User name from configuration |
| `{communication_language}` | `english` | Language for AI responses |
| `{document_output_language}` | `english` | Language for document output |

## Module-Specific Variables

Available to workflows within a module (defined in module.yaml):

### BMB Module Variables

| Variable | Example | Description |
|----------|---------|-------------|
| `{bmb_creations_output_folder}` | `{project-root}/_bmad/bmb-creations` | Output for BMB-created workflows |

### BMM Module Variables

| Variable | Example | Description |
|----------|---------|-------------|
| `{planning_artifacts}` | `{project-root}/_bmad/bmm/planning-artifacts` | Planning document storage |

### Defining Module Variables

Define module variables in `module.yaml`:

```yaml
module:
  config:
    variables:
      my_custom_folder: '{project-root}/custom/output'
```

## Path Rules

### Within Workflow Folder

Use relative paths for references within the same workflow:

| Type | Format | Example |
|------|--------|---------|
| Step to Step (same folder) | `./filename.md` | `./step-02-vision.md` |
| Step to Template (parent) | `../filename.md` | `../template.md` |
| Step to Subfolder | `./subfolder/file.md` | `./data/config.csv` |

### External References

Use `{project-root}` for references outside the workflow folder:

| Type | Format | Example |
|------|--------|---------|
| Core workflows | `{project-root}/_bmad/core/workflows/...` | `{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml` |
| Module outputs | `{module_output_folder}/...` | `{bmm_creations_output_folder}/prd-my-project.md` |

### Output File Paths

Use folder variables for output file paths:

| Type | Format | Example |
|------|--------|---------|
| Standard output | `{output_folder}/file.md` | `{output_folder}/workflow-output.md` |
| Module output | `{module_folder}/file.md` | `{bmb_creations_output_folder}/my-workflow.md` |
| Time-stamped | `{output_folder}/file-{timestamp}.md` | `{output_folder}/plan-2025-01-15.md` |

## Variable Naming Conventions

### Naming Pattern

Use `snake_case` with descriptive suffixes:

| Suffix | Usage | Example |
|--------|-------|---------|
| `*_File` | File references | `outputFile`, `nextStepFile` |
| `*_Task` | Task references | `advancedElicitationTask` |
| `*_Workflow` | Workflow references | `partyModeWorkflow` |
| `*_Template` | Templates | `productBriefTemplate` |
| `*_Data` | Data files | `dietaryData` |

### Variable Types

| Type | Pattern | Example |
|------|---------|---------|
| File paths | `*_File`, `*_Path` | `outputFile`, `workflowPath` |
| Workflow references | `*_Workflow` | `partyModeWorkflow` |
| Task references | `*_Task` | `advancedElicitationTask` |
| Template references | `*_Template` | `profileTemplate` |

## Frontmatter Structure

### Required Fields

Every step frontmatter must include:

```yaml
---
name: 'step-01-init'
description: 'What this step does'
---
```

### File References

Only include variables actually used in the step body:

```yaml
---
# Required fields
name: 'step-01-init'
description: 'Initialize the workflow'

# File references (only if used)
nextStepFile: './step-02-discovery.md'
outputFile: '{output_folder}/workflow-plan.md'
workflowPlanTemplate: '../templates/plan-template.md'
---
```

:::caution[Critical Rule]
Only include variables in frontmatter that are actually used in the step body. Unused variables cause validation errors.
:::

## Defining New Variables

Steps can define new variables for future steps:

**Step 01 defines:**

```yaml
---
targetWorkflowPath: '{bmb_creations_output_folder}/workflows/{workflow_name}'
---
```

**Step 02 uses:**

```yaml
---
targetWorkflowPath: '{bmb_creations_output_folder}/workflows/{workflow_name}'
workflowPlanFile: '{targetWorkflowPath}/plan.md'
---
```

## Continuable Workflow Variables

For continuable workflows, track progress in output file frontmatter:

```yaml
---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-strategy']
lastStep: 'step-03-strategy'
lastContinued: '2025-01-15'
status: IN_PROGRESS
date: '2025-01-14'
user_name: 'Brian'
---
```

| Field | Type | Description |
|-------|------|-------------|
| `stepsCompleted` | array | List of completed step names |
| `lastStep` | string | Most recent completed step |
| `lastContinued` | date | Last continuation date |
| `status` | string | `IN_PROGRESS` or `COMPLETE` |
| `date` | date | Workflow start date |
| `user_name` | string | User who created the workflow |

## Template Variables

Templates use placeholder syntax for dynamic content:

```markdown
# {{title}}

Created: {{date}}

## Summary
{{summary}}

## Details
{{details}}
```

### Template Syntax

| Syntax | Example |
|--------|---------|
| `{{variable}}` | `{{title}}` (preferred) |
| `[variable]` | `[title]` (also supported) |

## Common Variable Patterns

### Input Discovery Pattern

For workflows that require input from prior workflows:

```yaml
---
inputDocuments: []
requiredInputCount: 1
moduleInputFolder: '{module_output_folder}'
inputFilePatterns:
  - '*-prd.md'
  - '*-ux.md'
---
```

### Output Path Pattern

For workflows that produce output:

```yaml
---
outputFile: '{output_folder}/workflow-output-{project_name}.md'
---
```

### Template Reference Pattern

For workflows that use templates:

```yaml
---
workflowPlanTemplate: '../templates/plan-template.md'
productBriefTemplate: '../templates/brief-template.md'
---
```

### Task Reference Pattern

For workflows that invoke other workflows:

```yaml
---
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/party-mode/workflow.md'
---
```

## Variable Resolution

Variables resolve in this order:

1. **Standard variables** — Always available from global config
2. **Module variables** — Available if workflow is in a module
3. **User-defined variables** — Defined in prior steps, available to subsequent steps
4. **Output frontmatter variables** — Available to continuation steps

## Path Validation Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Step to step | `./step-02.md` | `{workflow_path}/step-02.md` |
| Step to template | `../template.md` | `{workflow_path}/template.md` |
| Step to data | `./data/file.csv` | `{workflow_path}/data/file.csv` |
| External ref | `{project-root}/_bmad/...` | Hardcoded absolute path |
| Output file | `{output_folder}/file.md` | Hardcoded absolute path |

## Common Variable Violations

| Violation | Fix |
|-----------|-----|
| Unused variable in frontmatter | Remove unused variables |
| Hardcoded file path | Use `{variable}` format |
| `{workflow_path}` in same-folder reference | Use relative path `./file.md` |
| Absolute path for external reference | Use `{project-root}/...` |

## Resources

| Resource | Description |
|----------|-------------|
| [Workflow Schema](/reference/workflow-schema.md) | Complete workflow structure reference |
| [Frontmatter Standards](https://github.com/bmad-code-org/bmad-builder/blob/main/src/workflows/workflow/data/frontmatter-standards.md) | Source documentation |
| [Menu Handling Standards](https://github.com/bmad-code-org/bmad-builder/blob/main/src/workflows/workflow/data/menu-handling-standards.md) | Menu patterns |
