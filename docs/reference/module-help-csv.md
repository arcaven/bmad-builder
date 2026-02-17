---
title: "Module Help CSV Reference"
description: Complete reference for module-help.csv structure
---

Reference for `module-help.csv` — your module's feature registry.

## Location

```
your-module/src/module-help.csv
```

## CSV Structure

```csv
module,phase,name,code,sequence,workflow-file,command,required,agent,options,description,output-location,outputs,
```

| Column | Description | Example |
|--------|-------------|---------|
| `module` | Module code from module.yaml | `my-module` |
| `phase` | `anytime` or `phase-1`, `phase-2`, etc. | `anytime`, `phase-1` |
| `name` | Display name | `Daily Check In` |
| `code` | Short code (2-3 chars) | `DCI` |
| `sequence` | Order within phase — **empty for anytime** | `10`, `20`, or empty |
| `workflow-file` | Path to workflow.md — **empty for agent-only** | `_bmad/my-module/workflows/...` |
| `command` | Internal command name | `my_module_daily_checkin` |
| `required` | Boolean — required or optional | `false` |
| `agent` | Associated agent name | `my-agent` |
| `options` | Mode type | `Create Mode`, `Chat Mode` |
| `description` | User-facing description | Explain what and when to use |
| `output-location` | Output folder name | `my_output_folder` |
| `outputs` | What is produced | `journal entry` |

## Phase Rules

| Type | When to Use | Sequence |
|------|-------------|----------|
| `anytime` | Standalone features | **EMPTY** |
| `phase-N` | Sequential journeys | Required (10, 20, 30...) |

**Phases start at -1**: `phase-1`, not `phase-0`

## anytime Entries

- Go at TOP of file
- Have EMPTY `sequence` column
- User can run anytime, in any order

## Phased Entries

- Go BELOW anytime entries
- Have `sequence` numbers defining order
- Use gaps (10, 20, 30) for insertions

## Example

```csv
module,phase,name,code,sequence,workflow-file,command,required,agent,options,description,output-location,outputs,
my-module,anytime,Quick Action,QA,,"my_module_quick",false,my-agent,Quick Mode,"A quick action users can run anytime",,,
my-module,phase-1,Step One,SO,10,_bmad/my-module/workflows/step-one/workflow.md,my_module_step_one,false,my-agent,Create Mode,"First step in the journey",my_output,"output document",
```

## Validation Rules

| Check | Rule |
|-------|------|
| File exists | Must be at module root |
| Valid header | 13 columns in correct order |
| anytime placement | All `anytime` entries at top |
| Sequence for anytime | Must be EMPTY |
| Sequence for phases | Required |
