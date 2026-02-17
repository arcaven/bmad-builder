---
title: "Agent Schema Reference"
description: Structure and fields for BMad agent YAML files
---

Complete reference for agent `.agent.yaml` file structure.

## Agent File Structure

```yaml
agent:
  metadata:
    # Agent identification
  persona:
    # Agent personality (four-field system)
  critical_actions:
    # Activation behavior
  prompts:
    # Reusable prompt templates (optional)
  menu:
    # Menu commands
```

## Metadata

```yaml
metadata:
  id: "_bmad/agents/agent-name/agent-name.md"
  name: "Persona Name"
  title: "Agent Title"
  icon: "🔧"
  module: "stand-alone"
  hasSidecar: false
  sidecar-folder: "agent-name-sidecar"  # Required if hasSidecar: true
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ Yes | Compiled output path |
| `name` | string | ✅ Yes | Persona's identity |
| `title` | string | ✅ Yes | Functional title (kebab-cased for filename) |
| `icon` | string | ✅ Yes | Single emoji only |
| `module` | string | ✅ Yes | `stand-alone` or module code |
| `hasSidecar` | boolean | ✅ Yes | `true` or `false` |
| `sidecar-folder` | string | ⚪ Conditional | Required if `hasSidecar: true` |

## Persona

Defines the agent's personality using a four-field system.

```yaml
persona:
  role: |
    I am a Commit Message Artisan who crafts git commits.

  identity: |
    Poetic soul who believes every commit tells a story.

  communication_style: |
    Speaks with poetic dramatic flair and artistry.

  principles:
    - Every commit tells a story - capture the why
    - Conventional commits enable automation
```

| Field | Purpose | Format |
|-------|---------|--------|
| `role` | WHAT agent does | 1-2 lines, first-person |
| `identity` | WHO agent is | 2-5 lines establishing credibility |
| `communication_style` | HOW agent talks | 1-2 sentences MAX |
| `principles` | GUIDES decisions | 3-8 bullet points |

## Critical Actions

Numbered steps executing FIRST on agent activation.

| hasSidecar | critical_actions |
|------------|------------------|
| `true` | **MANDATORY** |
| `false` | **OPTIONAL** |

```yaml
critical_actions:
  - "Load COMPLETE file {project-root}/_bmad/_memory/{sidecar-folder}/memories.md"
  - "ONLY read/write files in {project-root}/_bmad/_memory/{sidecar-folder}/"
```

## Menu

```yaml
menu:
  - trigger: WC or fuzzy match on write
    action: "#write-commit"
    description: "[WC] Write commit message"

  - trigger: CP or fuzzy match on create-prd
    exec: "{project-root}/_bmad/bmm/workflows/create-prd/workflow.md"
    description: "[CP] Create PRD"
```

| Field | Type | Required |
|-------|------|----------|
| `trigger` | string | ✅ Yes |
| `handler` | string | ✅ Yes (`action` or `exec`) |
| `description` | string | ✅ Yes |

### Reserved Codes (DO NOT USE)

| Code | Trigger |
|------|---------|
| MH | menu or help |
| CH | chat |
| PM | party-mode |
| DA | exit, leave, goodbye, dismiss agent |

## Complete Example

```yaml
agent:
  metadata:
    id: _bmad/agents/commit-poet/commit-poet.md
    name: "Inkwell Von Comitizen"
    title: "Commit Message Artisan"
    icon: "📜"
    module: stand-alone
    hasSidecar: false

  persona:
    role: |
      I craft git commit messages following conventional commit format.

    identity: |
      Poetic soul who believes every commit tells a story worth remembering.

    communication_style: |
      Speaks with poetic dramatic flair, using metaphors of craftsmanship.

    principles:
      - Every commit tells a story - capture the why
      - Conventional commits enable automation and clarity

  menu:
    - trigger: WC or fuzzy match on write
      action: "#write-commit"
      description: "[WC] Craft a commit message"
```

## Resources

| Resource | Description |
|----------|-------------|
| [Develop Agent Persona](/how-to/develop-agent-persona.md) | Persona crafting guide |
| [Design Agent Menus](/how-to/design-agent-menus.md) | Menu design guide |
| [What Are Agents](/explanation/what-are-bmad-agents.md) | Agent architecture |
