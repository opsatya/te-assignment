import type{ 
  Project, 
  CreateProjectDto, 
  UpdateProjectDto 
} from "../types/project.types";

// Helper to check HTTP status and throw error
async function handleResponse(res: Response) {
  if (!res.ok) {
    let errorMessage = "API Error";
    try {
      const errorData = await res.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      // Agar JSON parse nahi hua toh text try karo
      try {
        const text = await res.text();
        errorMessage = text || errorMessage;
      } catch {
        // Kuch nahi mila toh default message
      }
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

// Network errors handle karne ke liye helper
function handleFetchError(error: any): never {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    throw new Error("Backend server connect nahi ho raha. Server running hai ya nahi check karo.");
  }
  throw error;
}

// API base URL - environment variable se lo ya default use karo
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/projects';

// 1. GET ALL PROJECTS - sabhi projects ko fetch karo
export async function getAllProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${BASE_URL}`);
    return handleResponse(res);
  } catch (error: any) {
    handleFetchError(error); // Yeh throw karega, return nahi karega
  }
}

// 2. GET PROJECT BY ID - specific project ko ID se fetch karo
export async function getProjectById(id: string): Promise<Project> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    return handleResponse(res);
  } catch (error: any) {
    handleFetchError(error); // Yeh throw karega, return nahi karega
  }
}

// 3. CREATE PROJECT - naya project create karo
export async function createProject(data: CreateProjectDto): Promise<Project> {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  } catch (error: any) {
    handleFetchError(error); // Yeh throw karega, return nahi karega
  }
}

// 4. UPDATE PROJECT - existing project ko update karo
export async function updateProject(
  id: string, 
  data: UpdateProjectDto
): Promise<Project> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  } catch (error: any) {
    handleFetchError(error); // Yeh throw karega, return nahi karega
  }
}

// 5. DELETE PROJECT - project ko delete karo
export async function deleteProject(id: string): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    // Response handle karo - success ya error dono cases mein
    if (!res.ok) {
      let errorMessage = "Failed to delete project";
      try {
        const errorData = await res.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // JSON parse nahi hua toh status text use karo
        errorMessage = res.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    // Success case - response body read karo (optional, backend se message aayega)
    try {
      await res.json();
    } catch {
      // Body nahi hai toh koi issue nahi
    }
  } catch (error: any) {
    // Network errors handle karo
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Backend server connect nahi ho raha. Server running hai ya nahi check karo.");
    }
    throw error;
  }
}

// 6. SEARCH PROJECTS - project name ya description se search karo
export async function searchProjects(query: string): Promise<Project[]> {
  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    return handleResponse(res);
  } catch (error: any) {
    handleFetchError(error); // Yeh throw karega, return nahi karega
  }
}
