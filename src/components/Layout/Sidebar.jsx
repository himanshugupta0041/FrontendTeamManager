import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFolder, FiCheckSquare, FiActivity } from 'react-icons/fi';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/projects', label: 'Projects', icon: FiFolder },
    { path: '/tasks', label: 'My Tasks', icon: FiCheckSquare },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl fixed h-full">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FiActivity className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-bold">TaskManager</h1>
        </div>
        <p className="text-xs text-gray-400 mt-2">Team Productivity Suite</p>
      </div>
      
      <nav className="mt-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-lg ${
                isActive ? 'bg-gray-700 text-white shadow-md' : ''
              }`
            }
          >
            <item.icon size={18} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          <p>Version 2.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
