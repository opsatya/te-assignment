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

// GET all projects - sabhi projects ko fetch karo
router.get("/", getAllProjects);

// SEARCH projects - project name ya description se search karo
router.get("/search", searchProjects);

// GET project by ID - specific project ko ID se fetch karo
router.get("/:id", getProjectById);

// CREATE project - naya project create karo
router.post("/", createProject);

// UPDATE project - existing project ko update karo
router.put("/:id", updateProject);

// DELETE project - project ko delete karo
router.delete("/:id", deleteProject);

export default router;
