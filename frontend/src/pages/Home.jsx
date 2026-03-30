import { Link } from 'react-router-dom';
import auctionsData from '../dummyAuctions.json';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
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
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Aktywne Aukcje</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctionsData.map(auction => (
            <div key={auction.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition flex flex-col">
              <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover rounded-xl mb-5" />
              <h3 className="text-xl font-semibold text-gray-950 mb-2 truncate">{auction.title}</h3>
              <p className="text-sm text-gray-600 mb-5 flex-grow line-clamp-2">{auction.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="text-right">
                  <span className="text-xs text-gray-500">Bieżąca cena:</span>
                  <p className="text-xl font-bold text-gray-950">{auction.currentPrice.toFixed(2)} PLN</p>
                </div>
                <Link to={`/auction/${auction.id}`} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition text-center">
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