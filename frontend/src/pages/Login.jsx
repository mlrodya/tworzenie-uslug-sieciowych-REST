import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, saveAuth } from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login({ email, password });
      saveAuth({ token: data.token, userId: data.userId, username: data.username, role: data.role });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="text-center block text-3xl font-extrabold text-blue-600 mb-6">
          VIZJA Auctions
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Zaloguj się do konta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adres e-mail
              </label>
              <div className="mt-1">
                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Hasło
              </label>
              <div className="mt-1">
                <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-60">
                {loading ? 'Logowanie...' : 'Zaloguj się'}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            Konto demo: demo@demo.com / Password123
          </p>

          <div className="mt-6 text-center">
            <Link to="/" className="font-medium text-sm text-blue-600 hover:text-blue-500">
              &larr; Wróć do strony głównej
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
