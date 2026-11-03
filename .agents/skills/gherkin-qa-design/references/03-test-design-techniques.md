# Step 3: Test design techniques

## Index

1. How to choose the technique
2. Equivalence classes
3. Boundary values
4. Decision table (business rules and combinations)
5. State transition
6. Combinations (pairwise)
7. Alternative and exception flows
8. Complementary heuristics
9. From example to scenario: avoiding redundancy

## 1. How to choose the technique

Choose by the **nature of the rule**, not by habit. Use a technique only if there is a rule that justifies it.

| If the rule... | Use |
|---|---|
| accepts ranges or categories of input | equivalence classes + boundary values |
| depends on several conditions at the same time | decision table |
| changes according to the state of the object | state transition |
| has many independent factors | combinations (pairwise) |
| describes the ideal behavior | alternative and exception flows for what deviates from it |

A single rule can combine techniques (for example, classes + boundaries).

## 2. Equivalence classes

**Idea:** divide the inputs into groups that the system treats the same way. One example from each group represents the whole group.

**How to apply**
- Identify the **valid** and **invalid** classes of each condition.
- Choose **one** representative example per class.
- Do not write two scenarios for the same class, unless they verify different results.

**Attention:** classes only exist where the artifact defines the criterion for belonging to them. If the criterion is not defined (what is an "invalid" coupon?), record the doubt.

## 3. Boundary values

**Idea:** defects concentrate at the boundaries of ranges.

**How to apply**
- For each defined boundary, consider: just below, exactly at the limit, and just above.
- Prioritize the example that exposes the inclusion criterion (is the rule "from" or "above"?).
- If the boundary value is not defined, **do not choose one**: ask.

**Example of reasoning:** "minimum purchase of R$ 100". The decisive case is the cart with exactly R$ 100, because it reveals whether the minimum is inclusive. If the artifact does not say, that case becomes a question and not a scenario.

## 4. Decision table

**Idea:** list the conditions and the combinations that lead to each result, to cover rules with several conditions without forgetting cases.

**How to apply**
1. List the conditions (true or false).
2. Enumerate the relevant combinations.
3. Indicate the expected result of each combination **only if the rule defines it**.
4. Eliminate impossible or equivalent combinations and record the reason.
5. Combinations without a defined result become questions.

When several rows verify the same rule with different data, use a **Scenario Outline** with examples (see reference 04).

## 5. State transition

**Idea:** the behavior depends on the current state and the event.

**How to apply**
- List the states and the events.
- For each (state, event) pair, ask: allowed? What is the new state? What is the effect?
- Cover at least one valid transition per relevant state and the **forbidden** transitions that the artifact defines.
- (State, event) pairs without a definition become questions.

## 6. Combinations (pairwise)

**Idea:** when there are many independent factors, testing all combinations is unfeasible. Covering all **pairs** of values tends to find most interactions.

**How to apply**
- Use only with truly independent factors and no rule relating them.
- If a rule exists between factors, prefer a decision table.
- In the specification, group into a Scenario Outline and keep the examples table short.

## 7. Alternative and exception flows

**Alternative flow:** another valid path to the same goal (different profile, different way of paying).

**Exception flow:** something goes wrong or is forbidden.
- Invalid input or input outside what is allowed.
- Action without permission.
- System failure ("Given that the service is unavailable...").
- Interruption in the middle of the operation.
- Resource exhausted or already consumed.
- Time expired.

For each exception, describe what the user observes and what must **not** change (for example, the purchase value stays the same). The exact text of the message only enters if it is defined.

## 8. Complementary heuristics

- **Zero, one, many:** no items, one item, several items.
- **Empty, null, maximum:** absence of data, data at the maximum allowed.
- **Before and after:** the effect of changing something after a completed action.
- **Undo:** does removing or canceling lead back to the original state?
- **Repetition:** performing the same action twice.
- **Order:** swapping the order of two independent actions.
- **Persistence:** does the result remain after reloading, leaving, and coming back?
- **Permission:** what can and cannot each profile do?

## 9. From example to scenario: avoiding redundancy

Before becoming a scenario, each example goes through three questions:

1. **What rule does this example verify?** If there is no rule, there is no scenario.
2. **Does another example already verify the same rule in the same way?** If so, discard.
3. **Could this example fail on its own?** If a defect would go unnoticed without it, keep it.

Record the decisions in the variant map: **scenario**, **outline**, **discarded (reason)**, or **investigate**.
