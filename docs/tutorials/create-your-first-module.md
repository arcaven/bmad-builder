---
title: "Create Your First Module"
---

Package agents and workflows into a complete, shareable module.

:::note[BMB Module]
This tutorial uses the **BMad Builder (BMB)** module. Make sure you have BMad installed with the BMB module enabled.
:::

## What You'll Learn

- What a BMad module is and what it contains
- How to create a module brief with Morgan (module-builder)
- How to build a complete module from your brief
- How to configure module.yaml and module-help.csv

:::note[Prerequisites]
- BMad installed with the BMB module
- Completed the "Create a Custom Agent" and "Create Your First Workflow" tutorials (recommended)
- One or more agents/workflows ready to package
- About 45-60 minutes for your first module
:::

:::tip[Quick Path]
`[PB]` create brief → `[CM]` build module → Configure.
:::

## Understanding Modules

A **module** is a bundle of agents, workflows, and configuration that solves specific problems or addresses particular domains. Think of modules as plugins or extensions — packaged capabilities you can install, share, and distribute.

### Module Structure

Every BMad module follows a standard structure:

```
your-module/
├── src/
│   ├── module.yaml          # Module metadata and install config
│   ├── module-help.csv      # Feature registry for BMad help system
│   ├── agents/              # Agent definitions (.agent.yaml)
│   ├── workflows/           # Workflow files
│   └── tools/               # Small reusable tools
└── README.md                # Module documentation
```

### What Makes a Complete Module?

| Component | Purpose | Required |
|-----------|---------|----------|
| **module.yaml** | Metadata, install questions, config | ✅ Yes |
| **module-help.csv** | Feature registry for BMad help system | ⭐ Highly suggested |
| **Agents** | AI assistants with specific roles | ⚪ Optional |
| **Workflows** | Step-by-step processes | ⚪ Optional |
| **Tools** | Reusable prompt files | ⚪ Optional |

## Why Build Modules?

**BMad modules aren't just for software development.** Your imagination is the limit.

BMad enables modules for **ANY domain** — from personal growth to professional practice. With the module marketplace coming, you'll be able to share your creations with the world.

### Inspiring Module Examples

| Domain | Module Concept | What It Does |
|--------|---------------|--------------|
| **Personal Growth** | Therapist Agent | An AI companion that remembers every conversation, tracks emotional patterns, and helps you see growth over time |
| **Legal** | Legal Office Module | Complete legal practice: document drafting, case research, client intake workflows |
| **Creative Writing** | Story Architect Module | Create the next great novel or screenplay — character development, plot outlining, dialogue coaching |
| **Finance** | Tax Workflow Module | Find deductions TurboTax misses and create audit-proof documentation that would cost hundreds from an accountant |
| **Education** | Personal Tutor Module | Adaptive learning that remembers your progress and customizes explanations to your learning style |
| **Health** | Fitness Coach Module | Custom workout and nutrition plans that evolve with your progress and preferences |
| **Business** | Marketing Strategist Module | Campaign planning, content generation, analytics interpretation — your entire marketing department |
| **Relationships** | Communication Coach Module | Navigate difficult conversations, resolve conflicts, strengthen connections |
| **Music** | Songwriter's Assistant | Generate lyrics, suggest chord progressions, arrange songs, and provide creative feedback |
| **Cooking** | Personal Chef Module | Recipe suggestions based on ingredients you have, meal planning, dietary adaptations |
| **Travel** | Trip Planner Module | Custom itineraries, local recommendations, budget optimization, packing lists |
| **Parenting** | Family Coordinator Module | Activity ideas, milestone tracking, scheduling support, educational guidance |
| **Hobbies** | D&D Campaign Module | Character creation, world-building, encounter design, story tracking for tabletop games |
| **Spirituality** | Meditation Guide Module | Personalized meditation sessions, progress tracking, technique recommendations |
| **Sports** | Coach Module | Training plans, strategy development, performance analysis for any sport |
| **Gardening** | Garden Planner Module | Crop selection, planting schedules, pest control, harvest tracking |

:::tip[The Marketplace Is Coming]
Soon, you'll be able to publish your modules to the BMad marketplace — where others can discover, install, and benefit from your creations. Build something that solves a real problem in your life or work — chances are, others need it too.
:::

### What Problem Will You Solve?

Every great module starts with a problem you want to solve:

