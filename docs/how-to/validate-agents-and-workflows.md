---
title: "Validate Agents and Workflows"
description: Check existing agents and workflows for BMad compliance and best practices
---

Validate your agents and workflows to ensure they follow best practices and comply with standards. Validation catches issues before they cause problems, but also can make your workflows further optimized!

Future versions of the builders and validators will also offer options to optimize for specific models or tools.

## How To

All Workflows in the BMad Builder have a Create Path, an Edit Path and a Validate Path. After you create an agent or workflow, you will be offered to then run validation. It can be very context intense, especially with larger workflows.

Because of this, it is recommended instead to run the command or skill `bmad-bmb-validate-agent` or `bmad-bmb-validate-workflow` in a new separate context. The workflow analyzes both for errors and optimization, and will produce an extensive report.

If you are using a modern tool such as Claude Code, which supports parallel processing and task agents running in a sub process with its own context window - you can run the validation much quicker but instead executing `validate-max-parallel-workflow`.

Once you review the report - you can either ask the agent to fix some things, or use the report with the separate `bmad-bmb-edit-workflow`. For most minor updates though, just asking the agent after the validation run may be sufficient.

## Getting Help

If validation fails and you're not sure why:

- **[Reference Examples](https://github.com/bmad-code-org/BMAD-METHOD)** — Study valid examples

## Related Guides

| Guide | Description |
|-------|-------------|
| [Edit Agents and Workflows](/how-to/edit-agents-and-workflows.md) | Fixing validation issues |
| [Create a Custom Agent](/how-to/create-custom-agent.md) | Agent creation |
| [Create Your First Workflow](/how-to/create-your-first-workflow.md) | Workflow creation |
| [Workflow Schema](/reference/workflow-schema.md) | Technical reference |
