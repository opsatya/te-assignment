import { Request, Response } from "express";
import {
  getAllProjectsService,
  getProjectByIdService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
  searchProjectsService,
} from "../services/project.service";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../services/validation.service";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await getAllProjectsService();
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const project = await getProjectByIdService(id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const validation = createProjectSchema.safeParse(req.body);
    if (!validation.success)
      return res.status(400).json({ errors: validation.error.flatten() });

    const project = await createProjectService(validation.data);
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const validation = updateProjectSchema.safeParse(req.body);
    if (!validation.success)
      return res.status(400).json({ errors: validation.error.flatten() });

    const updated = await updateProjectService(id, validation.data);
    if (!updated) return res.status(404).json({ error: "Project not found" });

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const deleted = await deleteProjectService(id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const searchProjects = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const results = await searchProjectsService(query || "");

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
