---
title: "Plan for Iteration"
description: Why first attempts fail and how to iterate
---

Your first workflow will not work as expected. This is normal — it reflects the gap between your mental model and reality.

## Why First Attempts Fail

| The Plan | What Happens | The Flaw |
|----------|--------------|----------|
| "Validate entire system!" | Ignores cascading failures | Sequential dependency cascade |
| "Add escalation!" | Fixes break other things | No cascade validation |
| "Test everything!" | Finally works | — |

**Humans think linearly, systems behave in webs of interdependence.**

## Key Principles

### Start Stupidly Small

Before "validate everything," start with "check if port 3000 is occupied."

### Build Your Failure Collection

Document every failure mode. After 3-5 failures, you'll see systemic issues.

| Failure Pattern | What It Reveals | Fix |
|-----------------|-----------------|-----|
| Assumes services running | Missing prerequisite check | Add availability check |
| Fixes break things | No cascade validation | Test after each phase |

### Test Cascade Impact

After every step, run "did I break anything else?" using before/after snapshots.

### Embrace Escalation

Build graceful → aggressive → nuclear progression into every issue resolution.

## Practical Testing Strategy

| Step | What You Do |
|------|-------------|
| Build detector | "Find all TypeScript errors" |
| Test detector | See what it actually finds |
| Build ONE fix | "Fix import X" |
| Test fix | Does it work? Does it break anything? |
| Combine | Only then combine into larger workflow |

## Key Takeaway

Your workflow will evolve through 3-5 major iterations before it's useful. Plan for this. Budget time for it.
