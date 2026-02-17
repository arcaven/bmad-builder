---
title: "Agent, Workflow, or Module? What Should I Build?"
description: Decide what type of BMad component to build
---

Decide what to build based on your needs.

## Quick Decision Guide

| Goal | Build |
|------|-------|
| Utility without personality | **Agent** (hasSidecar: false) |
| AI assistant with memory | **Agent** (hasSidecar: true) |
| Guided multi-step process | **Workflow** |
| Multiple agents + workflows | **Module** |

## Type Comparison

### Agent (hasSidecar: false)

**Best for:** Single-purpose utilities with personality.

| Characteristic | |
|-----------------|-|
| **Persona** | Yes — has a name, voice |
| **Memory** | None — each use is independent |
| **Building time** | 15-30 minutes |

**Examples:** Commit Poet, Snarky Weather Bot, Pun Barista

**Build with:** `bmad-bmb-create-agent`

### Agent (hasSidecar: true)

**Best for:** AI assistants that need to remember things.

| Characteristic | |
|-----------------|-|
| **Persona** | Yes |
| **Memory** | Yes — persistent sidecar |
| **Building time** | 30-60 minutes |

**Examples:** Journal companion, Fitness coach, Language tutor

**Build with:** `bmad-bmb-create-agent` (enable sidecar)

### Workflow

**Best for:** Guided multi-step processes.

| Characteristic | |
|-----------------|-|
| **Structure** | Steps with progressive disclosure |
| **Memory** | Optional — can track progress |
| **Building time** | 30-45 minutes |

**Examples:** Brainstorming, Trip planning, Tax preparation

**Build with:** `bmad-bmb-create-workflow`

### Module

**Best for:** Complete solutions with multiple agents and workflows.

| Characteristic | |
|-----------------|-|
| **Components** | Multiple agents + workflows |
| **Complexity** | High — coordinated system |
| **Building time** | 2-4 hours |

**Examples:** Wedding planner, Legal office suite, Fitness system

**Build with:** `bmad-bmb-product-brief` → `bmad-bmb-create-module`

## Decision Questions

**Question 1: Does it need a persona?**

- Yes → Agent
- No → Workflow (if multi-step) or consider if you really need it

**Question 2: Does it need memory?**

- Yes → Agent with sidecar
- No → Agent without sidecar

**Question 3: Single or multi-component?**

- Single focused thing → Agent or Workflow
- Multiple related capabilities → Module

## Next Steps

| If You Chose... | Next Step |
|-----------------|-----------|
| **Agent** | [Create a Custom Agent](/how-to/create-custom-agent.md) |
| **Workflow** | [Create Your First Workflow](/how-to/create-your-first-workflow.md) |
| **Module** | [Create Your First Module](/how-to/create-your-first-module.md) |
