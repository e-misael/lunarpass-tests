# Adherence Analysis for Test Automation

The objective of this analysis is to evaluate whether the application elements provide sufficiently stable attributes, semantics, and identifiers to build reliable automated tests with Playwright.

The general recommendation is to prioritize, in this order:

1. Semantic HTML elements.
2. `role` + accessible name.
3. Associated `label`.
4. Stable functional attributes such as `href`.
5. `data-testid` when there is no reliable semantic way to locate the element.

Selectors that depend on the internal structure of the DOM, such as XPath using `/..`, or relying exclusively on CSS classes, should be avoided.

---

# Home Page

## Button "Search missions"

### Current situation

The element uses the HTML `button` tag and has the text `"Search missions"`.

### Assessment

**Suitable for automation.**

This allows building a semantic and highly reliable locator:

```ts
page.getByRole('button', { name: 'Search missions' })
```

### Request

No changes are required.

---

## Selection of lunar bases

### Current situation

The lunar base name is available in a `span`.

At present, it is possible to locate the base text and navigate through the DOM structure using XPath with `/..` until reaching the `label`.

### Assessment

**It works, but it is not a good strategy for automation.**

Selectors that depend on the structural relationship between elements become tightly coupled to the HTML and can break with small layout changes or refactors.

Example that should be avoided:

```xpath
//span[text()="Alpha"]/..
```

### Request

Properly associate the base text with the respective `input` using `label`.

Expected example:

```html
<label>
  <input type="checkbox" value="alpha" />
  Alpha
</label>
```

or:

```html
<input id="base-alpha" type="checkbox" value="alpha" />
<label for="base-alpha">Alpha</label>
```

This would allow using:

```ts
page.getByRole('checkbox', { name: 'Alpha' })
```

or:

```ts
page.getByLabel('Alpha')
```

This approach is more resilient to changes in the DOM structure.

---

## Sorting missions by date

### Current situation

A standard HTML `select` with `option` elements is used.

The element also has an `id`.

### Assessment

**Suitable for automation.**

Using a native `select` greatly simplifies testing with Playwright.

If there is a correctly associated `label`, the ideal locator would be:

```ts
page.getByLabel('Sort by')
```

followed by:

```ts
selectOption(...)
```

### Request

Ensure that the `select` has an associated `label`.

The `id` may remain, but it should not be the only identification strategy available for the component.

---

# Results Page (`/missions`)

## Button "Refine"

### Current situation

The element uses the `button` tag and has the text `"Refine"`.

### Assessment

**Suitable for automation.**

This allows using:

```ts
page.getByRole('button', { name: 'Refine' })
```

### Request

No changes are required.

---

# Filters

## Lunar base filter

### Current situation

The component has identifiers that allow locating the individual options.

### Assessment

**Good level of adherence for automation.**

### Request

Use this component as a reference for standardizing the other selection boxes in the application.

In addition to visual consistency, standardizing components reduces the number of different strategies required in the automation suite.

---

## Sort by

### Current situation

It uses a standard HTML `select`.

### Assessment

**Suitable for automation.**

### Request

Ensure only that there is a `label` associated with the `select`, allowing use of:

```ts
page.getByLabel('Sort by')
```

---

# Mission List

## List structure

### Current situation

Missions are shown within a `ul`, with each mission represented by an `li`.

### Assessment

The semantic structure of the list is correct.

However, there is currently no simple and deterministic way to locate a specific mission by its code directly in the element representing the item.

### Request

Add a stable identifier related to the mission code to the root element of each mission.

Example:

```html
<li data-testid="mission-LP-0127A">
```

Another option is to use a domain attribute:

```html
<li data-mission-code="LP-0127A">
```

For automation, the second option is especially interesting because it makes it explicit that this attribute represents functional information of the application.

This would allow locating a mission directly:

```ts
page.locator('[data-mission-code="LP-0127A"]')
```

and perform all checks within that scope.

---

## Mission title

### Current situation

Uses `h3`.

### Assessment

**Suitable.**

The semantic hierarchy allows locating the title using:

```ts
page.getByRole('heading', { name: 'Mission name' })
```

### Request

No changes are required.

---

## Description

### Current situation

Uses a `p` element.

### Assessment

**Suitable.**

### Request

No changes are required.

---

## Departure and return date

### Current situation

The information is displayed in `span` elements.

### Assessment

The problem is not the use of `span`.

For automation, the difficulty is that there is no clear way to distinguish each piece of information programmatically.

Simply adding an `id` would partially solve the problem, but it would create dependence on mission-specific identifiers.

### Request

Add stable attributes that semantically indicate which information is being presented.

Example:

```html
<span data-testid="departure-date">...</span>
<span data-testid="return-date">...</span>
```

Within the mission scope:

```ts
const mission = page.locator('[data-mission-code="LP-0127A"]')

await expect(
  mission.getByTestId('departure-date')
).toHaveText(...)
```

