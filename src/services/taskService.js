import api from './api';

export const getTasks = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/tasks${params ? `?${params}` : ''}`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/tasks/dashboard');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};


export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};
