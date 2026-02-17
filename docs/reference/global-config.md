---
title: "Global Config Reference"
description: Core configuration values inherited by all modules
---

Configuration values defined in Core that all modules inherit.

## Core Config Values

| Config Key | Default | Description |
|------------|---------|-------------|
| `user_name` | System username | User's display name |
| `communication_language` | `english` | Language for agent communication |
| `document_output_language` | `english` | Language for generated documents |
| `output_folder` | `_bmad-output` | Directory for workflow outputs |

## Inheritance

Modules can accept defaults, override values, or extend them using `{output_folder}`.

## Your New Module Config

You define new variables. So when your module is used, you have access to all core module values, and your own. If you also extend a module using the `extends-module` config in the module config, then you will additionally have access to those also from your custom workflow that is part of the module.
