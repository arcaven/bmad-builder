---
title: "Plan for Workflows and Skills to Evolve"
---

Your first workflow or skill attempt will not work as expected. That is not a flaw — it reflects the gap between your mental model and how systems actually behave.

:::note[A Real Example]
I just spent the morning going through multiple iterations of an "enhanced journey validator" workflow. It was a perfect case study in why first attempts do not work.
:::

## What Is Iterative Development?

Treat every initial workflow or skill output as a **first draft** designed to evolve through iteration, not a finished product.

The BMad Builder is not broken when your first attempt fails — it is exposing the difference between your mental model of the system and reality. Your job is to iterate intelligently based on real failure data.

## A Case Study: The Journey Validator

Here is what happened with three attempts at the same workflow:

| Attempt | The Plan | What Actually Happened | The Flaw |
|---------|----------|------------------------|----------|
| **First** | "Validate all user journeys and auto-resolve issues!" | Ignored infrastructure problems, analyzed frontend while services crashed | Sequential dependency cascade — each step blocked the previous |
| **Second** | "Add 10-attempt escalation strategies!" | Fixed individual issues but introduced NEW problems with each fix | No cascade validation — TypeScript fixes broke runtime, service restarts created port conflicts |
| **Third** | "Full cascade validation after every phase!" | Finally addresses the core architectural gaps | — |

## Why First Attempts Always Fail

Humans think linearly, but systems behave in webs of interdependence.

**We write workflows like:**
1. Do thing A
2. Do thing B
3. Success!

**Reality is:**
1. Do thing A
2. Thing A breaks thing C
3. Fix thing C
4. Thing C fix breaks thing A
5. Discover thing B was never the real problem
6. Realize you need thing D, E, and F first

## Key Principles

### Start Stupidly Small

Before "validate entire platform," start with "check if port 3000 is occupied."

You will discover your detection logic is wrong before building complex resolution strategies.

### Build Your Failure Collection

Create a failure log from day one. Every time your workflow fails, document the exact failure mode.

After 3-5 failures, you will see the systemic issues you missed.

| Failure Pattern | What It Reveals | Workflow Adjustment |
|-----------------|-----------------|---------------------|
| Workflow assumes services are running | Missing prerequisite check | Add service availability check first |
| Fixes break previously-working things | No cascade validation | Test system state after each phase |
| Same issue recurs with different inputs | Incomplete edge case coverage | Expand escalation strategies |

### Test Cascade Impact Immediately

After every workflow step, run a quick "did I break anything else?" check using before/after snapshots of system state.

If your workflow fixes imports, immediately test if compilation still works.

### Embrace Escalation Strategies

Build graceful → aggressive → nuclear progression into every issue resolution.

The 10-attempt rule gives every issue 10 tries with different approaches. Systems are messy — sometimes the "right" solution does not work due to timing or state issues.

### Use Broken Outputs as Data

Do not delete failed workflow runs. Analyze the failure cascade: what broke first, what broke as a consequence, and turn each failure into a test case for the next iteration.

## Practical Testing Strategy

Instead of building a massive "fix everything" workflow:

| Step | What You Do |
|------|-------------|
| **Build a detector** | "Find all TypeScript errors" |
| **Test the detector** | Run it, see what it actually finds vs. what you expected |
| **Build ONE fix** | "Fix import statement X" |
| **Test the fix** | Does it work? Does it break anything else? |
| **Build the escalation** | "If fix X fails, try Y, then Z" |
| **Combine** | Only then combine into larger workflow |

## When This Applies

- Creating your first workflow in BMad Builder
- Building a new skill from scratch
- Adapting an existing workflow to a new project

:::tip[Key Takeaway]
Your workflow will evolve through 3-5 major iterations before it is actually useful. Plan for this. Budget time for this. And share your failure stories so we can all learn from them.
:::

The goal is not perfection on attempt #1. It is systematic improvement based on real-world feedback.

## Further Reading

| Resource | Description |
|----------|-------------|
| [Workflow Reference](/reference/workflows/) | Complete workflow schema and configuration options |
| [Skill Reference](/reference/skills/) | Skill structure and best practices |
