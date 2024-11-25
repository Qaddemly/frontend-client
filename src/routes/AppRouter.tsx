import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
<<<<<<< HEAD
import EmailVerify from "../pages/EmailVerify";
import Profile from "../pages/Profile";
=======
import UserInfo from "../pages/UserInfo";
import EmailVerfiy from "../pages/EmailVerfiy";
>>>>>>> 4e1fa2f57b5a9b63afbc0d258f9a68e609413737

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
<<<<<<< HEAD
  { path: "/emailVerfiy", element: <EmailVerify /> },
  { path: "/profile", element: <Profile /> },
=======
  { path: "/emailVerfiy", element: <EmailVerfiy /> },
  { path: "/userInfo", element: <UserInfo /> },
>>>>>>> 4e1fa2f57b5a9b63afbc0d258f9a68e609413737
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
