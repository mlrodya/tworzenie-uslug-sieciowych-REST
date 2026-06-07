// Centralny klient REST API - cała komunikacja z backendem przechodzi tutaj.
// Adres API można nadpisać zmienną środowiskową VITE_API_URL (np. na Vercelu).
// Lokalnie domyślnie używamy backendu uruchomionego na porcie 5049.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5049/api';

// --- Pomocnik: wyciąga czytelny komunikat błędu z odpowiedzi backendu ---
async function extractError(res) {
  try {
    const data = await res.json();
    // Błędy walidacji ASP.NET (ProblemDetails -> errors)
    if (data.errors) {
      return Object.values(data.errors).flat().join(' ');
    }
    return data.message || data.title || 'Wystąpił błąd.';
  } catch {
    const text = await res.text().catch(() => '');
    return text || 'Wystąpił błąd.';
  }
}

// ====================== AUKCJE ======================
export async function getAuctions() {
  const res = await fetch(`${BASE_URL}/auctions?pageSize=50`);
  if (!res.ok) throw new Error(await extractError(res));
  return res.json();
}

export async function getAuction(id) {
  const res = await fetch(`${BASE_URL}/auctions/${id}`);
  if (!res.ok) throw new Error(await extractError(res));
  return res.json();
}

export async function createAuction(data) {
  const res = await fetch(`${BASE_URL}/auctions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await extractError(res));
  return res.json().catch(() => ({}));
}

export async function getBids(id) {
  const res = await fetch(`${BASE_URL}/auctions/${id}/bids`);
  if (!res.ok) throw new Error(await extractError(res));
  return res.json();
}

export async function placeBid(id, data) {
  const res = await fetch(`${BASE_URL}/auctions/${id}/bids`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || 'Błąd podczas licytacji.');
  return text;
}

// ====================== UŻYTKOWNICY / AUTH ======================
export async function login(data) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await extractError(res));
  return res.json();
}

export async function register(data) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await extractError(res));
  return res.json();
}

// ====================== AUTH STORAGE (JWT) ======================
export function saveAuth(auth) {
  localStorage.setItem('auth', JSON.stringify(auth));
}

export function getAuth() {
  const raw = localStorage.getItem('auth');
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem('auth');
}
