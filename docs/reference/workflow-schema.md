---
title: "Workflow Schema Reference"
description: Structure and fields for BMad workflow files
---

Complete reference for workflow file structure and configuration.

## Workflow File Structure

```
my-workflow/
├── workflow.md              # Entry point and configuration
├── steps-c/                 # Create flow steps
│   ├── step-01-init.md
│   └── step-N-complete.md
├── steps-e/                 # Edit flow (optional)
├── steps-v/                 # Validate flow (optional)
├── data/                    # Reference materials
└── templates/               # Output templates
```

## Workflow Frontmatter

```yaml
---
name: my-workflow
description: A brief description
web_bundle: true
createWorkflow: './steps-c/step-01-init.md'
---
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Workflow identifier (kebab-case) |
| `description` | string | Short description |
| `web_bundle` | boolean | Include in web bundle builds |
| `createWorkflow` | string | Path to first step |

## Step Files

Each step is a separate markdown file loaded only when needed.

### Step Frontmatter

```yaml
---
name: 'step-01-init'
description: 'Initialize the workflow'
nextStepFile: './step-02-process.md'
outputFile: '{output_folder}/output.md'
---
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Step identifier |
| `description` | string | Yes | What this step does |
| `nextStepFile` | string | No | Path to next step |
| `outputFile` | string | No | Output document path |

### Step Size Limits

| Metric | Value |
|--------|-------|
| Recommended | Under 200 lines |
| Absolute Maximum | 250 lines |

## Step Types

| Step Type | Use Case | Menu Pattern |
|-----------|----------|--------------|
| **Init** | Single-session start | Auto-proceed |
| **Continuation** | Multi-session resume | Continuation detection |
| **Middle** | Collaborative content | A/P/C menu |
| **Branch** | User choice determines path | Custom letters |
| **Final** | Completion | None |

## Frontmatter Variables

### Standard Variables

| Variable | Example | Description |
|----------|---------|-------------|
| `{project-root}` | `/Users/user/dev/project` | Project root directory |
| `{output_folder}` | `/Users/user/dev/project/output` | Output folder |
| `{user_name}` | `Brian` | User name |

### Path Rules

| Type | Format | Example |
|------|--------|---------|
| Step to Step | `./filename.md` | `./step-02-vision.md` |
| Step to Template | `../filename.md` | `../template.md` |
| External References | `{project-root}/...` | `{project-root}/_bmad/core/...` |

## Menu Handling

### Menu Structure

Every menu must have three sections: Display, Handler, and Execution Rules.

```markdown
Display: "**Select:** [A] Advanced [P] Party [C] Continue"

#### Menu Handling Logic:
- IF A: Execute {task}, then redisplay menu
- IF C: Save content, update frontmatter, then load {nextStepFile}

#### EXECUTION RULES:
- ALWAYS halt and wait for user input
```

### Menu Patterns

| Pattern | Use Case | Options |
|---------|----------|---------|
| **Standard A/P/C** | Collaborative content | Advanced, Party, Continue |
| **C Only** | Data gathering | Continue only |
| **Auto-proceed** | Init, validation | No menu |

## State Tracking (Continuable Workflows)

Continuable workflows track progress in output file frontmatter:

```yaml
---
stepsCompleted: ['step-01-init', 'step-02-process']
lastStep: 'step-02-process'
lastContinued: '2025-01-15'
status: IN_PROGRESS
---
```

## Template Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Free-form** | Minimal template, progressive append | Most workflows |
| **Structured** | Single template with placeholders | Consistent formatting |
| **Semi-structured** | Core sections + optional additions | Flexible but organized |

### Template Syntax

```markdown
{{variable}}    # Handlebars style (preferred)
[variable]      # Bracket style (also supported)
```

## Common Violations

| Violation | Fix |
|-----------|-----|
| Unused variable in frontmatter | Remove unused variables |
| A/P menu in step 1 | Remove A/P (inappropriate for init) |
| File exceeds 250 lines | Split into multiple steps or extract to `/data/` |

## Resources

| Resource | Description |
|----------|-------------|
| [Create Your First Workflow](/tutorials/create-your-first-workflow.md) | Workflow creation tutorial |
| [Workflow Patterns](/explanation/workflow-patterns.md) | Step types and patterns |
| [What Are Workflows](/explanation/what-are-workflows.md) | Workflow concepts |
