---
title: "Create Your First Workflow"
---

Build a structured process that guides an AI (or users) through tasks step-by-step.

:::note[BMB Module]
This tutorial uses the **BMad Builder (BMB)** module. Make sure you have BMad installed with the BMB module enabled.
:::

## What You're Building

A workflow breaks complex tasks into focused steps, generally with facilitated guidance of a user in mind. Instead of one giant prompt, the AI loads instructions one step at a time — keeping focused and on-track.

**Think of it like:**
- A recipe with clear steps
- A checklist that guides you through
- A facilitator asking the right questions at the right time

## Quick Start

```
bmad-bmb-create-workflow
```

The workflow will ask you questions and build your workflow step by step. No manual file editing required.

## What the Workflow Asks You

| Step | What You'll Decide |
|------|-------------------|
| **Discovery** | What problem are you solving? Who is this for? |
| **Classification** | Document or not? Standalone or part of a module? One session or multi-session? |
| **Requirements** | How should it flow? What inputs/outputs? How collaborative? |
| **Tools** | Does it need Party Mode? Advanced Elicitation? File access? |
| **Plan Review** | Review everything before building |
| **Design** | What are the actual steps? What happens in each? |
| **Build** | Creates all the files automatically |

## The 4 Key Decisions

During **Classification**, you'll make 4 decisions that shape your workflow:

### 1. Document Output?

**Does this workflow create a file at the end?**

| Document-Producing | Non-Document |
|-------------------|--------------|
| Creates a report, plan, story | Performs actions |
| Uses templates for structure | May produce temporary files |
| Example: meal plan, project proposal | Example: refactoring code, running tests |

### 2. Where Does It Live?

| Standalone | Module-Based |
|-----------|--------------|
| Just for you | Part of a specialized module |
| Your custom location | BMB (building), BMM (software), CIS (innovation), etc. |

**Don't know?** Choose standalone — you can always move it later.

### 3. Single Session or Continuable?

**Could someone need to pause and come back later?**

| Single-Session | Continuable |
|--------------|-------------|
| Quick (15-30 minutes) | Complex, could take hours |
| Simpler structure | Saves progress, can resume |
| Example: quick brainstorm | Example: writing a novel, project plan |

### 4. Create-Only or Tri-Modal?

**Will this workflow need edit and validate capabilities later?**

| Create-Only | Tri-Modal |
|-----------|-----------|
| Build it and use it | Create + Edit + Validate |
| Simpler, faster | Full lifecycle support |
| Good for experiments | Good for maintained, shared workflows |

**Don't know?** Start with create-only — you can add edit/validate later.

## What Gets Created

Based on your decisions, the workflow creates:

```
my-workflow/
├── workflow.md              # Entry point with configuration
├── steps-c/                 # Create flow steps
│   ├── step-01-init.md
│   ├── step-01b-continue.md # Only if continuable
│   └── step-02, 03, ...
├── steps-v/                 # Validate steps (only if tri-modal)
├── steps-e/                 # Edit steps (only if tri-modal)
├── data/                    # Reference materials
└── templates/               # Output document templates (if document-producing)
```

## Key Concepts

### Step-File Architecture

Each step is a separate file. The AI only loads one step at a time.

**Why this matters:**
- Keeps the AI focused on the current task
- Prevents "getting lost" in long prompts
- Makes it easy to modify individual steps

### Progressive Disclosure

Information is revealed exactly when needed. Each step builds on the previous one.

**Example:** A project planning workflow might:
1. First understand the problem
2. Then gather requirements
3. Then design the solution
4. Finally create an implementation plan

Each step only knows about itself — until it loads the next one.

### Menu Options

Steps can present options to users:

```
Select an Option: [A] Advanced Elicitation [P] Party Mode [C] Continue
```

**Common patterns:**
- **A/P/C** — Advanced tools, Party Mode, Continue (most common)
- **C only** — Auto-proceed to next step
- **Custom** — Your specific choices

## After Your Workflow Is Built

Your workflow lives in `_bmad-creations/workflows/{name}/`. To use it:

1. **Test it** — Run through and make sure it flows correctly
2. **Validate it** — Run `bmad-bmb-validate-workflow` to check for issues
3. **Bundle it** — Create a module to share with others or add to an existing module you have

See [Bundle Your Creations](/how-to/bundle-your-creations.md) for packaging.

## Further Reading

| Resource | Why Read It |
|----------|-------------|
| [What Are Workflows](/explanation/what-are-workflows.md) | Deep technical details |
| [Workflow Patterns](/explanation/workflow-patterns.md) | Step types and patterns |
| [Workflow Schema](/reference/workflow-schema.md) | Complete field reference |
| [Validate Agents and Workflows](/how-to/validate-agents-and-workflows.md) | Quality checks and testing |
