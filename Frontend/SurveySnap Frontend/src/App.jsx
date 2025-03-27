import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage";
import { Login } from "./components/common/Login";
import { Signup } from "./components/common/Signup";
import Sitemap from "./components/layout/Sitemap";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageUsers from "./components/admin/ManageUsers";
import ManageSurveys from "./components/admin/ManageSurveys";
import Reports from "./components/admin/Reports";
import Settings from "./components/admin/Settings";
import AdminHome from "./components/admin/AdminHome";
import MySurvey from "./components/user/MySurveys";
import MyAnalytics from "./components/user/MyAnalytics";
import MyResponses from "./components/user/MyResponses";
import UserDashboard from "./components/user/UserDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import ManageResponses from "./components/admin/ManageResponses";
import UserHome from "./components/user/UserHome";
import { ResetPassword } from "./components/common/ResetPassword";
import { ForgotPassword } from "./components/common/ForgotPassword";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = "";
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <div
      className={
        location.pathname === "/login" || location.pathname === "/signup"
          ? ""
          : "app-wrapper"
      }
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/user/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>

        {/* ✅ Admin Dashboard Routes */}
        <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} /> {/* Default Admin Page */}
          <Route path="users" element={<ManageUsers />} />
          <Route path="surveys" element={<ManageSurveys />} />
          <Route path="responses" element={<ManageResponses />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ✅ User Dashboard Routes */}
        <Route path="/user-dashboard/*" element={<UserDashboard />}>
          <Route index element={<UserHome />} /> {/* Default User Page */}
          <Route path="mysurveys" element={<MySurvey />} />
          <Route path="myanalytics" element={<MyAnalytics />} />
          <Route path="myresponses" element={<MyResponses />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
