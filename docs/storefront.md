# Storefront Lunar Pass — Specification by Example (QA Design)

**Source:** `docs/storefront-functional-requirements.md`

---

## 1. Artifact Analysis

### Summary

- **Business goal:** Enable a traveler to search and compare lunar missions by destination base and launch date, select cabin seats, register passenger details, complete a simulated credit card payment, and receive the confirmed booking code with the issued boarding tickets.
- **Actors and profiles:**
  - **Traveler** (primary actor: searches missions, selects seats, registers passengers, pays, and receives tickets).
  - **Another traveler** (concurrent actor: may book seats on the same mission while the primary traveler is in the booking flow).
- **Artifacts analyzed:** Functional Documentation — Module: Storefront Lunar Pass (`docs/storefront-functional-requirements.md`), covering 5 functional areas: Mission Search, Seat Map, Passengers, Payment, and Ticket Issuance.

### Rules Identified

#### 1.1 Mission Search

| # | Rule or information | Class | Origin | Note |
|---|---|---|---|---|
| R1.1 | The catalog offers exactly four lunar bases as destinations: Base Lunar Alpha (Mar da Tranquilidade), Base Lunar Orion (Cratera Copernicus), Base Lunar Aurora (Polo Sul Lunar), and Base Lunar Selene (Vale Taurus-Littrow). | Explicit | Section 1 — Business Rules | |
| R1.2 | Every mission is a round trip with a fixed 7-day stay at the lunar base. | Explicit | Section 1 — Business Rules | Return date and length of stay must be consistent with a 7-day stay. |
| R1.3 | The mission price is a decimal value per passenger displayed in US dollars (USD). | Explicit | Section 1 — Business Rules | |
| R1.4 | Each mission is operated by a rocket with a maximum capacity of 4 seats. | Explicit | Section 1 — Business Rules | |
| R1.5 | Missions with all 4 seats occupied remain visible in the search results, identified as "Esgotado", and cannot be booked. | Explicit | Section 1 — Business Rules & FR-04 | Exact label "Esgotado" is defined. |
| R1.6 | Travelers can filter missions by selecting one or more lunar bases (starting from the initial search or from a specific lunar base highlight), and the results must display the matching missions, the number of results found, and which bases are active as filters. | Explicit | Section 1 — FR-01 | UI location ("home page form", "highlight") abstracted to business intent. |
| R1.7 | When no base is selected — or when all 4 bases are selected — the search considers all lunar bases. | Explicit | Section 1 — Business Rules | |
| R1.8 | The default sorting of results is by nearest departure date when the traveler does not choose a sorting option. | Explicit | Section 1 — Business Rules & FR-02 | |
| R1.9 | Travelers can sort missions by nearest or farthest departure date. | Explicit | Section 1 — FR-02 | |
| R1.10 | Travelers can refine the selected bases and sorting directly from the search results, immediately updating the mission list. | Explicit | Section 1 — FR-03 | |
| R1.11 | Each mission in the results presents: mission identifier, rocket, destination lunar base, departure date, return date, length of stay, number of available seats out of the total (4), and price per passenger in USD. | Explicit | Section 1 — FR-04 | |
| R1.12 | Any mission with at least 1 available seat allows the traveler to start a booking. | Explicit | Section 1 — FR-04 | |
| R1.13 | When no mission matches the applied filters, a notice informing the absence of results is displayed along with a shortcut to view all missions without filters. | Explicit | Section 1 — FR-05 | Exact notice text is not defined; intent is used. |
| R1.14 | Activating the shortcut when no results are found clears the base filters and displays all available catalog missions sorted by default (nearest departure date). | Derivable | Section 1 — FR-05 + R1.7 + R1.8 | Justification: viewing all missions without filters is equivalent to having no base filter applied, which returns all catalog missions under default sorting. |
| R1.15 | Handling of missions whose departure date is in the past if they remain in the catalog. | To investigate | Section 1 — Assumptions and Open Points | Artifact notes that operations maintains the catalog and the Storefront does not apply a date cutoff, leaving a display rule undefined if past missions remain. |
| R1.16 | Tie-breaking order when two or more missions have the exact same departure date. | To investigate | Section 1 — FR-02 | Not defined in the artifact. |

#### 1.2 Seat Map

| # | Rule or information | Class | Origin | Note |
|---|---|---|---|---|
| R2.1 | The rocket cabin has 4 seats arranged in two rows: A1 and A2 with a view of "Terra", and B1 and B2 with a view of "Lua". | Explicit | Section 2 — Business Rules & FR-01 | |
| R2.2 | Each seat displays its identification (A1, A2, B1, B2), its state (available, selected, or occupied), its associated view ("Terra" or "Lua"), and the price per passenger. | Explicit | Section 2 — Business Rules & FR-01 | |
| R2.3 | A booking must contain a minimum of 1 and a maximum of 4 seats. | Explicit | Section 2 — Business Rules & FR-03 | |
| R2.4 | Occupied seats reflect already confirmed bookings for the mission and cannot be selected; attempting to select an occupied seat warns the traveler to choose another seat. | Explicit | Section 2 — Business Rules, FR-01 & FR-02 | Exact warning text is not defined. |
| R2.5 | Available seats can be selected and already chosen seats can be deselected in any order. | Explicit | Section 2 — FR-02 | |
| R2.6 | The selection summary (chosen seats and selected quantity out of the cabin total of 4) and the total booking amount in USD (price per passenger × number of selected seats) are updated with every selection or deselection. | Explicit | Section 2 — Business Rules & FR-02 | |
| R2.7 | The traveler can only proceed to the passengers step when at least 1 seat is selected. | Explicit | Section 2 — FR-03 | |
| R2.8 | Deselecting all previously selected seats returns the selection count and total amount to zero and prevents proceeding to the passengers step. | Derivable | Section 2 — FR-02 + FR-03 | Justification: if selection updates on every deselection and proceeding requires at least 1 selected seat, having 0 selected seats after deselection blocks progress. |
| R2.9 | When all 4 seats on the mission are occupied on the seat map, a sold-out mission notice is displayed with the option to return to the mission list. | Explicit | Section 2 — FR-03 | Covers the case where a traveler accesses a mission that became sold out before seat selection. |

#### 1.3 Passengers

