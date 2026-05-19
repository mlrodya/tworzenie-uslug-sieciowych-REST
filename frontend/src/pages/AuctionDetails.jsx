import { useParams, Link } from 'react-router-dom';
import auctionsData from '../dummyAuctions.json';

function AuctionDetails() {
  const { id } = useParams();
  // find by id
  const auction = auctionsData.find(a => a.id === parseInt(id));

  if (!auction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nie znaleziono aukcji</h2>
          <Link to="/" className="text-blue-600 hover:underline">Wróć do strony głównej</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Nawigacja */}
      <header className="bg-white shadow-sm sticky top-0 z-10 mb-8">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition">
            &larr; VIZJA Auctions
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Zdjęcie */}
          <div className="md:w-1/2">
            <img src={auction.image} alt={auction.title} className="w-full h-full object-cover min-h-[300px]" />
          </div>
          
          {/* Szczegóły i Formularz licytacji */}
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-1">
              Kończy się: {new Date(auction.endTime).toLocaleDateString('pl-PL')}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{auction.title}</h1>
            <p className="text-gray-600 mb-8">{auction.description}</p>
            
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Aktualna najwyższa oferta:</p>
              <p className="text-4xl font-black text-gray-900">{auction.currentPrice.toFixed(2)} PLN</p>
            </div>

            <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="number" 
                min={auction.currentPrice + 1}
                step="0.01"
                placeholder="Twoja kwota" 
                required
                className="flex-1 appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Licytuj
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuctionDetails;