---
title: "Understanding Module Building"
description: How module creation works from planning to implementation
---

Building a BMad module happens in three phases.

## The Three Phases

```
Planning → Scaffolding → Implementation
  (Brief)    (Structure)    (Building)
```

### Phase 1: Planning (The Brief)

**What happens:** Create a **module brief** — a vision document defining purpose, agents, and workflows.

**What gets created:**
- `module-brief-{code}.md` — Vision document
- Agent and workflow definitions
- User scenarios

**What does NOT get created:** No actual agent or workflow files yet

### Phase 2: Scaffolding (The Structure)

**What happens:** Create the **module structure** — files, folders, and configuration.

**What gets created:**
```
your-module/
├── src/
│   ├── module.yaml
│   ├── module-help.csv
│   ├── agents/          # Agent SPEC files (stubs)
│   └── workflows/       # Workflow SPEC files (stubs)
```

**What does NOT get created:** No fully implemented prompts or step files

### Phase 3: Implementation (The Building)

**What happens:** Build each component using specialized workflows.

| Component | Workflow |
|-----------|----------|
| Agents | `bmad-bmb-create-agent` |
| Workflows | `bmad-bmb-create-workflow` |

**What gets created:** Full agent files, detailed workflow steps, actual functionality

## Common Confusions

| Confusion | Reality |
|-----------|----------|
| Module builder creates agents | Creates agent specs — you build actual agents |
| Write prompts in the brief | Brief defines WHAT, prompts come later |
| Module is done after scaffolding | Scaffolding creates structure, not content |
