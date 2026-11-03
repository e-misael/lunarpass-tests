# Full example: discount coupon in the shopping cart

> The business rules below are **illustrative**, taken from the team guide. In a real case, they would be defined by the team in the Three Amigos.

## Artifact received

**Title:** Apply discount coupon to the cart

**As a** customer of the online store, **I want to** apply a discount coupon to my shopping cart, **so that** I pay less for the products I want to buy.

**Acceptance criteria:**
- A valid coupon reduces the total value of my purchase.
- If I enter a coupon that cannot be used, I receive a clear message explaining the reason and the purchase value does not change.
- I can remove the coupon and return to the original value.
- The discount always reflects the current state of my cart.

**Rules considered:**
- The example coupon grants a 10% discount on the value of the products.
- The coupon is only valid within the validity period.
- The coupon may require a minimum purchase value.
- Some coupons are single-use per customer.

## Step 1: Artifact analysis

| # | Rule or information | Class | Origin | Note |
|---|---|---|---|---|
| R1 | A valid coupon reduces the purchase total | Explicit | Criterion 1 | |
| R2 | The example coupon gives 10% on the value of the products | Explicit | Rules | Calculation base: products. Shipping is not mentioned |
| R3 | The coupon is only valid within the validity period | Explicit | Rules | |
| R4 | The coupon may require a minimum purchase value | Explicit | Rules | |
| R5 | Single-use coupon per customer | Explicit | Rules | |
| R6 | Coupon that cannot be used: message with the reason and total unchanged | Explicit | Criterion 2 | Message text not defined |
| R7 | Removing the coupon returns the original value | Explicit | Criterion 3 | |
| R8 | The discount reflects the current state of the cart | Explicit | Criterion 4 | It follows that changing the cart recalculates the discount |
| R9 | A nonexistent coupon is "cannot be used" | Derivable | Criterion 2 | Justification: a coupon that does not exist cannot be used |
| R10 | If the cart falls below the minimum, the coupon stops being valid | Derivable | Criterion 4 + R4 | Justification: the discount reflects the current cart and the minimum is a condition of the coupon |

**Gaps identified** (to investigate): behavior exactly at the minimum value; behavior on the last day of validity; combining more than one coupon; shipping and the discount; rounding of cents; repeated coupon in the same cart.

## Step 2: Variant map

| # | Variant | Axis | Rule | Technique | Decision |
|---|---|---|---|---|---|
| V1 | Valid coupon, R$ 200 cart | Data | R1, R2 | Valid class | Scenario |
| V2 | Nonexistent coupon | Data | R9, R6 | Invalid class | Scenario |
| V3 | Expired coupon | Time | R3, R6 | Invalid class | Scenario |
| V4 | Cart below the minimum | Data | R4, R6 | Invalid class + boundary | Scenario |
| V5 | Single-use coupon already used | History | R5, R6 | Invalid class | Scenario |
| V6 | Remove applied coupon | Undo | R7 | State | Scenario |
| V7 | Reduce cart below the minimum after applying | Before and after | R10 | State transition | Scenario (with hypothesis) |
| V8 | Cart exactly at the minimum value | Boundary | R4 | Boundary value | Investigate (P1) |
| V9 | Last day of validity | Time | R3 | Boundary value | Investigate (P2) |
| V10 | Two coupons in the same cart | Combination | no rule | | Investigate (P3) |
| V11 | Discount and shipping | Data | no rule | | Investigate (P4) |
| V12 | Apply another valid coupon with the same rule and a R$ 300 cart | Data | R1, R2 | Valid class | Discarded: equivalent to V1 |

## Step 3: Techniques applied

- **Equivalence classes:** one valid class (V1) and the defined invalid classes: nonexistent, expired, below the minimum, single-use already used. One example per class. V12 was discarded for being in the same class as V1.
- **Boundary values:** the limits (minimum and last day of validity) exist, but the rule does not say whether they are inclusive. I did not choose a side: they became questions P1 and P2.
- **State transition:** coupon applied, removed, and invalidated by a change in the cart (V6 and V7).
- **Decision table:** not applied. Each reason for refusal is independent and the rule does not define priority among simultaneous reasons, which became question P5.

