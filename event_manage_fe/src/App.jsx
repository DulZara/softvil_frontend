// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout   from './layout/AppLayout';
import Login       from './pages/Login';
import Dashboard   from './pages/Dashboard';
import EventForm   from './pages/EventForm';
import EventDetail from './pages/EventDetail';
import Profile     from './pages/Profile';
import Register from './pages/Register'


export default function App() {
  const token = useSelector(state => state.auth.token);

  return (
    
      <Routes>
        {/* public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected: wraps in AppLayout */}
        <Route
          element={token ? <AppLayout /> : <Navigate to="/login" />}
        >
          <Route path="/"           element={<Dashboard />} />
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/profile"    element={<Profile />} />
        </Route>

        {/* catch-all */}
        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} />}
        />
      </Routes>
    
  );
}
