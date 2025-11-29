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

const BASE_URL = import.meta.env.VITE_API_URL;

// 1. GET ALL PROJECTS
export async function getAllProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}`);
  return handleResponse(res);
}

// 2. GET PROJECT BY ID
export async function getProjectById(id: string): Promise<Project> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
}

// 3. CREATE PROJECT
export async function createProject(data: CreateProjectDto): Promise<Project> {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// 4. UPDATE PROJECT
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

// 5. DELETE PROJECT
export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete project");
}

// 6. SEARCH PROJECTS
export async function searchProjects(query: string): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  return handleResponse(res);
}
