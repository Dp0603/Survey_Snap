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
import SurveyCreatorDashboard from "./components/surveycreator/SurveyCreatorDashboard";
import SurveyCreatorHome from "./components/surveycreator/SurveyCreatorHome";
import SurveyCreatorMySurveys from "./components/surveycreator/SurveyCreatorMySurveys";
import SurveyCreatorManageQuestions from "./components/surveycreator/SurveyCreatorManageQuestions";
import SurveyCreatorScheduleSurveys from "./components/surveycreator/SurveyCreatorScheduleSurveys";
import SurveyCreatorShareSurvey from "./components/surveycreator/SurveyCreatorShareSurvey";
import SurveyCreatorReports from "./components/surveycreator/SurveyCreatorReports";
import SurveyCreatorSettings from "./components/surveycreator/SurveyCreatorSettings";
import SurveyRespondentDashboard from "./components/surveyrespondent/SurveyRespondentDashboard";
import SurveyRespondentHome from "./components/surveyrespondent/SurveyRespondentHome";
import SurveyRespondentAvailableSurveys from "./components/surveyrespondent/SurveyRespondentAvailableSurveys";
import SurveyRespondentResponseHistory from "./components/surveyrespondent/SurveyRespondentResponseHistory";
import ViewSurvey from "./components/admin/ViewSurvey";
import SurveyCreatorTemplateSelection from "./components/surveycreator/SurveyCreatorTemplateSelection";
import SurveyCreatorPrebuiltTemplates from "./components/surveycreator/SurveyCreatorPrebuiltTemplates";
import SurveyCreationPage from "./components/surveycreator/SurveyCreationPage";
import SurveyCreatorCustomTemplate from "./components/surveycreator/SurveyCreatorCustomTemplate";
import SurveyPreviewPage from "./components/surveycreator/SurveyPreviewPage";
import SurveyCreatorDistribution from "./components/surveycreator/SurveyCreatorDistribution";
import ManageReport from "./components/admin/ManageReport";
import SurveyCreatorViewSurvey from "./components/surveycreator/SurveyCreatorViewSurvey";
import SurveyCreatorManageSurveyList from "./components/surveycreator/SurveyCreatorManageSurveyList";
import RespondToSurveyPage from "./components/surveyrespondent/RespondToSurveyPage";
import SurveyRespondentViewResponse from "./components/surveyrespondent/SurveyRespondentViewResponse";
import SurveyRespondentCompletedSurveys from "./components/surveyrespondent/SurveyRespondentCompletedSurveys";

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
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>


        {/* ✅ Admin Dashboard Routes */}
          <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} /> 
          <Route path="users" element={<ManageUsers />} />
            <Route path="surveys" element={<ManageSurveys />} />
            <Route path="surveys/:id" element={<ViewSurvey />} /> 
          <Route path="responses" element={<ManageResponses />} />
          <Route path="reports" element={<ManageReport />} /> 
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ✅ User Dashboard Routes */}
        {/* <Route path="/user-dashboard/*" element={<UserDashboard />}>
          <Route index element={<UserHome />} />
          <Route path="mysurveys" element={<MySurvey />} />
          <Route path="myanalytics" element={<MyAnalytics />} />
          <Route path="myresponses" element={<MyResponses />} />
          <Route path="settings" element={<Settings />} />
        </Route> */}

        {/* ✅ Survey Creator Dashboard Routes */}
        <Route path="/survey-creator-dashboard/*" element={<SurveyCreatorDashboard />}>
          <Route index element={<SurveyCreatorHome />} />
          <Route path="my-surveys" element={<SurveyCreatorMySurveys />} />
          <Route path="my-surveys/:id" element={<SurveyCreatorViewSurvey />} />
          <Route path="my-surveys/create-new-survey" element={<SurveyCreatorTemplateSelection />} />
          <Route path="my-surveys/create-new-survey/prebuilt-templates" element={<SurveyCreatorPrebuiltTemplates />} />
          <Route path="my-surveys/create-new-survey/prebuilt-templates/create" element={<SurveyCreationPage />} />
          <Route path="my-surveys/create-new-survey/custom-templates" element={<SurveyCreatorCustomTemplate />} />
          <Route path="manage-questions" element={<SurveyCreatorManageSurveyList />} />
          <Route path="manage-questions/:surveyId" element={<SurveyCreatorManageQuestions />} />
          <Route path="schedule-surveys" element={<SurveyCreatorScheduleSurveys />} />
          {/* <Route path="share-survey" element={<SurveyCreatorShareSurvey />} /> */}
          <Route path="share-survey" element={<SurveyCreatorShareSurvey/>}></Route>
          {/* <Route path="reports" element={<SurveyCreatorReports />} /> */}
          {/* <Route path="settings" element={<SurveyCreatorSettings />} /> */}
        </Route>        

        <Route path="/respondent-dashboard/*" element={<SurveyRespondentDashboard />}>
        <Route index element={<SurveyRespondentHome />} />
        <Route path="available-surveys" element={<SurveyRespondentAvailableSurveys />} />
        <Route path="available-surveys/respond/:surveyId" element={<RespondToSurveyPage />} />
        <Route path="completed-surveys" element={<SurveyRespondentCompletedSurveys />} />
        <Route path="response-history" element={<SurveyRespondentResponseHistory />} />
        <Route path="response-history/view-response/:responseId"  element={<SurveyRespondentViewResponse />}
/>

        </Route>        
      </Routes>
    </div>
  );
}

export default App;
