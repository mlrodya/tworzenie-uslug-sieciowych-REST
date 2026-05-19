# 🛒 Rozproszony System Aukcyjny (REST API)

Projekt zaliczeniowy z przedmiotu: **Tworzenie usług sieciowych REST**.
System umożliwia wystawianie przedmiotów, licytację w czasie rzeczywistym oraz zarządzanie kontami użytkowników. Zbudowany zgodnie z założeniami architektury REST oraz wzorcem MVC z wyraźnym podziałem na warstwy (Controller, Service, Repository).

## 🚀 Technologie
- **Backend:** .NET 8 (ASP.NET Core Web API)
- **Baza Danych:** PostgreSQL + Entity Framework Core (ORM)
- **Frontend:** React + Vite
- **Infrastruktura:** Docker, Docker Compose
- **Autoryzacja:** JSON Web Tokens (JWT)

## 🏗 Architektura Systemu
Projekt został podzielony na dwie główne części (Monorepo):
1. `/backend` - Logika biznesowa, autoryzacja, walidacja i dostęp do bazy danych. Komunikacja z bazą odbywa się wyłącznie poprzez repozytoria, a kontrolery służą jedynie do przyjmowania żądań i zwracania odpowiednich statusów HTTP.
2. `/frontend` - Aplikacja kliencka SPA, komunikująca się z systemem backendowym za pomocą asynchronicznych zapytań HTTP (REST).

[Tutaj wkleimy link do wygenerowanego diagramu ERD]

## 🛠 Instrukcja Uruchomienia (Lokalnie)

Aby uruchomić pełne środowisko na swoim komputerze, upewnij się, że posiadasz zainstalowanego **Dockera** oraz środowisko **Node.js** i **.NET 8 SDK**.

### 1. Baza Danych
W głównym folderze projektu uruchom kontener z bazą PostgreSQL:
```bash
docker-compose up -d
2. Backend (API)

Przejdź do folderu backendu, zainstaluj zależności i uruchom serwer:
cd backend
dotnet restore
dotnet run
API będzie dostępne pod adresem: http://localhost:5000 (lub wskazanym przez Kestrel), a dokumentacja Swagger pod /swagger.

3. Frontend (Interfejs Użytkownika)

Przejdź do folderu frontendu, zainstaluj paczki NPM i uruchom serwer deweloperski:
cd frontend
npm install
npm run dev
Aplikacja webowa otworzy się pod adresem: http://localhost:5173.

📡 Główne Endpointy API
Zgodnie z wymogami REST, API wykorzystuje standardowe metody HTTP oraz kody odpowiedzi (200, 201, 204, 400, 404, 500).

Użytkownicy

POST /users - Rejestracja nowego użytkownika

POST /users/login - Logowanie i pobranie tokenu JWT

GET /users/{id} - Pobranie danych profilu

Aukcje

GET /auctions - Pobranie listy aukcji (obsługuje filtrowanie i paginację)

POST /auctions - Wystawienie przedmiotu na aukcję

GET /auctions/{id} - Szczegóły aukcji

POST /auctions/{id}/bids - Złożenie nowej oferty (Licytacja)

👥 Zespół Projektowy
Osoba 1 - Baza Danych, Autoryzacja JWT, Logowanie (Serilog)

Osoba 2 - Logika Biznesowa (Aukcje, Licytacje), Paginacja, Testy Jednostkowe

Mikhail Rodia - Frontend (React), Integracja API, Konteneryzacja (Docker), Wdrożenie
