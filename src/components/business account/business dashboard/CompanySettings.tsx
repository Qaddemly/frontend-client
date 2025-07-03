import { NavLink, Outlet, useParams } from "react-router-dom";
import { useGetBusinessAccountInfoQuery } from "../../../services/businessAccountApi";

function CompanySettings() {
  const { companyId } = useParams();
  const { refetch } = useGetBusinessAccountInfoQuery({
    id: companyId || "",
  });
  return (
    <>
      <div className="flex items-center bg-[#eee] p-2">
        <div className="border-r border-r-gray-100 px-3 py-3 md:px-10">
          <p className="text-xl font-semibold">Employer settings</p>
        </div>
        <div className="flex gap-5 pl-5 text-lg font-medium">
          <NavLink
            onClick={() => refetch()}
            to={`/businessDashboard/companySettings/companyAccount/${companyId}`}
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "rounded-md bg-main text-white" : ""}`
            }
          >
            <span className="hidden md:inline">Company</span> Info
          </NavLink>
          <NavLink
            to={`/businessDashboard/companySettings/updateCompanyAccount/${companyId}`}
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "rounded-md bg-main text-white" : ""}`
            }
          >
            Edit <span className="hidden md:inline">Company Info</span>
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
