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
import FindCompany from "../pages/Company";
import CompanyProfile from "../pages/CompanyProfile";

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
  { path: "/company", element: <FindCompany /> },
  { path: "/companyProfile", element: <CompanyProfile /> },
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
