---
title: "Create Extension Modules"
description: Add custom agents and workflows to existing BMad modules that survive updates
---

Use extension modules to inject custom agents and workflows into existing modules like BMad Method. Your extensions integrate seamlessly into the target module's phase sequence and survive module updates.

:::tip[Quick Path]
1. Use Bond (agent builder) to create your agents
2. Use Wendy (workflow builder) to create your workflows
3. Create a folder with your agents under /agents, and workflows under /workflows
4. Add `module.yaml` at the new folder root with your extension's code and name and other required yaml properties
5. Add an extra property extends-module: {CODE} - with code being the other module for example bmm for the bmad method - this allows the config to be shared with the extended module
6. Add `module-help.csv` with entries targeting the existing module's phase
7. Install your extension — entries merge into the target module's help system and inherit the extended modules config values into its own new config
:::

:::note[Prerequisites]
- BMad Builder installed
- Understanding of agents and workflows, and bmad-help.csv file of the module you will integrate with
:::

## When to Create Extension Modules

**Create extension modules when:**
- You want to add new functionality or steps into another modules workflow cohesively, worked into the help and future automation mechanisms
- Multiple teams need different variations of the same base module
- You need your customizations to survive module updates - ie never directly modify existing workflows or agents in modules as they will get overwritten on updates

**Skip this when:**
- You're creating a completely standalone module
- Your changes should be contributed back to the core module

## Understanding the Extension Pattern

Extension modules are simpler than you might think. An extension is just a folder containing additional agents and workflows organized in a folder with agents/ and workflows/ (as needed - both are not required):
- A `module.yaml` with your extension's identity along with the extends-module property
- A `module-help.csv` that targets the existing module's phases

At install time, your `module-help.csv` entries merge with the target module's entries. The BMad help system sees everything as one unified catalog.

**The key insight:** Your CSV entries use the target module's code (`bmm`) in the `module` column, but your extension has its own unique code (`bmm-acme-compliance`). This keeps your extension separate while integrating it into BMad Method's workflow sequence.

## Step 1: Create Your Custom Agent

Use Bond (the agent builder) to create your agent or use the direct slash command to execute:

```
bmad_bmb_create_agent
```

Bond guides you through agent creation. For our example, create **Security Agent Bob** — a compliance specialist who will review code for custom security requirements.

Bond creates:
```
your-extension/
└── agents/
    └── security-agent-bob.agent.yaml
```

Your agent definition includes a menu with two items:
- **Agent-only item** — A quick action handled directly by Bob's menu
- **Workflow item** — A menu item that routes to your compliance workflow

## Step 2: Create Your Custom Workflow

Use Wendy (the workflow builder) to create your workflow:

```
bmad_bmb_create_workflow
```

Wendy guides you through workflow design. For our example, create a **Compliance Review** workflow that runs after BMad Method's development phase completes.

Wendy creates:
```
your-extension/
└── workflows/
    └── compliance-review/
        ├── workflow.md
        └── steps-c/
            ├── step-01-init.md
            ├── step-02-check.md
            └── step-03-complete.md
```

:::tip[End Your Workflow Properly]
In your final step, call the BMad help system so it can suggest the next workflow:

`Read fully and follow: `_bmad/core/tasks/help.md` with argument `Your Workflow Name`.`

This integrates your workflow into the intelligent help system.
:::

## Step 3: Organize Your Extension Folder

Create a folder structure for your extension:

````
bmm-acme-compliance/
├── module.yaml
├── module-help.csv
├── agents/
│   └── security-agent-bob.agent.yaml
├── workflows/
│   └── compliance-review/
│       ├── workflow.md
│       └── steps-c/
│           ├── step-01-init.md
│           ├── step-02-check.md
│           └── step-03-complete.md
└── README.md
````

You don't need to use Morgan (the module builder) — the combination of Bond + Wendy + your configs creates a compliant module.

:::note[Optional Components]
Only include `agents/` if your extension adds custom agents. Only include `workflows/` if your extension adds workflows. An extension could add only workflows, only agents, or both.
:::

## Step 4: Create module.yaml

Your `module.yaml` defines your extension's identity and the module it extends:

```yaml
code: bmm-acme-compliance
name: "Custom Compliance Workflows"
version: "1.0.0"
description: "Custom compliance workflows for BMad Method"
extends-module: bmm

# Configuration values your extension needs
config:
  compliance_report_location: "{output_folder}/compliance-reports"
  security_threshold: "strict"
```

