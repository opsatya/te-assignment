import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProjectSchema = new Schema({
    projectName: String,
    projectDescription: String,
    skillSet: [String],
    noOfMembers: Number,
    isActive: Boolean,
    createdDate: Date
})

const Project = mongoose.model('Project',ProjectSchema);
export default Project;