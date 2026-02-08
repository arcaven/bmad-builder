---
title: "Add Workflows to Existing Modules"
description: Extend existing BMad modules with new workflows using workflow builder
---

Use the `create-workflow` command to add new workflows to existing modules. This guide shows you how to create an epic-level looping workflow that builds complete epics at once, then properly integrate it into your module's registry.

:::tip[Quick Path]
1. Run `bmad_bmb_create_workflow` to build your workflow
2. Create workflow folder in your module: `workflows/<workflow-name>/`
3. Add a single line to `module.yaml` with any new variables
4. Append one row to `module-help.csv` with proper phase and sequence
5. Reinstall module to register new workflow
:::

:::note[Prerequisites]
- BMad Builder installed
- Existing module to extend
- Workflow builder available (`bmad_bmb_create_workflow` command)
:::

## When to Add Workflows to Modules

**Add workflows when:**
- Your module needs new capabilities not in the original design
- You've discovered a better way to accomplish existing tasks
- Users request features that fit your module's purpose
- You want to create an epic-level workflow that orchestrates multiple story-level workflows

**Skip this when:**
- The feature belongs in a different module
- A simple agent command would suffice (no multi-step process needed)
- You're building a completely new module (use the module workflow instead)

## Understanding Epic-Level Looping Workflows

An epic-level looping workflow builds out entire epics at once instead of story-by-story. This pattern is powerful when you need to generate multiple related artifacts in a coordinated batch.

**How epic-level workflows differ:**

| Aspect | Story-Level | Epic-Level |
|--------|-------------|------------|
| **Scope** | Single artifact or feature | Multiple related artifacts |
| **Pattern** | Linear execution | Repeating loop with iteration |
| **Output** | One document | Collection of documents |
| **Use case** | Build one user story | Build entire sprint or feature epic |

**Real-world example: Content creation epic**

Instead of creating one blog post at a time, an epic-level workflow generates a complete content series:

```
Loop per content piece:
  1. Generate topic and outline
  2. Create full draft
  3. Generate social media teasers
  4. Create newsletter blurbs
  5. Produce SEO metadata

Repeat until series complete
```

This produces a coordinated content ecosystem in one session, with consistent branding and cross-references between pieces.

## Step 1: Create Your Workflow

Run the workflow builder to craft your new workflow:

```bash
# Invoke the workflow builder
bmad_bmb_create_workflow
```

The workflow builder guides you through:
- Discovery — What problem does this workflow solve?
- Structure — Linear, branching, or repeating loop?
- Steps — What are the individual phases?
- Integration — Which agent owns this workflow?

For an epic-level looping workflow, specify the **repeating loop** pattern and describe the iteration logic.

## Step 2: Place Workflow in Module Structure

Create the workflow folder within your existing module:

````
your-module/
├── src/
│   ├── module.yaml           # Module configuration
│   ├── module-help.csv       # Workflow registry
│   ├── agents/               # Existing agents
│   └── workflows/
│       ├── existing-workflow/    # Existing workflows
│       └── your-new-workflow/    # Your new workflow
│           ├── workflow.md
│           ├── steps-c/
│           │   ├── step-01-init.md
│           │   ├── step-02-discovery.md
│           │   ├── step-03-loop.md
│           │   └── step-N-complete.md
│           ├── data/
│           └── templates/
````

The workflow folder name should match the workflow name from your `workflow.md` frontmatter.

## Step 3: Update module.yaml

Add any new configuration variables to `src/module.yaml`:

```yaml
# Existing module configuration...
name: "My Module"
code: "my-module"
version: "0.2.0"

# Add new variables for your workflow
my_workflow_output:
  prompt: "Where should epic content be saved?"
  default: "{output_folder}/epic-output"
  result: "{project-root}/{value}"
```

:::note[Minimal Changes]
You only add what's NEW to `module.yaml`. Don't duplicate existing content — this file will be merged with the original during installation.
:::

## Step 4: Update module-help.csv

Add one row for your new workflow to `src/module-help.csv`:

```csv
module,phase,name,code,sequence,workflow-file,command,required,agent,options,description,output-location,outputs,
my-module,phase-2,Epic Content Builder,ECB,25,_bmad/my-module/workflows/your-new-workflow/workflow.md,my_module_epic_builder,false,content-architect,Epic Mode,"Build complete content series in one session — generates articles, social posts, and newsletters for multiple pieces with consistent branding and cross-references",my_workflow_output,"content series",
```

### Critical Fields for Workflow Integration

| Field | What It Controls | Why It Matters |
|-------|------------------|----------------|
| `phase` | When workflow runs | `anytime` for standalone, `phase-N` for sequential journeys |
| `sequence` | Order within phase | Must be unique within phase — use gaps (10, 20, 30) for insertions |
| `description` | User-facing help | Must explain WHAT, WHEN, and HOW — critical for discoverability |

