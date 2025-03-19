import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import {Login} from "./components/common/Login";
import {Signup} from "./components/common/Signup";
import Sitemap from "./components/layout/Sitemap";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageUsers from "./components/admin/ManageUsers";
import ManageSurveys from "./components/admin/ManageSurveys";
import Reports from "./components/admin/Reports";
import Settings from "./components/admin/Settings";

function App() {
  return (
    
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sitemap" element={<Sitemap />} />

        {/* ✅ Fix: Add "/*" to enable nested routes inside AdminDashboard */}
        <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
          <Route path="users" element={<ManageUsers />} />
          <Route path="surveys" element={<ManageSurveys />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    
  );
}

export default App;
