import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/taskService';
import { FiCheckCircle, FiClock, FiAlertCircle, FiFolder, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  const statsCards = [
    { title: 'Total Tasks', value: stats?.total_tasks || 0, icon: FiFolder, color: 'blue', gradient: 'from-blue-500 to-blue-600' },
    { title: 'Pending', value: stats?.pending_tasks || 0, icon: FiClock, color: 'yellow', gradient: 'from-yellow-500 to-yellow-600' },
    { title: 'In Progress', value: stats?.in_progress || 0, icon: FiTrendingUp, color: 'orange', gradient: 'from-orange-500 to-orange-600' },
    { title: 'Completed', value: stats?.completed_tasks || 0, icon: FiCheckCircle, color: 'green', gradient: 'from-green-500 to-green-600' },
    { title: 'Overdue', value: stats?.overdue_tasks || 0, icon: FiAlertCircle, color: 'red', gradient: 'from-red-500 to-red-600' },
  ];

  const completionRate = stats?.total_tasks > 0 
    ? Math.round((stats.completed_tasks / stats.total_tasks) * 100) 
    : 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your tasks and progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {statsCards.map((stat) => (
          <div key={stat.title} className="stat-card group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                <stat.icon className="text-white" size={18} />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-500`}
                style={{ width: `${Math.min((stat.value / (stats?.total_tasks || 1)) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-800">Overall Progress</h2>
          </div>
          <div className="card-body">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32">
                  <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64"/>
                  <circle className="text-green-500" strokeWidth="8" strokeDasharray={2 * Math.PI * 58} strokeDashoffset={2 * Math.PI * 58 * (1 - completionRate / 100)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64"/>
                </svg>
                <span className="absolute text-2xl font-bold text-gray-800">{completionRate}%</span>
              </div>
              <p className="text-gray-600 mt-3">Task Completion Rate</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-800">Quick Stats</h2>
          </div>
          <div className="card-body space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Active Projects</span>
              <span className="font-semibold text-gray-800">{stats?.total_projects || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Tasks This Week</span>
              <span className="font-semibold text-gray-800">{stats?.total_tasks || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
