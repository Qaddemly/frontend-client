import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
<<<<<<< HEAD

import Profile from "../pages/Profile";
import UserInfo from "../pages/UserInfo";
import EmailVerfiy from "../pages/EmailVerfiy";
import Personal from "../components/profile/Personal";
=======
import UserInfo from "../pages/UserInfo";
import EmailVerfiy from "../pages/EmailVerfiy";
>>>>>>> 4e1fa2f57b5a9b63afbc0d258f9a68e609413737

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/emailVerfiy", element: <EmailVerfiy /> },
<<<<<<< HEAD
  { path: "/profile", element: <Profile /> },
  { path: "/profile/personal", element: <Personal /> },
  { path: "/emailVerfiy", element: <EmailVerfiy /> },
=======
>>>>>>> 4e1fa2f57b5a9b63afbc0d258f9a68e609413737
  { path: "/userInfo", element: <UserInfo /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
