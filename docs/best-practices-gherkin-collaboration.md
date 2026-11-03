# Gherkin Best Practices as a Collaboration Tool

## 1. Purpose of this document

This document gathers the discussions, decisions, and arguments about the use of Gherkin in quality-driven software development, turned into practical guidelines for Product, DEV, and QA teams.

The central idea guiding all the guidelines below:

> Gherkin is a **collaboration** tool for developing software with quality. It serves to align the team on the expected behavior of the software, with a focus on the business.

---

## 2. What is Gherkin

Gherkin is a human-readable domain-specific language (DSL), created to describe the behavior of software. It uses simple keywords (**Given**, **When**, **Then**) to document business rules in a way that anyone on the team can understand and validate.

Typical structure of a scenario:

**Feature:** ATM Withdrawal  
**Scenario:** Withdrawal with sufficient balance  
**Given** the customer has R$ 500 in the account  
**When** they request a withdrawal of R$ 100  
**Then** the ATM must dispense the cash  
**And** the account balance must be updated to R$ 400

---

## 3. Principle 1: Gherkin is a common language for the team

**Guideline:** use Gherkin first to align business expectations and create shared understanding across disciplines.

**In practice:**

- Gherkin fulfills its role in refinement, in alignment meetings, and in guiding exploratory testing.
- It works as a visual quality contract for the team.
- Everyone reads the same file, and each discipline extracts a different value from it (see Principle 2).

**Note recorded in the conversation:** this view is based on practical QA experience, and the argument does not depend on universal agreement. It is a position grounded in experience.

---

## 4. Principle 2: What each role gains from Gherkin

| Role | Main focus | Greatest benefit |
|---|---|---|
| Product (PO/PM) | Business rules and delivered value | Translates vague requirements into absolute acceptance criteria |
| Development | Implementation and architecture | Receives clear specifications that guide the creation of the code |
| Quality (QA) | Scenario coverage | Gains a structured basis to plan and execute tests |

### 4.1 Product view (the "What")

For PM and PO, Gherkin is a communication tool and a scope contract.

- **Living documentation:** replaces lengthy, outdated requirements documents with real usage scenarios.
- **Clear acceptance criteria:** eliminates ambiguity. Instead of asking for "the system must be secure", Product defines exact scenarios, such as the password lockout scenario.
- **Business alignment:** allows stakeholders to validate the system's logic before a single line of code is written.

### 4.2 DEV view (the "How")

- **Code guidance:** the scenarios dictate which states and behaviors the feature needs to support, helping to structure architecture and logic.
- **Reading to develop:** DEV reads the Gherkin to know what to build, and QA reads the same Gherkin to test.

### 4.3 QA view (the "Assurance")

- **Shift-left:** QA does not wait for the software to be ready. They write and review scenarios together with Product and DEV during planning, preventing defects before development.
- **Standardization:** replaces manual test case spreadsheets with structured, reusable specifications.
- **Edge cases:** while Product tends to focus on the happy path, QA uses Gherkin to map exceptions, system failures, and alternative scenarios (for example: "Given that the database is down...").

---

## 5. Principle 3: Specify together, with the "Three Amigos" rule

**Guideline:** the power of Gherkin is not in who writes it, but in the collaboration.

- The best teams hold quick meetings called **Three Amigos** (Product, DEV, and QA).
- The goal is to discuss and write the scenarios together **before the sprint starts**.
- Expected result: the three views aligned before development begins.

---

## 6. Principle 4: Specify with a business focus and read to act

Workflow recorded in the conversation:

1. **Specify in Gherkin with a business focus.**
2. **Read the Gherkin to develop**, in the case of DEV.
3. **Read the Gherkin to test**, in the case of QA.

The same text guides both disciplines. For this reason, it needs to speak the language of the business, not that of the implementation.

---

## 7. Principle 5: Prefer the declarative style over the imperative

### 7.1 Difference between the styles

- **Imperative (focus on the "HOW"):** details step by step the technical interactions with the interface (clicks, fields, URLs).
- **Declarative (focus on the "WHAT"):** abstracts away screen details and focuses on the business rule, the user's intent, and the domain language.

**Imperative example:**

**Feature:** User Authentication  
**Scenario:** Log in successfully  
**Given** I navigate to the page "https://app.empresa.com/login"  
**And** I type "cliente@email.com" into the field with id "email-input"  
**And** I type "Senha123!" into the field with id "password-input"  
**And** I click the button "Entrar"  
**Then** I must be redirected to the URL "https://app.empresa.com/dashboard"  
**And** I must see the element "h1" with the text "Bem-vindo, Cliente"

