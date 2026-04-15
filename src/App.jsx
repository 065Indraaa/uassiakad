import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Grades from './pages/Grades';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
