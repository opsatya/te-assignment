import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../components/projectForm";
import * as api from "../services/api.service";
import type{ Project } from "../types/project.types";

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      api.getProjectById(id)
        .then(res => setProject(res))
        .catch(() => alert("Project not found"));
    }
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <ProjectForm
        mode="edit"
        initialData={project}
        onSuccess={() => navigate("/")}
      />
    </div>
  );
};

export default EditProjectPage;
