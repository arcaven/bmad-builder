---
title: "Edit Agents and Workflows"
description: Modify existing agents and workflows while maintaining BMad compliance
---

Modify existing agents and workflows using the builder's edit workflows, which help you make changes while maintaining compliance with best practices.

## Before You Begin

- Have an existing agent or workflow you want to modify
- Understand what changes you want to make
- Completed the relevant creation tutorial (agent or workflow)

:::tip[Direct Editing vs Builder Workflows]
You can edit agent and workflow files directly. The edit workflows (`[EA]`, `[EW]`, `[EM]`) provide guided assistance and validation, but aren't required for simple changes.
:::

## Editing Workflows

### Using the Edit Workflow Workflow

Use Wendy's edit workflow for comprehensive workflow modifications:

```
[EW] or "edit-workflow"
```

Wendy will guide you through:

| Step | What Happens |
|------|--------------|
| **Assess** | Load and review the existing workflow |
| **Discover** | Describe what changes you want |
| **Select** | Choose which parts to modify (steps, menus, frontmatter) |
| **Apply** | Make the changes |
| **Validate** | Check for compliance issues |

### What You Can Edit

| Element | Description |
|---------|-------------|
| **Frontmatter** | Name, description, goal, configuration |
| **Steps** | Add, remove, or modify step files |
| **Menus** | Change menu options and handlers |
| **Templates** | Update output templates |
| **Data** | Modify reference materials |

### Workflow Conversion

The edit workflow can convert non-compliant workflows to BMad format:

**Detection:** Edit mode assesses workflow compliance first
- Compliant → Continue to edit steps
- Non-compliant → Offer conversion to `step-00-conversion`

**Conversion process:**
1. Load non-compliant workflow
2. Extract essence and structure
3. Create plan with `conversionFrom` metadata
4. Build compliant workflow
5. Verify coverage of original functionality

### Tri-Modal Workflows

For complex workflows with create/edit/validate modes, edit mode handles cross-mode integration:

**Edit to Create:** Route to conversion for non-compliant input
**Edit to Validation:** After edits, offer to run validation
**Validation to Edit:** Validation reports consumed by edit mode for fixes

### Direct Editing

Workflows are markdown files. You can edit directly:

```markdown
---
name: my-workflow
description: My workflow description
# Edit frontmatter here
---

# Workflow content here
```

After editing, validate your workflow:

```
[VW] or "validate-workflow"
```

## Adding Steps

To add a step to an existing workflow:

1. Create new step file: `step-XX-new-step.md`
2. Update the previous step to load the new step
3. Set the new step's `nextStepFile` to continue the sequence
4. Validate the workflow

### Step Type Considerations

When adding steps, consider the step type:

| Step Type | When to Use | Menu Pattern |
|-----------|-------------|--------------|
| **Init** | Starting a new workflow phase | Auto-proceed |
| **Middle** | Collaborative content creation | A/P/C or C only |
| **Branch** | User choice determines path | Custom letters |
| **Final** | Completing the workflow | No menu |

## Replacing Steps

To replace a step entirely:

1. Create replacement step file with same or new name
2. Update previous step's `nextStepFile` to load replacement
3. Remove or archive old step file
4. Validate the workflow

## Extracting to Data Files

When a step exceeds 200-250 lines, extract content to `/data/` files.

**Good candidates for extraction:**
- Domain-specific reference materials
- Reusable patterns or examples
- Configuration data
- Large lookup tables

## Editing Agents

### Using the Edit Agent Workflow

Bond's edit workflow helps you modify agents while maintaining compliance:

```
[EA] or "edit-agent"
```

Bond will guide you through:

| Step | What Happens |
|------|--------------|
| **Load** | Select the agent file to edit |
| **Discover** | Describe what changes you want |
| **Select** | Choose which elements to modify |
| **Apply** | Make the changes with validation |
| **Celebrate** | Review and confirm |

### What You Can Edit

| Element | Description |
|---------|-------------|
| **Persona** | Role, identity, communication style, principles |
| **Menu Commands** | Add, remove, or modify commands |
| **Critical Actions** | Autonomous behaviors |
| **Metadata** | Name, description, version |
| **Sidecar** | Expert agent memory files |

### Direct Editing

For simple changes, you can edit the agent YAML file directly:

```yaml
agent:
  metadata:
    name: "My Agent"
    # Edit metadata here

  persona:
    role: "What they do"
    # Edit persona fields here

  menu:
    - trigger: "my-command"
      # Edit commands here
```

After editing, rebuild the agent:

```bash
npx bmad-method build <agent-name>
```

## Editing Modules

For module-level changes (configuration, install questions), use Morgan's edit workflow:

```
[EM] or "edit-module"
```

This guides you through:
- Modifying `module.yaml`
- Updating install questions
- Changing configuration values

## Validation After Editing

Always validate after making changes:

| Content Type | Validation Command |
|--------------|-------------------|
| Agents | `[VA]` or `validate-agent` |
| Workflows | `[VW]` or `validate-workflow` |
| Modules | `[VM]` or `validate-module` |

### Max-Parallel Workflow Validation

For high-capability LLMs (like Claude):

```
[MV] or "validate-max-parallel-workflow"
```

This hyper-optimized validation uses task agents to validate multiple workflow aspects simultaneously in sub-processes for dramatically faster results.

Validation checks for:
- Proper YAML formatting
- Required fields are present
- Compliance with BMad standards
- Menu and command structure
- Frontmatter variable usage
- Step file size limits

## Common Edit Scenarios

### Adding a Menu Command to an Agent

1. Run `[EA]` or open the agent YAML file
2. Add to the `menu` section:

```yaml
menu:
  - trigger: "new-command"
    exec: "path/to/workflow.md"
    description: "What this command does"
```

3. Rebuild or validate

### Adding a Step to a Workflow

1. Run `[EW]` or open the workflow
2. Create new step file: `step-XX-new-step.md`
3. Update the previous step to load the new step
4. Validate the workflow

### Converting a Non-Compliant Workflow

1. Run `[EW]` or `[RW]` (rework)
2. Edit mode detects non-compliance
3. Accept conversion offer
4. Review conversion plan
5. Build compliant workflow
6. Verify coverage

## Tips for Effective Editing

| Tip | Why |
|-----|-----|
| **Validate often** | Catch issues early |
| **Test changes** | Verify behavior matches expectations |
| **Backup first** | Keep a copy before major edits |
| **Iterate** | Make small changes and test |
| **Document** | Note why you made changes |

## Getting Help

- **[Discord Community](https://discord.gg/gk8jAdXWmj)** — Ask in #bmad-method-help
- **[GitHub Issues](https://github.com/bmad-code-org/bmad-builder/issues)** — Report bugs

## Related Guides

| Guide | Description |
|-------|-------------|
| [Validate Agents and Workflows](/docs/how-to/validate-agents-and-workflows.md) | Quality assurance |
| [Create a Custom Agent](/docs/tutorials/create-custom-agent.md) | Creating agents |
| [Create Your First Workflow](/docs/tutorials/create-your-first-workflow.md) | Creating workflows |
| [Workflow Customization](/docs/explanation/customize-workflows.md) | Tri-modal structure and patterns |
