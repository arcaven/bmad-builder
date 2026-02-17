---
title: "Create a Custom Agent"
---

Build your own AI agent with a unique personality and specialized commands.

:::note[BMB Module]
This tutorial uses the **BMad Builder (BMB)** module. Make sure you have BMad installed with the BMB module enabled.
:::

## What You'll Build

An agent is like having a specialized AI assistant that:
- Speaks in a specific voice or personality
- Has its own menu of commands you design
- Optionally remembers things across sessions

## Quick Start

Run this command and follow the guided conversation:

```
bmad-bmb-create-agent
```

The workflow will ask you questions and build your agent step by step. No manual file editing required.

## What the Workflow Asks You

| Step | What You'll Decide |
|------|-------------------|
| **Brainstorm** *(optional)* | Explore ideas if you're not sure yet |
| **Discovery** | What problem should your agent solve? What should it be good at? |
| **Memory** | Does it need to remember things between sessions? |
| **Persona** | How should it think, speak, and behave? |
| **Commands** | What specific things can it do for you? |
| **Activation** | Should it do anything automatically when it starts? |

## The Big Decision: Memory or No Memory?

You'll be asked: **"Should your agent remember things across sessions?"**

**Choose "No"** if each conversation is independent:
- A code reviewer that looks at fresh code each time
- A joke generator that doesn't need context
- A weather bot that just gives current conditions

**Choose "Yes"** if it should track progress over time:
- A journal companion that remembers your moods and patterns
- A fitness coach that tracks your PRs and progress
- A novel writing buddy that knows your characters and plot

## Designing the Personality

You'll craft four simple pieces:

| Piece | What It Is | Example |
|-------|-----------|---------|
| **Role** | What they do | "Security expert who finds vulnerabilities" |
| **Identity** | Who they are | "Skeptical but constructive, believes security is everyone's job" |
| **Communication Style** | How they speak | "Direct, with examples, explains the 'why'" |
| **Principles** | What guides their decisions | "Security first, never assume input is safe" |

## After the Workflow Finishes

Your agent file is created automatically. To use it:

1. **Package it** as a module (folder structure with `module.yaml`)
2. **Install it** via the BMAD installer
3. **Run it** and start using your custom agent

See [Installation Guide](/how-to/install-custom-modules.md) for details.

## Further Reading

| Resource | Why Read It |
|----------|-------------|
| [What Are Agents](/explanation/what-are-bmad-agents.md) | Deep technical details |
| [Agent Schema](/reference/agent-schema.md) | Complete field reference |
| [Persona Development](/how-to/develop-agent-persona.md) | Advanced persona crafting |
| [Bundle Your Creations](/how-to/bundle-your-creations.md) | Package agents for installation |
