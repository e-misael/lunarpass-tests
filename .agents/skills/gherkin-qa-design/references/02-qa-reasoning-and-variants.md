# Step 2: QA reasoning and variant exploration

## Goal

Discover everything that **changes** the expected behavior. Product usually describes the happy path. QA adds what changes the result: conditions, states, data, time, and failures.

## Exploration axes

Go through each axis and ask whether it changes the behavior in this feature. If it does not, discard it and record that.

**Actors and profiles**
- Do different profiles see or do different things? Is there a profile without permission?
- Does the behavior depend on who acts and on who is affected (actor and subject)?

**Initial state**
- Which states of the main object exist (new, active, suspended, canceled, expired)?
- What changes when the state is empty, minimum, maximum, or already processed?

**Data and values**
- Which inputs have ranges, formats, required status, or uniqueness?
- Are there values at the boundaries of a rule (minimum limit, maximum, equal, just below, just above)?

**History and relationship**
- Does the behavior depend on what the user has already done (single use, limit per period, first purchase)?
- Does it depend on other objects (cart, order, account, plan)?

**Time**
- Are there deadlines, validity, windows, schedules, time zones?
- What happens exactly at the instant of the boundary?

**Order and repetition**
- Does the order of actions change the result? Does repeating the action have an effect (duplication)?
- Does changing something **after** a completed action invalidate the previous result?
- Does undoing, canceling, or removing return to the original state?

**Failures and exceptions**
- What happens if an external service or the database is unavailable?
- What does the user see when the operation fails midway? Is there a partial effect?
- User errors: invalid input, action not allowed, expired session.

**Concurrency**
- Two users or two tabs acting on the same resource at the same time?
- A limited resource (stock, seats, quotas) that runs out during the action?

**Communication**
- Is the user informed of the result and the reason? Is there a notification, record, or audit trail?

## How to record

For each candidate variant, note in `assets/templates/variant-map.md`:
- the variant (what changes);
- the axis of origin;
- the artifact rule that supports it (or "no rule defined", which generates a question);
- the provisional decision: **scenario**, **group into outline**, **discard** (with reason), or **investigate**.

## Beware of invention

Exploring variants is imagining possibilities. **Writing the expected behavior** of those variants is only allowed when there is a defined or derivable rule. Without a rule, the variant becomes a question ("What should happen when X?"), not a scenario with an invented result.
