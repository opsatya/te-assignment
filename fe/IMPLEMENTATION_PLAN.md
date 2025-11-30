# Frontend Implementation Plan - Project Management Application

## Project Overview
Build a React + TypeScript frontend application for managing projects with the following features:
- Display list of projects
- Create new projects
- Update existing projects
- Delete projects
- Search projects
- Form validation
- Responsive UI

## Project Structure
```
fe/
├── src/
│   ├── main.tsx          # Entry point
│   ├── App.tsx           # Main app component
│   ├── components/       # Reusable components
│   │   ├── ProjectList.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectCard.tsx
│   │   └── SearchBar.tsx
│   ├── services/         # API service layer
│   │   └── api.service.ts
│   ├── types/            # TypeScript type definitions
│   │   └── project.types.ts
│   ├── hooks/            # Custom React hooks (optional)
│   │   └── useProjects.ts
│   ├── utils/            # Utility functions
│   │   └── validation.ts
│   └── styles/           # CSS/SCSS files (optional)
├── package.json
└── vite.config.ts
```

---

## Step-by-Step Implementation Plan

### **STEP 1: Setup Project Types & API Service**
**Goal:** Define TypeScript types and create API service layer

**Sub-tasks:**
1. Create `src/types/project.types.ts`
   - Define `Project` interface matching backend response:
     - `_id: string`
     - `projectName: string`
     - `projectDescription: string`
     - `skillSet: string[]`
     - `noOfMembers: number`
     - `isActive: boolean`
     - `createdDate: string` (ISO date string)
   - Define `CreateProjectDto` (for creating projects)
   - Define `UpdateProjectDto` (for updating projects)

2. Create `src/services/api.service.ts`
   - Define base API URL (use environment variable or constant)
   - Create functions for all API endpoints:
     - `getAllProjects(): Promise<Project[]>`
     - `getProjectById(id: string): Promise<Project>`
     - `createProject(data: CreateProjectDto): Promise<Project>`
     - `updateProject(id: string, data: UpdateProjectDto): Promise<Project>`
     - `deleteProject(id: string): Promise<void>`
     - `searchProjects(query: string): Promise<Project[]>`
   - Use `fetch` API with proper error handling
   - Handle HTTP errors (400, 404, 500, etc.)

**Deliverable:** Type definitions and API service ready

---

### **STEP 2: Install Additional Dependencies**
**Goal:** Add necessary packages for UI and HTTP requests

**Sub-tasks:**
1. Install dependencies (if needed):
   ```bash
   npm install axios  # Optional: if you prefer axios over fetch
   ```
   Or use native `fetch` API (no installation needed)

2. Update `vite.config.ts` if needed for environment variables

**Deliverable:** All dependencies installed

---

### **STEP 3: Create Project List Component**
**Goal:** Display all projects in a list/card view

**Sub-tasks:**
1. Create `src/components/ProjectList.tsx`
   - Use state to store projects array
   - Fetch projects on component mount using API service
   - Display projects in a grid or list layout
   - Show loading state while fetching
   - Show error message if fetch fails
   - Include buttons/actions for:
     - Edit project
     - Delete project

2. Create `src/components/ProjectCard.tsx` (optional, for better organization)
   - Display individual project information
   - Show project name, description, skills, members count, active status
   - Include edit and delete buttons
   - Format created date nicely

**Deliverable:** Project list view workingc

---

### **STEP 4: Create Search Functionality**
**Goal:** Implement search feature to filter projects

**Sub-tasks:**
1. Create `src/components/SearchBar.tsx`
   - Input field for search query
   - Debounce search input (optional but recommended)
   - Call search API or filter locally
   - Display search results

2. Integrate SearchBar into ProjectList or App component
   - Update project list based on search query
   - Show "No results found" message when appropriate

**Deliverable:** Search functionality working

---

### **STEP 5: Create Project Form Component**
**Goal:** Build form for creating and editing projects

**Sub-tasks:**
1. Create `src/components/ProjectForm.tsx`
   - Form fields:
     - Project Name (text input, required)
     - Project Description (textarea, required)
     - Skill Set (multi-select or checkboxes, at least 1 required)
       - Options: ReactJs, NodeJs, MongoDB, HTML, CSS, JavaScript, TypeScript, etc.
     - Number of Members (number input or select, 1-5, required)
     - Is Active (checkbox or toggle, required)
   - Form validation:
     - Client-side validation before submission
     - Show error messages for invalid fields
     - Disable submit button if form is invalid
   - Handle both create and edit modes:
     - If editing, pre-populate form with existing data
     - Show different submit button text ("Create" vs "Update")
   - On submit:
     - Call appropriate API (create or update)
     - Show success message
     - Redirect to project list or close modal
     - Handle errors and display error messages

2. Create `src/utils/validation.ts` (optional, for reusable validation)
   - Validation functions for form fields
   - Reusable validation logic

**Deliverable:** Project form component working for create and update

---

### **STEP 6: Implement Delete Functionality**
**Goal:** Add delete project feature with confirmation

**Sub-tasks:**
1. Add delete handler in ProjectList or ProjectCard component
   - Show confirmation dialog before deleting
   - Call delete API
   - Remove project from list on success
   - Show error message on failure
   - Handle loading state during deletion

**Deliverable:** Delete functionality working with confirmation

---

### **STEP 7: Add Routing (Optional but Recommended)**
**Goal:** Implement navigation between different views

**Sub-tasks:**
1. Install React Router:
   ```bash
   npm install react-router-dom
   npm install -D @types/react-router-dom
   ```

