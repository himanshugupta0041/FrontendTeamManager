import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/taskService';
import { getProjects } from '../../services/projectService';
import StatCard from './StatCard';
import RecentTasks from './RecentTasks';
import { FiCheckCircle, FiClock, FiAlertCircle, FiFolder } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsData = await getDashboardStats();
      setStats(statsData.stats);
      setRecentTasks(statsData.recent_tasks || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  const statItems = [
    { title: 'Total Tasks', value: stats?.total_tasks || 0, icon: FiFolder, color: 'blue' },
    { title: 'Pending', value: stats?.pending_tasks || 0, icon: FiClock, color: 'yellow' },
    { title: 'In Progress', value: stats?.in_progress || 0, icon: FiClock, color: 'orange' },
    { title: 'Completed', value: stats?.completed_tasks || 0, icon: FiCheckCircle, color: 'green' },
    { title: 'Overdue', value: stats?.overdue_tasks || 0, icon: FiAlertCircle, color: 'red' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {statItems.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTasks tasks={recentTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