This avoids the need to create global IDs such as:

```text
departure-date-LP-0127A
```

---

## Stay duration

### Current situation

The information is available in a `span`, but without a specific identifier.

### Request

Add a stable identifier within the mission item.

Example:

```html
<span data-testid="mission-duration">
```

Allowing:

```ts
mission.getByTestId('mission-duration')
```

---

## Seat availability

### Current situation

The information is visually available, but there is no specific identifier for automation.

### Request

Add a stable attribute.

Example:

```html
<span data-testid="available-seats">
```

Allowing:

```ts
mission.getByTestId('available-seats')
```

---

## Button "Reserve"

### Current situation

The link has no `href` attribute containing the mission code.

Example:

```html
<a href="/booking/LP-0127A">
  Reserve
</a>
```

### Assessment

**Excellent for automation.**

The application’s functional behavior itself provides an extremely stable identifier.

It is possible to use:

```ts
page.getByRole('link', { name: 'Reserve' })
```

within the mission item or, when needed:

```ts
page.locator('a[href="/booking/LP-0127A"]')
```

### Request

No changes are required.

---

# Empty State

## Box shown when no mission is found

### Current situation

It should be verified whether the component has any semantic information or a stable identifier.

### Request

Add a deterministic way to identify the no-results search state.

Example:

```html
<div data-testid="missions-empty-state">
```

Allowing:

```ts
page.getByTestId('missions-empty-state')
```

It is also recommended that there be a specific textual message, for example:

```text
No missions found
```

In that case, the text itself can also be used as a functional validation.

---

# Mission Page (`/booking/LP-0127A`)

# Seat selection

## Seat buttons

### Current situation

The buttons already have an `aria-label` containing relevant information about each seat.

### Assessment

**Very good for automation.**

Example:

```ts
page.getByRole('button', { name: /Seat A1/ })
```

### Request

Keep the `aria-label` with a consistent structure for all seats.

Ideally, the accessible name should contain predictable information, such as:

```text
Seat A1
Seat A2
Seat B1
```

Additional information may exist as long as the structure remains consistent.

---

# Seat information popover

### Current situation

When hovering over a seat, a popover displays additional information.

However, there is currently no clear relationship between the seat and the content shown in the popover.

### Assessment

**Needs improvement.**

This behavior makes automation much more difficult because it forces the test to depend on visual structure or generic DOM elements.

### Priority request

The content shown should have a stable identifier.

Example:

```html
<div role="tooltip" data-testid="seat-tooltip">
```

When possible, the seat button can also establish a relationship with the tooltip using:

```html
aria-describedby="seat-A1-tooltip"
```

Example:

```html
<button
  aria-label="Seat A1"
  aria-describedby="seat-A1-tooltip"
>
```

```html
<div
  id="seat-A1-tooltip"
  role="tooltip"
>
  ...
</div>
```

This creates an explicit relationship between the element and its complementary information.

---

# Purchase summary aside

### Current situation

The summary contains different pieces of information related to the mission, seats, and values.

### Assessment

Using the `aside` element is positive, but each data point must be individually identified to allow reliable verification.

### Request

Add stable attributes to the relevant information.

Example:

```html
<aside>
  <span data-testid="summary-mission-code">LP-0127A</span>
  <span data-testid="summary-departure-date">...</span>
  <span data-testid="summary-return-date">...</span>
  <span data-testid="summary-selected-seats">...</span>
  <span data-testid="summary-passengers">...</span>
  <span data-testid="summary-total-price">...</span>
</aside>
```

This will allow specific assertions without depending on the position of elements or CSS selectors.

---

# Booking Confirmed

### Current situation

After the booking is completed, various mission and ticket information is displayed.

### Assessment

This data is part of a critical step in the E2E journey and should have individual identification.

### Request

Add stable identifiers to the main information shown in the confirmation.

Example:

```html
<span data-testid="reservation-code">
<span data-testid="reservation-mission-code">
<span data-testid="reservation-departure-date">
<span data-testid="reservation-return-date">
<span data-testid="reservation-seats">
<span data-testid="reservation-total-price">
```

This will allow direct assertions such as:

```ts
await expect(
  page.getByTestId('reservation-code')
).toHaveText(expectedReservationCode)
```

---

# General Recommendation

For this application, it is not necessary to add `id` to every element.

For Playwright automation, semantic selectors should be prioritized whenever possible:

```ts
page.getByRole(...)
page.getByLabel(...)
page.getByText(...)
```

When the data does not have an appropriate semantic representation for automation, use:

```html
data-testid
```

For domain entities, such as a specific mission, it is also valid to use explicit attributes:

```html
data-mission-code="LP-0127A"
```

The main rule should be:

**The test must be able to locate an element by its function or meaning without needing unnecessary details of the internal HTML structure.**

This way, changes to CSS, wrappers, `divs`, `spans`, or the internal organization of components will have much less impact on the automated suite.
