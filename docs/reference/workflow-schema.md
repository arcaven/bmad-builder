---
title: "Workflow Schema Reference"
description: Structure and fields for BMad workflow files
---

Complete reference for workflow file structure, frontmatter, step types, menu patterns, and validation rules.

## Workflow File Structure

````
my-workflow/
├── workflow.md              # Entry point and configuration
├── steps-c/                 # Create flow steps
│   ├── step-01-init.md
│   ├── step-02-process.md
│   └── step-N-complete.md
├── steps-e/                 # Edit flow (optional)
├── steps-v/                 # Validate flow (optional)
├── data/                    # Reference materials
└── templates/               # Output templates
````

## Workflow Frontmatter

The `workflow.md` file contains workflow configuration in YAML frontmatter.

### Required Fields

```yaml
---
name: my-workflow
description: A brief description of what this workflow does
web_bundle: true
---
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Workflow identifier (kebab-case) |
| `description` | string | Short description |
| `web_bundle` | boolean | Include in web bundle builds |

### File References

```yaml
---
createWorkflow: './steps-c/step-01-init.md'
conversionWorkflow: './steps-c/step-00-conversion.md'
---
```

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
| `name` | string | Yes | Step identifier (kebab-case) |
| `description` | string | Yes | What this step does |
| `nextStepFile` | string | No | Path to next step |
| `outputFile` | string | No | Output document path |

### Step Size Limits

| Metric | Value |
|--------|-------|
| Recommended | Under 200 lines |
| Absolute Maximum | 250 lines |

If exceeded, split into multiple steps or extract to `/data/` files.

## Step Types

| Step Type | Use Case | Menu Pattern |
|-----------|----------|--------------|
| **Init (non-continuable)** | Single-session workflow start | Auto-proceed |
| **Init (continuable)** | Multi-session workflow start | Continuation detection |
| **Continuation (01b)** | Paired with continuable init | Routes to next step |
| **Middle (standard)** | Collaborative content | A/P/C menu |
| **Middle (simple)** | Data gathering | C only |
| **Branch** | User choice determines path | Custom letters |
| **Validation sequence** | Multiple checks | Auto-proceed |
| **Final polish** | Optimize document | None (final) |
| **Final** | Completion | None (final) |

## Frontmatter Variables

### Standard Variables

Available to all workflows:

| Variable | Example | Description |
|----------|---------|-------------|
| `{project-root}` | `/Users/user/dev/project` | Project root directory |
| `{project_name}` | `my-project` | Project name |
| `{output_folder}` | `/Users/user/dev/project/output` | Configured output folder |
| `{user_name}` | `Brian` | User name |
| `{communication_language}` | `english` | Communication language |
| `{document_output_language}` | `english` | Document output language |

### Module-Specific Variables

Available to workflows in a module (defined in `module.yaml`):

| Variable | Example | Module |
|----------|---------|--------|
| `{bmb_creations_output_folder}` | `{project-root}/_bmad/bmb-creations` | BMB |
| `{planning_artifacts}` | `{project-root}/_bmad/bmm/planning-artifacts` | BMM |

### Path Rules

| Type | Format | Example |
|------|--------|---------|
| Step to Step (same folder) | `./filename.md` | `./step-02-vision.md` |
| Step to Template (parent) | `../filename.md` | `../template.md` |
| Step to Subfolder | `./subfolder/file.md` | `./data/config.csv` |
| External References | `{project-root}/...` | `{project-root}/_bmad/core/...` |
| Output Files | `{folder_variable}/...` | `{output_folder}/output.md` |

:::caution[Critical Rule]
Only include variables in frontmatter that are actually used in the step body. Unused variables cause validation errors.
:::

## Menu Handling

### Menu Structure

Every menu must have three sections: Display, Handler, and Execution Rules.

```markdown
### N. Present MENU OPTIONS

Display: "**Select:** [A] [action] [P] [action] [C] Continue"

#### Menu Handling Logic:
- IF A: Execute {advancedElicitationTask}, then redisplay menu
- IF P: Execute {partyModeWorkflow}, then redisplay menu
- IF C: Save content to {outputFile}, update frontmatter, then load {nextStepFile}
- IF Any other: help user, then redisplay menu

