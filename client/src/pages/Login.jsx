import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 mb-20 px-6">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif font-bold text-primary-dark">Welcome Back</h2>
          <p className="text-gray-400 mt-2 font-medium">Please enter your details to login</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3 border border-red-100">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold hover:bg-primary-gold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />} 
            {loading ? 'Logging in...' : 'Login Now'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 font-medium">
          Don't have an account? <Link to="/register" className="text-primary-gold font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
