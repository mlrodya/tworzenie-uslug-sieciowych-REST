import { Link } from 'react-router-dom';

function AddAuction() {
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

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Nazwa przedmiotu</label>
              <input type="text" id="title" required placeholder="np. iPhone 15 Pro" className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
              <textarea id="description" rows="4" required placeholder="Podaj szczegóły, stan, specyfikację..." className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Cena wywoławcza (PLN)</label>
                <input type="number" id="price" min="1" step="0.01" required placeholder="0.00" className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Data zakończenia</label>
                <input type="datetime-local" id="endDate" required className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Link do zdjęcia (URL)</label>
              <input type="url" id="imageUrl" placeholder="https://..." className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Dodaj aukcję
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddAuction;