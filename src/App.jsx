// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import MovieDetail from "./pages/MovieDetail";
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import AdminDashboard  from "./pages/AdminDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CustomAlert from "./components/common/CustomAlert";

export default function App() {
  return (
    <HashRouter>
      <CustomAlert/>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/movie/:id" element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  );
}
