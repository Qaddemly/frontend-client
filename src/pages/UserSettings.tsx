import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";
import Navbar from "../components/home/Navbar";
function UserSettings() {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div>
            <div className="mb-10">
              <Outlet />
            </div>
            {/* <YourResume /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSettings;
