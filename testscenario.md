## Feature: Todo toevoegen

### Scenario: Normale invoer (hoofdscenario)
- **Stap 1:** Open de applicatie in de browser
- **Stap 2:** Typ "Huiswerk maken" in het invoerveld
- **Stap 3:** Klik op de "Toevoegen" knop
- **Testdata:** "Huiswerk maken"
- **Verwacht resultaat:** De nieuwe todo verschijnt onderaan de lijst en een bevestigingsmelding ("Todo toegevoegd") verschijnt.

### Alternatief scenario: Lege invoer
- **Stap 1:** Open de applicatie
- **Stap 2:** Laat het invoerveld leeg
- **Stap 3:** Klik op de "Toevoegen" knop
- **Testdata:** *(geen invoer)*
- **Verwacht resultaat:** Er verschijnt een alert of foutmelding: "Voer een todo in".

### Alternatief scenario: Invoer met alleen spaties
- **Stap 1:** Typ meerdere spaties in het invoerveld
- **Stap 2:** Klik op de "Toevoegen" knop
- **Testdata:** `"     "`
- **Verwacht resultaat:** De invoer wordt geweigerd, er verschijnt een alert: "Voer een geldige todo in".
