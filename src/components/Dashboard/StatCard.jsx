import React from 'react';

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  orange: 'bg-orange-100 text-orange-600',
  red: 'bg-red-100 text-red-600',
};

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className={`p-3 rounded-lg inline-block ${colorClasses[color]}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mt-4">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );
};

export default StatCard;
