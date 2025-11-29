export type Project = {
  _id: string;                     // auto-generated (UUID, Mongo _id, etc.)
  projectName: string;            // required
  projectDescription: string;     // required
  skillSet: string[];             // array of selected skills, required
  noOfMembers: number;            // required (1..n) — UI shows 5 as "5 or 5+"
  isActive: boolean;              // required
  createdDate: Date;              // auto-generated (server timestamp)
}

export type CreateProjectDto = {
  projectName: string;
  projectDescription: string;
  skillSet: string[];           // must contain at least one value from skill list
  noOfMembers: number;          // expected >= 1
  isActive: boolean;
};

export type UpdateProjectDto = {
  projectName?: string;
  projectDescription?: string;
  skillSet?: string[];
  noOfMembers?: number;
  isActive?: boolean;
};


export type ProjectSearchQuery = {
  q?: string;                       // free text — match projectName or projectDescription
  skill?: string | string[];        // single skill or array of skills (match any or all depending on API)
  isActive?: boolean;
  minMembers?: number;              // filter range
  maxMembers?: number;
  createdBefore?: string | Date;    // ISO date string or Date
  createdAfter?: string | Date;
  sortBy?: 'createdDate' | 'projectName' | 'noOfMembers';
  sortOrder?: 'asc' | 'desc';
  page?: number;                    // pagination
  limit?: number;
};


export type uriType = string | undefined