## Step 4: Specification

**Feature:** Discount coupon in the cart

### Main path

**Scenario:** Apply a valid coupon  
*Rule of origin: R1, R2*  
**Given** my cart has R$ 200 in products  
**When** I apply a valid 10% discount coupon  
**Then** I must see the R$ 20 discount in the cart summary  
**And** the total of my purchase must be R$ 180

**Scenario:** Remove an applied coupon  
*Rule of origin: R7*  
**Given** I have applied a valid 10% discount coupon to a R$ 200 cart  
**When** I remove the coupon  
**Then** the discount must no longer appear in the cart summary  
**And** the total of my purchase must return to R$ 200

### Coupons that cannot be used

**Background:**  
**Given** my cart has R$ 200 in products

**Scenario:** Apply a nonexistent coupon  
*Rule of origin: R9, R6*  
*Hypothesis to validate: a nonexistent coupon is treated as a coupon that cannot be used*  
**When** I apply a coupon that does not exist  
**Then** I must be informed that the coupon is invalid  
**And** the total of my purchase must remain R$ 200

**Scenario:** Apply a coupon outside the validity period  
*Rule of origin: R3, R6*  
**When** I apply a coupon that has already expired  
**Then** I must be informed that the coupon is outside the validity period  
**And** the total of my purchase must remain R$ 200

**Scenario:** Apply a single-use coupon that I have already used  
*Rule of origin: R5, R6*  
**Given** I have already used a single-use coupon in a previous purchase  
**When** I apply that same coupon again  
**Then** I must be informed that the coupon has already been used  
**And** the total of my purchase must remain R$ 200

### Minimum purchase value

**Scenario:** Apply a coupon whose minimum purchase value has not been reached  
*Rule of origin: R4, R6*  
**Given** my cart has R$ 50 in products  
**And** the coupon requires a minimum purchase of R$ 100  
**When** I apply this coupon  
**Then** I must be informed of the minimum value required to use it  
**And** the total of my purchase must remain R$ 50

**Scenario:** Lose the right to the coupon by reducing the cart below the minimum value  
*Rule of origin: R8, R10*  
*Hypothesis to validate: the coupon stops being valid when the cart falls below the required minimum*  
**Given** I have applied a coupon with a minimum purchase of R$ 100 to a R$ 120 cart  
**When** I remove a product and my cart now has R$ 70  
**Then** I must be informed that the coupon is no longer valid for this cart  
**And** the total of my purchase must be R$ 70, with no discount

## Step 5: Review and questions for the Three Amigos

**Review:** all scenarios are declarative, with actions in the **When**, in the first person, and with one behavior each. Messages were described by the business, without fixed text. No boundary value was assumed.

| # | Question or hypothesis | Why it matters | Related | Who decides |
|---|---|---|---|---|
| P1 | Is the minimum value inclusive? With a cart of exactly R$ 100, is the coupon valid? | Defines the result at the limit | R4, V8 | Product |
| P2 | Is the coupon valid throughout the last day of validity? | Defines the result at the time limit | R3, V9 | Product |
| P3 | Can I apply more than one coupon to the same cart? | Without a rule, the behavior is undefined | V10 | Product |
| P4 | Does the 10% discount also apply to shipping? | The text says "value of the products", but shipping is not mentioned | R2, V11 | Product |
| P5 | If more than one reason for refusal happens at the same time, which reason is informed? | Defines which message appears | R6 | Product and DEV |
| P6 | How should rounding of cents in the discount be handled? | Affects the total on non-round values | R2 | Product and DEV |
| P7 | Hypothesis: a nonexistent coupon is treated as a coupon that cannot be used (R9). Is that right? | Supports the nonexistent coupon scenario | R9 | Product |
| P8 | Hypothesis: when the cart is reduced below the minimum, the coupon is invalidated (R10). Is that right? | Supports the cart change scenario | R10 | Product |
