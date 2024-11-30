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

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      { path: "/profile/personal", element: <Personal /> },
      { path: "/profile/education", element: <Education /> },
      { path: "/profile/experience", element: <Experience /> },
      { path: "/profile/my-skills", element: <MySkills /> },
    ],
  },
  { path: "/emailVerfiy", element: <EmailVerfiy /> },
  { path: "/userInfo", element: <UserInfo /> },
  { path: "/forgetPassword", element: <ForgetPassword /> },
  { path: "/setNewPassword", element: <SetNewPassword /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
