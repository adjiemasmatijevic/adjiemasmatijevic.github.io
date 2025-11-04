import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  MapPin, 
  Database, 
  CheckSquare, 
  BarChart3,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { Button } from './ui/button';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/master-wilayah', icon: Map, label: 'Master Data Wilayah' },
    { path: '/master-dokumen', icon: FileText, label: 'Master Data Dokumen' },
    { path: '/peta-interaktif', icon: MapPin, label: 'Peta Interaktif' },
    { path: '/integrasi', icon: Database, label: 'Integrasi Data' },
    { path: '/monitoring', icon: CheckSquare, label: 'Monitoring & Validasi' },
    { path: '/analisis', icon: BarChart3, label: 'Analisis & Pelaporan' }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="font-bold text-lg">SIBW</h1>
              <p className="text-xs text-slate-300">Sistem Informasi Batas Wilayah</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-slate-700"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white border-l-4 border-blue-400'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <LogOut size={20} className="mr-2" />
            {sidebarOpen && <span>Keluar</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;