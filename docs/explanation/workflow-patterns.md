---
title: "Workflow Patterns"
---

Understanding workflow patterns helps you design workflows that fit your specific needs. Different domains and use cases require different structures, intent levels, and execution patterns.

## Structure Types

### Linear Workflows

Steps execute in a fixed order from start to finish. Each step leads directly to the next.

| Aspect | Details |
|--------|---------|
| **Flow** | Step 1 → Step 2 → Step 3 → ... → Final |
| **Best for** | Sequential processes where each step builds on the previous |
| **Examples** | Meal planning, tax organizer, life review |

**Real-world example: Personalized meal planning**
1. Discovery — What do you like to eat?
2. Assessment — Dietary restrictions, allergies, goals
3. Strategy — Meal patterns, prep preferences
4. Shopping list — Ingredients organized by store section
5. Prep schedule — What to prepare when

### Branching Workflows

User choice determines which steps execute next. Different paths lead to different outcomes.

| Aspect | Details |
|--------|---------|
| **Flow** | Step → [Choice A → Path A] or [Choice B → Path B] |
| **Best for** | Workflows where user characteristics determine the approach |
| **Examples** | Wedding itinerary, course syllabus, room renovation |

**Real-world example: Wedding itinerary coordinator**
1. Venue type → [Indoor] or [Outdoor] or [Hybrid]
2. If Outdoor → Weather contingency planning
3. If Hybrid → Virtual setup coordination
4. Vendor coordination (all paths)
5. Day-of schedule (customized by venue type)

### Repeating Loop Workflows

The same steps execute repeatedly with new content each cycle.

| Aspect | Details |
|--------|---------|
| **Flow** | Step 1-N → [Repeat with new content] |
| **Best for** | Ongoing processes that produce multiple outputs |
| **Examples** | RPG campaign sessions, SOP writer, content production |

**Real-world example: Tabletop RPG campaign builder**
1. Session concept → [Repeat per session]
2. NPC creation
3. Scene setup
4. Key beats
5. Generate session document
6. [Back to step 1 for next session]

## Intent Spectrum

### Intent-Based (Default)

Collaborative facilitation — the AI guides, explores, and adapts based on user input.

**Use for:** Most workflows — creative, exploratory, collaborative

**Instruction style:** "Help the user understand X using multi-turn conversation. Probe to get good answers. Ask 1-2 questions at a time, not a laundry list."

**The LLM figures out:** Exact wording, question order, how to respond

| Domain | Example | Intent Pattern |
|--------|---------|----------------|
| **Creative writing** | Novel outliner | "What does your character want?" Open-ended exploration |
| **Travel** | Trip planner | "What's your ideal balance of adventure and rest?" |
| **Learning** | Personal tutor | "How does YOUR brain work best?" |
| **Fitness** | Coach | "What truly motivates you?" |

### Prescriptive (Exception)

Exact compliance — the AI follows a specific script without deviation.

**Use for:** Compliance, safety, legal, medical, regulated industries

**Instruction style:** "Say exactly: 'Do you currently experience fever, cough, or fatigue?' Wait for response. Then ask exactly: 'When did symptoms begin?'"

**The LLM follows:** Exact script, specific order, no deviation

| Domain | Example | Prescriptive Pattern |
|--------|---------|---------------------|
| **Tax** | Year-end organizer | Exact categories for compliance |
| **Legal** | Termination checklist | State-specific requirements verbatim |
| **Medical** | Symptom intake | Clinical protocol, no variation |

### Balanced

Framework prescriptive, content flexible.

**Use for:** Semi-structured domains where consistency matters but user input varies

| Domain | Example | Balance Pattern |
|--------|---------|-----------------|
| **Education** | Course syllabus | Framework fixed, content flexible |
| **Home improvement** | Room renovation | Code compliance prescriptive, design intent-based |

## Session Types

### Single-Session

Completes in one sitting. Simpler structure, no continuation logic.

| Aspect | Details |
|--------|---------|
| **Best for** | Quick tasks, less than 8 steps |
| **Init pattern** | Standard step-01-init.md |
| **State tracking** | Not needed |
| **Examples** | Tax organizer, SOP writer |

### Continuable (Multi-Session)

Can stop and resume later. Tracks progress in output file frontmatter.

