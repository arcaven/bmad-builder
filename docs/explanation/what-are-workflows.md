---
title: "Workflows"
---

A workflow is a structured process that guides an AI through complex tasks, step by step. Instead of one giant prompt trying to do everything at once, workflows break complexity into focused, sequential steps that execute in order.

Each step loads only when needed — the AI can't skip ahead or lose focus. This is **progressive disclosure**, and it's what makes workflows reliable for multi-session projects that actually get finished.

## When to Use Workflows

Use workflows for multi-step tasks where quality, completeness, and continuity matter. Skip workflows for simple one-off questions where a single prompt works fine.

:::tip[Quick Rule]
If your task has 3+ steps, could span multiple sessions, or benefits from structured thinking — build a workflow.
:::

**Perfect for workflows:**
- Meal planning (discovery preferences, assessment, strategy, shopping list, prep schedule)
- Novel outlining (structure selection, character arcs, beat breakdown, pacing review)
- Tax preparation (document categorization, deduction discovery, compliance checklist)
- Trip planning (destination research, itinerary building, budget optimization, booking schedule)

**Skip workflows for:**
- Quick questions (single prompts work fine)
- Simple tasks (under 300 lines of output)
- One-time interactions (no need for structure)

## Workflows vs Skills

When installed, a workflow **is a skill**. The terms are often interchangeable:

| Aspect | Skills | Workflows |
|--------|--------|-----------|
| **Definition** | Any prompt with proper frontmatter | Skills following BMad conventions |
| **Structure** | Single file or multi-step | Usually multi-step with sequential execution |
| **Loading** | Loads all at once | Progressive disclosure — one step at a time |
| **Use case** | Simple tasks, quick commands | Complex tasks, multi-session projects |

Workflows can be simple single-file prompts or complex multi-step processes. Think of workflows as skills designed for structured, sequential execution.

## How Workflows Work

### Structure

Workflows use **step-file architecture**:

````
my-workflow/
├── workflow.md              # Entry point and configuration
├── steps-c/                 # Create flow steps (one file per step)
│   ├── step-01-init.md
│   ├── step-02-discovery.md
│   └── step-N-final.md
├── steps-e/                 # Edit flow (optional, for tri-modal)
├── steps-v/                 # Validate flow (optional, for tri-modal)
├── data/                    # Reference materials, examples
└── templates/               # Output document templates
````

The `workflow.md` file defines the workflow's name, description, and goal — but doesn't list every step. That's progressive disclosure in action.

### Execution

Steps execute in sequence: `step-01 → step-02 → step-03 → ... → step-N`

Each step must complete before the next loads. This ensures thoroughness and prevents shortcuts.

### Core Principles

**Micro-file Design** — Each step is 80-200 lines, focused on one concept

**Just-in-Time Loading** — Only the current step is in memory

**Sequential Enforcement** — No skipping steps, no optimization

**State Tracking** — Progress tracked in output file frontmatter

### Continuable Workflows

Some workflows track progress in the output document's frontmatter, so users can stop mid-session and resume later:

```yaml
---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-strategy']
lastStep: 'step-03-strategy'
lastContinued: '2025-01-15'
---
```

Use continuable workflows for complex tasks with 8+ steps or when multiple sessions are likely.

## Workflow Types

### By Structure

| Type | Description | Example |
|------|-------------|---------|
| **Linear** | Steps execute in fixed order | Meal planning, tax organizer |
| **Branching** | User choice determines next steps | Wedding itinerary (by venue type), course syllabus (by type) |
| **Repeating Loop** | Same steps reused with new content | RPG campaign sessions, SOP writer |

### By Intent

| Type | Description | Example |
|------|-------------|---------|
| **Intent-based** | Collaborative facilitation, creative exploration | Novel outliner, trip planner |
| **Prescriptive** | Exact compliance, regulated industries | Tax organizer, employee termination checklist |
| **Balanced** | Framework prescriptive, content flexible | Course syllabus, room renovation |

### By Mode

| Type | Structure | When to Use |
|------|-----------|-------------|
| **Create-only** | `steps-c/` only | Simple workflows, experimental |
| **Tri-modal** | `steps-c/`, `steps-e/`, `steps-v/` | Complex workflows requiring quality assurance |

## Workflow Chaining

Workflows can be chained — outputs become inputs for the next workflow. This creates effective pipelines:

```
brainstorming → research → brief → PRD → architecture → epics → sprint planning
```

Each workflow:
1. Checks for required inputs from prior workflows
2. Validates inputs are complete
3. Produces output for next workflow
4. Recommends next workflow in sequence

## Designing Workflows

Before building, decide:

| Decision | Options | Consider |
|----------|---------|----------|
| **Module affiliation** | Standalone or module-based | Does it need module variables? |
| **Continuable** | Single-session or multi-session | Will users need multiple sessions? |
| **Document output** | Document-producing or action-only | What does it produce? |
| **Intent** | Intent or prescriptive | Collaborative or compliance? |
| **Structure** | Linear, branching, or repeating | How do steps connect? |

## Resources

| Resource | Description |
|----------|-------------|
| [Workflow Patterns](/explanation/workflow-patterns.md) | Structure types and when to use them |
| [Create Your First Workflow](/tutorials/create-your-first-workflow.md) | Step-by-step tutorial |
| [Workflow Schema](/reference/workflow-schema.md) | Technical reference |
| [Edit Agents and Workflows](/how-to/edit-agents-and-workflows.md) | Modifying workflows |
| [Workflow Variables](/reference/workflow-variables.md) | Frontmatter reference
