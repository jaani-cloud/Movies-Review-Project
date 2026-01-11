// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import MovieDetail from "./pages/MovieDetail";
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import AdminDashboard  from "./pages/AdminDashboard";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
    </HashRouter>
  );
}
