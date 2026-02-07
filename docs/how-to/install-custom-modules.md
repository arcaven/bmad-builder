---
title: "How to Install Custom Modules"
description: Add custom agents, workflows, and modules to BMad
---

Use the BMad installer to add custom agents, workflows, and modules that extend BMad's functionality.

## Steps

### 1. Prepare Your Custom Content

Your custom content needs a `module.yaml` file at its root.

```
module-code/
  module.yaml
  agents/
  workflows/
  tools/
  templates/
```

**For standalone items** (unrelated agents/workflows):

```
module-name/
  module.yaml        # Contains unitary: true
  agents/
    larry/larry.agent.md
    curly/curly.agent.md
  workflows/
```

These are not necessarily logically part of a group but this is just a loose collection of different things.

### 2. Run the Installer

```bash
npx bmad-method install
```

If a project in the destination you select already exists, then select `Modify BMad Installation`.

When prompted to install any custom content, select 'y' and provide the path to your module folder.

### 3. Verify Installation

Check that your custom content appears in the `_bmad/` directory and is accessible from your AI tool.

## Updating Custom Content

When BMad Core or module updates are available, the quick update process:

1. Applies updates to core modules
2. Recompiles all agents with your customizations
3. Retains your custom content from cache
4. Preserves your configurations

You don't need to keep source module files locally, just point to the updated location during updates.

## Tips

- **Use unique module codes** — Don't use `bmm` or other existing module codes unless you are extending the existing module
- **Avoid naming conflicts** — Each module needs a distinct code
- **Document dependencies** — Note any modules your custom content requires
- **Test in isolation** — Verify custom modules work before sharing
- **Version your content** — Track updates with version numbers

## Example Modules

Find example custom modules in the `samples/sample-custom-modules/` folder of the [BMad repository](https://github.com/bmad-code-org/BMAD-METHOD). Download either sample folder to try them out.
