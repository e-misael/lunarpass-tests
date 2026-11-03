```markdown
# Functional Documentation

**Module:** Storefront Lunar Pass

Functional and business document for the Storefront (traveler journey).

---

## Table of Contents

1. [Mission Search](#1-mission-search)
2. [Seat Map](#2-seat-map)
3. [Passengers](#3-passengers)
4. [Payment](#4-payment)
5. [Ticket Issuance](#5-ticket-issuance)

---

## 1. Mission Search

### User Story

**As a** traveler,
**I want to** search and compare missions by lunar base and by launch date,
**so that** I can choose the trip best suited to my destination and my availability.

### Business Rules

- The catalog offers exactly four lunar bases as destinations:

  | Lunar Base | Location |
  |---|---|
  | Base Lunar Alpha | Mar da Tranquilidade |
  | Base Lunar Orion | Cratera Copernicus |
  | Base Lunar Aurora | Polo Sul Lunar |
  | Base Lunar Selene | Vale Taurus-Littrow |

- Every mission is a round trip, with a fixed 7-day stay at the lunar base.
- The mission price is a decimal value per passenger and is displayed in US dollars (USD).
- Each mission is operated by a rocket with a maximum capacity of 4 seats.
- Missions with all seats occupied remain visible in the results, identified as "Esgotado", and cannot be booked.
- When no base is selected — or when all bases are selected — the search considers all bases.
- The default sorting of results is by nearest departure date.

### Functional Requirements

#### FR-01 — Search missions by lunar base

- It must be possible to select one or more lunar bases as a search filter.
- The search can be started both from the home page form and from the highlight of a specific lunar base.
- The missions that match the selected bases must be presented along with the number of results found.
- The results must indicate which bases are being used as a filter.

#### FR-02 — Sort results by launch date

- It must be possible to sort missions by nearest or farthest departure date.
- When the traveler does not choose a sorting option, the results must be presented by nearest departure date.

#### FR-03 — Refine the search from the results

- It must be possible to change the selected bases and the sorting directly on the results page, without returning to the home page.
- The mission list must be updated as soon as the new criteria are applied.

#### FR-04 — Present the information for each mission

- Each mission in the results must present:
  - mission identifier;
  - rocket;
  - destination lunar base;
  - departure date;
  - return date;
  - length of stay;
  - number of available seats out of the total;
  - price per passenger.
- It must be possible to start the booking of any mission that has available seats.
- Missions without available seats must be identified as "Esgotado", without the option to start booking.

#### FR-05 — Handle the absence of results

- When no mission matches the applied filters, a notice informing the situation must be displayed.
- In this case, a shortcut to view all missions without filters must be offered.

### Assumptions and Open Points

- **Assumption:** the catalog displayed to the traveler contains only current missions, maintained by the company's operations; the Storefront does not apply a cutoff for departure dates that have already passed. If past missions can remain in the catalog, a display rule must be defined.

---

## 2. Seat Map

### User Story

**As a** traveler,
**I want to** view the rocket cabin and choose the seats for my trip,
**so that** I can secure the desired seats for myself and my companions.

### Business Rules

- The cabin has 4 seats, arranged in two rows: A1 and A2 (view of "Terra") and B1 and B2 (view of "Lua").
- A booking must contain a minimum of 1 and a maximum of 4 seats.
- A seat can be in one of three states: available, selected, or occupied.
- Occupied seats belong to already confirmed bookings and cannot be selected.
- The same seat cannot be booked twice on the same mission.
- The total booking amount is expressed in USD and corresponds to the price per passenger multiplied by the number of selected seats.

### Functional Requirements

#### FR-01 — View the seat map

- The cabin map must present the position of each seat, with a visual distinction between the available, selected, and occupied states.
- Each seat must display its identification, its state, the associated view ("Terra" or "Lua"), and the price per passenger.
- The occupancy displayed must reflect the bookings already confirmed for the mission.

#### FR-02 — Select and deselect seats

- It must be possible to select available seats and deselect seats already chosen, in any order.
- When attempting to select an occupied seat, the traveler must be warned that they need to choose another one.
- The selection summary — chosen seats and quantity out of the cabin total — and the total booking amount must be updated with each change to the selection.

#### FR-03 — Control booking progress

- It must only be possible to proceed to the passengers step with at least one seat selected.
- When all seats on the mission are occupied, the sold-out mission notice must be displayed, with the option to return to the mission list.

---

## 3. Passengers

### User Story

**As a** traveler,
**I want to** provide the data of the passengers for each booked seat,
**so that** the tickets are issued in the names of the people who will travel.

### Business Rules

- Each selected seat must have exactly one associated passenger.
- The required data for each passenger are: full name ("Nome completo") and passport number ("Passaporte").
- The full name must be between 3 and 120 characters.
- The passport number must be between 5 and 30 characters.
- The data entered is normalized: leading and trailing spaces are removed and the passport is recorded in uppercase letters.

### Functional Requirements

#### FR-01 — Register the booking passengers

- There must be a passenger form for each selected seat, identifying the corresponding seat.
- Full name and passport are mandatory for all passengers.
- Data that violates the business rules must generate an error message next to the corresponding field, and the first invalid field must receive focus.
- It must only be possible to proceed to payment when all passengers have valid data.

#### FR-02 — Review and correct data during the flow

- It must be possible to return to the seats step without losing the passenger data already filled in.
- Fields with errors must be revalidated as the traveler corrects them.

---

## 4. Payment

### User Story

**As a** traveler,
**I want to** pay for my booking by credit card and receive immediate feedback on the result,
**so that** I can complete the purchase of the trip securely and clearly.

### Business Rules

- The Storefront payment is simulated for academic purposes: no real charge is made, and the traveler is informed of this at confirmation.
- The payment result can be: approved, denied, or incorrect card data ("dados do cartão incorretos").
- Approval is determined by predefined simulator test cards; any other number that is valid in format results in "dados do cartão incorretos".
- The required payment data are:

  | Field | Rule |
  |---|---|
  | E-mail de contato | Required |
  | Nome no cartão | 3 to 80 characters |
  | Número do cartão | 13 to 16 digits |
  | Validade | MM/AA format, month between 01 and 12 |
  | CVV | 3 or 4 digits |

- The total amount in USD is calculated by the system as price per passenger multiplied by the number of seats, with the server's decimal value being the official reference.
- The booking is only created after payment approval.
- Card data is used only for processing and is not stored with the booking.
- The recognized card brands are Visa, Mastercard, and American Express.

### Functional Requirements

#### FR-01 — Enter payment data

- The following must be requested: contact email ("E-mail de contato"), name on card ("Nome no cartão"), card number ("Número do cartão"), expiry date ("Validade"), and CVV.
- Invalid data must generate an error message next to the corresponding field, with focus placed on the first field with an error.
- The card number and expiry date must be automatically formatted while typing.
- The card brand must be identified and displayed based on the number entered.
- The total purchase amount must be displayed before payment confirmation.

#### FR-02 — Process the payment

- The payment must only be processed when all data is valid.
- While the payment is being processed, this condition must be visually indicated and it must not be possible to change the data or resubmit the order.
- When the payment is approved, the booking must be registered and the traveler taken to the confirmation.
- When the payment is denied, refused due to incorrect data, or interrupted by a processing failure, the reason must be displayed and the traveler must remain on the payment step with the data filled in, being able to correct it and try again.

#### FR-03 — Handle seat conflict at confirmation

- When one of the selected seats has been booked by another traveler during the flow, the booking must not be created and the traveler must be informed that the seat has just been taken and that they need to choose another one.

### Assumptions and Open Points

- **Open point:** the expected behavior when the payment is approved but the booking fails due to a seat conflict (e.g., simulated refund, guidance to return to the seat map) requires a business definition.

---

## 5. Ticket Issuance

### User Story

**As a** traveler,
**I want to** receive the booking confirmation with the code, the tickets, and the proof of the amount paid,
**so that** I have a guarantee of the purchase and the information needed for boarding.

### Business Rules

- The confirmed booking receives a unique 6-character alphanumeric code, generated without ambiguous characters; this is its only public identifier.
- One ticket is issued per seat, linked to the passenger's full name and passport.
- The total decimal amount recorded in the booking is calculated in USD by the system (price per passenger × number of passengers).
- The confirmation must make explicit that this is a simulation and that no real charge was made.

### Functional Requirements

#### FR-01 — Confirm the booking to the traveler

- The purchase confirmation must present: booking code, destination lunar base, departure and return dates, rocket, and booked seats.
- The contact email provided must be displayed as the destination of the booking details, along with the instruction to keep the booking code.
- The payment result and the card brand used must be displayed, accompanied by the notice that no charge was made.

#### FR-02 — Present the issued tickets

- One ticket must be displayed per passenger, containing full name, passport, and seat.
- The total amount paid for the booking must be presented in USD at confirmation.

#### FR-03 — Start a new purchase

- It must be possible to start a new mission search when the traveler finishes a booking.
```