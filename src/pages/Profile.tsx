import { Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Sidebar from "../components/profile/Sidebar";
import Head from "../components/profile/Head";
function Profile() {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex gap-10">
          <Sidebar />
          <div>
            <Head />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
