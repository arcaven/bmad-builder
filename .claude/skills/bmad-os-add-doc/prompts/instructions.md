# BMad OS Add Doc

Guided authoring workflow for creating Diataxis-compliant documentation.

## CRITICAL RULES

- **NEVER commit or push** — let the user review first
- **ALWAYS ask before creating files** — get approval on location and content
- **Educate as you guide** — explain WHY documents belong in certain places
- **Show structure first** — present the template before writing content

## Overview

This skill helps users create properly structured documentation by:
1. Understanding their goal and audience
2. Determining the correct Diataxis document type
3. Confirming the right file location
4. Providing the appropriate template
5. Guiding them through filling in content

## Step 1: Understand the User's Goal

Ask questions to understand:
1. **What is the core topic?** (e.g., "how to create an agent", "what modules are")
2. **Who is the audience?** (beginners, experienced users, reference lookups)
3. **What does the user want to accomplish?** (teach a concept, explain a process, document a reference)

## Step 2: Determine Document Type

Read `references/diataxis-framework.md` and use the decision table to determine the correct type.

Ask the user questions to classify their document:
- **Tutorial**: Learning by doing, beginners need hand-holding
- **How-to**: Solving a specific problem for someone who knows basics
- **Explanation**: Understanding concepts, depth and clarification
- **Reference**: Looking up information, experienced users need facts

## Step 3: Confirm Location

Based on document type, suggest the file location:

| Location             | Type                 |
| -------------------- | -------------------- |
| `/docs/tutorials/`   | Tutorial             |
| `/docs/how-to/`      | How-to guide         |
| `/docs/explanation/` | Explanation          |
| `/docs/reference/`   | Reference            |
| `/docs/glossary/`    | Reference (glossary) |

Use filename conventions from `references/style-rules.md`:
- Tutorial: `create-your-first-{topic}.md` or `create-{topic}.md`
- How-to: `{action}-{topic}.md` or `{topic}-{action}.md`
- Explanation: `what-are-{topic}.md` or `{topic}-architecture.md`
- Reference: `{topic}-schema.md` or `{topic}-reference.md`

## Step 4: Present the Template

Read the appropriate template from `references/templates/`:
- `tutorial-template.md` for tutorials
- `howto-template.md` for how-to guides
- `explanation-template.md` for explanations
- `reference-template.md` for reference docs

Present the template to the user before writing any content.

## Step 5: Gather Content

Guide the user through filling in the template:
1. **Start with the hook** — help them write 1-2 compelling sentences
2. **Work through sections sequentially** — don't jump ahead
3. **Ask for specific content** — "What are the 3-5 things they'll learn?"
4. **Suggest improvements** — "This could be more action-oriented"

Read `references/style-rules.md` and enforce:
- No horizontal rules (`---`)
- No `####` headers
- No "Related" or "Next:" sections
- 1-2 admonitions per section max
- Table cells ≤ 2 sentences

## Step 6: Write the File

Once the user is satisfied:
1. **Present the full content** for final review
2. **Get explicit approval** before writing
3. **Use Write tool** to create the file
4. **Report success** with the file path

## Step 7: Suggest Next Steps

After creating the document:
1. **Validation** — Suggest running `bmad-os-diataxis-style-fix` to check compliance
2. **Links** — Ask if other docs should link to this new one
3. **Index updates** — Check if index.md files need updating
4. **Build check** — Suggest `npm run docs:build` to verify no errors

## Example Interaction

```
User: I want to add a doc about creating workflows

AI: I can help you create a Diataxis-compliant document. Let me understand what you need:

1. What's the main goal of this document?
   - Teach someone who's never created a workflow before?
   - Show someone who knows the basics how to do something specific?
   - Explain how workflows work conceptually?
   - Document the workflow file format/reference?

User: Teach someone who's never created one before

AI: That sounds like a **Tutorial**. Tutorials are for learning by doing — they take beginners
through achieving a specific goal with lots of guidance and examples.

I suggest we create this at:
📁 `/docs/tutorials/create-your-first-workflow.md`

Does that sound right? And what's the key thing they'll accomplish by the end?
```

## Common Scenarios

See `references/common-scenarios.md` for guidance on handling specific user requests.
