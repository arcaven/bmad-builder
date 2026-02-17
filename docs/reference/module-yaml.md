---
title: "Module YAML Reference"
description: Configuration for module.yaml files
---

Reference for `module.yaml` configuration files.

## Location

```
your-module/src/module.yaml
```

## Required Fields

```yaml
name: "Module Name"
code: "module-code"
version: "0.1.0"
description: "What this module does"
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name |
| `code` | string | Unique identifier (kebab-case) |
| `version` | string | Semantic version |
| `description` | string | Short description |

## Optional Fields

### Install Questions

```yaml
install:
  - question: "What's your experience level?"
    config_key: "experience_level"
    options:
      - "beginner"
      - "advanced"
```

### Configuration

```yaml
config:
  output_folder: "_module-output"
  max_iterations: 10
```

### Extends Module

```yaml
extends-module: bmm  # For extension modules
```

## Complete Example

```yaml
name: "My Module"
code: "my-module"
version: "0.1.0"
description: "A useful module"

install:
  - question: "Primary use case?"
    config_key: "use_case"

config:
  output_folder: "_my-output"
```
