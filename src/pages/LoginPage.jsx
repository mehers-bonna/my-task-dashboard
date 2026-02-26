import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('user1@example.com'); 
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://task-api-eight-flax.vercel.app/api/login', {
        email, password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to access your dashboard</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block">Email</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Mail size={18} /></span>
                <input type="email" required className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e4d3e]" 
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block">Password</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Lock size={18} /></span>
                <input type="password" required className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1e4d3e]" 
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</div>}
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 bg-[#1e4d3e] text-white font-semibold rounded-xl hover:bg-[#163a2f] transition-all">
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;