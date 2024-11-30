import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";
import Head from "../components/profile/Head";
import YourResume from "../components/profile/YourResume";
import NavProfile from "../components/profile/NavProfile";
function Profile() {
  return (
    <>
      <div>
        <NavProfile />
        <div className="flex">
          <Sidebar />
          <div>
            <Head />
            <Outlet />
            <YourResume />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
