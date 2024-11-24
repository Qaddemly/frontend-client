import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import EmailVerify from "../pages/EmailVerify";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/emailVerfiy", element: <EmailVerify /> },
  { path: "/profile", element: <Profile /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
