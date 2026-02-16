# Style Rules Quick Reference

## Project-Specific Rules

| Rule                             | Fix                                    |
| -------------------------------- | -------------------------------------- |
| No horizontal rules (`---`)      | Use `##` headers or admonitions        |
| No `####` headers                | Use bold text or admonitions           |
| No "Related" or "Next:" sections | Remove — sidebar handles navigation    |
| No deeply nested lists           | Break into sections                    |
| No code blocks for non-code      | Use admonitions                        |
| No bold paragraphs for callouts  | Use admonitions                        |
| 1-2 admonitions per section max  | Consolidate or remove                  |
| Table cells / list items         | Keep to 1-2 sentences max              |
| Header budget                    | 8-12 `##` per doc; 2-3 `###` per section |

## Admonitions

```md
:::tip[Title]
Shortcuts, best practices, TL;DR
:::

:::note[Title]
Context, definitions, examples, prerequisites
:::

:::caution[Title]
Caveats, potential issues
:::

:::danger[Title]
Critical warnings only — data loss, security issues
:::
```

### Standard Uses

| Admonition               | Use For                       |
| ------------------------ | ----------------------------- |
| `:::note[Prerequisites]` | Dependencies before starting  |
| `:::tip[Quick Path]`     | TL;DR summary at document top |
| `:::caution[Important]`  | Critical caveats              |
| `:::note[Example]`       | Command/response examples     |

## Filename Conventions

- Use **kebab-case** (lowercase with hyphens)
- Be descriptive but concise
- Match the title topic
- Tutorial: `create-your-first-{topic}.md` or `create-{topic}.md`
- How-to: `{action}-{topic}.md` or `{topic}-{action}.md`
- Explanation: `what-are-{topic}.md` or `{topic}-architecture.md`
- Reference: `{topic}-schema.md` or `{topic}-reference.md`

## Common Patterns

### Converting `####` to bold
```markdown
#### Important Note → **Important Note**
```

### Converting code block to admonition
```markdown
```
User: What should I do?
Agent: Run the workflow.
```
```

```markdown
:::note[Example]
**User:** What should I do?
**Agent:** Run the workflow.
:::
```

### Converting bold paragraph to admonition
```markdown
**IMPORTANT:** This is critical.
```

```markdown
:::caution[Important]
This is critical.
:::
```
