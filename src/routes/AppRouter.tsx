import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserInfo from "../pages/UserInfo";
import EmailVerfiy from "../pages/EmailVerfiy";
import Personal from "../components/user settings/Personal";
import ForgetPassword from "../pages/ForgetPassword";
import SetNewPassword from "../pages/SetNewPassword";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import Apply from "../components/job/apply job/ApplyJob";
import Message from "../components/messages/Message";
import FindCompany from "../pages/FindCompany";
import CompanyProfile from "../pages/CompanyProfile";
import CompanyAccount from "../components/business account/business dashboard/CompanyAccount";
import CreateBusinessAccountForm from "../components/business account/create business account/CreateBusinessAccountForm";
import JobProfile from "../pages/JobProfile";
import FindJob from "../pages/FindJob";
import UpdateCompanyAccount from "../components/business account/business dashboard/UpdateCompanyAccount";
import BusinessDashboard from "../components/business account/business dashboard/BusinessDashboard";
import CompanySettings from "../components/business account/business dashboard/CompanySettings";
import JobApplications from "../components/job/job applications/JobApplications";
import CompanyCandidates from "../components/business account/business dashboard/CompanyCandidates";
import PostJob from "../components/job/post Job/PostJob";
import UpdateJob from "../components/job/update job/UpdateJob";
import CompanyJobs from "../components/business account/business dashboard/CompanyJobs";
import SavedJob from "../components/user settings/SavedJobs";
import ExperienceCards from "../components/user settings/ExperienceCards";
import YourResume from "../components/user settings/YourResume";
import UserSettings from "../pages/UserSettings";
import AppliedJob from "../components/user settings/AppliedJobs";
import UserProfile from "../pages/UserProfile";
import ScrollToTop from "../components/common/ScrollToTop";
import Profile from "../components/user settings/Profile";
import Education from "../components/user settings/Education";
import Experience from "../components/user settings/Experience";
import MySkills from "../components/user settings/MySkills";
import ProjectCards from "../components/user settings/ProjectCards";
import CertificateCards from "../components/user settings/CertificateCards";
import Certificates from "../components/user settings/Certificates";
import VolunteeringCards from "../components/user settings/VolunteeringCards";
import Volunteering from "../components/user settings/Volunteering";
import Projects from "../components/user settings/Projects";
import EducationCards from "../components/user settings/EducationCards";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/userSettings",
    element: (
      <ProtectedRoute>
        <UserSettings />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Profile /> },
      {
        path: "profile",
        element: <Profile />,
        children: [
          { path: "personal", element: <Personal /> },
          { path: "education", element: <EducationCards /> },
          { path: "education/:eduId", element: <Education /> },
          { path: "experience", element: <ExperienceCards /> },
          { path: "experience/:expId", element: <Experience /> },
          { path: "projects", element: <ProjectCards /> },
          { path: "projects/:projectId", element: <Projects /> },
          { path: "certificates", element: <CertificateCards /> },
          { path: "certificates/:certificateId", element: <Certificates /> },
          { path: "volunteering", element: <VolunteeringCards /> },
          { path: "volunteering/:volunteerId", element: <Volunteering /> },
          { path: "my-skills", element: <MySkills /> },
        ],
      },
      { path: "resumes", element: <YourResume /> },
      { path: "saved-jobs", element: <SavedJob /> },
      { path: "applied-jobs", element: <AppliedJob /> },
    ],
  },
  { path: "/emailVerfiy", element: <EmailVerfiy /> },
  { path: "/userInfo", element: <UserInfo /> },
  { path: "/forgetPassword", element: <ForgetPassword /> },
  { path: "/setNewPassword", element: <SetNewPassword /> },
  { path: "/apply-job", element: <Apply /> },
  { path: "/message", element: <Message /> },
  { path: "/findCompany", element: <FindCompany /> },
  {
    path: "/userProfile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/findJob",
    element: (
      <ProtectedRoute>
        <FindJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/findJob/jobProfile/:jobId",
    element: (
      <ProtectedRoute>
        <JobProfile />
      </ProtectedRoute>
    ),
  },
  { path: "/companyProfile/:companyId", element: <CompanyProfile /> },
  {
    path: "/createBusinessAccount",
    element: (
      // <ProtectedRoute>
      <CreateBusinessAccountForm />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/businessDashboard",
    element: (
      <ProtectedRoute>
        <BusinessDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <CompanyAccount /> },
      {
        path: "companyJobs/:companyId",
        element: <CompanyJobs />,
        children: [
          {
            path: "jobApplications/:jobId",
            element: <JobApplications />,
          },
          { path: "postjob", element: <PostJob /> },
        ],
      },
      { path: "updateJob/1", element: <UpdateJob /> },
      { path: "companyCandidates/:companyId", element: <CompanyCandidates /> },
      {
        path: "companySettings",
        element: <CompanySettings />,
        children: [
          { path: "companyAccount/:companyId", element: <CompanyAccount /> },
          {
            path: "updateCompanyAccount/:companyId",
            element: <UpdateCompanyAccount />,
          },
        ],
      },
    ],
  },
]);

function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
      <ScrollToTop />
    </>
  );
}

export default AppRouter;
