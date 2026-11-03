# Specification: [feature name]

**Source:** [story, ticket, or document analyzed]

**Feature:** [feature name in business language]  
[Optional: user story in the first person: **As a** [role], **I want to** [goal], **so that** [value].]

**Background:**  
**Given** [initial state common to all scenarios]  
**And** [another common state, if any]

## Main path

**Scenario:** [rule verified, in business language]  
*Rule of origin: R1*  
**Given** [initial state]  
**When** [my action or event]  
**Then** [observable result]  
**And** [another aspect of the same result]

## Exceptions and edge cases

**Scenario:** [rule verified]  
*Rule of origin: R2*  
**Given** [initial state]  
**When** [my action]  
**Then** [result: I am informed of the reason]  
**And** [what does not change]

**Scenario Outline:** [rule verified with varied data]  
*Rule of origin: R3*  
**Given** [state with <variable>]  
**When** [my action]  
**Then** [result with <result>]

**Examples:**

| variable | result |
|---|---|
| [value] | [result] |
| [value] | [result] |

## Hypothesis-based scenarios

**Scenario:** [derivable rule]  
*Hypothesis to validate: [justification for the deduction]*  
**Given** ...  
**When** ...  
**Then** ...

## Traceability

| Rule | Scenarios |
|---|---|
| R1 | [names] |
| R2 | [names] |
| R3 | Pending (see question P1) |
