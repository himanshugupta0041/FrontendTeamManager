import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask } from '../../services/taskService';
import { getProjects } from '../../services/projectService';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', project_id: '', due_date: '', priority: 'medium' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksData, projectsData] = await Promise.all([
        getTasks({ assigned_to_me: true }),
        getProjects()
      ]);
      setTasks(tasksData);
      setProjects(projectsData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTask.title || !newTask.project_id || !newTask.due_date) {
      toast.error('Please fill all required fields');
      return;
    }
    try {
      await createTask(newTask);
      toast.success('Task created');
      setShowForm(false);
      setNewTask({ title: '', project_id: '', due_date: '', priority: 'medium' });
      fetchData();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleStatusUpdate = async (taskId, currentStatus) => {
    const statusOrder = ['pending', 'in_progress', 'completed'];
    let newStatus = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];
    try {
      await updateTask(taskId, { status: newStatus });
      toast.success('Task updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="text-center py-10">Loading tasks...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ New Task</button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <input type="text" placeholder="Task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="input-field mb-3" />
          <select value={newTask.project_id} onChange={(e) => setNewTask({ ...newTask, project_id: e.target.value })} className="input-field mb-3">
            <option value="">Select Project</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input type="date" value={newTask.due_date} onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })} className="input-field mb-3" />
          <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="input-field mb-3">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="btn-primary">Create</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500">Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}</p>
                <span className="text-xs text-gray-400">Priority: {task.priority}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status?.replace('_', ' ')}
                </span>
                <button onClick={() => handleStatusUpdate(task.id, task.status)} className="text-blue-600 hover:text-blue-800 text-sm">
                  Update Status
                </button>
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p className="text-center text-gray-500 py-10">No tasks assigned</p>}
      </div>
    </div>
  );
};

export default TaskList;