**Declarative example:**

**Feature:** User Authentication  
**Scenario:** Log in successfully  
**Given** the customer has an active account  
**When** they authenticate with valid credentials  
**Then** they must have access to their main dashboard

### 7.2 Why declarative is the better approach

- **Business focus:** PO/PM and stakeholders think in terms of intent ("authenticate with valid credentials"), not `id="email-input"` or "I click the button". The declarative style keeps the document accessible to anyone in the company.
- **Resistance to change:** if design changes the login layout, turns the form into two steps, or changes button IDs:
  - in the imperative format, the scenario breaks and needs to be rewritten, generating documentation rework;
  - in the declarative format, the business rule remains intact, because the expected behavior has not changed.
- **Readability and conciseness:** the imperative style produces long, repetitive scenarios. The declarative style condenses the intent into a few lines, making review and communication easier.
- **Risk of the imperative style:** it turns Gherkin into a "test script disguised as text", nullifying much of the collaboration and living documentation value.

---

## 8. Principle 6: Respect the semantics of Given, When, and Then

Central point raised in the discussion: **filling out a form is not a precondition**.

| Keyword | What it represents | Example |
|---|---|---|
| **Given** | Initial state and context | Being on the login page |
| **When** | User action or triggered event | Filling out the form and clicking |
| **Then** | Consequence or expected result | Redirection and display of the text |

**Guideline:** user actions belong in the **When**, not in the **Given**.

**Separate two discussions that are often confused:**

1. **Logical structure** (Given x When x Then): defines the role of each step.
2. **Level of detail** (technical x business): defines whether the scenario is imperative or declarative.

A scenario can have the correct logical structure and still be imperative, if it describes the interface at code level (full URLs, HTML element ids, tags such as `h1`).

**Example with the correct structure and business level (declarative):**

**Feature:** User Authentication  
**Scenario:** Log in successfully  
**Given** I access the login page  
**When** I submit my valid credentials  
**Then** I must be directed to the main dashboard

Note that the logical structure is maintained: access is the context (**Given**), filling in is the action (**When**), and the system's response is the validation (**Then**). If DEV changes `id="email-input"` to `id="username"` or swaps `h1` for `h2`, the scenario does not break or need to be rewritten.

---

## 9. Principle 7: Write in the first person

**Guideline:** always specify in the first person ("I"), so that DEV, when reading the scenario, can put themselves in the shoes of whoever will use the software.

**Benefits identified:**

- **Empathy and user-centered design:** when reading "When I request the cancellation...", DEV is invited to think about emotional impact, response time, and clarity of messages.
- **Continuity with the user story:** the classic User Story structure already uses the first person, which creates a natural bridge between backlog and scenarios.
- **Scenario as a narrative of human experience**, rather than a cold system instruction.

**Point of attention:** in systems with **multiple actors or profiles** interacting in the same feature (for example, an Administrator approves the registration made by a Customer), "I" alone can generate ambiguity about the point of view of each step. In these cases, some teams use specific personas in the third person (e.g., "Given that the Customer..." or "Given that Ana (Sales Manager)...").

**Practical rule:** if the context of the scenario is clear, the first person is a strong humanizing resource. If there is more than one actor in the same scenario, consider making explicit who is acting.

The final criterion: the goal is not to please academic syntax rules, but to create **shared understanding**. If the first person makes the DEV team develop with more empathy and focus on the user, the choice has achieved its goal.

---

## 10. Usage examples: discount coupon in the shopping cart

This section applies the practices of the document to an e-commerce feature. The business rules below are **illustrative**, created only to serve as an example. In a real case, they would be defined by the team in the Three Amigos conversations.

### 10.1 User story

**Title:** Apply discount coupon to the cart

**As a** customer of the online store,  
**I want to** apply a discount coupon to my shopping cart,  
**so that** I pay less for the products I want to buy.

**Acceptance criteria (in business language):**

- A valid coupon reduces the total value of my purchase.
- If I enter a coupon that cannot be used, I receive a clear message explaining the reason and the purchase value does not change.
- I can remove the coupon and return to the original value.
- The discount always reflects the current state of my cart.

**Business rules considered in the examples:**

- The example coupon grants a 10% discount on the value of the products.
- The coupon is only valid within the validity period.
- The coupon may require a minimum purchase value.
- Some coupons are single-use per customer.

### 10.2 Scenarios

#### Scenario 1: Apply a valid coupon