:::note[Module Identity]
- `code` — Your extension's unique identifier (use dash-extension convention for clarity)
- `name` — Display name shown in listings
- `extends-module` — The target module's code (e.g., `bmm`) — this shares config values with the extended module
- The `code` doesn't need to match the target module — the CSV handles integration
:::

## Step 5: Create module-help.csv

Your `module-help.csv` is where the magic happens. Each row represents one menu item in the BMad help system.

**Example: Custom Compliance Extension**

```csv
module,phase,name,code,sequence,workflow-file,command,required,agent,options,description,output-location,outputs,
bmm,4-implementation,Security Quick Check,SQC,,_bmad/bmm/agents/security-agent-bob/security-agent-bob.agent.yaml,,false,security-agent-bob,,"Quick security scan of recent changes - use anytime during development for fast compliance check",,,
bmm,4-implementation,Compliance Review,CR,55,_bmad/bmm-acme-compliance/workflows/compliance-review/workflow.md,bmad-acme-compliance-review,false,security-agent-bob,Create Mode,"Run full compliance review after epic completion - verifies security policies, generates remediation reports, integrates with BMad Method implementation phase",compliance_report_location,"compliance report",
```

**What each entry does:**

| Field | Value | Purpose |
|-------|-------|---------|
| `module` | `bmm` | Targets BMad Method's phase sequence |
| `phase` | `4-implementation` | Integrates into BMad Method's implementation phase |
| `sequence` | Empty for agent-only, `55` for workflow | Positions between existing entries |
| `workflow-file` | Empty for agent-only, path for workflow | Agent menu items have empty workflow-file |
| `agent` | `security-agent-bob` | Your custom agent |
| `command` | Empty for agent-only, named for workflow | Creates `/bmad-acme-compliance-review` command |

**Why sequence 55?** BMad Method's phase-4 has entries at 10, 20, 30, 40, 50, 60. Using 55 slots your workflow after Code Review (50) but before Retrospective (60).

## Step 6: Understanding the Merge

When you install your extension, something powerful happens. Your CSV entries merge with BMad Method's CSV.

**Before Install — BMad Method CSV (excerpt)**

```csv
module,phase,name,code,sequence,workflow-file,command,required,agent,options,description,output-location,outputs,
bmm,4-implementation,Sprint Planning,SP,10,_bmad/bmm/workflows/4-implementation/sprint-planning/workflow.yaml,bmad-bmm-sprint-planning,true,sm,Create Mode,"Generate sprint plan for development tasks...",implementation_artifacts,"sprint status",
...
bmm,4-implementation,Code Review,CR,50,_bmad/bmm/workflows/4-implementation/code-review/workflow.yaml,bmad-bmm-code-review,false,dev,Create Mode,"Story cycle: If issues back to DS if approved then next CS or ER if epic complete",,,
bmm,4-implementation,Retrospective,ER,60,_bmad/bmm/workflows/4-implementation/retrospective/workflow.yaml,bmad-bmm-retrospective,false,sm,Create Mode,"Optional at epic end: Review completed work...",implementation_artifacts,retrospective,
```

**After Install — Merged CSV (what the help system sees)**

```csv
module,phase,name,code,sequence,workflow-file,command,required,agent,options,description,output-location,outputs,
bmm,4-implementation,Code Review,CR,50,_bmad/bmm/workflows/4-implementation/code-review/workflow.yaml,bmad-bmm-code-review,false,dev,Create Mode,"Story cycle: If issues back to DS if approved then next CS or ER if epic complete",,,
bmm,4-implementation,Compliance Review,CR,55,_bmad/bmm-acme-compliance/workflows/compliance-review/workflow.md,bmad-acme-compliance-review,false,security-agent-bob,Create Mode,"Run full compliance review after epic completion - verifies security policies, generates remediation reports, integrates with BMad Method implementation phase",compliance_report_location,"compliance report",
bmm,4-implementation,Retrospective,ER,60,_bmad/bmm/workflows/4-implementation/retrospective/workflow.yaml,bmad-bmm-retrospective,false,sm,Create Mode,"Optional at epic end: Review completed work...",implementation_artifacts,retrospective,
```

The BMad help system now sees Compliance Review as a natural part of the implementation phase, positioned exactly where you specified.

