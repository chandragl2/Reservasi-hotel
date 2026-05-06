import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Calendar, MapPin } from 'lucide-react';
import api from '../api';

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReservations = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { data } = await api.get('/reservations');
        // Filter for current user (in a real app, the backend should handle this filtering)
        const myData = data.filter(res => res.user._id === userInfo._id);
        setReservations(myData);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReservations();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-[60vh] text-primary-gold font-serif text-2xl">Loading your bookings...</div>;

  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-serif text-primary-dark mb-2">My Reservations</h1>
        <p className="text-gray-500 font-medium">Manage and track your upcoming stays at HotelReserve.</p>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white p-20 rounded-[2.5rem] shadow-xl border border-gray-100 text-center">
          <Calendar size={64} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-2xl font-serif mb-4">No reservations yet</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Explore our collection of luxury rooms and book your first stay today.</p>
          <a href="/rooms" className="bg-primary-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-gold transition shadow-lg">Browse Rooms</a>
        </div>
      ) : (
        <div className="space-y-6">
          {reservations.map((res) => (
            <div key={res._id} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                  <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1974" alt="Room" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-dark mb-1">Deluxe Ocean View</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(res.checkInDate).toLocaleDateString()}</span>
                    <span>→</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(res.checkOutDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={res.status} />
                <p className="text-xl font-bold text-primary-gold">Rp {res.totalPrice.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const configs = {
    pending: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} />, label: 'Pending' },
    confirmed: { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={14} />, label: 'Confirmed' },
    cancelled: { color: 'bg-red-100 text-red-700', icon: <XCircle size={14} />, label: 'Cancelled' },
    'checked-in': { color: 'bg-blue-100 text-blue-700', icon: <MapPin size={14} />, label: 'Checked In' }
  };

  const config = configs[status] || configs.pending;

  return (
    <span className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${config.color}`}>
      {config.icon} {config.label}
    </span>
  );
};

export default UserReservations;
