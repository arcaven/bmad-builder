---
title: "Custom Content"
---

BMad supports several categories of custom content that extend the platform's capabilities. This ranges from simple personal agents to full-featured professional modules.

## Overview

This flexibility lets you:

- Extensions and add-ons for existing modules
- Completely new modules, workflows, templates, and agents outside software engineering
- Professional services tools
- Role-specific augmentation for virtually any profession

:::tip[Recommended Approach]
Use the BMad Builder (BoMB) Module for guided workflows and expertise when creating custom content.
:::

## Module Categories

BMad supports three types of custom modules, plus standalone agents and workflows:

- **Custom Stand-Alone Modules**: Independent systems that work on their own
- **Custom Add-On Modules**: Extensions that enhance another module
- **Custom Global Modules**: Cross-cutting functionality for all installed content

### Custom Stand-Alone Modules

Custom modules range from simple collections of related agents, workflows, and tools to complex systems like the BMad Method or even larger applications.

Custom modules are [installable](/how-to/install-custom-modules.md) using the standard BMad method and support advanced features:

- Optional user information collection during installation and updates
- Versioning and upgrade paths
- Custom installer functions with IDE-specific post-installation handling (custom hooks, subagents, or vendor-specific tools)
- Ability to bundle specific tools such as MCP, skills, execution libraries, and code

### Custom Add-On Modules

Custom add-on modules contain specific agents, tools, or workflows that expand, modify, or customize another module. They cannot be installed or used independently. These add-ons provide enhanced functionality by using the base module's existing capabilities.

Examples include the core module, which is always installed and provides all agents with party mode and advanced elicitation capabilities.

Add-on modules can include:

- Custom agents with awareness of the target module
- Access to existing module workflows
- Tool-specific features such as rulesets, hooks, subprocess prompts, and subagents

### Custom Global Modules

Global modules are similar to stand-alone modules, but they add functionality that applies across all installed content. These modules provide cross-cutting capabilities that enhance the entire BMad ecosystem.

Examples include installation and update tools that work with any BMad method configuration.

## Building Blocks

### Custom Agents

Custom agents can be designed and built for various use cases, from one-off specialized agents to more generic standalone solutions. Custom agents can be:

- Used within custom modules
- Designed as standalone tools
- Integrated with existing workflows and modules

### Custom Workflows

Workflows range from simple single-file prompts to progressively loading sequence engines that can perform tasks including:

- User facilitation and engagement
- Business processes
- Content generation (code, documentation, or other output formats)
- Utility functions and processes

A custom workflow created outside of a larger module can still be distributed and used without associated agents through slash commands.

:::tip[Core Concept]
At its core, a custom workflow is a single prompt or series of prompts made to achieve a specific outcome. It is installed as a command or a skill.
:::
