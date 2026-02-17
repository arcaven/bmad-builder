---
title: "Agents"
---

BMad Agents are AI personas that your LLM adopts to help you accomplish tasks. Each agent has a unique personality and an interactive menu.

## Single Agent Architecture

BMad uses **one agent type** with a `hasSidecar` boolean:

```yaml
hasSidecar: false  # or true
```

The difference is in **memory and state management**, not capability.

## Decision Guide

```
Need memory across sessions OR need to restrict file access?
├── YES → hasSidecar: true
└── NO  → hasSidecar: false
```

| hasSidecar | Structure | Best For |
|------------|-----------|----------|
| `false` | Single YAML (~250 lines) | Stateless utilities |
| `true` | YAML + sidecar folder | Persistent memory, long-term tracking |

### Without Sidecar (`hasSidecar: false`)

```
agent-name.agent.yaml
├── metadata.hasSidecar: false
├── persona (role, identity, communication_style, principles)
├── prompts (optional)
└── menu (triggers → #prompt-id or inline)
```

**Best for:** Single-purpose utilities where each session is independent.

**Examples:** Commit Poet, Snarky Weather Bot, Pun Barista

### With Sidecar (`hasSidecar: true`)

```
agent-name.agent.yaml
└── agent-name-sidecar/
    ├── memories.md           # Session history
    ├── instructions.md       # Protocols
    └── [custom-files].md     # Tracking, goals
```

**Best for:** Agents that must remember things across sessions.

**Examples:** Journal companion, Fitness coach, Language tutor

## Agent Components

| Component | Purpose |
|-----------|---------|
| **Persona** | Four-field system: role, identity, communication_style, principles |
| **Prompts** | Reusable templates referenced via `#id` |
| **Menu** | Interactive commands with triggers |
| **Critical Actions** | Steps executing on activation (mandatory for sidecar) |

## Creating Agents

See [Create a Custom Agent](/tutorials/create-custom-agent.md) for step-by-step instructions.
