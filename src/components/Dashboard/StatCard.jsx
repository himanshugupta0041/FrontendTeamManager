import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="stat-card group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`w-10 h-10 bg-gradient-to-r ${colors[color]} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
          <Icon className="text-white" size={18} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
