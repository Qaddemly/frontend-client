import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserInfo from "../pages/UserInfo";
import EmailVerfiy from "../pages/EmailVerfiy";
import ForgetPassword from "../pages/ForgetPassword";
import SetNewPassword from "../pages/SetNewPassword";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
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
import UserSettings from "../pages/UserSettings";
import UserProfile from "../pages/UserProfile";
import ScrollToTop from "../components/common/ScrollToTop";
import NotFound from "../pages/NotFound";
import {
  AppliedJobs,
  CertificateCards,
  Certificates,
  Education,
  EducationCards,
  Experience,
  ExperienceCards,
  MySkills,
  Personal,
  Profile,
  ProjectCards,
  Projects,
  SavedJobs,
  Volunteering,
  VolunteeringCards,
  YourResume,
} from "../components/user settings";
import JobTracker from "../pages/JobTracker";
import JobTrackerBusiness from "../components/job/job tracker/JobTrackerBusiness";
import JobTrackerArchived from "../components/job/job tracker/JobTrackerArchived";
import ArchivedCompanyJobs from "../components/business account/business dashboard/ArchivedCompanyJobs";
import ResumeBuilder from "../pages/ResumeBuilder.tsx";
import EditResume from "../components/resume builder/EditResume.tsx";
import { ResumeBuilderProvider } from "../context/ResumeBuilderContext.tsx";
import MessagingBusiness from "../components/business account/MessageBusiness.tsx";
import { CoverLetterProvider } from "../context/CoverLetterContext.tsx";
import CoverLetterBuilder from "../pages/CoverLetterBuilder.tsx";
import EditCoverLetter from "../components/cover letter builder/EditCoverLetter.tsx";
import { ApplicationProvider } from "../context/ApplicationContext.tsx";
import CustomApplicationForm from "../components/customApplication/CustomApplicationForm.tsx";

const router = createBrowserRouter([
  {
    path: "/apply/custom/:jobId",
    element: (
      <ApplicationProvider>
        <CustomApplicationForm />
      </ApplicationProvider>
    ),
  },
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
      { path: "saved-jobs", element: <SavedJobs /> },
      { path: "applied-jobs", element: <AppliedJobs /> },
    ],
  },
  { path: "/emailVerfiy", element: <EmailVerfiy /> },
  { path: "/userInfo", element: <UserInfo /> },
  { path: "/forgetPassword", element: <ForgetPassword /> },
  { path: "/setNewPassword", element: <SetNewPassword /> },
  {
    path: "/message",
    element: (
      <ProtectedRoute>
        <Message />
      </ProtectedRoute>
    ),
  },
  {
    path: "/findCompany",
    element: (
      <ProtectedRoute>
        <FindCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/userProfile",
    element: (
      <ProtectedRoute>
        <UserProfile profileType={"me"} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/userProfile/:userId",
    element: (
      <ProtectedRoute>
        <UserProfile profileType={"others"} />
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
        <ApplicationProvider>
          <JobProfile />
        </ApplicationProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/companyProfile/:companyId",
    element: (
      <ProtectedRoute>
        <CompanyProfile />
      </ProtectedRoute>
    ),
  },
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
        path: "companyJobs/:companyId/active",
        element: <CompanyJobs />,
        children: [
          {
            path: "jobApplications/:jobId",
            element: <JobApplications />,
            children: [{ path: "jobTracker", element: <JobTrackerBusiness /> }],
          },
          { path: "updateJob/:jobId", element: <UpdateJob /> },
          { path: "postJobEasyApply", element: <PostJob type="easyApply" /> },
          {
            path: "postJobExternalLink",
            element: <PostJob type="externalLink" />,
          },
          {
            path: "archived",
            element: <ArchivedCompanyJobs />,
          },
        ],
      },

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
      {
        path: "messaging-business",
        element: <MessagingBusiness />,
      },
    ],
  },
  {
    path: "/jobTracker",
    element: (
      <ProtectedRoute>
        <JobTracker />
      </ProtectedRoute>
    ),
  },
  { path: "/jobTracker/archived", element: <JobTrackerArchived /> },
  {
    path: "/resumeBuilder",
    element: (
      <ProtectedRoute>
        <ResumeBuilderProvider>
          <ResumeBuilder />
        </ResumeBuilderProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/resumeBuilder/edit/:resumeId",
    element: (
      <ProtectedRoute>
        <ResumeBuilderProvider>
          <EditResume />
        </ResumeBuilderProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/coverLetterBuilder",
    element: (
      <ProtectedRoute>
        <CoverLetterProvider>
          <CoverLetterBuilder />
        </CoverLetterProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/coverLetterBuilder/edit/:coverLetterId",
    element: (
      <ProtectedRoute>
        <CoverLetterProvider>
          <EditCoverLetter />
        </CoverLetterProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <NotFound />
      </ProtectedRoute>
    ),
  },
]);

function AppRouter() {
  return (
    // TODO: Handle Dark Mode
    <div className="light">
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
    </div>
  );
}

export default AppRouter;
