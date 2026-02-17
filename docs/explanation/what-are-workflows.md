---
title: "Workflows"
---

Workflows are structured processes that guide an AI through complex tasks step by step. Each step loads only when needed — progressive disclosure makes workflows reliable for multi-session projects.

## When to Use Workflows

Use workflows for multi-step tasks where quality and completeness matter.

**Perfect for:** Meal planning, Novel outlining, Tax preparation, Trip planning

**Skip for:** Quick questions, Simple tasks, One-time interactions

## Workflow Structure

```
my-workflow/
├── workflow.md              # Entry point and configuration
├── steps-c/                 # Create flow steps
│   ├── step-01-init.md
│   └── step-N-final.md
├── data/                    # Reference materials
└── templates/               # Output templates
```

### Core Principles

**Micro-file Design** — Each step is 80-200 lines

**Just-in-Time Loading** — Only the current step is in memory

**Sequential Enforcement** — No skipping steps

## Workflow Types

| Structure | Description | Example |
|-----------|-------------|---------|
| **Linear** | Fixed order steps | Meal planning |
| **Branching** | User choice determines path | Wedding itinerary |
| **Repeating Loop** | Same steps with new content | RPG sessions |

| Intent | Description | Example |
|--------|-------------|---------|
| **Intent-based** | Collaborative facilitation | Novel outliner |
| **Prescriptive** | Exact compliance | Tax organizer |
| **Balanced** | Framework prescriptive, content flexible | Course syllabus |

## Continuable Workflows

Track progress in output file frontmatter so users can stop and resume:

```yaml
---
stepsCompleted: ['step-01-init', 'step-02-discovery']
lastStep: 'step-02-discovery'
status: IN_PROGRESS
---
```

Use for complex tasks with 8+ steps or multiple sessions.

## Workflow Chaining

Workflows can be chained — outputs become inputs for the next:

```
brainstorming → research → brief → PRD → architecture
```

## Creating Workflows

See [Create Your First Workflow](/tutorials/create-your-first-workflow.md) for step-by-step instructions.
