import { Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, FileText, BedDouble, ShoppingCart, PieChart } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">Management</h3>
        <SidebarLink to="/admin" icon={<LayoutDashboard size={18} />} label="Overview" />
        <SidebarLink to="/admin/users" icon={<Users size={18} />} label="Users" />
        <SidebarLink to="/admin/orders" icon={<ShoppingCart size={18} />} label="Orders" />
        <SidebarLink to="/admin/rooms" icon={<BedDouble size={18} />} label="Rooms" />
        <SidebarLink to="/admin/content" icon={<FileText size={18} />} label="Content" />
        <SidebarLink to="/admin/messages" icon={<MessageSquare size={18} />} label="Messages" />
        <SidebarLink to="/admin/reports" icon={<PieChart size={18} />} label="Reports" />
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">User Management Placeholder</div>} />
          <Route path="/orders" element={<div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">Order Management Placeholder</div>} />
        </Routes>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition font-medium"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Overview = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Total Reservations" value="124" trend="+12%" color="bg-blue-500" />
      <StatCard title="Available Rooms" value="12" trend="-2" color="bg-green-500" />
      <StatCard title="Monthly Revenue" value="Rp 45.2M" trend="+8%" color="bg-purple-500" />
    </div>

    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <User size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">New booking from John Doe</p>
                <p className="text-sm text-gray-500">2 minutes ago • Standard Room</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">Pending</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-1 h-full ${color}`}></div>
    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
    <div className="flex items-baseline gap-3">
      <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
      <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{trend}</span>
    </div>
  </div>
);

// Mock User Icon since it was not imported in the local scope of Overview
const User = ({ size }) => <Users size={size} />;

export default AdminDashboard;
