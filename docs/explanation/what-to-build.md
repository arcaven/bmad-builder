---
title: "What to Build: Agents, Workflows, and Modules"
description: Understanding what to create for your needs
---

Decide what to build based on your needs.

## Quick Decision Guide

| Goal | Build |
|------|-------|
| An AI assistant with a personality | **Agent** |
| A step-by-step guided process | **Workflow** |
| A package of agents and workflows | **Module** |

## Agents

Create an agent when you want:
- A domain expert (security architect, documentation lead)
- A focused assistant (commit generator, code reviewer)
- An AI with persistent memory (expert agents)
- Custom menu commands for specific tasks

**Skill:** `bmad-bmb-create-agent`

## Workflows

Create a workflow when you want:
- A multi-step automated process
- A guided decision flow
- A repeatable structured process
- To convert existing processes to BMad format

**Skill:** `bmad-bmb-create-workflow`

## Modules

Create a module when you want:
- Multiple related agents and workflows
- A cohesive domain solution
- Something shareable and installable

**Skills:** `bmad-bmb-product-brief` → `bmad-bmb-create-module`

## Combined Projects

Many projects use all three:

1. Create the agents
2. Create the workflows
3. Package into a module

```
Your Project/
├── agents/              ← AI personalities
├── workflows/           ← Step-by-step processes
└── module.yaml          ← Package configuration
```

## Getting Started

| Build | Tutorial |
|-------|----------|
| Agent | [Create a Custom Agent](/tutorials/create-custom-agent.md) |
| Workflow | [Create Your First Workflow](/tutorials/create-your-first-workflow.md) |
| Module | [Create Your First Module](/tutorials/create-your-first-module.md) |
