---
title: "Workflow Patterns"
---

Understanding workflow patterns helps you design workflows that fit your needs.

## Structure Types

| Type | Flow | Best For | Example |
|------|------|----------|---------|
| **Linear** | Step 1 → 2 → 3 | Sequential processes | Meal planning |
| **Branching** | Step → Choice A/B → Path | User choice determines path | Wedding itinerary |
| **Repeating Loop** | Steps → Repeat | Multiple outputs | RPG sessions |

## Intent Spectrum

| Intent | Style | Use For | Example |
|--------|-------|---------|---------|
| **Intent-based** | Collaborative, facilitative | Most workflows | Novel outliner |
| **Prescriptive** | Exact compliance | Legal, medical, regulated | Tax organizer |
| **Balanced** | Framework prescriptive, content flexible | Semi-structured | Course syllabus |

## Session Types

| Type | Best For | Tracking |
|------|----------|----------|
| **Single-session** | Quick tasks, <8 steps | Not needed |
| **Continuable** | Complex, 8+ steps | `stepsCompleted` in frontmatter |

## Step Types

| Type | Use Case | Menu Pattern |
|------|----------|--------------|
| **Init** | Starting workflow | Auto-proceed |
| **Middle** | Collaborative content | A/P/C or C only |
| **Branch** | User choice | Custom letters |
| **Final** | Completion | None |

## Menu Patterns

| Pattern | Use For |
|---------|---------|
| **A/P/C** | Collaborative steps with alternatives |
| **C Only** | Data gathering, init steps |
| **Auto-proceed** | Init, validation sequences |

## Output Patterns

| Pattern | Description | Use For |
|----------|-------------|---------|
| **Plan-then-Build** | Create plan, then execute | Complex workflows |
| **Direct-to-Final** | Append to final document | Most workflows |
| **Analysis Only** | No document output | Validation, analysis |

## Choosing Your Pattern

```
Multiple sessions? → YES: Continuable, NO: Single-session
Step connection? → Fixed: Linear, Choice: Branching, Repeat: Loop
Intent? → Creative: Intent-based, Compliance: Prescriptive
Output? → Plan first: Plan-then-build, Direct: Direct-to-final
```

## Resources

| Resource | Description |
|----------|-------------|
| [What Are Workflows](/explanation/what-are-workflows.md) | Workflow concepts |
| [Workflow Schema](/reference/workflow-schema.md) | Technical reference |
