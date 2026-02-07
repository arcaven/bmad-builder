---
title: "Workflows"
---

Workflows are structured processes that guide an AI through tasks step-by-step. Instead of one giant prompt that tries to do everything at once, workflows break complex tasks into focused steps that execute sequentially.

When workflows are installed, they are set up with the IDE or Tool Selected as commands, this means they can be run directly via slash command at any time. They also can be tied to a [BMad Agent](/docs/explanation/what-are-bmad-agents.md) and run by an agent persona indirectly.

## What Is a Workflow?

A workflow is a set of instructions organized into steps. The AI executes one step at a time—completing each step fully before moving to the next. This is called **progressive disclosure**: the AI only sees the current step, so it can't get ahead of itself, skip steps, or lose focus.

Workflows can be simple or complex, interactive or automated. A workflow might guide a user through collaborative decisions, process documents automatically, complete a simple task, or do a mix of both. Workflows are fully compatible with the open skills standard.

## Workflows vs Skills

A workflow, when installed, **is a skill**. The terms are often interchangeable:

- **Skills** are the general mechanism—any prompt with the right front matter can be a skill
- **Workflows** are skills that follow BMad conventions, usually with multiple steps and structured progression

Some workflows are simple single-file prompts. Others are complex multi-step processes. The distinction isn't strict—think of workflows as skills optimized for structured, sequential execution.

## Why Workflows Matter

**Focus** — Each step contains only instructions for that phase. The AI sees one step at a time.

**Continuity** — Workflows can track progress across multiple sessions. Stop and return later without losing context.

**Quality** — Sequential enforcement prevents shortcuts. Each step must complete before the next begins.

## How Workflows Work

### Structure

Workflows are markdown files:

```
my-workflow/
├── workflow.md              # Entry point and configuration
├── steps/                   # Step files
│   ├── step-01-init.md
│   ├── step-02-profile.md
│   └── step-N-final.md
├── data/                    # Reference materials, examples
└── templates/               # Output document templates
```

The `workflow.md` file defines the workflow's name, description, goal, and how to start. It doesn't list every step—that's progressive disclosure in action.

### Execution

Steps execute in sequence: `step-01 → step-02 → step-03 → ... → step-N`

The AI must complete each step before loading the next. This ensures thoroughness.

### Continuable Workflows

Some workflows track progress in the output document's frontmatter, so users can stop mid-session and resume later. Use continuable workflows for complex tasks with many steps (8+) or when multiple sessions are likely. Keep it simple for quick, single-session tasks.

### Workflow Chaining

Workflows can be chained—outputs become inputs for the next workflow. This creates powerful pipelines: `brainstorming → research → brief → architecture → implementation`

## Designing Workflows

Before building, decide:

- **Module affiliation**: Standalone, or part of a module with access to module variables and agents?
- **Continuable or single-session**: Will users need multiple sessions?
- **Document output**: Does this produce a file, or perform actions without output?
- **Intent vs prescriptive**: Collaborative facilitation (most workflows) or strict compliance (medical, legal, regulated)?

## When to Use Workflows

Use workflows for multi-step, complex tasks where quality and completeness matter. Don't bother with workflows for simple one-off questions where a single prompt works fine.

For truly simple tasks—something that fits in under ~300 lines—you can skip the step files entirely and use a single `workflow.md` file.
