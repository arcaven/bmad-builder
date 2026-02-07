---
title: "Agents"
---

BMad Agents are AI Persona files that your agent can adopt to better help you accomplish tasks, communicate with or enjoy. Each agent has a unique personality, specialized capabilities, and an interactive help menu.

Additionally some agents can optionally have their own file system based memory, making them capable of remembering vast amounts of information that is relevant. This can open up many interesting use cases for you to explore.

## Agent Types

BMad has two primary agent types, designed for different use cases:

### Simple Agents

**Self-contained, focused, ready to use.**

Simple agents are complete in a single file. They excel at well-defined tasks and require minimal setup.

**Best for:**
- Single-purpose assistants (code review, documentation, commit messages)
- Quick deployment
- Projects that don't require persistent memory
- Getting started fast

**Example:** A commit message agent that reads your git diff and generates conventional commits.

### Expert Agents

**Powerful, memory-equipped, domain specialists.**

Expert agents have a **sidecar** - a companion folder containing additional instructions, workflows, and memory files. They remember context across sessions and handle complex, multi-step tasks.

**Best for:**
- Domain specialists (design, legal, therapy, companion)
- Agents with built in commands defined in separate files that only they will utilize - these are gemerally more complex than the simple one or two line prompts for simple agent custom menu items
  - Note: These commands will be launched by loading the agent - another option is to create a simple agent and skills separately.

**Example:** An accounting expert that has specialized workflows to guide you through tax preparation, but also remembers work you have done together before, and remembers details about you.

## Key Differences

| Feature          | Simple         | Expert                     |
| ---------------- | -------------- | -------------------------- |
| **Files**        | Single file    | Agent + sidecar folder     |
| **Memory**       | Usually no     | Persistent across sessions |
| **Capabilities** | Focused scope  | Multi-domain, extensible   |
| **Setup**        | Zero config    | Sidecar initialization     |
| **Best Use**     | Specific tasks | Ongoing projects           |

## Agent Components

All agents share these building blocks:

### Persona
- **Role** - What the agent does (expertise domain)
- **Identity** - Who the agent is (personality, character)
- **Communication Style** - How the agent speaks (tone, voice)
- **Principles** - Why the agent acts (values, decision framework)

### Capabilities
- Skills, tools, and knowledge the agent can apply
- Mapped to specific menu commands

### Menu Items
- Interactive command list
- Triggers, descriptions, and handlers
- Auto-includes help, chat, bmad-help and exit options

### Critical Actions (optional)
- Instructions that execute before the agent starts
- Enable autonomous behaviors (e.g., "check git status before changes")

## Which Should You Use?

:::tip[Quick Decision]
Choose **Simple** for focused, one-off tasks with no memory needs. Choose **Expert** when you need persistent context and complex workflows.
:::

## Creating Custom Agents

See the [Agent Creation Guide](https://github.com/bmad-code-org/bmad-builder/blob/main/docs/tutorials/create-custom-agent.md) for step-by-step instructions on how to create your own agents and use them in the BMad Ecosystem.
