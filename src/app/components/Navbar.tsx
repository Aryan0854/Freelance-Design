import { Leaf, Bell, LogOut, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import cropsapImage from '../../imports/CROPSAP_(Crop_Pest_Surveillance_and_Advisory_Project).jpg';
import doaImage from '../../imports/DOA.gif';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export default function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      {/* Top Images Section */}
      <div className="bg-gray-50 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Image - DOA */}
          <div className="flex items-center">
            <img
              src={doaImage}
              alt="Department of Agriculture"
              className="h-24 w-auto"
            />
          </div>

          {/* Right Image - CROPSAP */}
          <div className="flex items-center">
            <img
              src={cropsapImage}
              alt="CROPSAP - Crop Pest Surveillance and Advisory Project"
              className="h-24 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Button - Only show if callback exists */}
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            )}
            
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-xl">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CROPSAP 2.0</h1>
              <p className="text-xs text-gray-500">Agriculture Platform</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-green-700" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}