| # | Rule or information | Class | Origin | Note |
|---|---|---|---|---|
| R3.1 | Each selected seat must have exactly one associated passenger form identifying the corresponding seat. | Explicit | Section 3 — Business Rules & FR-01 | |
| R3.2 | Full name ("Nome completo") and passport number ("Passaporte") are mandatory for every passenger, and the traveler can only proceed to payment when all passengers have valid data. | Explicit | Section 3 — Business Rules & FR-01 | UI mechanics ("focus on first invalid field", "next to the field") are abstracted into observable validation feedback. |
| R3.3 | The passenger's full name must contain between 3 and 120 characters (inclusive). | Explicit | Section 3 — Business Rules | Defines lower (3) and upper (120) boundaries. |
| R3.4 | The passenger's passport number must contain between 5 and 30 characters (inclusive). | Explicit | Section 3 — Business Rules | Defines lower (5) and upper (30) boundaries. |
| R3.5 | Passenger data is normalized: leading and trailing spaces are removed from inputs, and the passport number is recorded in uppercase letters. | Explicit | Section 3 — Business Rules | |
| R3.6 | Character length validation for full name and passport is evaluated after removing leading and trailing spaces (e.g., a name with spaces that trims to fewer than 3 characters is rejected). | Derivable | Section 3 — Business Rules (R3.3, R3.4, R3.5) | Justification: normalization strips leading/trailing spaces so padding with spaces cannot satisfy minimum character requirements. Flagged as hypothesis to validate. |
| R3.7 | Returning from the passengers step to the seat map preserves the passenger data already filled in. | Explicit | Section 3 — FR-02 | |
| R3.8 | Correcting invalid passenger data revalidates the information and clears the corresponding validation error. | Explicit | Section 3 — FR-02 | |
| R3.9 | Allowed character set for passenger full name and passport (whether numbers/symbols are permitted in the name, or special characters/internal spaces in the passport), and whether two passengers on the same booking may share the same passport number. | To investigate | Section 3 — Business Rules | Artifact only specifies character length and space/uppercase normalization. |
| R3.10 | Behavior of preserved passenger data when the traveler returns to the seat map and changes the seat selection (e.g., deselects one seat or swaps A1 for B1). | To investigate | Section 3 — FR-02 | FR-02 states data is preserved when returning to the seats step, but does not define mapping if seats are removed or swapped. |

#### 1.4 Payment

