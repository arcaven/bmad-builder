---
title: "Workflow Variables Reference"
description: Frontmatter variables and path rules for workflows
---

Reference for workflow frontmatter variables and path rules.

Best practice is to have variables in the front matter for all file or folder references needed just by the specific file, using relative paths to keep it skill compliant to other files or folders within the workflow.

Non file variables can also be defined here and used through the file.

## Frontmatter Structure

```yaml
---
name: 'step-01-init'
nextStepFile: './step-02-discovery.md'
outputFile: '{output_folder}/workflow-plan.md'
---
```

Usage of these items in the body of the file follow the format: `{variable-name}`.

### Example

Write all output to the `{outputFile}` and then proceed to load and follow the `{nextStepFile}`
