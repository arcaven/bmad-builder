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
    # Agent personality
  discussion:
    # Conversation settings
  conversational_knowledge:
    # Knowledge files
  menu:
    # Menu commands
  critical_actions:
    # Autonomous behaviors (optional)
```

## Metadata

Required identification information about the agent.

```yaml
metadata:
  id: "_bmad/module/agents/agent-name/agent-name.md"
  name: "Agent Name"
  title: "Agent Title"
  icon: "🤖"
  module: "module-code"
  hasSidecar: false
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ Yes | Unique file path identifier |
| `name` | string | ✅ Yes | Short name for references |
| `title` | string | ✅ Yes | Display name |
| `icon` | string | ⚪ No | Emoji icon |
| `module` | string | ✅ Yes | Module code (core for Core agents) |
| `hasSidecar` | boolean | ⚪ No | Whether agent has memory folder |

## Persona

Defines the agent's personality and behavior.

```yaml
persona:
  role: "What the agent does"
  identity: "Who the agent is"
  communication_style: "How the agent speaks"
  principles: |
    - Principle 1
    - Principle 2
    - Principle 3
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `role` | string | ✅ Yes | Agent's expertise domain |
| `identity` | string | ✅ Yes | Agent's character/personality |
| `communication_style` | string | ✅ Yes | How agent communicates |
| `principles` | string/list | ✅ Yes | Values that guide decisions |

### Writing Good Principles

**Weak Principles:**
- "Be helpful and accurate"
- "Follow instructions carefully"

**Strong Principles:**
- "Channel decades of security expertise: threat modeling begins with trust boundaries"
- "Every design decision serves the user's goal — clarity over cleverness always"

The first principle should **activate** the agent's expertise.

## Discussion

Conversation and collaboration settings.

```yaml
discussion: true
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `discussion` | boolean | ⚪ No | `false` | Whether agent participates in collaborative discussions |

## Conversational Knowledge

Knowledge files for context during conversations.

```yaml
conversational_knowledge:
  - key: "{project-root}/path/to/knowledge.csv"
  - another_key: "{project-root}/path/to/other/file.md"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `*` | string | — | Key-value pairs of knowledge file paths |

## Menu

Interactive commands available for the agent.

```yaml
menu:
  - trigger: "command-name"
    exec: "{project-root}/path/to/workflow.md"
    description: "What this command does"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `trigger` | string | ✅ Yes | Command trigger (kebab-case) |
| `exec` | string | ✅ Yes | Workflow or script path |
| `description` | string | ✅ Yes | Command description |

### Trigger Format Rules

- Use **kebab-case** (lowercase with hyphens)
- No spaces or special characters
- Must be unique within the agent
- Triggers are auto-prefixed with `*` when installed

### Example Menu

```yaml
menu:
  - trigger: "review-code"
    exec: "{project-root}/workflows/code-review.md"
    description: "Review code for bugs and improvements"

  - trigger: "generate-docs"
    exec: "{project-root}/workflows/generate-docs.md"
    description: "Generate documentation from code"
```

## Critical Actions (Optional)

Instructions that execute before the agent starts.

```yaml
critical_actions:
  - "Check git status before making changes"
  - "Verify file exists before editing"
  - "Create backup before modifications"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `critical_actions` | array | ⚪ No | Pre-execution instructions |

Use for:
- Safety checks
- Pre-flight validations
- Required setup steps

## Complete Example

### Simple Agent

```yaml
agent:
  metadata:
    id: "_bmad/my-module/agents/reviewer/reviewer.md"
    name: "Reviewer"
    title: "Code Reviewer"
    icon: "🔍"
    module: "my-module"
    hasSidecar: false

  persona:
    role: "Senior code reviewer who catches bugs and suggests improvements"
    identity: "Friendly but exacting, believes clean code is a craft"
    communication_style: "Direct, constructive, explains the 'why' behind suggestions"
    principles: |
      - Security first — never trust user input
      - Clarity over cleverness — code is read more than written
      - Test what you fix — every bug needs a test case

  discussion: true

  menu:
    - trigger: "review-code"
      exec: "{project-root}/workflows/review.md"
      description: "Review the current code changes"

    - trigger: "suggest-improvements"
      exec: "{project-root}/workflows/suggest.md"
      description: "Suggest code improvements"
```

### Expert Agent (with Sidecar)

```yaml
agent:
  metadata:
    id: "_bmad/my-module/agents/architect/architect.md"
    name: "Architect"
    title: "System Architect"
    icon: "🏗️"
    module: "my-module"
    hasSidecar: true

  persona:
    role: "Software architect specializing in distributed systems"
    identity: "Thoughtful and systematic, believes good architecture is invisible"
    communication_style: "Precise and structured, uses diagrams and examples"
    principles: |
      - Scalability is a requirement, not a feature
      - Failures are inevitable — design for resilience
      - Measure everything — decisions need data

  conversational_knowledge:
    - patterns: "{project-root}/_bmad/my-module/agents/architect/_memory/patterns.md"
    - decisions: "{project-root}/_bmad/my-module/agents/architect/_memory/decisions.md"

  menu:
    - trigger: "design-review"
      exec: "{project-root}/workflows/design-review.md"
      description: "Review system design"

    - trigger: "analyze-scalability"
      exec: "{project-root}/workflows/scalability.md"
      description: "Analyze scalability concerns"

  critical_actions:
    - "Review existing architecture documentation before suggesting changes"
    - "Consider team size and skill level in recommendations"
```

## Validation Rules

When validating agents, Bond checks:

- ✅ `id` path matches actual file location
- ✅ `name` is alphanumeric with hyphens
- ✅ All required persona fields present
- ✅ `principles` has at least 2-3 entries
- ✅ Menu triggers are valid kebab-case
- ✅ `exec` paths are valid
- ✅ `critical_actions` (if present) is an array

## See Also

- **[Builder Commands](builder-commands.md)** — Agent creation commands
- **[Create a Custom Agent](../tutorials/create-custom-agent.md)** — Agent creation tutorial
