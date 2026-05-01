import React from 'react';
import { format } from 'date-fns';

const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const RecentTasks = ({ tasks }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-3 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status?.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p className="text-gray-500 text-center py-4">No tasks assigned yet</p>}
      </div>
    </div>
  );
};

export default RecentTasks;