- **What frustrates you?** (repetitive tasks, complex processes, knowledge gaps)
- **What expertise do you have?** (professional skills, life experiences, specialized knowledge)
- **What could be easier?** (workflows you repeat, decisions you struggle with, goals you're pursuing)

**Morgan (the module-builder) helps you turn that problem into a complete, shareable solution.**

## Step 1: Create a Module Brief

Before building, Morgan helps you create a **module brief** — a vision document that defines your module's purpose, audience, and features.

Invoke Morgan's brief creation:

```
[PB] or "product-brief"
```

Morgan guides you through discovery:

| Step | What You'll Define |
|------|-------------------|
| **Spark** | What problem are you solving? |
| **Type** | What kind of module is this? (domain, tool, creative) |
| **Vision** | What does success look like? |
| **Users** | Who will use this module? |
| **Value** | What makes this module unique? |
| **Agents** | What agents will it include? |
| **Workflows** | What workflows will it include? |
| **Tools** | What tools or templates will it include? |
| **Scenarios** | How will people use this in practice? |
| **Creative** | What's the personality/brand? |

The brief becomes your roadmap: a document called `module-brief-{code}.md` that Morgan uses to build your module.

:::tip[Take Your Time]
The brief is exploratory and creative. Morgan asks questions to help you think deeply about your module. This planning pays off during implementation.
:::

## Step 2: Build Your Module

Once your brief is complete, invoke Morgan's module creation:

```
[CM] or "create-module"
```

Morgan will ask for the path to your module brief file. Provide the full path to `module-brief-{code}.md`.

Morgan then builds your module structure:

| Component | What Morgan Creates |
|-----------|---------------------|
| **module.yaml** | Module metadata, install questions, configuration |
| **Agent specs** | Placeholder/spec files for each agent |
| **Workflow specs** | Placeholder/spec files for each workflow |
| **README.md** | Module documentation template |
| **TODO.md** | Implementation checklist |

## Step 3: Configure Your Module

### module.yaml

The `module.yaml` file defines your module:

```yaml
name: "Your Module Name"
code: "your-module-code"
version: "0.1.0"
description: "What your module does"

# Install questions shown to users
install:
  - question: "What's your experience level?"
    config_key: "experience_level"
    options:
      - "beginner"
      - "intermediate"
      - "advanced"

# Configuration values
config:
  output_folder: "_your-module-output"
  # Add your config keys here
```

### module-help.csv (Optional but Powerful)

The `module-help.csv` file registers your module's agents and workflows with BMad's intelligent help system. This enables contextual recommendations and smart workflow chaining.

:::tip[Why module-help.csv Matters]
The BMad help system uses this file to suggest the right workflows at the right time. Without it, your module's features remain hidden. With it, they become part of the intelligent BMad ecosystem.
:::

```csv
module,phase,name,code,sequence,workflow-file,command,required,agent,options,description,output-location,outputs
your-module,discovery,"Your Workflow Name",your-workflow,10,workflows/your-workflow/workflow.md,your-workflow,false,workflow-builder,,"Brief description of what this workflow does",_your-module-output/,
```

:::note[Future Changes]
In a future release, `module-help.csv` will be auto-generated from workflow and agent metadata. For now, it's the manual way to tap into the power of the BMad help system.
:::

## Step 4: Implement Your Agents and Workflows

Morgan created spec files during the build step. Now implement your agents and workflows:

1. **Create agent `.agent.yaml` files** based on the specs
2. **Create workflow `.md` files** with step files
3. **Add tools** or templates as needed

For details on creating agents and workflows, see:
- **[Create a Custom Agent](/tutorials/create-custom-agent.md)**
- **[Create Your First Workflow](/tutorials/create-your-first-workflow.md)**

## Step 5: Validate Your Module

Before sharing, validate your module:

```
[VM] or "validate-module"
```

Morgan checks:
- `module.yaml` is complete and valid
- `module-help.csv` is properly formatted (if present)
- Agent files follow BMad standards
- Workflows have proper structure
- Folder structure is correct

Fix any issues Morgan identifies, then re-validate.

## What You've Accomplished

You've created a complete BMad module with:

- A documented vision (module brief)
- Proper module structure and configuration
- module-help.csv for BMad help system integration
- Agents, workflows, and tools
- Install experience for users

Your module is now ready to:
- Install locally for testing
- Share with your team
- Share with the community

## Quick Reference

| Action | How |
|--------|-----|
| Create brief | `[PB]` or `product-brief` |
| Build module | `[CM]` or `create-module` |
| Validate | `[VM]` or `validate-module` |
| Edit module | `[EM]` or `edit-module` |

## Common Questions

**Should I use bmad-module-template?**

Yes! The [bmad-module-template](https://github.com/bmad-code-org/bmad-module-template) provides a starting point with proper structure. You can also use Morgan to generate a module from scratch.

**What's the difference between the brief and the module?**

The brief is a **vision document** created through creative discovery. The module is the **implementation** built from that brief. Think of it as: brief = blueprint, module = building.

**Can I update my module after sharing it?**

Yes! Share the updated module folder or repository. Users can reinstall to get the latest version.

**How do I share my module privately?**

Share the module folder directly, or host it in a private Git repository. Users can install from a local path.

## Getting Help

- **[Discord Community](https://discord.gg/gk8jAdXWmj)** — Ask in #bmad-method-help or #report-bugs-and-issues
- **[GitHub Issues](https://github.com/bmad-code-org/bmad-builder/issues)** — Report bugs or request features

## Further Reading

| Resource | Description |
|----------|-------------|
| [What Are Modules](/explanation/what-are-modules.md) | Deep technical details on module architecture |
| [bmad-module-template](https://github.com/bmad-code-org/bmad-module-template) | Starting point for new modules |
| [Install Custom Modules](/how-to/install-custom-modules.md) | Installing and using modules |

:::tip[Key Takeaways]
- **Plan first** — The brief ensures your module has a clear vision
- **Structure matters** — Follow the standard module structure for compatibility
- **Validate before sharing** — Use `[VM]` to check your work
- **Share your work** — Modules can be shared via folders, git repos, or the community
:::