### Phase and Sequence Strategy

**Adding to anytime phase:**
- Use for independent workflows users can run whenever
- Leave `sequence` empty
- Example: Quick validation, status checks, optional utilities

**Adding to sequential phases:**
- Use for workflows that belong in a guided journey
- Choose phase based on where it fits logically
- Set `sequence` to position between existing entries (use 15, 25, 35 for insertions)

**Example sequence planning:**

```csv
# Existing entries
my-module,phase-2,Plan Content,PC,10,...
my-module,phase-2,Draft Article,DA,20,...
my-module,phase-2,Review Content,RC,30,...

# Your new epic workflow inserts between Plan and Draft
my-module,phase-2,Epic Content Builder,ECB,15,...  # Runs after Plan, before Draft
```

## Step 5: Reinstall Your Module

After updating the files, reinstall your module to register the new workflow:

```bash
# Reinstall to pick up changes
bmad_my_module_install
```

This merges your additions with the existing module configuration and registers the new workflow in the help system.

## Step 6: Invoke Your New Workflow

Your workflow is now available:

```bash
# Invoke your epic-level workflow
my_module_epic_builder
```

The workflow will execute according to the pattern you designed during creation.

## Real-World Example: Content Series Epic Workflow

Here's a complete example showing how to add an epic-level content workflow to an existing module.

### Workflow Structure

````
content-creator-module/
└── src/
    └── workflows/
        └── content-series-epic/
            ├── workflow.md
            ├── steps-c/
            │   ├── step-01-init.md
            │   ├── step-02-series-setup.md
            │   ├── step-03-content-loop.md
            │   └── step-04-finalize.md
            └── templates/
                └── content-piece-template.md
````

### module.yaml Addition

```yaml
# Add new output folder for series content
series_output_folder:
  prompt: "Where should your content series be saved?"
  default: "{output_folder}/content-series"
  result: "{project-root}/{value}"
```

### module-help.csv Addition

```csv
# Single row addition — comma-separated, ends with trailing comma
ccm,phase-3,Content Series Epic,CSE,20,_bmad/ccm/workflows/content-series-epic/workflow.md,ccm_content_series_epic,false,content-strategist,Epic Mode,"Generate complete content series in one session — creates multiple articles with social posts, newsletter blurbs, and SEO metadata for each piece, all with consistent branding and cross-references",series_output_folder,"content series",
```

### What This Produces

When invoked, this workflow:

1. **Series Setup** — Establishes themes, branding, and piece count
2. **Content Loop** — For each piece in the series:
   - Generate outline and key points
   - Write full article draft
   - Create social media teasers (Twitter, LinkedIn)
   - Draft newsletter blurb with cross-link
   - Generate SEO title, description, and keywords
3. **Finalize** — Create series index with all piece links

Output is a coordinated content ecosystem ready for deployment.

## Workflows as Skills

All workflows can be installed and bundled as skills for maximum compatibility. The skill system is how workflows are invoked, discovered, and integrated across the BMad ecosystem.

**What this means for your workflow:**
- Your workflow becomes a callable skill after installation
- Skills can be chained together in larger workflows
- The same workflow works across different BMad contexts
- Skill frontmatter enables web bundling for distribution

:::tip[Design for Skills]
When building your workflow, remember it will be invoked as a skill. Keep inputs clear, outputs well-defined, and side effects minimal.
:::

## Common Questions

**Do I need to recreate the entire module.yaml and module-help.csv?**

No. Only include the NEW lines you're adding. The installation process merges your additions with the original module files.

**How do I know what sequence number to use?**

Check existing entries in your `module-help.csv` and choose a number that positions your workflow logically within the phase. Use gaps (5, 15, 25) to leave room for future insertions.

**Can I add workflows to someone else's module?**

Yes, create an extension module that adds workflows to the original module's phases. Use the add-on pattern and set appropriate sequence numbers.

**What if my workflow needs a new agent?**

Create the agent first using `bmad_bmb_create_agent`, then reference it in your workflow's `module-help.csv` entry. The agent and workflow can be added together in the same module update.

**How do I test my workflow before releasing?**

Install your module locally and invoke the workflow. Use the validate workflow command to check compliance before sharing.

## Getting Help

| Resource | Description |
|----------|-------------|
| [Module Help CSV](/docs/reference/module-help-csv.md) | Complete CSV field reference |
| [Workflow Patterns](/docs/explanation/workflow-patterns.md) | Choosing the right structure |
| [What Are Workflows](/docs/explanation/what-are-workflows.md) | Workflow concepts |
| [Workflow Schema](/docs/reference/workflow-schema.md) | Technical workflow structure |

:::tip[Key Takeaway]
Adding workflows to existing modules is about thoughtful integration. Get the phase and sequence right in `module-help.csv`, write a clear description that explains when to use your workflow, and ensure your workflow folder structure follows BMad conventions.
:::
