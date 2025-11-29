import React, { useEffect, useState } from "react";
import type{ Project } from "../types/project.types";
import * as api from "../services/api.service";
import ProjectCard from "./projectCard";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const data = await api.getAllProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch {
      alert("Failed to delete project");
    }
  };

  const handleEdit = (id: string) => {
    console.log("Navigate to edit page for:", id);
    // Later: navigate(`/edit/${id}`)
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map(project => (
        <ProjectCard
          key={project._id}
          project={project}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ProjectList;
