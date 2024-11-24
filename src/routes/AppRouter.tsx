import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserInfo from "../pages/UserInfo";
import EmailVerfiy from "../pages/EmailVerfiy";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/emailVerfiy", element: <EmailVerfiy /> },
  { path: "/userInfo", element: <UserInfo /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
