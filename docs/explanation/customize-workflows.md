---
title: "Workflow Customization"
description: Tri-modal architecture and workflow patterns
---

Workflows support tri-modal architecture and customization patterns.

## Tri-Modal Architecture

Complex workflows use separate flows for create, edit, and validate:

```
workflow-name/
├── steps-c/    # Create (build new)
├── steps-e/    # Edit (modify existing)
└── steps-v/    # Validate (standalone checks)
```

| Mode | Purpose |
|------|---------|
| **Create** | Build new entities from scratch |
| **Edit** | Modify existing compliant entities |
| **Validate** | Standalone validation against standards |

Each mode is self-contained. The `data/` folder is shared to prevent drift.

## Cross-Mode Integration

### Edit to Create
When editing detects non-compliant workflow → Offer conversion → Load `steps-c/step-00-conversion.md`

### Create/Edit to Validation
After creation or editing → Offer validation → Load `steps-v/step-01-validate.md`

## Step Replacement

| Action | How |
|--------|-----|
| Add step | Create new file, update previous step's `nextStepFile` |
| Replace step | Create replacement, update references |
| Extract to data | When step exceeds 200-250 lines |

## Template Types

| Type | Use Case |
|------|----------|
| **Free-form** | Most workflows |
| **Structured** | Consistent formatting needed |
| **Semi-structured** | Flexible but organized |

Template syntax: `{{variable}}` (preferred) or `[variable]` (also supported)
