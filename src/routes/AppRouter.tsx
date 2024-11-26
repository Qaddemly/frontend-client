import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import UserInfo from "../pages/UserInfo";
import EmailVerfiy from "../pages/EmailVerfiy";
import Personal from "../components/profile/Personal";
import Experience from "../components/profile/Experience";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/personal", element: <Personal /> },
  { path: "/profile/experience", element: <Experience /> },
  { path: "/emailVerfiy", element: <EmailVerfiy /> },
  { path: "/userInfo", element: <UserInfo /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
