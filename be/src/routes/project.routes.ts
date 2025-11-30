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

router.get("/", getAllProjects);

router.get("/search", searchProjects);

router.get("/:id", getProjectById);

router.post("/", createProject);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);

export default router;
