# Step 5: Specification review

Review before delivering. Fix whatever fails. The checklist combines the team guide with the QA checks of this skill.

## Collaboration checklist

- [ ] Are the scenarios ready to be discussed among Product, DEV, and QA (Three Amigos)?
- [ ] Is the text understandable by anyone on the team, without technical knowledge?
- [ ] Besides the happy path, are there exceptions, system failures, and edge cases (when the rules support them)?

## Writing checklist

- [ ] Is the scenario **declarative**, without URLs, ids, clicks, fields, or tags?
- [ ] Does the **Given** bring only context and precondition, and are the user's actions in the **When**?
- [ ] Does the **Then** validate an observable system result?
- [ ] Is it in the **first person**, or is the actor of each step clear when there are several?
- [ ] Does each scenario verify **one behavior**?
- [ ] Does the scenario name describe the rule verified?
- [ ] Does the **Background** contain only what is common to all scenarios?
- [ ] Are messages described by the business, without invented text?

## QA reasoning checklist

- [ ] **No rule was invented.** Every value, deadline, percentage, and result has its origin in the artifact or is derivable with justification.
- [ ] Scenarios based on a derivable rule are marked as **hypothesis to validate**.
- [ ] Everything that is ambiguous, missing, or contradictory is in the **questions for the Three Amigos**, and not hidden in a scenario.
- [ ] Every explicit rule has at least one scenario that covers it (traceability).
- [ ] Each scenario points to a rule or criterion of origin.
- [ ] There is no **redundancy**: no pair of scenarios verifies the same rule in the same way.
- [ ] Discarded variants have a recorded reason.
- [ ] Boundaries defined by the artifact were explored (boundary values).
- [ ] Relevant combinations of conditions were considered (decision table).
- [ ] Defined states and transitions were covered, including the forbidden ones.

## Team reading checklist

- [ ] Can DEV read it and understand what to build, putting themselves in the shoes of the user?
- [ ] Can QA read it and understand what to test, without depending on screen details?

## How to fix common problems

| Problem | Fix |
|---|---|
| Step mentions a button, field, or URL | Rewrite as business intent |
| User action in the **Given** | Move to the **When** |
| Scenario verifies two rules | Split into two scenarios |
| Two equivalent scenarios | Keep the most representative and record the discard |
| Value or message without origin | Remove the concrete value and create a question |
| Scenario with an assumed result | Replace with a marked hypothesis or move to the questions |
| Several actors confused with "I" | Name the actor in each step |

## Review delivery

At the end, report in one or two sentences what was adjusted in the review and how many questions remain open for the Three Amigos.