## Step 7: Install Your Extension

Install your extension module:

```
bmad_bmm_acme_compliance_install
```

Your extension's entries merge into the BMad help system. Users can now:
- Invoke `/bmad-acme-compliance-review` after epic completion
- Use Security Agent Bob's quick check anytime
- Get intelligent help suggestions that include your custom workflow

## What You Get

After installing your extension module:

- **Agent integrated** — Security Agent Bob appears in BMad Method's agent registry
- **Workflow sequenced** — Compliance Review appears in phase-4 at position 55
- **Command available** — `/bmad-acme-compliance-review` invokes your workflow
- **Help system aware** — BMad help suggests your workflow at the right time
- **Updates survived** — When BMad Method updates, your extension remains intact

## Real-World Example: Complete Extension Module

Here's the complete file listing for a custom compliance extension:

````
bmm-acme-compliance/
├── module.yaml
├── module-help.csv
├── agents/
│   └── security-agent-bob.agent.yaml
├── workflows/
│   └── compliance-review/
│       ├── workflow.md
│       └── steps-c/
│           ├── step-01-init.md
│           ├── step-02-check.md
│           └── step-03-complete.md
└── README.md
````

**module.yaml:**

```yaml
code: bmm-acme-compliance
name: "Custom Compliance Workflows"
version: "1.0.0"
description: "Custom compliance workflows for BMad Method"
extends-module: bmm

config:
  compliance_report_location: "{output_folder}/compliance-reports"
  security_threshold: "strict"
```

**module-help.csv:**

```csv
module,phase,name,code,sequence,workflow-file,command,required,agent,options,description,output-location,outputs,
bmm,4-implementation,Security Quick Check,SQC,,_bmad/bmm/agents/security-agent-bob/security-agent-bob.agent.yaml,,false,security-agent-bob,,"Quick security scan of recent changes - use anytime during development for fast compliance check",,,
bmm,4-implementation,Compliance Review,CR,55,_bmad/bmm-acme-compliance/workflows/compliance-review/workflow.md,bmad-acme-compliance-review,false,security-agent-bob,Create Mode,"Run full compliance review after epic completion - verifies security policies, generates remediation reports, integrates with BMad Method implementation phase",compliance_report_location,"compliance report",
```

**step-03-complete.md (workflow ending):**

```markdown
# Step 3: Complete & Route to Help

## Completion Sequence

### 1. Update Document Frontmatter

```yaml
stepsCompleted: [1, 2, 3]
status: 'complete'
completedAt: '{{current_date}}'
```

### 2. Present Completion Summary

Congratulate the user on completing the compliance review. Summarize findings and any remediation needed.

### 3. Route to BMad Help

Compliance review complete. Read fully and follow: `_bmad/core/tasks/help.md` with argument `Compliance Review`.

This engages the BMad help system, which will suggest the next workflow based on your extension's position in the phase sequence.
```

## Why Extensions Survive Updates

When BMad Method releases an update:
1. The existing BMad Method module is replaced
2. Your extension module remains separate
3. Reinstalling your extension re-merges your CSV entries
4. Your workflows and agents remain available at their configured phases

Your extension is insulated from changes to BMad Method's internal structure because you never modify its files — you only add to its help system through the merge.

## Tips

**Use clear naming conventions**

- Extension codes: `bmm-{custom-module-code}` or `bmm-extension`
- This makes it obvious which module you extend
- But remember: the code doesn't affect integration — the CSV does

**Leave sequence gaps**

Use sequence numbers like 15, 25, 35, 55 to leave room for future extensions. Multiple teams can create extensions that coexist when they use different sequence numbers.

**Test locally before distributing**

Install your extension locally and verify:
- Workflow appears at the correct phase and sequence
- Command invokes correctly
- Help system suggests your workflow at the right time
- Agent menu items work as expected

**Document dependencies**

Your README should mention:
- Which target module you extend (e.g., "Requires BMad Method")
- Which phase you integrate into
- What sequence numbers you use
- Any conflicts to avoid

## Next Steps

- [Create Custom Agent](/tutorials/create-custom-agent.md) — Build agents with Bond
- [Create Your First Workflow](/tutorials/create-your-first-workflow.md) — Build workflows with Wendy
- [Module Help CSV](/reference/module-help-csv.md) — Complete CSV field reference
