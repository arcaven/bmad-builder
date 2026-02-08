---
title: "Create Your First Workflow"
---

Build a structured, step-by-step workflow using BMad Builder that guides users through complex tasks with progressive disclosure and focused execution.

:::note[BMB Module]
This tutorial uses the **BMad Builder (BMB)** module. Make sure you have BMad installed with the BMB module enabled.
:::

## What You'll Learn

- How workflows use step-file architecture for disciplined execution
- How to run the workflow builder with Wendy (workflow-builder)
- How to define your workflow's purpose and structure
- How to create sequential steps with progressive disclosure
- How to validate and test your workflow

:::note[Prerequisites]
- BMad installed with the BMB module
- Basic understanding of what workflows do (see [What Are Workflows](../explanation/what-are-workflows.md))
- A multi-step process you want to automate or guide
- About 30-45 minutes for your first workflow
:::

:::tip[Quick Path]
Run `[CW]` → Follow guided steps → Validate → Install → Test your workflow.
:::

## Understanding Workflows

A workflow is a structured process that guides an AI through tasks sequentially. Instead of one giant prompt, workflows break complex tasks into focused, sequential steps.

### Why Use Workflows?

| Benefit | How It Helps | Example |
|---------|--------------|---------|
| **Focus** | Each step contains only instructions for that phase | Meal planning step focuses only on preferences, not shopping |
| **Continuity** | Track progress across multiple sessions | Novel outlining remembers your last scene written |
| **Quality** | Sequential enforcement prevents shortcuts | Tax workflow ensures all deductions are explored |
| **Reusability** | Build once, use repeatedly | Trip planner works for any destination |

### Real-World Examples

**A meal planning workflow** breaks down into:
1. Discovery — What do you like to eat?
2. Assessment — Dietary restrictions, allergies, goals
3. Strategy — Meal patterns, prep preferences
4. Shopping List — Ingredients organized by store section
5. Prep Schedule — What to prepare when

**A trip planning workflow** breaks down into:
1. Destination Research — Budget, timing, interests
2. Itinerary Building — Daily activities, balance of rest/adventure
3. Budget Optimization — Where to splurge vs save
4. Booking Schedule — When to book what for best prices

### Workflow Structure

Workflows use **step-file architecture**:

````
my-workflow/
├── workflow.md              # Entry point and configuration
├── steps-c/                 # Create flow steps (loaded one at a time)
│   ├── step-01-init.md
│   ├── step-02-discovery.md
│   └── step-N-final.md
├── data/                    # Reference materials, examples
└── templates/               # Output document templates
````

The key principle is **just-in-time loading** — only the current step is in memory. The AI can't skip ahead or lose focus.

## Step 1: Start the Workflow Builder

In your IDE (Claude Code, Cursor, etc.), invoke the create-workflow command with Wendy (workflow-builder):

```
[CW] or "create-workflow"
```

Wendy will ask how you'd like to start:

| Option | When to Use |
|--------|-------------|
| **[F]rom scratch** | You have an idea but nothing written yet |
| **[C]onvert existing** | You have a workflow to convert to BMad format |

For your first workflow, choose **From Scratch**.

:::tip[Workflow Options]
At each step, Wendy provides options:
- **[A] Advanced** — Get deeper insights and reasoning
- **[P] Party** — Get multiple agent perspectives
- **[C] Continue** — Move to the next step
:::

## Step 2: Discover Your Workflow

Wendy starts with **discovery** — understanding your idea before making technical decisions.

You'll be asked:

**"Tell me about your idea — what problem are you trying to solve? What's the vision?"**

Be ready to discuss:
- What problem you're solving
- Who will use this workflow
- What success looks like
- Whether this is a one-time or repeated process

:::note[Think Before You Respond]
Wendy will ask you to think about your response before continuing. This ensures quality over speed.
:::

## Step 3: Classify Your Workflow

Once Wendy understands your vision, she'll help classify the workflow:

### Structure Type

| Type | Description | Example |
|------|-------------|---------|
| **Linear** | Steps execute in fixed order | Meal planning, tax organizer |
| **Branching** | User choice determines next steps | Wedding itinerary (by venue type) |
| **Repeating Loop** | Same steps reused with new content | RPG campaign sessions |

### Intent Type

| Type | Description | When to Use |
|------|-------------|-------------|
| **Intent-based** | Collaborative facilitation, creative exploration | Creative writing, trip planning |
| **Prescriptive** | Exact compliance, regulated industries | Tax preparation, medical intake |
| **Balanced** | Framework prescriptive, content flexible | Course syllabus, room renovation |

### Session Type

| Type | Description | When to Use |
|------|-------------|-------------|
| **Single-session** | Completes in one sitting | Quick tasks, less than 8 steps |
| **Continuable** | Can stop and resume | Complex tasks, multiple sessions |

### Output Type

| Type | Description | Example |
|------|-------------|---------|
| **Document-producing** | Creates persistent output file | Meal plan, trip itinerary |
| **Non-document** | Performs actions without persistent output | Data validation, analysis |

