import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createAuction, getAuth } from '../api';

function AddAuction() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    startingPrice: '',
    endDate: '',
    categoryId: '1',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createAuction({
        title: form.title,
        description: form.description,
        startingPrice: parseFloat(form.startingPrice),
        endDate: new Date(form.endDate).toISOString(),
        categoryId: parseInt(form.categoryId, 10),
        ownerId: auth.userId,
        imageUrl: form.imageUrl || null,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Musisz być zalogowany</h2>
          <Link to="/login" className="text-blue-600 hover:underline">Przejdź do logowania</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white shadow-sm sticky top-0 z-10 mb-8">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition">
            &larr; VIZJA Auctions
          </Link>
        </nav>
      </header>

      <main className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Wystaw przedmiot</h1>
          <p className="text-gray-500 mb-8">Wypełnij poniższe dane, aby dodać nową aukcję do systemu.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa przedmiotu</label>
              <input type="text" required value={form.title} onChange={update('title')} placeholder="np. iPhone 15 Pro" className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
              <textarea rows="4" required value={form.description} onChange={update('description')} placeholder="Podaj szczegóły, stan, specyfikację..." className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cena wywoławcza (PLN)</label>
                <input type="number" min="0.01" step="0.01" required value={form.startingPrice} onChange={update('startingPrice')} placeholder="0.00" className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data zakończenia</label>
                <input type="datetime-local" required value={form.endDate} onChange={update('endDate')} className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
                <select value={form.categoryId} onChange={update('categoryId')} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="1">Elektronika</option>
                  <option value="2">Motoryzacja</option>
                  <option value="3">Kolekcje</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link do zdjęcia (URL)</label>
                <input type="url" value={form.imageUrl} onChange={update('imageUrl')} placeholder="https://..." className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            <div className="pt-4">
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg disabled:opacity-60">
                {loading ? 'Dodawanie...' : 'Dodaj aukcję'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddAuction;
