import { Outlet } from "react-router-dom";
import Sidebar from "../components/user settings/Sidebar";
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
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSettings;