2. Create routes:
   - `/` - Project list view
   - `/projects/new` - Create project form
   - `/projects/:id/edit` - Edit project form
   - `/projects/:id` - Project details view (optional)

3. Update `App.tsx` to include Router
   - Wrap app with `BrowserRouter`
   - Define routes using `Routes` and `Route`
   - Add navigation links/buttons

**Deliverable:** Routing implemented (optional)

---

### **STEP 8: Add State Management (Optional)**
**Goal:** Manage global state for projects (if not using React Router state)

**Sub-tasks:**
1. Option 1: Use React Context API
   - Create `src/context/ProjectContext.tsx`
   - Provide projects state and actions globally
   - Use Context in components

2. Option 2: Use a state management library (Redux, Zustand, etc.)
   - Install library
   - Setup store
   - Create actions and reducers

3. Option 3: Use custom hooks
   - Create `src/hooks/useProjects.ts`
   - Manage projects state and API calls
   - Reuse hook across components

**Deliverable:** State management implemented (optional)

---

### **STEP 9: Styling & UI Polish**
**Goal:** Make the UI beautiful and responsive

**Sub-tasks:**
1. Add CSS styling:
   - Style project cards/list
   - Style forms with proper spacing
   - Add hover effects and transitions
   - Make it responsive (mobile-friendly)

2. Optionally install UI library:
   - Material-UI: `npm install @mui/material @emotion/react @emotion/styled`
   - Ant Design: `npm install antd`
   - Chakra UI: `npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion`
   - Or use plain CSS/SCSS

3. Add loading indicators:
   - Spinner for API calls
   - Skeleton loaders for better UX

4. Add toast notifications:
   - Success messages for create/update/delete
   - Error messages for failures
   - Can use libraries like `react-toastify` or custom solution

**Deliverable:** Polished, responsive UI

---

### **STEP 10: Error Handling & Edge Cases**
**Goal:** Handle all error scenarios gracefully

**Sub-tasks:**
1. Add error boundaries (optional)
2. Handle network errors
3. Handle validation errors from backend
4. Handle 404 errors (project not found)
5. Add retry logic for failed requests (optional)
6. Show user-friendly error messages

**Deliverable:** Robust error handling

---

### **STEP 11: Testing & Final Polish**
**Goal:** Test all features and fix any issues

**Sub-tasks:**
1. Test all CRUD operations:
   - Create project with valid data
   - Create project with invalid data (should show errors)
   - Update project
   - Delete project
   - Search projects

2. Test edge cases:
   - Empty project list
   - No search results
   - Network failures
   - Invalid project IDs

3. Test responsive design:
   - Mobile view
   - Tablet view
   - Desktop view

4. Code cleanup:
   - Remove console.logs
   - Add comments where needed
   - Ensure consistent code style

**Deliverable:** Fully tested and polished application

---

## Component Structure Example

### ProjectList Component
```typescript
- State: projects, loading, error, searchQuery
- Effects: fetchProjects on mount, searchProjects on query change
- Functions: handleDelete, handleEdit
- Render: SearchBar, ProjectCard(s), loading/error states
```

### ProjectForm Component
```typescript
- Props: project (optional, for edit mode), onSubmit, onCancel
- State: formData, errors, loading
- Functions: handleChange, handleSubmit, validate
- Render: Form fields, validation errors, submit/cancel buttons
```

---

## API Integration Details

### Base URL
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

### Example API Service Function
```typescript
export const getAllProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};
```

---

## Dependencies to Install

### Required (if using React Router)
```bash
npm install react-router-dom
npm install -D @types/react-router-dom
```

### Optional UI Libraries
```bash
# Material-UI
npm install @mui/material @emotion/react @emotion/styled

# Or Ant Design
npm install antd

# Or Chakra UI
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Optional Utilities
```bash
# For toast notifications
npm install react-toastify
npm install -D @types/react-toastify

# For HTTP requests (alternative to fetch)
npm install axios
```

---

## Environment Variables

Create a `.env` file in the `fe/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Implementation Order

Follow the steps in order (1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11). Each step builds on the previous one.

**Start with Step 1** and implement one step at a time. Test each step before moving to the next.

---

## UI/UX Recommendations

1. **Project List View:**
   - Grid or card layout
   - Show key information at a glance
   - Color code active/inactive projects
   - Add icons for better visual hierarchy

2. **Form Design:**
   - Clear labels and placeholders
   - Inline validation feedback
   - Required field indicators (*)
   - Disabled submit button until form is valid

3. **Search:**
   - Real-time search with debounce
   - Highlight search terms in results
   - Show search result count

4. **Actions:**
   - Confirmation dialogs for destructive actions (delete)
   - Loading states for async operations
   - Success/error feedback (toasts or inline messages)

5. **Responsive Design:**
   - Mobile-first approach
   - Breakpoints: mobile (< 768px), tablet (768px - 1024px), desktop (> 1024px)

---

## Notes

- Keep components small and focused
- Use TypeScript types throughout
- Handle loading and error states in all components
- Make API calls in useEffect hooks
- Clean up subscriptions/effects properly
- Use proper form validation (client-side + server-side)
- Follow React best practices (hooks, functional components)
- Make UI accessible (ARIA labels, keyboard navigation)
- Test on different browsers and devices

---

## Feature Checklist

- [ ] Display project list
- [ ] Create new project
- [ ] Update existing project
- [ ] Delete project (with confirmation)
- [ ] Search projects
- [ ] Form validation
- [ ] Error handling
- [ ] Loading states
- [ ] Responsive design
- [ ] Toast notifications (optional)
- [ ] Routing (optional)
- [ ] State management (optional)

