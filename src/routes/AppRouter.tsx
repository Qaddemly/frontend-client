import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import UserInfo from "../pages/UserInfo";
import EmailVerfiy from "../pages/EmailVerfiy";
import Personal from "../components/profile/Personal";
import Experience from "../components/profile/Experience";
import Education from "../components/profile/Education";
import ForgetPassword from "../pages/ForgetPassword";
import SetNewPassword from "../pages/SetNewPassword";
import MySkills from "../components/profile/MySkills";
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
import CompanyJobs from "../components/business account/business dashboard/CompanyJobs";
import CompanyCandidates from "../components/business account/business dashboard/CompanyCandidates";
import PostJob from "../components/job/post Job/PostJob";

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
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />,
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Personal /> },
      { path: "personal", element: <Personal /> },
      { path: "education", element: <Education /> },
      { path: "experience", element: <Experience /> },
      { path: "my-skills", element: <MySkills /> },
    ],
  },
  { path: "/emailVerfiy", element: <EmailVerfiy /> },
  { path: "/userInfo", element: <UserInfo /> },
  { path: "/forgetPassword", element: <ForgetPassword /> },
  { path: "/setNewPassword", element: <SetNewPassword /> },
  { path: "/apply-job", element: <Apply /> },
  { path: "/message", element: <Message /> },
  { path: "/findCompany", element: <FindCompany /> },
  { path: "/findJob", element: <FindJob /> },
  { path: "/companyProfile/:companyId", element: <CompanyProfile /> },
  { path: "/jobProfile", element: <JobProfile /> },
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
    element: <BusinessDashboard />,
    children: [
      { index: true, element: <CompanyAccount /> },
      { path: "companyJobs", element: <CompanyJobs /> },
      { path: "companyJobs/postjob", element: <PostJob /> },
      // GAD TODO : make route for posting a job
      { path: "companyJobs/1", element: <JobApplications /> },
      { path: "companyCandidates", element: <CompanyCandidates /> },
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
    </>
  );
}

export default AppRouter;