**Feature:** Discount coupon in the cart  
**Scenario:** Apply a valid coupon  
**Given** my cart has R$ 200 in products  
**When** I apply a valid 10% discount coupon  
**Then** I must see the R$ 20 discount in the cart summary  
**And** the total of my purchase must be R$ 180

#### Scenario 2: Try to apply a coupon that does not exist

**Scenario:** Apply a nonexistent coupon  
**Given** my cart has R$ 200 in products  
**When** I apply a coupon that does not exist  
**Then** I must be informed that the coupon is invalid  
**And** the total of my purchase must remain R$ 200

#### Scenario 3: Try to apply an expired coupon

**Scenario:** Apply a coupon outside the validity period  
**Given** my cart has R$ 200 in products  
**When** I apply a coupon that has already expired  
**Then** I must be informed that the coupon is outside the validity period  
**And** the total of my purchase must remain R$ 200

#### Scenario 4: Try to apply a coupon without reaching the minimum value

**Scenario:** Apply a coupon whose minimum purchase value has not been reached  
**Given** my cart has R$ 50 in products  
**And** the coupon requires a minimum purchase of R$ 100  
**When** I apply this coupon  
**Then** I must be informed of the minimum value required to use it  
**And** the total of my purchase must remain R$ 50

#### Scenario 5: Try to reuse a single-use coupon

**Scenario:** Apply a single-use coupon that I have already used  
**Given** I have already used a single-use coupon in a previous purchase  
**And** my cart has R$ 200 in products  
**When** I apply that same coupon again  
**Then** I must be informed that the coupon has already been used  
**And** the total of my purchase must remain R$ 200

#### Scenario 6: Remove an applied coupon

**Scenario:** Remove the coupon from the cart  
**Given** I have applied a valid 10% discount coupon to a R$ 200 cart  
**When** I remove the coupon  
**Then** the discount must no longer appear in the cart summary  
**And** the total of my purchase must return to R$ 200

#### Scenario 7: Change the cart after applying the coupon

**Scenario:** Lose the right to the coupon by reducing the cart below the minimum value  
**Given** I have applied a coupon with a minimum purchase of R$ 100 to a R$ 120 cart  
**When** I remove a product and my cart now has R$ 70  
**Then** I must be informed that the coupon is no longer valid for this cart  
**And** the total of my purchase must be R$ 70, with no discount

### 10.3 Why these examples follow the best practices

- **Declarative:** no scenario mentions buttons, fields, URLs, or screen elements. They speak of intent ("I apply a coupon"), so they remain valid even if the cart layout changes.
- **Actions in the When:** applying and removing a coupon, or removing a product, are actions of mine, which is why they always appear in the **When**. The **Given** brings only the initial state (the cart, the already applied coupon, or the usage history).
- **First person:** "my cart", "I apply", "I must be informed" invite DEV to put themselves in the shoes of the person who is buying.
- **Edge cases, beyond the happy path:** Scenarios 2 to 5 and 7 cover exceptions and alternative situations, which is where QA adds value in the specification.
- **One behavior per scenario:** each scenario verifies a single business rule, which makes review easier in the Three Amigos.
- **Messages described by the business:** the scenarios say that the customer must be informed of the reason, without fixing the exact text of the message. The text can be refined with Product without rewriting the scenario.

---

## 11. Best practices checklist

**Collaboration**

- [ ] Were the scenarios discussed among Product, DEV, and QA (Three Amigos) before the sprint?
- [ ] Is Gherkin serving as a common language, understandable by anyone on the team?
- [ ] Do the scenarios also include exceptions, system failures, and edge cases, and not just the happy path?

**Writing**

- [ ] Is the scenario declarative (focused on the "what"), without URLs, element ids, clicks, or HTML tags?
- [ ] Does the **Given** bring context and precondition, and are the user's actions in the **When**?
- [ ] Does the **Then** validate an expected system result?
- [ ] Is the scenario in the first person (or, with several actors, is the actor of each step clear)?
- [ ] Is the scenario short and free of unnecessary repetition?

**Team reading**

- [ ] Can DEV read the scenario and understand what to build, putting themselves in the shoes of the user?
- [ ] Can QA read the scenario and understand what to test, without depending on screen details?

---

## 12. Summary of decisions

| Topic | Decision |
|---|---|
| Role of Gherkin | Collaboration tool and common language of the team |
| Focus of the specification | Business |
| Reading the scenario | DEV reads to develop, QA reads to test |
| Writing style | Declarative (focus on the "what") |
| User actions | In the **When**, not in the **Given** |
| Point of view | First person, with attention to multi-actor scenarios |
| When to write | Together (Three Amigos), before the sprint |