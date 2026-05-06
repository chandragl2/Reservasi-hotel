import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReservationForm from './components/ReservationForm';
import AdminDashboard from './components/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import UserReservations from './pages/UserReservations';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      setUserInfo(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col w-full">
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 py-5 px-10 flex justify-between items-center border-b border-gray-100">
          <Link to="/" className="text-3xl font-serif font-bold text-primary-dark tracking-tighter">
            HOTEL<span className="text-primary-gold">RESERVE</span>
          </Link>
          <div className="space-x-10 flex items-center">
            <Link to="/" className="text-primary-dark hover:text-primary-gold font-semibold tracking-wide transition">Home</Link>
            <Link to="/rooms" className="text-primary-dark hover:text-primary-gold font-semibold tracking-wide transition">Rooms</Link>
            <Link to="/about" className="text-primary-dark hover:text-primary-gold font-semibold tracking-wide transition">About</Link>
            {userInfo ? (
              <div className="flex items-center gap-8">
                <Link to="/my-bookings" className="text-primary-dark hover:text-primary-gold font-semibold tracking-wide transition">My Bookings</Link>
                {userInfo.role === 'admin' && (
                  <Link to="/admin" className="text-primary-dark hover:text-primary-gold font-semibold tracking-wide transition">Admin Panel</Link>
                )}
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{userInfo.role}</span>
                  <span className="text-primary-dark font-bold">{userInfo.name}</span>
                </div>
                <button 
                  onClick={logoutHandler}
                  className="bg-primary-dark text-white px-6 py-2.5 rounded-full hover:bg-primary-gold transition font-bold text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-primary-dark text-white px-8 py-3 rounded-full hover:bg-primary-gold transition font-bold text-sm tracking-widest uppercase">Login</Link>
            )}
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reserve" element={<div className="container mx-auto px-6 py-12"><ReservationForm /></div>} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/my-bookings" element={<UserReservations />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>

        <footer className="bg-white border-t py-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} HotelReserve. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
