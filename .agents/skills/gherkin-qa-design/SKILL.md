---
name: gherkin-qa-design
description: Test design and acceptance criteria with QA reasoning, in English, that turns user stories, acceptance criteria, business rules, functional requirements, and tickets into specifications by example written in declarative Gherkin. Critically analyzes the artifacts, separates what is explicit, derivable, or to be investigated, applies techniques (equivalence classes, boundary values, decision table, state transition, combinations, alternative and exception flows), and never invents business rules. ALWAYS use when the user mentions Gherkin, scenarios, Given/When/Then, acceptance criteria, story refinement, Three Amigos, specification by example, test cases from requirements or a ticket, or asks to "write scenarios", "review acceptance criteria", or "think about the tests" for a feature, even if the word Gherkin does not appear.
---

# Gherkin QA Design

This skill turns requirement artifacts into a **specification by example** in declarative Gherkin, using QA reasoning. Gherkin here is a **collaboration tool** between Product, DEV, and QA: the same text is read by DEV to develop and by QA to test. The focus is the business.

Always respond in English.

## Non-negotiable principles

1. **Do not convert mechanically.** An acceptance criterion does not become a scenario just by swapping the words for Given/When/Then. Before writing, analyze, question, and explore variants.
2. **Never invent business rules.** Anything not defined in the artifacts becomes a **question**, a **hypothesis**, or a **point to investigate**. It does not become an affirmative scenario. Missing values, deadlines, messages, and behaviors are not filled in by assumption.
3. **Distinguish the origin of each piece of information:** explicit (it is in the artifact), derivable (follows logically from what is in the artifact, with justification), or to investigate (gap, ambiguity, or contradiction).
4. **Representative examples, without redundancy.** Each scenario must verify something the others do not.
5. **Declarative, at the business level.** No URLs, ids, clicks, fields, or tags. Screen details do not belong in the specification.

## Output format

The output is **pure Markdown**, ready to paste into Notion: Gherkin keywords in **bold**, no code blocks, no `.feature` file. Do not address Cucumber, automation, or BDD as a method. The focus is the collaborative specification.

Write in the **first person** ("my cart", "I apply"). When there is more than one actor in the same feature, make explicit who acts in each step. When there is a **Background**, the scenarios do not repeat what it already provides, and the first step of the scenario does not need to be a **Given**.

## Five-step process

Execute the steps in order. Read the indicated file at the start of each step, not before.

### Step 1: Artifact analysis
Critically read everything the user provided. Extract actors, goal, rules, conditions, data, messages, and constraints. Classify each item as explicit, derivable, or to investigate. Record ambiguities, gaps, and contradictions.
- Read: `references/01-artifact-analysis.md`
- Use the template: `assets/templates/artifact-analysis.md`

### Step 2: QA reasoning and variant exploration
Ask "what changes the behavior?": profiles, states, data, time, order of actions, system failures, concurrency. List the candidate variants.
- Read: `references/02-qa-reasoning-and-variants.md`
- Use the template: `assets/templates/variant-map.md`

### Step 3: Applying test design techniques
Choose the techniques that apply to the rules found and derive the representative examples. Discard redundant variants and explain the discard. Do not force techniques without a rule that justifies them.
- Read: `references/03-test-design-techniques.md`

### Step 4: Writing declarative Gherkin
Write the scenarios following the guide. User actions go in the **When**, never in the **Given**. One behavior per scenario. Messages described by the business, without fixing the exact text when it is not defined.
- Read: `references/04-declarative-gherkin-guide.md`
- Use the template: `assets/templates/gherkin-specification.md`
- Consult, if you need the full guide: `references/source/gherkin-collaboration-best-practices.md`

### Step 5: Specification review
Review the result against the checklist. Fix whatever fails before delivering. Gather the doubts and hypotheses into the questions for the Three Amigos.
- Read: `references/05-specification-review.md`
- Use the template: `assets/templates/three-amigos-questions.md`

## Delivery

Deliver, in this order, in the conversation itself (or in a `.md` file if the user asks):

1. **Artifact analysis:** explicit rules, derivable rules, and points to investigate.
2. **Variant map and techniques applied:** summarized, with what was discarded and why.
3. **Specification in declarative Gherkin.**
4. **Questions for the Three Amigos:** doubts and hypotheses that need a Product decision.

If the artifact is small and the user asks for something quick, keep the steps but condense the analysis. Never skip recording what was left open.

## Examples

To calibrate the expected level, consult `assets/examples/discount-coupon.md` (full flow) and `assets/examples/mechanical-conversion-vs-qa-reasoning.md` (what to avoid and what to do).
