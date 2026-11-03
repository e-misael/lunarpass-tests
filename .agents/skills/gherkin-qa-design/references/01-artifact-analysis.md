# Step 1: Artifact analysis

## Goal

Understand what the artifact really says, what it leaves implicit, and what it does not say. No scenario is written in this step.

## What to extract

- **Actors and profiles:** who interacts, with which permissions.
- **Business goal:** the value the feature delivers.
- **Business rules:** conditions, calculations, limits, deadlines, restrictions.
- **Data involved:** inputs, initial states, reference data.
- **Expected results:** what the system does, shows, or records.
- **Messages and communications:** whether the text is defined or only the intent.
- **Constraints and dependencies:** integrations, other features, order of execution.

## Mandatory classification

Every relevant piece of information receives a classification:

| Class | Meaning | Handling |
|---|---|---|
| **Explicit** | It is written in the artifact. | Can become a scenario. Indicate the origin (excerpt or criterion). |
| **Derivable** | It follows logically from what is written. | Can become a scenario, with the justification recorded. Flag it for validation. |
| **To investigate** | Gap, ambiguity, or contradiction. | Does not become an affirmative scenario. Becomes a question or hypothesis. |

How to decide between derivable and to investigate: if two reasonable people could conclude different behaviors from the same text, it is to investigate. Derivable requires that the conclusion be the only one consistent with what is written.

## Critical reading: questions to ask the artifact

- Does each term have a single meaning? ("valid", "active", "recent", "large" are vague.)
- Are there criteria without a defined value (deadline, percentage, limit, quantity)?
- What happens when the condition is **not** met? Does the artifact only describe the happy path?
- Are there rules that contradict each other between criteria, between the story and the ticket, or between screens and text?
- Are there passive verbs that hide the actor ("the coupon is applied", by whom?)
- Are there untestable criteria ("the system must be secure", "fast")? Which observable behavior makes them concrete?
- Does the artifact mention states (draft, active, canceled)? Which transitions are allowed?
- Are there rules that depend on time, on history, or on other user data?

## Rules of conduct

- **Do not fill gaps with what "usually is".** If the artifact does not say, it is not defined.
- If an example in the artifact conflicts with the described rule, record the contradiction; do not pick a side.
- Preserve the domain terms used by the business. Do not swap them for technical synonyms.
- If the material comes from a ticket with implementation details (fields, endpoints), extract the business rule behind it and ignore the mechanism.

## Output of the step

Fill in `assets/templates/artifact-analysis.md` with:
1. Summary of the goal and the actors.
2. Rules table (with classification and origin).
3. Ambiguities, gaps, and contradictions found.
