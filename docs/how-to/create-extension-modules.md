---
title: "Create Extension Modules"
description: Add custom agents and workflows to existing BMad modules
---

Extension modules add custom agents and workflows to existing modules. Your extensions integrate into the target module's phase sequence and survive updates.

:::tip[Quick Path]
1. Create agents/workflows
2. Create folder with agents/ and workflows/ folders
3. Add `module.yaml` with `extends-module: {CODE}`
4. Add `module-help.csv` targeting existing module's phases
5. Install
:::

## When to Use

**Create extension modules when:**
- You want to add functionality to another module
- You need customizations to survive updates

**Skip this when:**
- Creating a standalone module
- Changes should contribute back to core module

## Extension Structure

```
your-extension/
├── module.yaml          # Your extension's identity + extends-module property
├── module-help.csv      # Targets existing module's phases
├── agents/              # Optional
└── workflows/           # Optional
```

## Step 1: Create Your Content

```
bmad-bmb-create-agent     # for agents
bmad-bmb-create-workflow  # for workflows
```

## Step 2: Create module.yaml

```yaml
code: your-extension-code
name: "Your Extension Name"
version: "1.0.0"
description: "What this extension adds"
extends-module: bmm        # Target module code

config:
  your_config: "{output_folder}/your-output"
```

## Step 3: Create module-help.csv

Target the existing module's phases:

```csv
module,phase,name,code,sequence,workflow-file,command,required,agent,options,description,output-location,outputs,
bmm,4-implementation,Your Workflow,YW,55,_bmad/your-extension/workflows/your-workflow/workflow.md,your-workflow,false,your-agent,,"Your workflow description",your_config,"output",
```

Use `extends-module` value in the `module` column to integrate into the target module's phase sequence.

For complete details on this file's structure and options, see [Module Help CSV Reference](/reference/module-help-csv.md).

## Step 4: Install

```bash
npx bmad-method install
```

Select "Modify BMad Installation" and provide your extension path.

## What You Get

- Your workflow appears in the target module's phase sequence
- Commands are available at configured sequence points
- Extensions survive module updates
