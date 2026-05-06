import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, User, Home, CreditCard, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../api';

const ReservationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    roomType: location.state?.roomTypeId || 'deluxe',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      return navigate('/login');
    }

    setLoading(true);
    setError('');
    
    try {
      // Mocking room selection logic - in real app, we fetch available rooms first
      const { data } = await api.post('/reservations', {
        user: userInfo._id,
        room: '6638ba4a7f0e7d0012345678', // Placeholder Room ID
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        totalPrice: 2500000 // Placeholder price
      });
      
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create reservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
      <div className="bg-primary-dark p-12 text-white text-center">
        <h2 className="text-4xl font-serif font-bold">Book Your Stay</h2>
        <p className="mt-4 text-gray-400 font-medium tracking-wide">
          {location.state?.roomTypeName ? `Selected: ${location.state.roomTypeName}` : 'Fill in the details to reserve your room.'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-12 space-y-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 p-6 rounded-[2rem] flex flex-col items-center gap-3 border border-green-100 text-center animate-bounce">
            <CheckCircle size={40} />
            <div>
              <p className="text-lg font-bold">Reservation Successful!</p>
              <p className="text-sm opacity-80">You will be redirected shortly...</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar size={16} /> Check-in Date
            </label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
              value={formData.checkIn}
              onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar size={16} /> Check-out Date
            </label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
              value={formData.checkOut}
              onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User size={16} /> Number of Guests
            </label>
            <input 
              type="number" 
              min="1"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Home size={16} /> Room Type
            </label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition appearance-none"
              value={formData.roomType}
              onChange={(e) => setFormData({...formData, roomType: e.target.value})}
            >
              <option value="standard">Standard Room</option>
              <option value="deluxe">Deluxe Suite</option>
              <option value="presidential">Presidential Suite</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || success}
          className="w-full bg-primary-dark text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-gold transform active:scale-95 transition shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : <CreditCard size={24} />}
          {loading ? 'Processing...' : 'Confirm Reservation'}
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