| # | Rule or information | Class | Origin | Note |
|---|---|---|---|---|
| R4.1 | Payment is simulated for academic purposes; no real charge is made, and the total amount in USD (price per passenger × number of seats, using the server's decimal value as official reference) is displayed before confirmation. | Explicit | Section 4 — Business Rules & FR-01 | |
| R4.2 | Required payment data: Contact email ("E-mail de contato", required), Name on card ("Nome no cartão", 3 to 80 characters), Card number ("Número do cartão", 13 to 16 digits), Expiry date ("Validade", MM/AA format with month between 01 and 12), and CVV (3 or 4 digits). | Explicit | Section 4 — Business Rules & FR-01 | |
| R4.3 | Recognized card brands are Visa, Mastercard, and American Express, identified and displayed from the card number entered. | Explicit | Section 4 — Business Rules & FR-01 | Rules for which prefix/BIN maps to each brand and whether CVV length is tied to the brand (e.g., 4 digits for Amex) are not specified in the artifact. |
| R4.4 | Payment is only processed when all payment data is valid; invalid data prevents processing and informs the traveler of the validation error on the corresponding information. | Explicit | Section 4 — FR-01 & FR-02 | |
| R4.5 | While payment is being processed, the processing state is indicated and the traveler cannot alter payment data or resubmit the order. | Explicit | Section 4 — FR-02 | |
| R4.6 | Payment results can be: approved (using predefined simulator test cards), denied, or refused due to incorrect card data ("dados do cartão incorretos" — for any other card number valid in format). | Explicit | Section 4 — Business Rules | |
| R4.7 | The booking is only created after payment approval; upon approval, the booking is registered and the traveler is taken to the confirmation. | Explicit | Section 4 — Business Rules & FR-02 | |
| R4.8 | When payment is denied, refused due to incorrect card data ("dados do cartão incorretos"), or interrupted by a processing failure, no booking is created, the reason is informed, and the traveler remains on the payment step with the previously entered data preserved so they can correct it and try again. | Explicit | Section 4 — Business Rules & FR-02 | |
| R4.9 | Card data is used exclusively for payment processing and is not stored with the booking. | Explicit | Section 4 — Business Rules | |
| R4.10 | When one of the selected seats has been booked by another traveler during the flow, the booking is not created and the traveler is informed that the seat has just been taken and that they must choose another one. | Explicit | Section 4 — FR-03 | |
| R4.11 | Expected post-conflict recovery flow when payment is approved (or submitted) and booking fails due to a concurrent seat conflict (e.g., simulated refund notification, automatic redirection or action to return to the seat map, and preservation of passenger data). | To investigate | Section 4 — Assumptions and Open Points | Explicitly marked as an Open Point in the artifact. |
| R4.12 | Validation criterion for Contact Email format and whether past expiry dates (MM/AA in the past, even with month between 01 and 12) are rejected. | To investigate | Section 4 — Business Rules | Table only states "Required" for email and "MM/AA format, month between 01 and 12" for expiry date. |
| R4.13 | Exact predefined simulator card numbers for Approved and Denied results, and prefix rules for Visa, Mastercard, and American Express recognition. | To investigate | Section 4 — Business Rules & FR-01 | Mentioned in general terms without listing the test numbers in the document. |

#### 1.5 Ticket Issuance

| # | Rule or information | Class | Origin | Note |
|---|---|---|---|---|
| R5.1 | Each confirmed booking receives a unique 6-character alphanumeric code generated without ambiguous characters, which serves as its only public identifier. | Explicit | Section 5 — Business Rules | |
| R5.2 | The purchase confirmation presents: the 6-character booking code, destination lunar base, departure and return dates, rocket, booked seats, and total amount paid in USD (price per passenger × number of passengers). | Explicit | Section 5 — Business Rules, FR-01 & FR-02 | |
| R5.3 | The confirmation displays the contact email provided as the destination of the booking details, along with the instruction to keep the booking code. | Explicit | Section 5 — FR-01 | |
| R5.4 | The confirmation displays the payment result (approved), the card brand used, and an explicit notice that the transaction is a simulation and no real charge was made. | Explicit | Section 5 — Business Rules & FR-01 | |
| R5.5 | One ticket is issued and displayed per booked seat/passenger, containing the passenger's full name (normalized), passport number (normalized in uppercase), and assigned seat. | Explicit | Section 5 — Business Rules & FR-02 + R3.5 | |
| R5.6 | From a completed booking confirmation, the traveler can start a new mission search. | Explicit | Section 5 — FR-03 | |
| R5.7 | Which specific characters are excluded as "ambiguous characters" in the 6-character booking code (e.g., `0`/`O`, `1`/`I`/`L`), and whether an actual email is dispatched or only simulated on screen. | To investigate | Section 5 — Business Rules & FR-01 | Not detailed in the artifact. |

### Ambiguities, Gaps, and Contradictions

- **Past missions in catalog (Section 1 — Assumption):** The document assumes operations only maintains current missions, leaving open how the Storefront should behave if a mission with a past departure date remains in the catalog.
- **Tie-breaker in mission sorting (Section 1 — FR-02):** Sorting by nearest or farthest departure date is defined, but the secondary ordering criterion when two missions share the same departure date is not specified.
- **Seat modification after filling passenger data (Section 3 — FR-02):** Returning to the seat map preserves passenger data, but it is undefined what happens if the traveler deselects a seat or replaces seat A1 with B2.
- **Passenger field character rules and duplicate passports (Section 3 — Business Rules):** Only minimum/maximum lengths and space/uppercase normalization are stated; allowed character sets and uniqueness of passports across seats in the same booking are omitted.
- **Payment validation specifics (Section 4 — Business Rules):** Contact email format rules, whether expired cards (valid MM/AA format with month 01–12 but past year/month) are rejected, and whether CVV length (3 vs. 4 digits) depends on the detected card brand are not specified.
- **Simulator card catalog (Section 4 — Business Rules):** The document states that approval is determined by predefined simulator test cards, without listing the card numbers for "approved" and "denied" in the functional specification.
- **Seat conflict after payment approval (Section 4 — Open Point):** The artifact explicitly notes that the exact recovery behavior when a seat conflict occurs at confirmation (simulated refund notice, navigation back to seat map) requires a business decision.
- **Ambiguous characters in booking code (Section 5 — Business Rules):** "Generated without ambiguous characters" does not list the excluded character set.

### Untestable or UI-Coupled Criteria

- **"The first invalid field must receive focus" / "error message next to the corresponding field" (Section 3 FR-01, Section 4 FR-01):** UI focus and layout positioning are screen implementation details. → **Proposed observable business behavior:** When I attempt to proceed with invalid passenger or payment data, I am prevented from advancing and informed of the specific validation issue for each invalid datum.
- **"The card number and expiry date must be automatically formatted while typing" (Section 4 FR-01):** Typing mask is an interface mechanism. → **Proposed observable business behavior:** Evaluated at the UI/component test level; in business specification, card number (13–16 digits) and expiry date (MM/AA) rules are verified by their acceptance/rejection outcomes.

---

## 2. Variant Map and Test Design Techniques Applied

### Variant Map

| # | Variant (what changes the behavior) | Axis | Rule of origin | Technique | Decision |
|---|---|---|---|---|---|
| V1.1 | Search missions with no base filter selected (default state) | Initial state / Data | R1.1, R1.7, R1.8, R1.11 | Equivalence class (all bases) | Scenario |
| V1.2 | Search missions filtering by a single lunar base (e.g., Base Lunar Alpha) | Data | R1.6, R1.11 | Equivalence class (single filter) | Scenario |
| V1.3 | Search missions filtering by multiple lunar bases (e.g., Alpha and Aurora) | Data | R1.6 | Equivalence class (multiple filters) | Scenario |
| V1.4 | Search missions selecting all 4 lunar bases | Data / Boundary | R1.7 | Boundary value (4 of 4 bases) | Scenario |
| V1.5 | Search missions starting from a specific lunar base highlight | Alternative flow | R1.6 | Alternative flow | Scenario |
| V1.6 | Sort mission results by farthest departure date | Order | R1.9 | Equivalence class (reverse sort) | Scenario |
| V1.7 | Refine search criteria (change base filter and sort order) directly from results | Order and repetition | R1.10 | State transition / Before and after | Scenario |
| V1.8 | Filter by a lunar base that has no matching missions, then use the shortcut to view all missions | Data / Undo | R1.13, R1.14 | Exception flow + Undo | Scenario (with hypothesis on shortcut reset) |
| V1.9 | Mission in results has available seats (1 to 4 available) vs. 0 available seats ("Esgotado") | Initial state / Boundary | R1.4, R1.5, R1.12 | State / Boundary value (0 vs. >=1 seats) | Scenario |
| V1.10 | Filter by Base Lunar Orion alone after already testing Base Lunar Alpha alone | Data | R1.6 | Equivalence class | Discarded: equivalent to V1.2 (same single-base filter rule) |
| V1.11 | View cabin seat map with seats in available, selected, and occupied states across "Terra" (A1, A2) and "Lua" (B1, B2) views | Initial state | R2.1, R2.2, R2.4 | Equivalence classes (seat states & views) | Scenario |
| V2.1 | Select 1 available seat (minimum valid booking) and proceed to passengers | Boundary / Data | R2.3, R2.5, R2.6, R2.7 | Boundary value (min = 1 seat) | Scenario |
| V2.2 | Select all 4 available seats (maximum valid booking) | Boundary / Data | R2.3, R2.5, R2.6 | Boundary value (max = 4 seats) | Scenario |
| V2.3 | Select multiple seats and deselect one of them in any order | Undo / Order | R2.5, R2.6 | State transition (available → selected → available) | Scenario |
| V2.4 | Attempt to proceed to passengers with 0 seats selected (initial state or after deselecting all) | Boundary / Exception | R2.3, R2.7, R2.8 | Boundary value (0 seats — invalid) | Scenario |
| V2.5 | Attempt to select an already occupied seat | Exception / State | R2.4 | State transition (forbidden transition on occupied seat) | Scenario |
| V2.6 | Access seat map of a mission where all 4 seats are occupied | Initial state / Exception | R2.9 | Boundary value (0 available) + Exception flow | Scenario |
| V2.7 | Select 2 seats vs. 3 seats on the same mission | Data | R2.3, R2.6 | Equivalence class | Discarded: covered by 1-seat (V2.1), 4-seat (V2.2), and multi-seat select/deselect (V2.3) |
| V3.1 | Register valid passenger data for all selected seats (including normalization of spaces and lowercase passport) | Data / Happy path | R3.1, R3.2, R3.3, R3.4, R3.5 | Valid equivalence class | Scenario |
| V3.2 | Boundary lengths for passenger full name (2, 3, 120, 121 characters) and passport (4, 5, 30, 31 characters) | Data / Boundary | R3.3, R3.4, R3.6 | Boundary value analysis | Outline |
| V3.3 | Missing mandatory passenger fields (blank full name or blank passport, or multi-seat booking with one passenger incomplete) | Data / Exception | R3.1, R3.2 | Invalid equivalence class / Decision table | Scenario |
| V3.4 | Correct previously invalid passenger data and proceed | Before and after | R3.8 | State transition (invalid → valid) | Scenario |
| V3.5 | Return to the seat map after filling in passenger data | Persistence / Navigation | R3.7 | Persistence heuristic | Scenario |
| V3.6 | Passenger name with 50 characters vs. 60 characters | Data | R3.3 | Equivalence class | Discarded: both fall in the middle of the valid 3–120 class already covered by V3.1 and boundaries in V3.2 |
| V4.1 | Pay for booking with valid data and a simulator card that approves the transaction | Data / Happy path | R4.1, R4.2, R4.3, R4.6, R4.7 | Valid class / Decision table | Scenario |
| V4.2 | Recognize card brand (Visa, Mastercard, American Express) from the card number | Data | R4.3 | Equivalence classes (card brands) | Outline |
| V4.3 | Payment data validation boundaries: Name on card (2, 3, 80, 81 chars), Card number (12, 13, 16, 17 digits), Expiry month (00, 01, 12, 13), CVV (2, 3, 4, 5 digits), and missing Contact email | Data / Boundary | R4.2, R4.4 | Boundary value analysis + Equivalence classes | Outline |
| V4.4 | Prevent edits and duplicate submission while payment is processing | Concurrency / Repetition | R4.5 | State transition (processing lock) | Scenario |
| V4.5 | Payment refused or interrupted: Denied card, Incorrect card data ("dados do cartão incorretos"), or Processing failure — followed by correction and retry | Failures and exceptions | R4.6, R4.8 | Exception flows + State transition | Outline & Scenario |
| V4.6 | Concurrent seat conflict: another traveler books one of my selected seats before my confirmation completes | Concurrency | R4.10 | Concurrency / Exception flow | Scenario |
| V5.1 | Issue confirmation and individual tickets for a confirmed multi-passenger booking, verifying simulation notice and non-storage of card details | Happy path / Data | R4.9, R5.1, R5.2, R5.3, R5.4, R5.5 | Valid equivalence class | Scenario |
| V5.2 | Start a new mission search after completing a booking | Order and repetition | R5.6 | Cycle completion / State transition | Scenario |

### Techniques Applied

- **Equivalence Classes:**
  - *Mission Search:* Base filter selection divided into no base selected, single base, subset of bases, all 4 bases, and filter with no matching missions. Sort order divided into default/nearest departure date and farthest departure date.
  - *Seat Map:* Seat states (available, selected, occupied) and cabin views ("Terra" for row A, "Lua" for row B).
  - *Payment:* Card brands (Visa, Mastercard, American Express) and simulator payment outcomes (approved, denied, "dados do cartão incorretos", processing failure).
- **Boundary Value Analysis:**
  - *Seat selection quantity (Rule R2.3 — min 1, max 4):* Tested at `0` (blocked), `1` (minimum valid), and `4` (maximum valid). Intermediate values (`2` and `3` as standalone happy-path scenarios) were discarded as redundant once `1`, `4`, and multi-seat deselection are covered.
  - *Passenger Full Name length (Rule R3.3 — 3 to 120 chars):* Tested at `2` (just below minimum), `3` (exact minimum), `120` (exact maximum), and `121` (just above maximum).
  - *Passenger Passport length (Rule R3.4 — 5 to 30 chars):* Tested at `4` (just below minimum), `5` (exact minimum), `30` (exact maximum), and `31` (just above maximum).
  - *Cardholder Name length (Rule R4.2 — 3 to 80 chars):* Tested at `2`, `3`, `80`, and `81` characters.
  - *Card Number length (Rule R4.2 — 13 to 16 digits):* Tested at `12`, `13`, `16`, and `17` digits.
  - *Card Expiry Month (Rule R4.2 — MM/AA, month 01 to 12):* Tested at month `00` (just below), `01` (minimum), `12` (maximum), and `13` (just above).
  - *Card CVV length (Rule R4.2 — 3 or 4 digits):* Tested at `2` (just below), `3` (minimum), `4` (maximum), and `5` (just above) digits.
- **State Transition:**
  - *Seats:* Available → Selected → Available (deselection); Occupied → Attempted Selection (forbidden transition, state remains Occupied with warning).
  - *Search & Filters:* Filtered empty state → Shortcut to view all → Unfiltered catalog list.
  - *Form Validation:* Invalid passenger/payment state → Error feedback → Correction → Valid state allowing progression.
  - *Payment Processing:* Ready to pay → Processing (locked against edits/resubmission) → Approved (booking created) OR Denied/Failed (remains on payment with data preserved) → Corrected & Approved.
- **Decision Table (Multi-passenger & Payment conditions):**
  - Proceeding to payment requires *all* selected seats to have valid passenger data (if Seat 1 is valid and Seat 2 is invalid, progress is blocked).
  - Booking creation requires *both* payment approval *and* seat availability at confirmation (if seat was taken by another traveler, booking is not created).
- **Alternative and Exception Flows & Concurrency:**
  - Starting search from a base highlight vs. general search; sold-out missions in search results and on the seat map; payment denial, incorrect card data, and processing interruption; concurrent booking of the same seat by another traveler.

---

## 3. Specification in Declarative Gherkin

### Feature 1: Mission Search

**Feature:** Mission Search and Comparison  
**As a** traveler,  
**I want to** search and compare missions by lunar base and by launch date,  
**so that** I can choose the trip best suited to my destination and my availability.

**Background:**  
**Given** the catalog offers the lunar bases "Base Lunar Alpha" (Mar da Tranquilidade), "Base Lunar Orion" (Cratera Copernicus), "Base Lunar Aurora" (Polo Sul Lunar), and "Base Lunar Selene" (Vale Taurus-Littrow)  
**And** there are scheduled round-trip missions with a 7-day stay and a capacity of 4 seats per rocket

#### Main path and filtering

**Scenario:** View all missions ordered by nearest departure date when no base filter is selected  
*Rule of origin: R1.1, R1.2, R1.3, R1.4, R1.7, R1.8, R1.11*  
**When** I search for missions without selecting a lunar base  
**Then** I must see the missions for all four lunar bases ordered from the nearest to the farthest departure date  
**And** I must see the total number of missions found  
**And** each mission must display its identifier, rocket, destination lunar base, departure date, return date 7 days after departure, 7-day length of stay, available seats out of 4, and price per passenger in USD

**Scenario:** Filter missions by a single lunar base  
*Rule of origin: R1.6, R1.8, R1.11*  
**When** I search for missions filtering by "Base Lunar Alpha"  
**Then** I must see only the missions bound for "Base Lunar Alpha" ordered by nearest departure date  
**And** I must see the number of results found and the indication that "Base Lunar Alpha" is the active filter

**Scenario:** Filter missions by multiple lunar bases  
*Rule of origin: R1.6, R1.8*  
**When** I search for missions filtering by "Base Lunar Alpha" and "Base Lunar Aurora"  
**Then** I must see only the missions bound for "Base Lunar Alpha" or "Base Lunar Aurora" ordered by nearest departure date  
**And** I must see the number of results found and the indication that "Base Lunar Alpha" and "Base Lunar Aurora" are the active filters

**Scenario:** Consider the entire catalog when all four lunar bases are selected  
*Rule of origin: R1.7*  
**When** I search for missions selecting all four lunar bases  
**Then** I must see the missions across all four lunar bases ordered by nearest departure date

**Scenario:** Start a mission search directly from a lunar base highlight  
*Rule of origin: R1.6*  
**When** I choose to explore missions from the highlight of "Base Lunar Orion"  
**Then** I must see the mission results filtered by "Base Lunar Orion" with the result count and active filter indicated

#### Sorting and refining results

**Scenario:** Sort mission results by farthest departure date  
*Rule of origin: R1.9*  
**When** I search for missions and sort the results by farthest departure date  
**Then** the missions must be presented from the farthest to the nearest departure date

**Scenario:** Refine the destination bases and sorting directly from the search results  
*Rule of origin: R1.10*  
**Given** I am viewing the mission search results filtered by "Base Lunar Alpha" sorted by nearest departure date  
**When** I change the filter in the results to "Base Lunar Selene" and sort by farthest departure date  
**Then** the mission list must immediately update to show only missions for "Base Lunar Selene" ordered from the farthest to the nearest departure date  
**And** the result count and active filter indication must reflect "Base Lunar Selene"

#### Availability and exceptions in search

**Scenario:** Distinguish between bookable missions and sold-out missions in the search results  
*Rule of origin: R1.4, R1.5, R1.12*  
**Given** mission "LP-101" has 1 available seat out of 4  
**And** mission "LP-102" has 0 available seats out of 4  
**When** I view the mission search results  
**Then** mission "LP-101" must allow me to start a booking  
**And** mission "LP-102" must remain visible, identified as "Esgotado", without the option to start a booking

**Scenario:** Inform the absence of results when no mission matches the selected base filter  
*Rule of origin: R1.13*  
**Given** there are no scheduled missions for "Base Lunar Selene"  
**When** I search for missions filtering by "Base Lunar Selene"  
**Then** I must be informed that no missions match the applied filter  
**And** I must be offered a shortcut to view all missions without filters

**Scenario:** Reset filters and display the full catalog when using the empty-results shortcut  
*Rule of origin: R1.13, R1.14*  
*Hypothesis to validate: using the shortcut to view all missions clears the active base filter and presents the full catalog under the default nearest departure date sorting (R1.14)*  
**Given** there are no scheduled missions for "Base Lunar Selene" and there are scheduled missions for the other lunar bases  
**And** I am viewing the empty search result for "Base Lunar Selene"  
**When** I choose the shortcut to view all missions without filters  
**Then** I must see all missions from the catalog across the lunar bases, ordered by nearest departure date

---

### Feature 2: Seat Map

**Feature:** Cabin Seat Map and Seat Selection  
**As a** traveler,  
**I want to** view the rocket cabin and choose the seats for my trip,  
**so that** I can secure the desired seats for myself and my companions.

**Background:**  
**Given** I am viewing the seat map for a mission with a price per passenger of USD 12,500.00  
**And** the rocket cabin has 4 seats arranged in row A ("A1" and "A2", with a view of "Terra") and row B ("B1" and "B2", with a view of "Lua")

#### Main path and boundary quantities

**Scenario:** View the cabin seat map with seat states, views, and pricing  
*Rule of origin: R2.1, R2.2, R2.4*  
**Given** seat "A1" is already occupied by a confirmed booking  
**And** seats "A2", "B1", and "B2" are available  
**When** I inspect the cabin seat map  
**Then** I must see seats "A1" and "A2" associated with the view of "Terra" and seats "B1" and "B2" associated with the view of "Lua"  
**And** each seat must display its identifier, its price of USD 12,500.00, and a visual distinction between the occupied state of "A1" and the available state of "A2", "B1", and "B2"

**Scenario:** Select the minimum of 1 available seat and proceed to passenger registration  
*Rule of origin: R2.3, R2.5, R2.6, R2.7*  
**Given** seat "A2" is available  
**When** I select seat "A2"  
**Then** seat "A2" must appear as selected  
**And** the selection summary must show seat "A2", 1 of 4 cabin seats selected, and a total booking amount of USD 12,500.00  
**And** I must be allowed to proceed to the passengers step

**Scenario:** Select the maximum of 4 available seats in the cabin  
*Rule of origin: R2.3, R2.5, R2.6, R2.7*  
**Given** all 4 seats "A1", "A2", "B1", and "B2" are available  
**When** I select seats "B2", "A1", "B1", and "A2"  
**Then** all 4 seats must appear as selected  
**And** the selection summary must show "A1", "A2", "B1", and "B2", 4 of 4 cabin seats selected, and a total booking amount of USD 50,000.00  
**And** I must be allowed to proceed to the passengers step

**Scenario:** Select and deselect seats in any order with real-time total recalculation  
*Rule of origin: R2.5, R2.6*  
**Given** seats "A1", "B1", and "B2" are available  
**When** I select seats "B2" and "A1" and then deselect seat "B2"  
**Then** seat "B2" must return to the available state and seat "A1" must remain selected  
**And** the selection summary must show only seat "A1", 1 of 4 cabin seats selected, and a total booking amount of USD 12,500.00

#### Exceptions and restrictions on the seat map

**Scenario:** Prevent proceeding to the passengers step when no seat is selected  
*Rule of origin: R2.3, R2.7, R2.8*  
*Hypothesis to validate: deselecting all chosen seats returns the total to USD 0.00 and blocks progression just like the initial state with 0 seats selected (R2.8)*  
**Given** I have selected seat "A2"  
**When** I deselect seat "A2"  
**Then** the selection summary must show 0 of 4 cabin seats selected and a total booking amount of USD 0.00  
**And** I must not be allowed to proceed to the passengers step

**Scenario:** Warn the traveler when attempting to select an occupied seat  
*Rule of origin: R2.4*  
**Given** seat "A1" is occupied by a confirmed booking  
**When** I attempt to select seat "A1"  
**Then** I must be warned that seat "A1" is unavailable and that I need to choose another seat  
**And** seat "A1" must remain occupied and excluded from my selection summary

**Scenario:** Present the sold-out notice when all 4 cabin seats are occupied  
*Rule of origin: R2.9*  
**Given** all 4 seats "A1", "A2", "B1", and "B2" are occupied by confirmed bookings  
**When** I view the cabin seat map  
**Then** I must see a notice that the mission is sold out  
**And** I must not be able to proceed to the passengers step  
**And** I must have the option to return to the mission list

---

### Feature 3: Passengers

**Feature:** Passenger Registration for Selected Seats  
**As a** traveler,  
**I want to** provide the data of the passengers for each booked seat,  
**so that** the tickets are issued in the names of the people who will travel.

**Background:**  
**Given** I have selected seats for my mission and advanced to the passengers step

#### Main path and data normalization

**Scenario:** Register valid passenger data for each selected seat with automatic normalization  
*Rule of origin: R3.1, R3.2, R3.3, R3.4, R3.5*  
**Given** my booking has seats "A1" and "B2" selected  
**When** I provide the full name "  Helena Costa  " and passport "  br12345a  " for seat "A1"  
**And** I provide the full name "Marcos Vance" and passport "us987654" for seat "B2"  
**And** I proceed to payment  
**Then** the passenger for seat "A1" must be recorded with full name "Helena Costa" and passport "BR12345A"  
**And** the passenger for seat "B2" must be recorded with full name "Marcos Vance" and passport "US987654"  
**And** I must advance to the payment step

#### Boundary values for passenger full name and passport

**Scenario Outline:** Validate character length boundaries for passenger full name and passport  
*Rule of origin: R3.2, R3.3, R3.4, R3.6*  
*Hypothesis to validate: character length boundaries (3 to 120 for full name; 5 to 30 for passport) are evaluated after trimming leading and trailing spaces (R3.6)*  
**Given** my booking has seat "A1" selected  
**When** I provide a full name with <name_length> characters and a passport with <passport_length> characters for seat "A1" and attempt to proceed to payment  
**Then** the passenger registration result must be "<outcome>"

**Examples:**

| name_length | passport_length | outcome |
|---|---|---|
| 2 | 8 | rejected with a full name length error |
| 3 | 8 | accepted and advances to payment |
| 120 | 8 | accepted and advances to payment |
| 121 | 8 | rejected with a full name length error |
| 12 | 4 | rejected with a passport length error |
| 12 | 5 | accepted and advances to payment |
| 12 | 30 | accepted and advances to payment |
| 12 | 31 | rejected with a passport length error |

#### Exceptions, review, and navigation

**Scenario:** Block progression to payment when any selected seat has missing passenger data  
*Rule of origin: R3.1, R3.2*  
**Given** my booking has seats "A1" and "B1" selected  
**When** I provide valid passenger data for seat "A1" but leave the full name or passport empty for seat "B1" and attempt to proceed to payment  
**Then** I must be informed that the missing passenger data for seat "B1" is mandatory  
**And** I must remain on the passengers step

**Scenario:** Revalidate passenger data when correcting an invalid entry  
*Rule of origin: R3.8*  
**Given** my booking has seat "A1" selected with a validation error for the 2-character full name "Al" and a valid passport "BR12345"  
**When** I correct the full name for seat "A1" to "Alice Silva"  
**Then** the validation error for the full name must be cleared  
**And** I must be able to proceed to the payment step

**Scenario:** Preserve filled-in passenger data when returning to the seat map  
*Rule of origin: R3.7*  
**Given** my booking has seat "A1" selected with the full name "Helena Costa" and passport "BR12345A" filled in  
**When** I return to the seat map and then come back to the passengers step  
**Then** the passenger data for seat "A1" must still display "Helena Costa" and "BR12345A"

---

### Feature 4: Payment

**Feature:** Simulated Credit Card Payment  
**As a** traveler,  
**I want to** pay for my booking by credit card and receive immediate feedback on the result,  
**so that** I can complete the purchase of the trip securely and clearly.

**Background:**  
**Given** I have selected 2 seats on a mission priced at USD 12,500.00 per passenger  
**And** I have provided valid passenger data for both seats and reached the payment step  
**And** the total purchase amount displayed before confirmation is USD 25,000.00

#### Main path and card brand recognition

**Scenario:** Approve payment with a valid simulator card and register the booking  
*Rule of origin: R4.1, R4.2, R4.4, R4.6, R4.7*  
**When** I submit the payment with contact email "viajante@lunarpass.space", name on card "Helena Costa", a valid simulator card number configured for approval, expiry date "08/29", and CVV "123"  
**Then** the payment must be approved  
**And** my booking must be created for USD 25,000.00  
**And** I must be taken to the booking confirmation

**Scenario Outline:** Identify and display the recognized card brand from the card number  
*Rule of origin: R4.3*  
**When** I provide a card number belonging to the "<card_brand>" range  
**Then** the payment summary must identify and display the "<card_brand>" brand

**Examples:**

| card_brand |
|---|
| Visa |
| Mastercard |
| American Express |

#### Boundary values and validation of payment data

**Scenario Outline:** Validate payment data rules and boundaries before processing  
*Rule of origin: R4.2, R4.4*  
**When** I attempt to confirm payment with <payment_input_variation>  
**Then** the payment must not be processed  
**And** I must be informed of the validation error regarding <invalid_datum>

**Examples:**

| payment_input_variation | invalid_datum |
|---|---|
| an empty contact email and valid card details | contact email |
| a 2-character name on card ("Al") and valid remaining data | name on card |
| an 81-character name on card and valid remaining data | name on card |
| a 12-digit card number and valid remaining data | card number |
| a 17-digit card number and valid remaining data | card number |
| an expiry date with month "00/29" and valid remaining data | expiry date |
| an expiry date with month "13/29" and valid remaining data | expiry date |
| a 2-digit CVV ("12") and valid remaining data | CVV |
| a 5-digit CVV ("12345") and valid remaining data | CVV |

**Scenario Outline:** Accept exact boundary values for name on card, card number, expiry month, and CVV  
*Rule of origin: R4.2, R4.4, R4.6, R4.7*  
**When** I confirm payment using a simulator card configured for approval with a <name_length>-character name on card, a <card_digits>-digit card number, expiry date "<expiry>", CVV of <cvv_digits> digits, and contact email "viajante@lunarpass.space"  
**Then** the payment data must be accepted as valid and processed

**Examples:**

| name_length | card_digits | expiry | cvv_digits |
|---|---|---|---|
| 3 | 13 | 01/28 | 3 |
| 80 | 16 | 12/30 | 4 |

#### Processing state, refusals, failures, and concurrency

**Scenario:** Lock data editing and prevent duplicate submission while payment is processing  
*Rule of origin: R4.5*  
**When** I submit valid payment data and the payment is currently being processed  
**Then** I must see an indication that the payment is in progress  
**And** I must not be able to change the payment data or submit the order again

**Scenario Outline:** Handle payment refusal or interruption while preserving filled-in data for retry  
*Rule of origin: R4.6, R4.7, R4.8*  
**When** I submit valid payment details using <payment_condition>  
**Then** no booking must be created  
**And** I must be informed that the payment was not completed due to <reason_informed>  
**And** I must remain on the payment step with my previously entered payment data preserved so I can correct it and try again

**Examples:**

| payment_condition | reason_informed |
|---|---|
| a predefined simulator card configured for denial | payment denial |
| a format-valid card number that is not a predefined simulator approval card | incorrect card data ("dados do cartão incorretos") |
| a card submission interrupted by a processing failure | a payment processing failure |

**Scenario:** Prevent booking creation when a selected seat is taken by another traveler before confirmation  
*Rule of origin: R4.10*  
**Given** my selected seats are "A1" and "A2"  
**And** another traveler confirms a booking that includes seat "A1" while I am completing my purchase  
**When** I submit my payment to confirm the booking  
**Then** my booking must not be created  
**And** I must be informed that seat "A1" has just been occupied and that I need to choose another seat

---

### Feature 5: Ticket Issuance

**Feature:** Booking Confirmation and Ticket Issuance  
**As a** traveler,  
**I want to** receive the booking confirmation with the code, the tickets, and the proof of the amount paid,  
**so that** I have a guarantee of the purchase and the information needed for boarding.

**Background:**  
**Given** I have selected seats "A1" and "B2" on mission "LP-204" bound for "Base Lunar Aurora" operated by rocket "Saturn IX", departing on "10/12/2027" and returning on "17/12/2027", priced at USD 15,000.00 per passenger  
**And** I have registered passenger "Helena Costa" (passport "BR12345A") for seat "A1" and passenger "Marcos Vance" (passport "US987654") for seat "B2"

#### Main path

**Scenario:** Present the booking confirmation details, simulation notice, and issued passenger tickets  
*Rule of origin: R4.9, R5.1, R5.2, R5.3, R5.4, R5.5*  
**When** my payment with a "Visa" card and contact email "viajante@lunarpass.space" is approved  
**Then** I must receive a unique 6-character alphanumeric booking code free of ambiguous characters  
**And** the confirmation must display the destination "Base Lunar Aurora", departure date "10/12/2027", return date "17/12/2027", rocket "Saturn IX", booked seats "A1" and "B2", and total paid amount of USD 30,000.00  
**And** the confirmation must display "viajante@lunarpass.space" as the destination for the booking details along with the instruction to keep the booking code  
**And** the confirmation must display the approved payment result and the "Visa" card brand, accompanied by an explicit notice that this is a simulation and no real charge was made  
**And** no credit card number, expiry date, or CVV must be stored with the booking  
**And** I must see two issued tickets: one for "Helena Costa" with passport "BR12345A" on seat "A1", and one for "Marcos Vance" with passport "US987654" on seat "B2"

**Scenario:** Start a new mission search after completing a booking  
*Rule of origin: R5.6*  
**Given** my booking has been confirmed and my tickets have been issued  
**When** I choose to start a new purchase  
**Then** I must be taken to a new mission search ready to explore available trips

---

### Traceability Matrix

| Rule | Scenarios covering the rule |
|---|---|
| R1.1, R1.2, R1.3, R1.4, R1.8, R1.11 | View all missions ordered by nearest departure date when no base filter is selected |
| R1.5, R1.12 | Distinguish between bookable missions and sold-out missions in the search results |
| R1.6 | Filter missions by a single lunar base; Filter missions by multiple lunar bases; Start a mission search directly from a lunar base highlight |
| R1.7 | View all missions ordered by nearest departure date when no base filter is selected; Consider the entire catalog when all four lunar bases are selected |
| R1.9 | Sort mission results by farthest departure date |
| R1.10 | Refine the destination bases and sorting directly from the search results |
| R1.13, R1.14 | Inform the absence of results when no mission matches the selected base filter; Reset filters and display the full catalog when using the empty-results shortcut |
| R1.15, R1.16 | Pending Product definition (see Questions P1, P2) |
| R2.1, R2.2 | View the cabin seat map with seat states, views, and pricing |
| R2.3, R2.6, R2.7 | Select the minimum of 1 available seat and proceed to passenger registration; Select the maximum of 4 available seats in the cabin; Prevent proceeding to the passengers step when no seat is selected |
| R2.4 | View the cabin seat map with seat states, views, and pricing; Warn the traveler when attempting to select an occupied seat |
| R2.5 | Select the minimum of 1 available seat and proceed to passenger registration; Select the maximum of 4 available seats in the cabin; Select and deselect seats in any order with real-time total recalculation |
| R2.8 | Prevent proceeding to the passengers step when no seat is selected |
| R2.9 | Present the sold-out notice when all 4 cabin seats are occupied |
| R3.1, R3.2 | Register valid passenger data for each selected seat with automatic normalization; Block progression to payment when any selected seat has missing passenger data |
| R3.3, R3.4, R3.6 | Register valid passenger data for each selected seat with automatic normalization; Validate character length boundaries for passenger full name and passport |
| R3.5 | Register valid passenger data for each selected seat with automatic normalization |
| R3.7 | Preserve filled-in passenger data when returning to the seat map |
| R3.8 | Revalidate passenger data when correcting an invalid entry |
| R3.9, R3.10 | Pending Product definition (see Questions P3, P4, P5) |
| R4.1, R4.2, R4.4 | Approve payment with a valid simulator card and register the booking; Validate payment data rules and boundaries before processing; Accept exact boundary values for name on card, card number, expiry month, and CVV |
| R4.3 | Identify and display the recognized card brand from the card number |
| R4.5 | Lock data editing and prevent duplicate submission while payment is processing |
| R4.6, R4.7, R4.8 | Approve payment with a valid simulator card and register the booking; Handle payment refusal or interruption while preserving filled-in data for retry |
| R4.9 | Present the booking confirmation details, simulation notice, and issued passenger tickets |
| R4.10 | Prevent booking creation when a selected seat is taken by another traveler before confirmation |
| R4.11, R4.12, R4.13 | Pending Product definition (see Questions P6, P7, P8, P9) |
| R5.1, R5.2, R5.3, R5.4, R5.5 | Present the booking confirmation details, simulation notice, and issued passenger tickets |
| R5.6 | Start a new mission search after completing a booking |
| R5.7 | Pending Product definition (see Question P10) |

---

## 4. Specification Review and Questions for the Three Amigos

### Review Summary

All scenarios were reviewed against the collaboration, declarative writing, and QA reasoning checklists: UI implementation references (field focus, error positioning next to fields, typing masks, and page/form names) were abstracted into observable business intents; all user actions were placed in **When** steps; first-person voice ("I", "my") was used consistently while explicitly naming "another traveler" in the concurrency scenario; derivable rules (R1.14, R2.8, R3.6) were marked with hypotheses to validate; and 10 open questions were consolidated below for the Three Amigos without inventing business rules.

### Questions for the Three Amigos

| # | Question or hypothesis | Why it matters | Related rule or variant | Who decides |
|---|---|---|---|---|
| P1 | **Doubt (Past missions):** If a mission with a past departure date remains in the catalog, should it be hidden from search results, or displayed as unavailable for booking? | Explicitly noted as an assumption/open point in Section 1; defines whether date filtering is required in the Storefront. | R1.15 | Product |
| P2 | **Doubt (Sorting tie-breaker):** When two or more missions have the exact same departure date, what is the secondary sorting criterion (e.g., mission identifier, price, or lunar base name)? | Ensures deterministic ordering in mission search results. | R1.16 | Product |
| P3 | **Hypothesis (Length validation after trimming):** We understand that passenger full name (3–120 chars) and passport (5–30 chars) lengths are validated *after* removing leading and trailing spaces (so `"  A  "` is rejected as 1 character). Is that right? | Prevents bypassing minimum length rules with whitespace padding. | R3.5, R3.6, V3.2 | Product and DEV |
| P4 | **Doubt (Passenger character sets & duplicate passports):** Are there character restrictions for Full Name (e.g., letters only) and Passport (e.g., alphanumeric only), and can two passengers in the same booking have the exact same passport number? | Defines whether format/uniqueness validations exist beyond character length. | R3.9 | Product |
| P5 | **Doubt (Seat change vs. preserved passenger data):** When a traveler fills in passenger data, returns to the seat map (FR-02), and swaps a seat (e.g., deselects A1 and selects B2) or reduces the seat count, which passenger data is kept or discarded? | Prevents data loss or misattribution of passengers to seats after modifying selection. | R3.7, R3.10 | Product |
| P6 | **Doubt (Seat conflict after payment approval):** When a seat conflict occurs at confirmation (Section 4 Open Point), should the traveler see a simulated refund/reversal notice and be given a direct action to return to the seat map while keeping their passenger data? | Explicitly flagged as an open point in Section 4; defines the recovery flow for concurrent seat conflicts. | R4.10, R4.11, V4.6 | Product |
| P7 | **Doubt (Expiry date in the past & Email format):** Does the expiry date validation (`MM/AA`, month `01`–`12`) also reject dates in the past (e.g., `01/20`), and what is the exact validation rule for Contact Email? | The table in Section 4 only specifies `MM/AA, month between 01 and 12` and `Required` for email. | R4.2, R4.12 | Product and DEV |
| P8 | **Doubt (Card brand rules & CVV coupling):** Which BIN/prefix patterns identify Visa, Mastercard, and American Express, what happens when a card number does not match those three brands, and is a 4-digit CVV restricted only to American Express? | Needed to align card brand recognition and CVV validation rules between DEV and QA. | R4.2, R4.3, R4.13 | Product and DEV |
| P9 | **Doubt (Simulator test cards catalog):** Which exact card numbers in the academic simulator trigger "approved" versus "denied"? | Required to execute concrete examples in testing without guessing simulator numbers. | R4.6, R4.13 | DEV |
| P10 | **Doubt (Booking code alphabet):** Which specific characters are excluded as "ambiguous characters" when generating the 6-character alphanumeric booking code (e.g., `0`, `O`, `1`, `I`, `L`)? | Allows QA to verify that generated booking codes never contain excluded characters. | R5.1, R5.7 | DEV and Product |

### Scenarios that Depend on the Answers

- **P1** → Add a scenario verifying whether past missions are excluded or shown as unavailable if present in the catalog.
- **P2** → Refine mission sorting scenarios when multiple missions share the same departure date.
- **P3** → Confirm or adjust the boundary value examples in *Validate character length boundaries for passenger full name and passport*.
- **P4** → Add scenarios for invalid characters in passenger name/passport and duplicate passport numbers across seats in the same booking, if restricted.
- **P5** → Add a scenario for returning to the seat map, changing the selected seats, and advancing back to the passengers step.
- **P6** → Expand *Prevent booking creation when a selected seat is taken by another traveler before confirmation* with the post-conflict navigation and simulated refund notice.
- **P7** → Add boundary cases for expired card dates (past year/month) and invalid email formats to *Validate payment data rules and boundaries before processing*.
- **P8 & P9** → Populate the exact simulator test card numbers and brand prefixes in the *Payment* scenarios and examples tables, and add an unrecognized card brand scenario if applicable.
- **P10** → Specify the exact allowed character set in *Present the booking confirmation details, simulation notice, and issued passenger tickets*.
