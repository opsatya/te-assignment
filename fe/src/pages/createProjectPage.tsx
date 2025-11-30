import ProjectForm from "../components/projectForm";
import { useNavigate } from "react-router-dom";

const CreateProjectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto p-4">
      <ProjectForm
        mode="create"
        onSuccess={() => navigate("/")}
      />
    </div>
  );
};

export default CreateProjectPage;
