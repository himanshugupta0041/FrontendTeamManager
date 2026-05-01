import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFolder, FiCheckSquare } from 'react-icons/fi';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/projects', label: 'Projects', icon: FiFolder },
    { path: '/tasks', label: 'My Tasks', icon: FiCheckSquare },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Task Manager
        </h1>
        <p className="text-xs text-gray-400 mt-1">Team Productivity Suite</p>
      </div>
      <nav className="mt-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-lg mx-2 ${
                isActive ? 'bg-gray-700 text-white shadow-md' : ''
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2024 Task Manager</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
