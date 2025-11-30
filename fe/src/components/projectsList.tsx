import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types/project.types";
import * as api from "../services/api.service";
import SearchBar from "./searchBar";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const searchTimeoutRef = useRef<number | null>(null); // Search timeout ko track karne ke liye (browser mein number return hota hai)
  const isMountedRef = useRef(true); // Component mount hai ya nahi check karne ke liye
  const isLoadingRef = useRef(false); // Currently loading hai ya nahi - duplicate calls prevent karne ke liye
  const hasSearchedRef = useRef(false); // User ne kabhi search kiya hai ya nahi - initial empty search prevent karne ke liye

  // Sabhi projects ko fetch karo - useCallback se memoize kiya taaki har render pe naya function na bane
  const fetchProjects = useCallback(async () => {
    // Agar already loading hai toh duplicate call prevent karo
    if (isLoadingRef.current) {
      return;
    }

    try {
      isLoadingRef.current = true;
      setLoading(true);
      const data = await api.getAllProjects();
      
      // Component abhi bhi mounted hai toh state update karo
      if (isMountedRef.current) {
        setProjects(data);
        setError("");
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        setError(err.message || "Projects load nahi ho paye");
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
      isLoadingRef.current = false;
    }
  }, []); // Empty dependency - sirf ek baar create hoga

  // Search functionality - project name ya description se search karo
  // useCallback se memoize kiya taaki SearchBar component ko unnecessary re-render na ho
  const handleSearch = useCallback(async (query: string) => {
    // Pehle wala timeout cancel karo agar koi pending hai
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }

    // Empty query hai
    if (!query.trim()) {
      // Agar user ne pehle search kiya tha aur ab clear kiya hai, toh all projects fetch karo
      if (hasSearchedRef.current) {
        fetchProjects();
      }
      setSearching(false);
      return;
    }

    // User ne search kiya hai - flag set karo
    hasSearchedRef.current = true;

    try {
      setSearching(true);
      const results = await api.searchProjects(query);
      
      // Component abhi bhi mounted hai toh state update karo
      if (isMountedRef.current) {
        setProjects(results);
        setError("");
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        setError("Search fail ho gaya");
        console.error(err);
      }
    } finally {
      if (isMountedRef.current) {
        setSearching(false);
      }
    }
  }, [fetchProjects]); // fetchProjects dependency - but yeh stable hai

  // Project delete karo
  const handleDelete = async (id: string) => {
    if (!window.confirm("Kya aap sure hain ki aap is project ko delete karna chahte hain?")) {
      return;
    }

    try {
      // Delete API call karo
      await api.deleteProject(id);
      
      // Success - list ko refresh karo
      // Optimistically remove from list (optional - better UX)
      setProjects(prev => prev.filter(p => p._id !== id));
      
      // Ya full refresh karo (safer approach)
      // fetchProjects();
    } catch (err: any) {
      // Error handle karo - user ko clear message do
      const errorMessage = err.message || "Unknown error";
      alert("Delete fail ho gaya: " + errorMessage);
      console.error("Delete error:", err);
      
      // Error ke baad bhi list refresh karo taaki correct state dikhe
      fetchProjects();
    }
  };

  // Edit button click - edit page pe navigate karo
  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  // Date format karo - DD-MM-YYYY HH:MM AM/PM format mein
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return `${day}-${month}-${year} ${displayHours}:${minutes} ${ampm}`;
  };

  // Component mount hone pe projects fetch karo - sirf ek baar
  useEffect(() => {
    isMountedRef.current = true;
    
    // Direct API call - fetchProjects function ko dependency mein nahi rakha
    // taaki infinite loop na ho
    const loadProjects = async () => {
      // Agar already loading hai toh duplicate call prevent karo
      if (isLoadingRef.current) {
        return;
      }

      try {
        isLoadingRef.current = true;
        setLoading(true);
        const data = await api.getAllProjects();
        
        // Component abhi bhi mounted hai toh state update karo
        if (isMountedRef.current) {
          setProjects(data);
          setError("");
        }
      } catch (err: any) {
        if (isMountedRef.current) {
          setError(err.message || "Projects load nahi ho paye");
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
        isLoadingRef.current = false;
      }
    };
    
    loadProjects();
    
    // Cleanup - component unmount pe timeout clear karo aur flag reset karo
    return () => {
      isMountedRef.current = false;
      isLoadingRef.current = false;
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    };
  }, []); // Empty dependency array - sirf component mount pe ek baar chalega

  // Loading state
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Header - My Project title */}
      <h1 style={{ 
        fontSize: "24px", 
        fontWeight: "bold", 
        marginBottom: "20px",
        textDecoration: "underline"
      }}>
        My Project
      </h1>

      {/* Actions bar - Add Project button aur Search */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px"
      }}>
        {/* Add Project button */}
        <button
          onClick={() => navigate("/create")}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Add Project
        </button>

        {/* Search bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "red", fontSize: "14px" }}>
            Search by Project Name or Project Description
          </span>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      {/* Projects table */}
      {projects.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#666" }}>
          Koi projects nahi mila
        </p>
      ) : (
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          border: "1px solid #ddd"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                Project Name
              </th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                Project Description
              </th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                Skill Set
              </th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                No of Members
              </th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                Is Active?
              </th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                Created Date
              </th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                Edit
              </th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {project.projectName}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {project.projectDescription}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {project.skillSet.join(", ")}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {project.noOfMembers >= 5 ? "5 or 5+" : project.noOfMembers}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {project.isActive ? "Yes" : "No"}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {formatDate(project.createdDate)}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  <button
                    onClick={() => handleEdit(project._id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007bff",
                      textDecoration: "underline",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  <button
                    onClick={() => handleDelete(project._id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007bff",
                      textDecoration: "underline",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Searching indicator */}
      {searching && (
        <p style={{ marginTop: "10px", color: "#666" }}>
          Searching...
        </p>
      )}
    </div>
  );
};

export default ProjectList;
