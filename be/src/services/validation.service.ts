import { z } from "zod";

export const createProjectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectDescription: z.string().min(1, "Project description is required"),
  skillSet: z.array(z.string()).min(1, "At least one skill is required"),
  noOfMembers: z.number().min(1).max(5),
  isActive: z.boolean(),
});

export const updateProjectSchema = z.object({
  projectName: z.string().min(1).optional(),
  projectDescription: z.string().min(1).optional(),
  skillSet: z.array(z.string()).optional(),
  noOfMembers: z.number().min(1).max(5).optional(),
  isActive: z.boolean().optional(),
});