| Aspect | Details |
|--------|---------|
| **Best for** | Complex tasks, 8+ steps, multiple sessions likely |
| **Init pattern** | Continuable step-01-init.md + step-01b-continue.md |
| **State tracking** | `stepsCompleted` array in frontmatter |
| **Examples** | Novel outliner, wedding itinerary, meal planning |

**State tracking example:**

```yaml
---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-strategy']
lastStep: 'step-03-strategy'
lastContinued: '2025-01-15'
status: IN_PROGRESS
---
```

## Step Type Patterns

| Step Type | Use Case | Menu Pattern |
|-----------|----------|--------------|
| **Init (non-continuable)** | Single-session start | Auto-proceed |
| **Init (continuable)** | Multi-session start | Continuation detection |
| **Continuation (01b)** | Resume workflow | Routes to next step |
| **Middle (standard)** | Collaborative content | A/P/C menu |
| **Middle (simple)** | Data gathering | C only |
| **Branch** | User choice determines path | Custom letters |
| **Validation sequence** | Multiple checks | Auto-proceed |
| **Final polish** | Optimize document | None |
| **Final** | Completion | None |

## Menu Patterns

### Standard A/P/C

Collaborative steps where alternatives are valuable.

```markdown
Display: "**Select:** [A] Advanced Elicitation [P] Party Mode [C] Continue"
```

**Use for:** Creative exploration, quality gates, user input refinement

### C Only

Data gathering or simple progression steps.

```markdown
Display: "**Select:** [C] Continue"
```

**Use for:** Init steps, document discovery, simple progression

### Branching

User choice determines different paths.

```markdown
Display: "**Select:** [L] Load Existing [N] Create New [C] Continue"
```

**Use for:** Conditional workflows, alternative paths

### Auto-Proceed

No menu — automatic progression.

```markdown
Display: "**Proceeding to next step...**"
```

**Use for:** Init steps, validation sequences

## Output Patterns

### Plan-then-Build

Steps append to a plan document, then a build step consumes it.

```
Step 1 → Creates plan.md
Step 2 → Appends requirements
Step 3 → Appends design
Step 4 → Build step consumes plan → Creates artifacts
```

**Use for:** Complex workflows requiring planning before execution

### Direct-to-Final

Steps append directly to the final document.

```
Step 1 → Creates final-doc.md
Step 2 → Appends Section 1
Step 3 → Appends Section 2
Step 4 → Polish step optimizes entire document
```

**Use for:** Most workflows — simpler, faster to results

### Analysis Only

No persistent document output — performs actions and reports.

**Use for:** Validation, analysis, data processing

## Choosing Your Pattern

Use this decision tree to design your workflow:

```
START: Creating a workflow
│
├─ Does the user need multiple sessions?
│  ├─ YES → Continuable (add step-01b-continue.md)
│  └─ NO  → Single-session (simpler init)
│
├─ How do steps connect?
│  ├─ Fixed order → Linear
│  ├─ User choice → Branching
│  └─ Repeat content → Repeating loop
│
├─ What's the intent level?
│  ├─ Creative/collaborative → Intent-based
│  ├─ Compliance required → Prescriptive
│  └─ Mixed → Balanced
│
└─ What's the output pattern?
   ├─ Plan first, then execute → Plan-then-build
   ├─ Build directly → Direct-to-final
   └─ No document needed → Analysis only
```

## Real-World Pattern Combinations

| Domain | Structure | Intent | Session | Output |
|--------|-----------|--------|---------|--------|
| **Meal planning** | Linear | Intent-based | Continuable | Direct-to-final |
| **Tax organizer** | Linear | Prescriptive | Single-session | Analysis only |
| **Novel outliner** | Branching | Intent-based | Continuable | Direct-to-final + polish |
| **Wedding planner** | Branching | Intent-based | Continuable | Direct-to-final |
| **RPG campaign** | Repeating loop | Intent-based | Continuable | Per-session output |
| **Course syllabus** | Branching | Balanced | Continuable | Structured template |
| **SOP writer** | Repeating loop | Prescriptive | Single-session | Independent outputs |

## Resources

| Resource | Description |
|----------|-------------|
| [What Are Workflows](/explanation/what-are-workflows.md) | Workflow concepts and architecture |
| [Workflow Customization](/explanation/customize-workflows.md) | Tri-modal structure and modification |
| [Workflow Schema](/reference/workflow-schema.md) | Technical reference
