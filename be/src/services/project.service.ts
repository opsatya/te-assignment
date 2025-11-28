import Project from "../models/project.model";
import { CreateProjectDto, UpdateProjectDto } from "../types/project.types";

export const getAllProjectsService = async () => {
  return await Project.find();
};

export const getProjectByIdService = async (id: string) => {
  return await Project.findById(id);
};

export const createProjectService = async (projectData: CreateProjectDto) => {
  const newProject = new Project({
    ...projectData,
    createdDate: new Date(),
  });
  return await newProject.save();
};

export const updateProjectService = async (
  id: string,
  projectData: UpdateProjectDto
) => {
  return await Project.findByIdAndUpdate(id, projectData, { new: true });
};

export const deleteProjectService = async (id: string) => {
  return await Project.findByIdAndDelete(id);
};

export const searchProjectsService = async (query: string) => {
  return await Project.find({
    $or: [
      { projectName: { $regex: query, $options: "i" } },
      { projectDescription: { $regex: query, $options: "i" } },
    ],
  });
};
