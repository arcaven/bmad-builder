---
title: "Bundle Your Creations"
---

You've created custom agents and workflows. Now make them installable.

## Starting Point

You ran `bmad-bmb-create-agent` or `bmad-bmb-create-workflow` and your creations are sitting in:

```
_bmad-creations/
├── my-agent/
│   └── my-agent.agent.yaml
└── my-workflow/
    └── workflow.md
```

Now what? **Bundle them into a module** so they can be installed, and used - and maybe shared with others for installation.

## What You're Creating

A **module** is just a folder with:

```
my-custom-stuff/
├── module.yaml          # Required: tells BMad what this is
├── module-help.csv      # Optional: registers commands with BMad
├── agents/              # Your agent files go here
└── workflows/           # Your workflow files go here
```

That's it. Three things to do:

| Step | What You Do |
|------|-------------|
| **1. Create folder structure** | Make `agents/` and `workflows/` folders |
| **2. Add module.yaml** | One file that identifies your module |
| **3. Copy your creations** | Move files from `_bmad-creations/` |

## Step 1: Create the Folder Structure

```bash
mkdir -p my-custom-stuff/agents
mkdir -p my-custom-stuff/workflows
```

## Step 2: Create module.yaml

Create `my-custom-stuff/module.yaml`:

```yaml
code: my-custom-stuff
name: "My Custom Stuff"
version: "1.0.0"
description: "Personal agents and workflows"
```

**What each field means:**

| Field | Purpose |
|-------|---------|
| `code` | Unique identifier — use lowercase, hyphens |
| `name` | Display name — can have spaces |
| `version` | Track your updates |

## Step 3: Copy Your Creations

Copy **everything** from `_bmad-creations/` to your module:

```bash
# Copy agents (the entire folder)
cp -r _bmad-creations/my-agent my-custom-stuff/agents/

# Copy workflows (the entire folder)
cp -r _bmad-creations/my-workflow my-custom-stuff/workflows/
```

**Copy the folder as-is** — the workflow already created the correct structure.

Example with a simple agent (no memory):
```
my-custom-stuff/
├── module.yaml
├── agents/
│   └── code-reviewer/
│       └── code-reviewer.agent.yaml
└── workflows/
    └── daily-standup/
        └── workflow.md
```

Example with an agent that has memory (`hasSidecar: true`):
```
my-custom-stuff/
├── module.yaml
├── agents/
│   └── journal-keeper/
│       ├── journal-keeper.agent.yaml
│       └── journal-keeper-sidecar/     # Sidecar folder is sibling to .agent.yaml
│           ├── memories.md
│           └── instructions.md
```

The sidecar folder (`journal-keeper-sidecar/`) is created **next to** the `.agent.yaml` file, not nested inside it. During installation, BMad knows to link this to `_bmad/_memory/{sidecar-folder}/`.

## Step 4: Install Your Module

```bash
npx bmad-method install
```

Follow the prompts:
1. Select your project (or "Modify BMad Installation" if already installed)
2. When asked about custom content, select `y`
3. Provide path to `my-custom-stuff/`

## What Happens During Installation

BMad copies your module into `_bmad/modules/`:

| Your Files | Become Accessible At |
|------------|---------------------|
| `agents/{name}/{name}.agent.yaml` | `_bmad/modules/my-custom-stuff/agents/{name}/{name}.agent.yaml` |
| `agents/{name}/{name}-sidecar/` | `_bmad/_memory/{name}-sidecar/` |
| `workflows/{name}/workflow.md` | `_bmad/modules/my-custom-stuff/workflows/{name}/workflow.md` |

If your agent has a sidecar folder, BMad creates the memory link automatically.

## Quick Checklist

Before installing, verify:

- [ ] `module.yaml` exists with `code`, `name`, `version`
- [ ] Agents folder (if you have agents): contents copied from `_bmad-creations/` as-is
- [ ] Workflows folder (if you have workflows): contents copied from `_bmad-creations/` as-is

## Common Questions

**Do I need module-help.csv?**

Only if you want your workflows to appear in BMad's help menus. For personal use, skip it.

To learn what this file can do, see [Module Help CSV Reference](/reference/module-help-csv.md).

**Can I add more agents later?**

Yes — just add to the folder and reinstall. Or edit files directly after installation.

**Where do my installed files live?**

In `_bmad/modules/{your-code}/`. Edit them there, or keep a source copy and reinstall.

**What if I change my module?**

Reinstall with `npx bmad-method install` and select "Modify BMad Installation."

## Further Reading

| Resource | Why Read It |
|----------|-------------|
| [Install Custom Modules](/how-to/install-custom-modules.md) | Full installation details |
| [Create Extension Modules](/how-to/create-extension-modules.md) | Extending existing modules |
| [Module Schema](/reference/module-yaml.md) | All module.yaml options |
