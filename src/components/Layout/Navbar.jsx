import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome, {user?.email}!
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FiUser className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-700">{user?.email}</span>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg">
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
