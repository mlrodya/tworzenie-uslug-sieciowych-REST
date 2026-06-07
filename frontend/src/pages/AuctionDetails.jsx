import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAuction, getBids, placeBid, getAuth } from '../api';

const PLACEHOLDER = 'https://placehold.co/600x600?text=Aukcja';

function AuctionDetails() {
  const { id } = useParams();
  const auth = getAuth();

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [bidError, setBidError] = useState('');

  const load = () => {
    getAuction(id)
      .then((data) => {
        setAuction(data);
        return getBids(id);
      })
      .then(setBids)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    setMessage('');
    setBidError('');
    try {
      await placeBid(id, { amount: parseFloat(amount), userId: auth.userId });
      setMessage('Oferta została złożona!');
      setAmount('');
      load(); // odśwież cenę i historię
    } catch (err) {
      setBidError(err.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Ładowanie...</div>;
  }

  if (error || !auction) {
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
      <header className="bg-white shadow-sm sticky top-0 z-10 mb-8">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition">
            &larr; VIZJA Auctions
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={auction.imageUrl || PLACEHOLDER}
              alt={auction.title}
              onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
              className="w-full h-full object-cover min-h-[300px]"
            />
          </div>

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

            {auth ? (
              <form className="flex gap-4" onSubmit={handleBid}>
                <input
                  type="number"
                  min={auction.currentPrice + 0.01}
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Twoja kwota"
                  required
                  className="flex-1 appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="submit" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition shadow-lg">
                  Licytuj
                </button>
              </form>
            ) : (
              <p className="text-gray-600">
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">Zaloguj się</Link>, aby licytować.
              </p>
            )}

            {message && <p className="text-green-600 font-medium mt-3">{message}</p>}
            {bidError && <p className="text-red-600 font-medium mt-3">{bidError}</p>}
          </div>
        </div>

        {/* --- HISTORIA OFERT --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Historia ofert</h2>
          {bids.length === 0 ? (
            <p className="text-gray-500">Brak ofert. Bądź pierwszy!</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {bids.map((b) => (
                <li key={b.id} className="py-3 flex justify-between text-gray-700">
                  <span>Użytkownik #{b.userId}</span>
                  <span className="font-semibold">{b.amount.toFixed(2)} PLN</span>
                  <span className="text-gray-400 text-sm">{new Date(b.createdAt).toLocaleString('pl-PL')}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default AuctionDetails;
