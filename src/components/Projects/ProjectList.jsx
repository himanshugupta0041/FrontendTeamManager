import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject, createProject } from '../../services/projectService';
import { FiPlus, FiFolder, FiUsers, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newProjectName.trim()) {
      toast.error('Project name is required');
      return;
    }
    try {
      await createProject({ name: newProjectName, description: newProjectDesc });
      toast.success('Project created successfully');
      setNewProjectName('');
      setNewProjectDesc('');
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast.success('Project deleted');
        fetchProjects();
      } catch (error) {
        toast.error('Failed to delete project');
      }
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
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-500 mt-1">Manage all your projects and teams</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <FiPlus size={18} /> New Project
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-800">Create New Project</h2>
          </div>
          <div className="card-body space-y-4">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              className="input-field"
            />
            <textarea
              value={newProjectDesc}
              onChange={(e) => setNewProjectDesc(e.target.value)}
              placeholder="Project description (optional)"
              className="input-field"
              rows="3"
            />
            <div className="flex gap-3">
              <button onClick={handleCreate} className="btn-primary">Create Project</button>
              <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="card text-center py-12">
          <FiFolder className="mx-auto text-gray-400 mb-3" size={48} />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">No projects yet</h3>
          <p className="text-gray-500 mb-4">Create your first project to get started</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">Create Project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="project-card group">
              <div className="relative h-28 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-lg font-bold text-white">{project.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description || 'No description provided'}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiUsers size={14} />
                    <span>{project.members?.length || 1} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar size={14} />
                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                  <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
