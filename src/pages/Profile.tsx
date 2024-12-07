import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";
import Head from "../components/profile/Head";
import YourResume from "../components/profile/YourResume";
import Navbar from "../components/home/Navbar";
function Profile() {
  return (
    <>
      <div>
        <Navbar />
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
