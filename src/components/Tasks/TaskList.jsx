import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask } from '../../services/taskService';
import { getProjects } from '../../services/projectService';
import { format } from 'date-fns';
import { FiPlus, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', project_id: '', due_date: '', priority: 'medium' });
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
      toast.success('Task created successfully');
      setShowForm(false);
      setNewTask({ title: '', description: '', project_id: '', due_date: '', priority: 'medium' });
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
      toast.success('Task status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-pending',
      in_progress: 'badge-in_progress',
      completed: 'badge-completed',
      overdue: 'badge-overdue',
    };
    return `badge ${badges[status] || 'badge-pending'}`;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'badge-high',
      medium: 'badge-medium',
      low: 'badge-low',
    };
    return `badge ${badges[priority] || 'badge-medium'}`;
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <FiCheckCircle className="text-green-500" size={16} />;
      case 'in_progress': return <FiClock className="text-blue-500" size={16} />;
      case 'overdue': return <FiAlertCircle className="text-red-500" size={16} />;
      default: return <FiClock className="text-yellow-500" size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
          <p className="text-gray-500 mt-1">Track and manage your assigned tasks</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <FiPlus size={18} /> New Task
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-800">Create New Task</h2>
          </div>
          <div className="card-body space-y-4">
            <input
              type="text"
              placeholder="Task title *"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="input-field"
              rows="3"
            />
            <select
              value={newTask.project_id}
              onChange={(e) => setNewTask({ ...newTask, project_id: e.target.value })}
              className="input-field"
            >
              <option value="">Select Project *</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <input
              type="date"
              value={newTask.due_date}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
              className="input-field"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="input-field"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div className="flex gap-3">
              <button onClick={handleCreate} className="btn-primary">Create Task</button>
              <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="card text-center py-12">
          <FiClock className="mx-auto text-gray-400 mb-
