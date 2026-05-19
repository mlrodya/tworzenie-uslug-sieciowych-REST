import { Link } from 'react-router-dom';
import auctionsData from '../dummyAuctions.json';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-3xl font-extrabold text-blue-600">VIZJA Auctions</Link>
          <div className="flex gap-4">
            <Link to="/add-auction" className="text-gray-600 font-semibold px-4 py-2 hover:text-blue-600 transition flex items-center">
              + Wystaw przedmiot
            </Link>
            <Link to="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
              Zaloguj się
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-gray-950 mb-1">Aktywne Aukcje</h2>
        <p className="text-gray-600 mb-8">Przeglądaj, licytuj i znajduj unikalne przedmioty.</p>
        
        {/* --- PANEL FILTROWANIA I WYSZUKIWANIA (NOWY KLUCZOWY BLOK) --- */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-10 flex flex-col sm:flex-row gap-5 justify-between items-center">
          {/* Pole wyszukiwania z ikoną лупи */}
          <div className="relative w-full sm:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {/* SVG іконка лупи */}
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Szukaj lub filtruj aukcje..." 
              className="w-full appearance-none border border-gray-300 rounded-2xl pl-11 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Випадаючі списки */}
          <div className="flex gap-4 w-full sm:w-auto">
            <select className="flex-1 appearance-none border border-gray-300 rounded-2xl px-5 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer transition">
              <option>Wszystkie kategorie</option>
              <option>Elektronika</option>
              <option>Motoryzacja</option>
              <option>Kolekcje</option>
            </select>
            <select className="flex-1 appearance-none border border-gray-300 rounded-2xl px-5 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer transition">
              <option>Najnowsze</option>
              <option>Cena: rosnąco</option>
              <option>Cena: malejąco</option>
            </select>
          </div>
        </div>
        {/* --- KONIEC PANELU --- */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctionsData.map(auction => (
            <div key={auction.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition flex flex-col group">
              <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover rounded-2xl mb-5 group-hover:scale-[1.02] transition-transform" />
              <h3 className="text-xl font-semibold text-gray-950 mb-2 truncate">{auction.title}</h3>
              <p className="text-sm text-gray-600 mb-5 flex-grow line-clamp-2">{auction.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="text-right">
                  <span className="text-xs text-gray-500">Bieżąca cena:</span>
                  <p className="text-2xl font-black text-blue-600">{auction.currentPrice.toFixed(2)} PLN</p>
                </div>
                <Link to={`/auction/${auction.id}`} className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-black transition text-center shadow">
                  Licytuj
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;