import React, { useState } from "react";
import type { Project } from "../types/project.types";
import * as api from "../services/api.service";
import { useNavigate } from "react-router-dom";

type Props = {
  project: Project;
  onEdit: (id: string) => void;
  onDeleteSuccess: (id: string) => void;
};

const ProjectCard: React.FC<Props> = ({ project, onEdit, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setLoading(true);
      await api.deleteProject(project._id);
      onDeleteSuccess(project._id);
    } catch (err) {
      alert("Failed to delete project");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow-sm bg-white">
      <h2 className="text-xl font-semibold">{project.projectName}</h2>
      <p className="text-gray-600">{project.projectDescription}</p>

      <p className="mt-2 text-sm">
        <strong>Skills:</strong> {project.skillSet.join(", ")}
      </p>

      <p>
        <strong>Members:</strong> {project.noOfMembers}
      </p>

      <p>
        <strong>Status:</strong> {project.isActive ? "Active" : "Inactive"}
      </p>

      <p className="text-xs text-gray-400 mt-2">
        Created: {new Date(project.createdDate).toLocaleDateString()}
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(project._id)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
