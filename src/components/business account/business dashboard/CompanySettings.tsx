import { NavLink, Outlet } from "react-router-dom";

function CompanySettings() {
  return (
    <>
      <div className="flex items-center bg-[#eee] p-2">
        <div className="border-r border-r-gray-100 px-10 py-3">
          <p className="text-xl font-semibold">Employer settings</p>
        </div>
        <div className="flex gap-5 pl-5 text-lg font-medium">
          <NavLink
            to="/businessDashboard/companySettings/companyAccount/1" // id will change
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "rounded-md bg-main text-white" : ""}`
            }
          >
            Company Info
          </NavLink>
          <NavLink
            to="/businessDashboard/companySettings/updateCompanyAccount/1"
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "rounded-md bg-main text-white" : ""}`
            }
          >
            Edit Company Info
          </NavLink>
        </div>
      </div>
      <div className="my-10 flex items-center justify-center">
        <Outlet />
      </div>
    </>
  );
}

export default CompanySettings;
