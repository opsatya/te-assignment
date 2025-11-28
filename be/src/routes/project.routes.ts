import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  searchProjects
} from "../controllers/project.controller";

const router = Router();

// GET all projects
router.get("/", getAllProjects);

// SEARCH projects
router.get("/search", searchProjects);

// GET project by ID
router.get("/:id", getProjectById);

// CREATE project
router.post("/", createProject);

// UPDATE project
router.put("/:id", updateProject);

// DELETE project
router.delete("/:id", deleteProject);

export default router;
