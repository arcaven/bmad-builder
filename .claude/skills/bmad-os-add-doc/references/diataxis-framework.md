# Diataxis Framework

Diataxis categorizes documentation into four types based on two axes.

## The Four Document Types

|                | **Learning** (oriented toward future)                                         | **Doing** (oriented toward present)                                          |
| -------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Practical**  | **Tutorials** — lessons that guide learners through achieving a specific goal | **How-to guides** — step-by-step instructions for solving a specific problem |
| **Conceptual** | **Explanation** — content that clarifies and describes underlying concepts    | **Reference** — technical descriptions, organized for lookup                 |

## Determining Document Type

Use these questions to determine the correct type:

| Question | Tutorial | How-To | Explanation | Reference |
|----------|----------|--------|-------------|-----------|
| **Goal?** | Learn by doing | Solve a specific problem | Understand concepts | Look up information |
| **User state?** | Beginner, needs hand-holding | Knows basics, stuck on X | Wants depth/clarification | Experienced, needs facts |
| **Structure?** | Linear, step-by-step | Sequential steps | Scannable sections | Organized for lookup |
| **Examples?** | Many, throughout | One or two | Optional | Code/structure focused |

## Common Confusions

| If user wants... | It's usually... | NOT... |
|------------------|-----------------|--------|
| "Teach someone to X" | Tutorial | How-to |
| "How do I do X?" | How-to | Tutorial |
| "What is X?" | Explanation | Tutorial |
| "API docs for X" | Reference | Explanation |
| "When should I use X?" | Explanation | How-to |

## Document Locations

| Location             | Diataxis Type        | File Examples                     |
| -------------------- | -------------------- | --------------------------------- |
| `/docs/tutorials/`   | Tutorial             | `create-custom-agent.md`          |
| `/docs/how-to/`      | How-to guide         | `agent-or-module-decision.md`     |
| `/docs/explanation/` | Explanation          | `what-are-modules.md`             |
| `/docs/reference/`   | Reference            | `agent-schema.md`                 |
| `/docs/glossary/`    | Reference (glossary) | `glossary.md`                     |
