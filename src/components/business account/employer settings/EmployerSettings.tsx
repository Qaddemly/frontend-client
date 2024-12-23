import { NavLink, Outlet } from "react-router-dom";
import BusinessLayout from "../../../layout/BusinessLayout";

function EmployerSettings() {
  return (
    <BusinessLayout>
      <div className="flex items-center bg-[#eee] p-2">
        <div className="border-r border-r-gray-100 px-10 py-3">
          <p className="text-xl font-semibold">Employer settings</p>
        </div>
        <div className="flex gap-5 pl-5 text-lg font-medium">
          <NavLink
            to="/employerSettings/companyAccount/1" // id will change
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "rounded-md bg-main text-white" : ""}`
            }
          >
            Company
          </NavLink>
          <NavLink
            to="/employerSettings/accessAndPermissions"
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "rounded-md bg-main text-white" : ""}`
            }
          >
            Access & Permissions
          </NavLink>
        </div>
      </div>
      <div className="m-5">
        <Outlet />
      </div>
    </BusinessLayout>
  );
}

export default EmployerSettings;