## Step 4: Design the Structure

Wendy guides you through planning the workflow:

1. **Foundation** — Name, description, location
2. **Design** — Step sequence and menu handling
3. **Tools** — What tools/workflows the workflow can access
4. **Requirements** — Inputs, outputs, and validation rules

### Deciding on Step Count

Start with 3-5 steps for your first workflow. You can always add more later. If a step feels too large, break it into smaller steps.

| Workflow Complexity | Typical Steps |
|---------------------|---------------|
| Simple | 3-5 steps |
| Moderate | 6-10 steps |
| Complex | 10+ steps |

## Step 5: Build Your Steps

Now you create the actual step files. Wendy demonstrates **progressive disclosure** — each step is loaded only when needed.

### Step Structure

Each step file contains:

| Element | Purpose |
|---------|---------|
| **Frontmatter** | Step name, description, file references |
| **Step Goal** | What this step accomplishes |
| **Execution Rules** | How the AI should behave |
| **Instructions** | What the AI should do |
| **Menu** | User options (if applicable) |

### Menu Options

Most steps include a menu for user interaction:

```markdown
Display: "**Select:** [A] Advanced [P] Party [C] Continue"

#### Menu Handling Logic:
- IF A: Execute {advancedElicitationTask}, then redisplay menu
- IF P: Execute {partyModeWorkflow}, then redisplay menu
- IF C: Save content to {outputFile}, then load {nextStepFile}
```

:::tip[Keep Steps Focused]
Each step should do one thing well. If a step feels too large, break it into smaller steps.
:::

## Step 6: Validate and Test

Before using your workflow, validate it:

```
[VW] or "validate-workflow"
```

Wendy checks:
- Frontmatter is complete and correct
- Step structure follows best practices
- Menus are properly configured
- Output format is valid

### Max-Parallel Validation

For high-capability LLMs (like Claude), use max-parallel validation:

```
[MV] or "validate-max-parallel-workflow"
```

This hyper-optimized validation uses task agents to validate multiple workflow aspects simultaneously in sub-processes for dramatically faster results.

Fix any issues Wendy identifies, then re-validate.

## Step 7: Install and Use

Once validated, install your workflow using the BMad installer. Then invoke it in your IDE:

```
/your-workflow-name
```

Run through the complete workflow end-to-end to verify it works as expected.

## What You've Accomplished

You've created a working BMad workflow with:
- A defined purpose and clear structure
- Sequential steps with progressive disclosure
- Proper validation and error handling
- Reusable architecture for repeated use

Your project now includes:

````
_bmad/
└── {module}/
    └── workflows/
        └── {your-workflow}/
            ├── workflow.md
            └── steps-c/
                ├── step-01-*.md
                └── step-N-*.md
````

## Quick Reference

| Action | How |
|--------|-----|
| Start building | `[CW]` or `create-workflow` |
| Validate | `[VW]` or `validate-workflow` |
| Max-parallel validate | `[MV]` or `validate-max-parallel-workflow` |
| Edit existing | `[EW]` or `edit-workflow` |
| Convert existing | Choose `[C]onvert` option |
| Study examples | Check `src/workflows/workflow/` in BMB module |

## Common Questions

**How many steps should my workflow have?**

Start with 3-5 steps for your first workflow. You can always add more later. If a step feels too large, break it into smaller steps.

**What's the difference between single-session and continuable workflows?**

Single-session workflows run in one sitting. Continuable workflows track progress in the output file frontmatter, so users can stop and resume later. Use continuable for complex tasks with 8+ steps.

**Can I call other workflows from my workflow?**

Yes! This is called **workflow chaining**. Workflows can be chained so outputs become inputs for the next workflow, creating effective pipelines like `brainstorming → research → brief → PRD`.

**Do I need templates?**

Templates are optional but recommended when your workflow produces a structured document (like a report, plan, or checklist). Templates ensure consistent output formatting.

## Getting Help

- **[Discord Community](https://discord.gg/gk8jAdXWmj)** — Ask in #bmad-method-help or #report-bugs-and-issues
- **[GitHub Issues](https://github.com/bmad-code-org/bmad-builder/issues)** — Report bugs or request features

## Further Reading

| Resource | Description |
|----------|-------------|
| [What Are Workflows](/docs/explanation/what-are-workflows.md) | Deep technical details on workflow architecture |
| [Workflow Patterns](/docs/explanation/workflow-patterns.md) | Step types and structure patterns |
| [Edit Agents and Workflows](/docs/how-to/edit-agents-and-workflows.md) | Modify existing workflows |
| [Workflow Schema](/docs/reference/workflow-schema.md) | Technical reference for workflow configuration |

:::tip[Key Takeaways]
- **Start simple** — Your first workflow should solve one problem well with 3-5 steps
- **Progressive disclosure** — Each step is independent and loaded only when needed
- **Validate often** — Use `[VW]` to check your work before using your workflow
- **Learn by doing** — The best way to understand workflows is to build one
:::
