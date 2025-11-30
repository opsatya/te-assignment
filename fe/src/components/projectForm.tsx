import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateProjectDto, UpdateProjectDto, Project } from "../types/project.types";
import * as api from "../services/api.service";

type Props = {
  mode: "create" | "edit";
  initialData?: Project; // Edit mode ke liye existing data
  onSuccess: () => void; // Success ke baad callback
};

// Sabhi available skills - UI image ke according
const allSkills = [
  "Asp.Net",
  "PHP",
  "Java",
  "ReactJs",
  "React Native",
  "AngularJs",
  "NodeJs",
  "PWA",
  "Flutter",
  "VueJs",
  "Vanilla Js",
  "SQL Server",
  "My SQL",
  "MongoDB",
  "HTML",
  "CSS",
  "JavaScript/jQuery"
];

// Number of members options - dropdown ke liye
const memberOptions = [1, 2, 3, 4, 5];

const ProjectForm: React.FC<Props> = ({ mode, initialData, onSuccess }) => {
  const navigate = useNavigate();
  
  // Form state - initial values set karo
  const [form, setForm] = useState<CreateProjectDto>({
    projectName: "",
    projectDescription: "",
    skillSet: [],
    noOfMembers: 1,
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Edit mode mein existing data ko form mein load karo
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        projectName: initialData.projectName,
        projectDescription: initialData.projectDescription,
        skillSet: initialData.skillSet,
        noOfMembers: initialData.noOfMembers,
        isActive: initialData.isActive,
      });
    }
  }, [mode, initialData]);

  // Form validation - sab required fields check karo
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.projectName.trim()) {
      newErrors.projectName = "Project name required hai";
    }
    if (!form.projectDescription.trim()) {
      newErrors.projectDescription = "Project description required hai";
    }
    if (form.skillSet.length === 0) {
      newErrors.skillSet = "Kam se kam ek skill select karo";
    }
    if (form.noOfMembers < 1 || form.noOfMembers > 5) {
      newErrors.noOfMembers = "Members 1 se 5 ke beech mein hona chahiye";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      if (mode === "create") {
        // Naya project create karo
        await api.createProject(form);
      } else if (mode === "edit" && initialData?._id) {
        // Existing project update karo
        const updateData: UpdateProjectDto = {
          projectName: form.projectName,
          projectDescription: form.projectDescription,
          skillSet: form.skillSet,
          noOfMembers: form.noOfMembers,
          isActive: form.isActive,
        };
        await api.updateProject(initialData._id, updateData);
      }

      onSuccess();
    } catch (err: any) {
      console.error("Error:", err);
      alert("Kuch galat ho gaya: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // Skill toggle - multi-select ke liye
  const toggleSkill = (skill: string) => {
    setForm(prev => {
      const exists = prev.skillSet.includes(skill);
      return {
        ...prev,
        skillSet: exists
          ? prev.skillSet.filter(s => s !== skill)
          : [...prev.skillSet, skill]
      };
    });
    // Error clear karo agar skill select ho gaya
    if (errors.skillSet) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.skillSet;
        return newErrors;
      });
    }
  };

  // Back button handler - My Project page pe wapas jao
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Form title */}
      <h1 style={{ 
        fontSize: "24px", 
        fontWeight: "bold", 
        marginBottom: "20px",
        textDecoration: "underline",
        textAlign: "center"
      }}>
        {mode === "create" ? "Add Project" : "Edit Project"}
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Project Name field */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Project Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={form.projectName}
            onChange={(e) => {
              setForm({ ...form, projectName: e.target.value });
              if (errors.projectName) {
                setErrors(prev => {
                  const newErrors = { ...prev };
                  delete newErrors.projectName;
                  return newErrors;
                });
              }
            }}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px"
            }}
            placeholder="Enter project name"
          />
          {errors.projectName && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.projectName}
            </p>
          )}
        </div>

        {/* Project Description field */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Project Description<span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            value={form.projectDescription}
            onChange={(e) => {
              setForm({ ...form, projectDescription: e.target.value });
              if (errors.projectDescription) {
                setErrors(prev => {
                  const newErrors = { ...prev };
                  delete newErrors.projectDescription;
                  return newErrors;
                });
              }
            }}
            rows={4}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              resize: "vertical"
            }}
            placeholder="Enter project description"
          />
          {errors.projectDescription && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.projectDescription}
            </p>
          )}
        </div>

        {/* Skill Set - Multi-select */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "40px" }}>
            {/* Skills list - left side */}
            <div style={{ flex: "0 0 200px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
                MultiSelect Values:
              </label>
              <div style={{ 
                border: "1px solid #ddd", 
                padding: "10px", 
                borderRadius: "4px",
                maxHeight: "300px",
                overflowY: "auto"
              }}>
                {allSkills.map((skill, index) => (
                  <div key={skill} style={{ marginBottom: "5px" }}>
                    {index + 1}) {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-select input - right side */}
            <div style={{ flex: "1" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Skill Set<span style={{ color: "red" }}>*</span>
              </label>
              <div style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "8px",
                minHeight: "100px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                alignItems: "flex-start"
              }}>
                {form.skillSet.length === 0 ? (
                  <span style={{ color: "#999", fontSize: "14px" }}>
                    Skills select karo...
                  </span>
                ) : (
                  form.skillSet.map(skill => (
                    <span
                      key={skill}
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px"
                      }}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        style={{
                          background: "rgba(255,255,255,0.3)",
                          border: "none",
                          color: "white",
                          cursor: "pointer",
                          borderRadius: "50%",
                          width: "18px",
                          height: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px"
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
              {/* Skills selection checkboxes */}
              <div style={{ 
                marginTop: "10px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px"
              }}>
                {allSkills.map(skill => (
                  <label
                    key={skill}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.skillSet.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
              {errors.skillSet && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                  {errors.skillSet}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* No of Members - Dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "40px" }}>
            {/* Dropdown values list - right side */}
            <div style={{ flex: "1" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                No of Members<span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={form.noOfMembers}
                onChange={(e) => {
                  setForm({ ...form, noOfMembers: Number(e.target.value) });
                  if (errors.noOfMembers) {
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.noOfMembers;
                      return newErrors;
                    });
                  }
                }}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              >
                {memberOptions.map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
                <option value={5}>5 or 5+</option>
              </select>
              {errors.noOfMembers && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                  {errors.noOfMembers}
                </p>
              )}
            </div>

            {/* Dropdown values list - right side */}
            <div style={{ flex: "0 0 150px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
                DropDown Values:
              </label>
              <div style={{ 
                border: "1px solid #ddd", 
                padding: "10px", 
                borderRadius: "4px"
              }}>
                {memberOptions.map((num, index) => (
                  <div key={num} style={{ marginBottom: "5px" }}>
                    {index + 1}) {num}
                  </div>
                ))}
                <div>5) 5 or 5+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Is Active checkbox */}
        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              style={{ width: "18px", height: "18px" }}
            />
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>Is Active?</span>
          </label>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 30px",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleBack}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "10px 30px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
