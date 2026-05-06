import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Wifi, Coffee, Tv, Maximize, User } from 'lucide-react';
import api from '../api';

const Rooms = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const { data } = await api.get('/rooms/types');
        setRoomTypes(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        // Fallback for demo if DB is empty
        setRoomTypes([
          {
            _id: '1',
            typeName: 'Deluxe Ocean View',
            price: 2500000,
            description: 'Experience breathtaking ocean views from your private balcony. This room features premium bedding and modern amenities.',
            facilities: ['WiFi', 'Coffee Maker', 'Smart TV', 'Ocean View'],
            images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1974']
          },
          {
            _id: '2',
            typeName: 'Presidential Suite',
            price: 5200000,
            description: 'Our most luxurious suite offering unparalleled comfort, a private living area, and exclusive access to the VIP lounge.',
            facilities: ['VIP Lounge', 'Jacuzzi', 'Private Bar', 'Butler Service'],
            images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2070']
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-[60vh] text-primary-gold font-serif text-2xl">Loading luxury...</div>;

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-10 md:mb-16">
        <span className="text-primary-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block">Our Collection</span>
        <h1 className="text-4xl md:text-5xl font-serif text-primary-dark px-4">Find Your Perfect Stay</h1>
      </div>

      <div className="grid grid-cols-1 gap-10 md:gap-16">
        {roomTypes.map((room) => (
          <div key={room._id} className="flex flex-col lg:flex-row bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group">
            {/* Image Section */}
            <div className="lg:w-1/2 relative h-[300px] md:h-[400px] lg:h-auto overflow-hidden">
              <img 
                src={room.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070'} 
                alt={room.typeName} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white border border-white/30 flex items-center gap-2">
                <Star size={16} className="fill-primary-gold text-primary-gold" />
                <span className="font-bold text-sm">4.9 / 5.0</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <h2 className="text-3xl md:text-4xl font-serif text-primary-dark">{room.typeName}</h2>
                  <div className="md:text-right">
                    <p className="text-primary-gold text-2xl md:text-3xl font-bold">Rp {room.price.toLocaleString()}</p>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">per night</p>
                  </div>
                </div>
                
                <p className="text-gray-500 leading-relaxed mb-6 md:mb-8 font-light text-base md:text-lg">
                  {room.description}
                </p>

                <div className="grid grid-cols-2 gap-y-4 mb-8 md:mb-10">
                  <Facility icon={<Wifi size={18} />} label="High Speed WiFi" />
                  <Facility icon={<Coffee size={18} />} label="Coffee Maker" />
                  <Facility icon={<Tv size={18} />} label="Smart TV" />
                  <Facility icon={<Maximize size={18} />} label="60 sqm Room" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/reserve" 
                  state={{ roomTypeId: room._id, roomTypeName: room.typeName }}
                  className="flex-grow bg-primary-dark text-white text-center py-4 rounded-xl md:rounded-2xl font-bold hover:bg-primary-gold transition-all shadow-lg"
                >
                  Book This Room
                </Link>
                <button className="py-4 px-8 border-2 border-primary-dark text-primary-dark rounded-xl md:rounded-2xl font-bold hover:bg-primary-dark hover:text-white transition-all">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Facility = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-gray-600">
    <div className="text-primary-gold">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Rooms;
