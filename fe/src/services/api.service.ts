import type{ 
  Project, 
  CreateProjectDto, 
  UpdateProjectDto 
} from "../types/project.types";

// Helper to check HTTP status and throw error
async function handleResponse(res: Response) {
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "API Error");
  }
  return res.json();
}

// API base URL - environment variable se lo ya default use karo
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/projects';

// 1. GET ALL PROJECTS - sabhi projects ko fetch karo
export async function getAllProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}`);
  return handleResponse(res);
}

// 2. GET PROJECT BY ID - specific project ko ID se fetch karo
export async function getProjectById(id: string): Promise<Project> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
}

// 3. CREATE PROJECT - naya project create karo
export async function createProject(data: CreateProjectDto): Promise<Project> {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// 4. UPDATE PROJECT - existing project ko update karo
export async function updateProject(
  id: string, 
  data: UpdateProjectDto
): Promise<Project> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// 5. DELETE PROJECT - project ko delete karo
export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete project");
}

// 6. SEARCH PROJECTS - project name ya description se search karo
export async function searchProjects(query: string): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  return handleResponse(res);
}
