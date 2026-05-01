import React from 'react';
import { FiTrash2, FiUsers } from 'react-icons/fi';

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
        <button onClick={() => onDelete(project.id)} className="text-red-500 hover:text-red-700">
          <FiTrash2 size={18} />
        </button>
      </div>
      <p className="text-gray-600 text-sm mb-4">{project.description || 'No description'}</p>
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <FiUsers size={16} />
        <span>{project.members?.length || 1} members</span>
      </div>
    </div>
  );
};

export default ProjectCard;
