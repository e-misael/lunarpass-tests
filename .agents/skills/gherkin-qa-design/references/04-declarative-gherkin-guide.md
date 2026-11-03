# Step 4: Declarative Gherkin guide

Operational rules extracted from the team guide. The full document, with the reasoning and examples, is in `source/gherkin-collaboration-best-practices.md`.

## Central idea

Gherkin is a **collaboration** tool. It serves to align the team on the expected behavior, with a focus on the business. The same text guides both disciplines: DEV reads it to develop and QA reads it to test. That is why it speaks the language of the business.

## Writing rules

### 1. Declarative, not imperative
- Describe the **what** (intent, rule, domain language), not the **how** (clicks, fields, URLs, ids, tags).
- Resilience test: if the design changes the layout, is the scenario still true?
- Wrong: "I type X into the field with id email-input and click the Log in button".
- Right: "I authenticate with valid credentials".

### 2. Semantics of Given, When, and Then
- **Given:** initial state and context. It does not contain user actions.
- **When:** user action or triggered event. **Filling out a form is not a precondition**: it belongs in the **When**.
- **Then:** expected consequence or result, observable and verifiable.
- Logical structure (Given, When, Then) and level of detail (technical or business) are separate discussions. A scenario can have the correct structure and still be imperative.

### 3. First person
- Write in the first person ("my cart", "I apply", "I must be informed"), so DEV can put themselves in the shoes of the user and to give continuity to the user story.
- With **more than one actor** in the same scenario, make explicit who acts in each step (for example, "the Administrator" and "the Customer"), to avoid ambiguity.
- The criterion is to create shared understanding, not to please syntax rules.

### 4. One behavior per scenario
- Each scenario verifies a single rule. This makes review easier in the Three Amigos.
- Several **And** steps in the **Then** are acceptable when they describe the same result (message to the user and total unchanged). If they verify different rules, separate them.

### 5. Messages described by the business
- Say that the customer must be informed **of the reason**, without fixing the exact text, unless the text is defined in the artifact.
- The text can be refined with Product without rewriting the scenario.

### 6. Edge cases, beyond the happy path
- Include exceptions, system failures, and alternative scenarios. This is where QA adds value to the specification.

### 7. Short and without repetition
- Scenario names describe the **rule** verified, not the step by step.
- Use **Background** for what repeats in all scenarios of the feature. With a Background, the scenario does not need to start with **Given**.
- Use **Scenario Outline** with an **Examples** table when the same behavior repeats with different data. Keep the table small and each row purposeful.

## Output format (pure Markdown)

- Keywords in **bold**: **Feature:**, **Background:**, **Scenario:**, **Scenario Outline:**, **Examples:**, **Given**, **When**, **Then**, **And**, **But**.
- No code blocks and no `.feature` file. The text must paste well into Notion.
- One line per step. For a line break in Markdown, end the line with two spaces.
- Examples tables as Markdown tables.
- Concrete, small values in the examples (R$ 200, R$ 50), which make the rule easy to check.

## What not to do

- Do not write a rule that the artifact did not define. Without a definition, go to the Three Amigos questions.
- Do not use automated-test language ("I click", "I select the element", "I wait for the request").
- Do not put form filling, clicks, or submissions in **Given**.
- Do not repeat the same scenario with small variations without purpose.
- Do not treat Cucumber, automation, or BDD as a subject of the specification.

## About hypotheses in Gherkin

A scenario based on a **derivable** rule can enter the specification, but must be marked as a hypothesis, right below the title, for example: "Hypothesis to validate: [justification]". Scenarios of a **to investigate** rule do not enter as affirmative: they stay in the list of questions.
