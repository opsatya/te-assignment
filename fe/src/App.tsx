import { Route, Routes } from 'react-router-dom'
import ProjectList from './components/projectsList'
import CreateProjectPage from './pages/createProjectPage'
import EditProjectPage from './pages/editProjectPage'

// Main App component - sabhi routes yahan define hain
function App() {
  return (
    <>
      <Routes>
        {/* Home page - project list dikhane ke liye */}
        <Route path="/" element={<ProjectList />} />
        
        {/* Create project page - naya project banane ke liye */}
        <Route path="/create" element={<CreateProjectPage />} />
        
        {/* Edit project page - existing project edit karne ke liye */}
        <Route path="/edit/:id" element={<EditProjectPage />} />
      </Routes>
    </>
  )
}

export default App
