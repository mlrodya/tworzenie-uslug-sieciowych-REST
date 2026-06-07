# 🎤 Plan prezentacji projektu — Rozproszony System Aukcyjny (REST)

> Przedmiot: *Tworzenie usług sieciowych REST*. Czas: ~12–15 min + pytania.

---

## 0. Przygotowanie PRZED prezentacją (5 min wcześniej)

Uruchom w 3 terminalach (z folderu projektu):
```bash
docker-compose up -d            # 1) baza PostgreSQL (:5432)
cd backend && dotnet run        # 2) API (:5049, Swagger /swagger)
cd frontend && npm run dev      # 3) frontend (:5173)
```
Otwórz w przeglądarce **dwie zakładki**:
- `http://localhost:5173` — aplikacja (główny pokaz)
- `http://localhost:5049/swagger` — dokumentacja API

✅ Sprawdź, że strona główna pokazuje aukcje.
⚠️ Pamiętaj: jeśli masz inny projekt na porcie 5432 — zatrzymaj go (`docker stop barbershop_backend-db-1`).
🔑 Konto demo: `demo@demo.com` / `Password123`

---

## 1. Wstęp (1 min)
- Co to jest: rozproszony system aukcyjny oparty na REST API.
- Cel: rejestracja użytkowników, wystawianie przedmiotów, licytacja, historia ofert.
- Kluczowa zasada: **frontend komunikuje się z systemem wyłącznie przez REST API** (nigdy bezpośrednio z bazą).

## 2. Technologie i architektura (2 min)
- **Backend:** ASP.NET Core (.NET 9) Web API
- **Baza:** PostgreSQL + Entity Framework Core (ORM, migracje)
- **Frontend:** React + Vite (SPA)
- **Bezpieczeństwo:** JWT + hashowanie haseł BCrypt
- **Infrastruktura:** Docker / Docker Compose
- **Architektura warstwowa:** `Controller → Service → Repository → Model`
  - *Controller* — przyjmuje żądania HTTP, zwraca kody statusu
  - *Service* — logika biznesowa (np. walidacja oferty)
  - *Repository* — jedyny dostęp do bazy
  - *DTO* — oddzielają kontrakt API od modelu bazy (np. nie zwracają hasła)
- Pokaż strukturę folderów w IDE (Controllers / Services / Repositories / Models / DTOs / Data / Migrations).

## 3. 🎬 Pokaz na żywo (5–6 min) — NAJWAŻNIEJSZE

**Krok 1 — Lista aukcji (GET /auctions)**
- Strona główna: aukcje pobrane z API, ze zdjęciami i ceną.
- Pokaż wyszukiwarkę (filtrowanie po nazwie).

**Krok 2 — Logowanie (POST /users/login)**
- Zaloguj się kontem demo → w nagłówku pojawia się nazwa użytkownika.
- Powiedz: backend zwraca **token JWT**, który zapisujemy po stronie klienta.

**Krok 3 — Szczegóły + licytacja (GET /auctions/{id}, POST /auctions/{id}/bids)**
- Wejdź w aukcję → szczegóły + **historia ofert**.
- Złóż ofertę → cena się aktualizuje, oferta pojawia się w historii.
- Pokaż walidację: spróbuj ofertę **niższą** od aktualnej → komunikat błędu (reguła biznesowa).

**Krok 4 — Wystawienie przedmiotu (POST /auctions)**
- „Wystaw przedmiot", wypełnij formularz → po zapisaniu nowa aukcja jest na liście.

**Krok 5 — Dowód, że to REST (mocny punkt!)**
- Otwórz **DevTools → Network** i pokaż zapytania `fetch` do `http://localhost:5049/api/...` z odpowiedziami JSON.
- To dowód, że UI rozmawia z systemem wyłącznie przez REST API.

**Krok 6 — Swagger (GET/POST/PUT/DELETE)**
- Pokaż `http://localhost:5049/swagger` — wszystkie endpointy.
- Wykonaj `GET /api/auctions` i np. `POST /api/users` z błędnymi danymi → **400 z komunikatami walidacji**.