#### EXECUTION RULES:
- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects 'C'
- After other menu items execution, return to this menu
```

### Reserved Letters

| Letter | Purpose | After Execution |
|--------|---------|-----------------|
| **A** | Advanced Elicitation | Redisplay menu |
| **P** | Party Mode | Redisplay menu |
| **C** | Continue/Accept | Save and load next step |
| **X** | Exit/Cancel | End workflow |

### Menu Patterns

| Pattern | Use Case | Options |
|---------|----------|---------|
| **Standard A/P/C** | Collaborative content | Advanced, Party, Continue |
| **C Only** | Data gathering, init steps | Continue only |
| **Branching** | User choice determines path | Custom letters (L/R/F) |
| **Auto-proceed** | Init, validation | No menu |

:::tip[When to Include A/P]
Include A/P options for collaborative steps where alternatives provide value. Skip for init steps, document discovery, and simple data gathering.
:::

## State Tracking (Continuable Workflows)

Continuable workflows track progress in output file frontmatter:

```yaml
---
stepsCompleted: ['step-01-init', 'step-02-process', 'step-03-design']
lastStep: 'step-03-design'
lastContinued: '2025-01-15'
status: IN_PROGRESS
---
```

| Field | Type | Description |
|-------|------|-------------|
| `stepsCompleted` | array | List of completed step names |
| `lastStep` | string | Most recent completed step |
| `lastContinued` | date | Last continuation date |
| `status` | string | `IN_PROGRESS` or `COMPLETE` |

## Output Patterns

### Plan-then-Build

```
Step 1 (init)     → Creates plan.md from template
Step 2 (gather)   → Appends requirements to plan.md
Step 3 (design)   → Appends design decisions to plan.md
Step 4 (review)   → Appends review/approval to plan.md
Step 5 (build)    → READS plan.md, CREATES final artifacts
```

### Direct-to-Final

```
Step 1 (init)     → Creates final-doc.md from minimal template
Step 2 (section)  → Appends Section 1
Step 3 (section)  → Appends Section 2
Step 4 (section)  → Appends Section 3
Step 5 (polish)   → Optimizes entire document
```

## Template Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Free-form** | Minimal template, progressive append | Most workflows (recommended) |
| **Structured** | Single template with placeholders | Consistent formatting needed |
| **Semi-structured** | Core required sections + optional additions | Flexible but organized |
| **Strict** | Multiple templates, exact definitions | Compliance, regulated industries |

### Template Syntax

```markdown
{{variable}}    # Handlebars style (preferred)
[variable]      # Bracket style (also supported)
```

Keep templates lean — structure only, not content.

## Validation Checklist

When validating workflows, check:

- [ ] Frontmatter contains required fields
- [ ] `name` is valid kebab-case
- [ ] All frontmatter variables are used in step body
- [ ] Step files exist and are numbered sequentially
- [ ] `nextStepFile` references are valid
- [ ] Menus are properly formatted (display, handler, execution rules)
- [ ] Continuable workflows have state tracking
- [ ] Steps are under 250 lines
- [ ] Handler section follows menu display
- [ ] "Halt and wait" in execution rules
- [ ] A/P options appropriate for step type

## Common Violations

| Violation | Fix |
|-----------|-----|
| Unused variable in frontmatter | Remove unused variables |
| Hardcoded file path | Use `{variable}` format |
| A/P menu in step 1 | Remove A/P (inappropriate for init) |
| Missing handler section | Add handler after menu display |
| No "halt and wait" instruction | Add to EXECUTION RULES |
| Hardcoded `stepsCompleted` array | Append: "update stepsCompleted to add this step" |
| File exceeds 250 lines | Split into multiple steps or extract to `/data/` |

## Best Practices

| Practice | Why |
|----------|-----|
| One goal per step | Keeps steps focused and manageable |
| Number sequentially | Clear execution order |
| Load data files as needed | Just-in-time loading |
| Update state after each step | Progress tracking for continuable workflows |
| Use menus for user choice | Interactive workflows need user input |
| Use A/P options appropriately | Not every step needs alternatives |
| Extract large steps to data | Keeps step files focused |

## Resources

| Resource | Description |
|----------|-------------|
| [Builder Commands](/reference/builder-commands.md) | Workflow commands |
| [Workflow Variables](/reference/workflow-variables.md) | Complete variable reference |
| [Create Your First Workflow](/tutorials/create-your-first-workflow.md) | Workflow creation tutorial |
| [What Are Workflows](/explanation/what-are-workflows.md) | Workflow concepts |
