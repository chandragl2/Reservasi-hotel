import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] -mt-12 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <span className="uppercase tracking-[0.3em] text-[10px] md:text-sm font-medium mb-4 block animate-fade-in">Luxury Hotel & Resort</span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif mb-6 md:mb-8 leading-tight">Escape to Your Own Paradise</h1>
          <p className="text-base md:text-xl opacity-90 mb-8 md:mb-10 max-w-2xl mx-auto font-light px-4 md:px-0">
            Experience the epitome of luxury and comfort in the heart of the world's most beautiful destinations.
          </p>
          
          <Link to="/reserve" className="md:hidden inline-block bg-primary-gold text-primary-dark px-10 py-4 rounded-xl font-bold transition shadow-lg mb-10">
            Book Now
          </Link>
          
          {/* Floating Booking Bar */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl max-w-5xl mx-auto hidden md:flex items-center gap-2">
            <div className="flex-grow grid grid-cols-4 divide-x divide-white/20">
              <div className="px-6 py-3 text-left">
                <label className="text-[10px] uppercase tracking-wider text-primary-gold mb-1 block">Location</label>
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={16} />
                  <span className="font-medium">Bali, Indonesia</span>
                </div>
              </div>
              <div className="px-6 py-3 text-left">
                <label className="text-[10px] uppercase tracking-wider text-primary-gold mb-1 block">Check-in</label>
                <div className="flex items-center gap-2 text-white">
                  <Calendar size={16} />
                  <span className="font-medium">24 May 2026</span>
                </div>
              </div>
              <div className="px-6 py-3 text-left">
                <label className="text-[10px] uppercase tracking-wider text-primary-gold mb-1 block">Check-out</label>
                <div className="flex items-center gap-2 text-white">
                  <Calendar size={16} />
                  <span className="font-medium">30 May 2026</span>
                </div>
              </div>
              <div className="px-6 py-3 text-left">
                <label className="text-[10px] uppercase tracking-wider text-primary-gold mb-1 block">Guests</label>
                <div className="flex items-center gap-2 text-white">
                  <Users size={16} />
                  <span className="font-medium">2 Adults</span>
                </div>
              </div>
            </div>
            <Link to="/reserve" className="bg-primary-gold hover:bg-primary-gold/90 text-primary-dark px-8 py-5 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap">
              <Search size={20} />
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary-gold uppercase tracking-widest text-xs font-bold mb-2 block">Our Accomodation</span>
            <h2 className="text-4xl md:text-5xl font-serif">Luxury Rooms & Suites</h2>
          </div>
          <Link to="/rooms" className="text-primary-gold font-bold flex items-center gap-2 hover:gap-3 transition-all border-b-2 border-primary-gold pb-1">
            View All Rooms <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <RoomCard 
            title="Deluxe Ocean Suite" 
            image="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1974" 
            price="Rp 2.500.000"
            rating="4.9"
          />
          <RoomCard 
            title="Presidential Villa" 
            image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2070" 
            price="Rp 5.200.000"
            rating="5.0"
          />
          <RoomCard 
            title="Tropical Garden Bungalow" 
            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070" 
            price="Rp 1.800.000"
            rating="4.8"
          />
        </div>
      </section>

      {/* Facilities/About */}
      <section className="bg-primary-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1780" alt="Spa" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-32 h-32 md:w-64 md:h-64 border-4 md:border-8 border-primary-gold rounded-2xl hidden md:block -z-10 animate-pulse"></div>
          </div>
          
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <span className="text-primary-gold uppercase tracking-widest text-[10px] md:text-xs font-bold block">Relax & Unwind</span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">Discover a World of Premium Facilities</h2>
            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
              From our infinity pool overlooking the ocean to our world-class spa and Michelin-starred restaurants, every detail is designed for your ultimate satisfaction.
            </p>
            <ul className="grid grid-cols-2 gap-6 pt-4">
              <FacilityItem label="Infinity Pool" />
              <FacilityItem label="Luxury Spa" />
              <FacilityItem label="Fine Dining" />
              <FacilityItem label="Private Beach" />
              <FacilityItem label="Fitness Center" />
              <FacilityItem label="24/7 Concierge" />
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const RoomCard = ({ title, image, price, rating }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-xl transform group-hover:scale-[1.02] transition-all duration-500">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1 border border-white/30">
        <Star size={14} className="fill-primary-gold text-primary-gold" /> {rating}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
        <Link to="/reserve" className="w-full bg-white text-primary-dark py-3 rounded-xl font-bold text-center hover:bg-primary-gold hover:text-white transition">Book Now</Link>
      </div>
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-2xl font-serif mb-2 group-hover:text-primary-gold transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm font-medium">Free WiFi • King Bed • AC</p>
      </div>
      <div className="text-right">
        <p className="text-primary-gold font-bold text-xl">{price}</p>
        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">per night</p>
      </div>
    </div>
  </div>
);

const FacilityItem = ({ label }) => (
  <li className="flex items-center gap-3 text-gray-300">
    <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
    <span className="font-medium">{label}</span>
  </li>
);

export default Home;