## 4. Realizacja wymagań (2 min) — „odhaczenie" punktów
Krótko pokaż/wymień, że spełniamy wymagania:
- ✅ REST API: użytkownicy, aukcje, licytacje — pełny CRUD + poprawne kody HTTP (200/201/204/400/404/500)
- ✅ Architektura warstwowa (Controller/Service/Repository/Model)
- ✅ Trwałe dane: PostgreSQL + EF Core + migracje
- ✅ DTO + walidacja danych wejściowych (Data Annotations)
- ✅ Globalna obsługa wyjątków
- ✅ Dokumentacja API: Swagger / OpenAPI
- ✅ Repozytorium Git + czytelna struktura
- **Punkty dodatkowe:** JWT + BCrypt, paginacja i filtrowanie, konteneryzacja (Docker)

## 5. Podział pracy w zespole (30 s)
- Vieronika Shcherban — baza danych, autoryzacja JWT
- Maciej Jagodziński — logika biznesowa (aukcje, licytacje), paginacja
- Mikhail Rodia — frontend (React), integracja API, konteneryzacja (Docker)

## 6. Podsumowanie (30 s)
- Działający system end-to-end zgodny z REST.
- Możliwe rozszerzenia: wymuszenie autoryzacji `[Authorize]` na endpointach, testy jednostkowe, logowanie (Serilog), wdrożenie backendu w chmurze.

---

## ❓ Prawdopodobne pytania komisji (przygotuj odpowiedzi)

**Dlaczego to jest „RESTful"?**
> Zasoby (`/users`, `/auctions`, `/bids`) + standardowe metody HTTP (GET/POST/PUT/DELETE) + odpowiednie kody statusu + bezstanowość + JSON.

**Jak przechowywane są hasła?**
> Nigdy w postaci jawnej — tylko **hash BCrypt**. Przy logowaniu porównujemy hash (`BCrypt.Verify`).

**Do czego służy JWT?**
> Token wydawany przy logowaniu, przechowywany po stronie klienta, identyfikuje użytkownika. (Szczerze: w tej wersji nie wymuszamy `[Authorize]` na endpointach — to możliwe rozszerzenie.)

**Po co warstwa Service i Repository?**
> Rozdzielenie odpowiedzialności: kontroler tylko obsługuje HTTP, logika jest w Service, dostęp do bazy w Repository. Łatwiej testować i utrzymywać.

**Po co DTO skoro są modele?**
> DTO oddziela kontrakt API od modelu bazy — nie ujawniamy np. `PasswordHash`, mamy kontrolę nad tym, co przyjmujemy i zwracamy.

**Jak działa walidacja?**
> Data Annotations na DTO (`[Required]`, `[EmailAddress]`, `[Range]`) + `[ApiController]` automatycznie zwraca `400` z listą błędów.

**Jak zapewniona jest trwałość danych?**
> PostgreSQL przez EF Core; schemat tworzony migracjami (uruchamiane automatycznie przy starcie).

**Co się dzieje przy błędzie serwera?**
> Globalny middleware obsługi wyjątków zwraca `500` z komunikatem JSON zamiast „wykrzaczenia" aplikacji.

**Jak działa licytacja?**
> Walidujemy: czy oferta > aktualnej ceny i czy aukcja się nie zakończyła; zapisujemy ofertę i aktualizujemy cenę. Historia ofert jest przechowywana.

**Paginacja / filtrowanie?**
> `GET /api/auctions?page=1&pageSize=10&categoryId=2`.

---

## 🛟 Plan B (gdyby coś nie działało)
- Strona pusta / błąd API → sprawdź, czy backend działa (`http://localhost:5049/swagger`) i czy baza wstała (`docker ps`).
- Brak danych → seed dodaje 3 aukcje i konto demo automatycznie przy starcie API.
- Konflikt portu 5432 → zatrzymaj inny kontener Postgres.
- Gdyby frontend nie ruszył → pokaż całe API na żywo w **Swaggerze** (to też pełnoprawny pokaz REST).
