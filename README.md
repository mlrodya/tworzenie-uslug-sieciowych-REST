# 🛒 Rozproszony System Aukcyjny (REST API)

Projekt zaliczeniowy z przedmiotu: **Tworzenie usług sieciowych REST**.
System umożliwia wystawianie przedmiotów, licytację oraz zarządzanie kontami użytkowników. Zbudowany zgodnie z założeniami architektury REST oraz wzorcem warstwowym (Controller – Service – Repository – Model).

## 🚀 Technologie
- **Backend:** .NET 9 (ASP.NET Core Web API)
- **Baza Danych:** PostgreSQL + Entity Framework Core (ORM)
- **Frontend:** React + Vite
- **Infrastruktura:** Docker, Docker Compose
- **Autoryzacja:** JSON Web Tokens (JWT) + hashowanie haseł BCrypt

## 🏗 Architektura Systemu
Projekt podzielony jest na dwie części (monorepo):
1. `/backend` – logika biznesowa, walidacja i dostęp do bazy danych.
   Warstwy: **Controller → Service → Repository → Model (EF Core)**.
   Komunikacja z bazą wyłącznie przez repozytoria; kontrolery przyjmują żądania i zwracają kody HTTP.
2. `/frontend` – aplikacja kliencka SPA (React), komunikująca się z systemem **wyłącznie przez REST API** (`fetch`).

> Interfejs użytkownika nie łączy się bezpośrednio z bazą danych – tylko przez REST API.

## 🛠 Instrukcja Uruchomienia (Lokalnie)

Wymagania: **Docker**, **Node.js** oraz **.NET 9 SDK**.

### 1. Baza danych (PostgreSQL w kontenerze)
W głównym folderze projektu:
```bash
docker-compose up -d
```
Baza wystartuje na porcie `5432`.

### 2. Backend (API)
```bash
cd backend
dotnet run
```
Przy starcie aplikacja **automatycznie zakłada schemat bazy (migracje)** i **dodaje dane startowe** (seed).
- API: `http://localhost:5049`
- Dokumentacja Swagger: `http://localhost:5049/swagger`

### 3. Frontend (interfejs użytkownika)
```bash
cd frontend
npm install
npm run dev
```
Aplikacja: `http://localhost:5173`

### 👤 Konto demonstracyjne
```
e-mail:  demo@demo.com
hasło:   Password123
```

## 📡 Endpointy API
Bazowy adres: `http://localhost:5049/api`. Format danych: JSON. Standardowe kody HTTP (200, 201, 204, 400, 401, 404, 500).

### Użytkownicy
| Metoda | Endpoint | Opis |
|---|---|---|
| POST | `/users` | Rejestracja nowego użytkownika |
| POST | `/users/login` | Logowanie – zwraca token JWT |
| GET | `/users` | Lista użytkowników |
| GET | `/users/{id}` | Dane użytkownika |
| PUT | `/users/{id}` | Edycja użytkownika |
| DELETE | `/users/{id}` | Usunięcie użytkownika |

### Aukcje
| Metoda | Endpoint | Opis |
|---|---|---|
| GET | `/auctions` | Lista aukcji (paginacja `?page=&pageSize=`, filtr `?categoryId=`) |
| GET | `/auctions/{id}` | Szczegóły aukcji |
| POST | `/auctions` | Wystawienie przedmiotu |
| PUT | `/auctions/{id}` | Edycja aukcji |
| DELETE | `/auctions/{id}` | Usunięcie aukcji |

### Licytacja
| Metoda | Endpoint | Opis |
|---|---|---|
| POST | `/auctions/{id}/bids` | Złożenie oferty (sprawdza, czy wyższa od aktualnej i czy aukcja trwa) |
| GET | `/auctions/{id}/bids` | Historia ofert dla aukcji |

## 🗃 Model danych (ERD – uproszczony)
```
User (Id, Username, Email, PasswordHash, Role)
   │ 1
   │
   │ N
Auction (Id, Title, Description, StartingPrice, CurrentPrice,
         StartDate, EndDate, CategoryId, OwnerId→User, ImageUrl)
   │ 1
   │
   │ N
Bid (Id, Amount, UserId→User, AuctionId→Auction, CreatedAt)
```

## ✅ Zrealizowane wymagania
- REST API dla użytkowników, aukcji i licytacji (pełny CRUD + poprawne kody HTTP)
- Architektura warstwowa (Controller / Service / Repository / Model)
- Trwałe przechowywanie danych (PostgreSQL + EF Core, migracje)
- DTO + walidacja danych wejściowych (Data Annotations)
- Globalna obsługa wyjątków
- Dokumentacja API (Swagger / OpenAPI)
- Autoryzacja JWT + hashowanie haseł (BCrypt)
- Paginacja i filtrowanie listy aukcji
- Konteneryzacja bazy (Docker Compose)
- Interfejs SPA komunikujący się wyłącznie przez REST API

## 👥 Zespół Projektowy
- Osoba 1 – Baza danych, autoryzacja JWT
- Osoba 2 – Logika biznesowa (aukcje, licytacje), paginacja
- Mikhail Rodia – Frontend (React), integracja API, konteneryzacja (Docker)
