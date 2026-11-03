# Mechanical conversion vs. QA reasoning

Comparison pairs to calibrate what this skill should avoid and what it should do.

## Pair 1: simple acceptance criterion

**Criterion received:** "If I enter a coupon that cannot be used, I receive a clear message and the purchase value does not change."

### Mechanical conversion (avoid)

**Scenario:** Invalid coupon  
**Given** I have an invalid coupon  
**When** I apply the coupon  
**Then** I receive a clear message  
**And** the purchase value does not change

**Problems:**
- "Invalid coupon" is vague and covers different reasons (nonexistent, expired, minimum, single use) that are distinct rules.
- The **Given** brings the coupon as if it were context, but the cart and its value are absent, so "the value does not change" is not verifiable.
- "Clear message" does not say what the user needs to understand.
- A single scenario, and the defect would pass in four of the five reasons.

### QA reasoning (do)

1. "Cannot be used" has which defined reasons? Nonexistent, expired, minimum, single use.
2. Each reason is a distinct class with a distinct observable result (the reason informed).
3. The text of the message is not defined: describe the intent, do not invent the text.
4. Boundaries (exact minimum, last day) are not defined: ask.

**Result:** one scenario per reason, with the cart and value explicit, and questions for the boundaries. Example of the expired scenario:

**Scenario:** Apply a coupon outside the validity period  
**Given** my cart has R$ 200 in products  
**When** I apply a coupon that has already expired  
**Then** I must be informed that the coupon is outside the validity period  
**And** the total of my purchase must remain R$ 200

## Pair 2: imperative style

### Avoid

**Given** I navigate to the login page  
**And** I type "cliente@email.com" into the email field  
**And** I click the "Entrar" button  
**Then** I see the text "Bem-vindo, Cliente"

### Do

**Given** I have an active account  
**When** I authenticate with valid credentials  
**Then** I must have access to my main dashboard

**Why:** actions in the **When**, intent instead of screen interaction, resilient to layout changes.

## Pair 3: gap in the artifact

**Criterion received:** "The coupon requires a minimum purchase."

### Avoid (inventing the rule)

**Scenario:** Coupon with a cart of exactly R$ 100  
**Given** the coupon requires a minimum purchase of R$ 100  
**And** my cart has R$ 100 in products  
**When** I apply the coupon  
**Then** the discount must be applied

**Problem:** the artifact does not say whether the minimum is inclusive. The scenario asserts a behavior that nobody defined and can be read as a business decision.

### Do

Do not write the scenario. Record the question: "With a cart of exactly the minimum value, is the coupon valid?" After Product's answer, the scenario is written with the confirmed rule.

## Pair 4: redundancy

### Avoid

Separate scenarios for "cart of R$ 200" and "cart of R$ 300" with a valid 10% coupon, without a rule that differentiates the two.

### Do

A single representative scenario for the "valid coupon" class. Record the discard of the equivalent variant in the variant map.
