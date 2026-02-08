---
title: "Workflow Customization"
---

Workflows support powerful customization patterns through tri-modal architecture, step replacement, and cross-mode integration. This enables workflows to adapt to your specific project needs while maintaining best practices.

## Tri-Modal Workflow Structure

Complex workflows use **tri-modal architecture** — separate flows for create, edit, and validate operations:

````
workflow-name/
├── workflow.md              # Entry point with mode routing
├── data/                    # SHARED standards and reference
├── steps-c/                 # Create (self-contained)
│   ├── step-01-init.md
│   └── step-N-complete.md
├── steps-e/                 # Edit (self-contained)
│   ├── step-01-assess.md
│   └── step-N-complete.md
└── steps-v/                 # Validate (self-contained)
    └── step-01-validate.md
````

### Mode Responsibilities

| Mode | Purpose | Key Patterns |
|------|---------|--------------|
| **Create** | Build new entities from scratch | Step-00-conversion for non-compliant input |
| **Edit** | Modify existing compliant entities | Assess compliance first, route to conversion if needed |
| **Validate** | Standalone validation against standards | Auto-proceeds through checks, generates report |

**Key principle:** Each mode is self-contained with no shared step files. The `data/` folder is shared to prevent drift.

:::note[When to Use Tri-Modal]
Use tri-modal for complex workflows requiring quality assurance, long-term maintenance, or non-compliant input handling. Use create-only for simple experimental workflows.
:::

## Cross-Mode Integration

Workflows support seamless integration between modes:

### Edit to Create (Non-Compliant Detection)

When editing detects a non-compliant workflow:

```yaml
Check workflow compliance:
  - Compliant → Continue to edit steps
  - Non-compliant → Offer conversion
    - IF user accepts: Load steps-c/step-00-conversion.md
```

### Create/Edit to Validation

After creation or editing, workflows can automatically invoke validation:

```yaml
Offer: "Run validation?"
  - IF yes: Load ../steps-v/step-01-validate.md
  - Validation runs standalone, returns report
  - Resume with validation results
```

### Validation to Edit

Validation reports can be consumed by edit mode for fixes:

```yaml
"Fix issues found?"
  - IF yes: Load steps-e/step-01-assess.md with validationReport path
```

## Workflow Conversion

Workflows can convert non-compliant input to BMad-compliant format through `step-00-conversion`:

**Conversion process:**
1. Load non-compliant workflow
2. Extract essence and structure
3. Create plan with `conversionFrom` metadata
4. Build compliant workflow
5. Verify coverage of original functionality

**Coverage tracking:**

```yaml
# In create step-10-confirmation
Check workflowPlan metadata:
  - IF conversionFrom exists:
    - Load original workflow
    - Compare each step/instruction
    - Report coverage percentage
  - ELSE (new workflow):
    - Validate all plan requirements implemented
```

## Step Replacement and Extension

### Adding Steps

To add a step to an existing workflow:

1. Create new step file: `step-XX-new-step.md`
2. Update previous step's `nextStepFile` to load the new step
3. Set the new step's `nextStepFile` to continue the sequence
4. Validate with `[VW]` or `validate-workflow`

### Replacing Steps

To replace a step entirely:

1. Create replacement step file with same or new name
2. Update previous step's `nextStepFile` to load replacement
3. Remove or archive old step file
4. Validate the workflow

### Extracting to Data Files

When a step exceeds 200-250 lines, extract content to `/data/` files:

**Good candidates for extraction:**
- Domain-specific reference materials
- Reusable patterns or examples
- Configuration data
- Large lookup tables

## Menu Customization

### Menu Patterns

| Pattern | Use Case | Options |
|---------|----------|---------|
| **Standard A/P/C** | Collaborative content generation | Advanced, Party, Continue |
| **C Only** | Data gathering, simple progression | Continue only |
| **Branching** | User choice determines path | Custom letters (L/R/F) |
| **Auto-proceed** | Init steps, validation sequences | No menu |

### Custom Menu Options

Workflows can define custom menu letters:

```markdown
Display: "**Select:** [L] Load Existing [N] Create New [C] Continue"

#### Menu Handling Logic:
- IF L: Load existing document, then execute {stepForExisting}
- IF N: Create new document, then execute {stepForNew}
- IF C: Save content, check condition, load appropriate step
```

## Template Customization

### Template Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Free-form** | Minimal template, progressive append | Most workflows |
| **Structured** | Single template with placeholders | Consistent formatting needed |
| **Semi-structured** | Core sections + optional additions | Flexible but organized |
| **Strict** | Multiple templates, exact definitions | Compliance, regulated industries |

### Template Syntax

```markdown
{{variable}}    # Handlebars style (preferred)
[variable]      # Bracket style (also supported)
```

## Output Customization

### Output Patterns

**Plan-then-Build:**

```
Step 1 → Creates plan.md
Step 2 → Appends requirements
Step 3 → Appends design
Step 4 → Build step consumes plan
```

**Direct-to-Final:**

```
Step 1 → Creates final-doc.md
Step 2 → Appends Section 1
Step 3 → Appends Section 2
Step 4 → Polish step optimizes entire document
```

### Final Polish Step

For free-form workflows, include a polish step that:
1. Loads entire document
2. Reviews for flow and coherence
3. Reduces duplication
4. Ensures proper headers
5. Improves transitions

## Pattern Resources

| Resource | Description |
|----------|-------------|
| [Workflow Patterns](/explanation/workflow-patterns.md) | Step types and structure patterns |
| [Workflow Schema](/reference/workflow-schema.md) | Technical reference |
| [Edit Agents and Workflows](/how-to/edit-agents-and-workflows.md) | Step-by-step editing guide |
