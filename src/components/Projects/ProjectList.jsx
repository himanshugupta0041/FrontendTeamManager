import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject, createProject } from '../../services/projectService';
import ProjectCard from './ProjectCard';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
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
      await createProject({ name: newProjectName });
      toast.success('Project created successfully');
      setNewProjectName('');
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProject(id);
        toast.success('Project deleted');
        fetchProjects();
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading projects...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <FiPlus /> New Project
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project name"
            className="input-field mb-3"
          />
          <div className="flex gap-2">
            <button onClick={handleCreate} className="btn-primary">Create</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
