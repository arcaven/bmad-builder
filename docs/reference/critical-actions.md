---
title: "Critical Actions Reference"
description: Agent activation behavior and sidecar configuration
---

Critical actions execute FIRST on agent activation.

## hasSidecar: true (MANDATORY critical actions)

Agents with sidecars SHOULD include something like the following:

```yaml
critical_actions:
  - 'Load COMPLETE file {project-root}/_bmad/_memory/{sidecar-folder}/memories.md'
  - 'Load COMPLETE file {project-root}/_bmad/_memory/{sidecar-folder}/instructions.md'
  - 'ONLY read/write files in {project-root}/_bmad/_memory/{sidecar-folder}/'
```

**Why mandatory:**
1. Load memories — remember past sessions
2. Load instructions — additional protocols
3. Restrict file access — security boundary

## Additional uses and examples

You can also add anything unique to your agent it needs to do on first init.

```yaml
critical_actions:
  - 'Show inspirational quote before menu'
  - 'Fetch latest stock prices before displaying menu'
```

## Complete Example

```yaml
agent:
  metadata:
    hasSidecar: true
    sidecar-folder: journal-keeper-sidecar

  critical_actions:
    - "Load COMPLETE file {project-root}/_bmad/_memory/journal-keeper-sidecar/memories.md"
    - "Load COMPLETE file {project-root}/_bmad/_memory/journal-keeper-sidecar/instructions.md"
    - "ONLY read/write files in {project-root}/_bmad/_memory/journal-keeper-sidecar/"
    - 'Show inspirational quote before menu'
```
