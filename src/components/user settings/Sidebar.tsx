import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faChevronRight,
  faFileLines,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useGetAllSavedJobsQuery } from "../../services/jobApi";

function Sidebar() {
  const location = useLocation();
  const isProfileActive = location.pathname.startsWith("/userSettings/profile");
  const { refetch } = useGetAllSavedJobsQuery({});
  useEffect(() => {
    if (location.pathname === "/userSettings/saved-jobs") {
      refetch();
    }
  }, [refetch, location.pathname]);

  return (
    <>
      <div className="flex min-h-screen w-[20rem] flex-col gap-5 border-r border-r-gray-100 bg-[#eee]">
        <div>
          <p className="p-5 text-3xl font-medium">Settings</p>
        </div>
        <div className="">
          <ul className="text-xl">
            <li>
              <NavLink
                to="/userSettings/profile/personal"
                className={`flex cursor-pointer items-center justify-between rounded-sm border-b-2 border-l-4 border-b-[#eee] p-5 hover:border-b-main ${
                  isProfileActive ? "border-l-main bg-white" : "border-l-white"
                }`}
              >
                <div className="flex items-center gap-5">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/userSettings/resumes"
                className={({ isActive }: { isActive: boolean }) =>
                  `flex cursor-pointer items-center justify-between rounded-sm border-b-2 border-l-4 border-b-[#eee] p-5 hover:border-b-main ${
                    isActive ? "border-l-main bg-white" : "border-l-white"
                  }`
                }
              >
                <div className="flex items-center gap-5">
                  <FontAwesomeIcon icon={faFileLines} />
                  <span>Resumes</span>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/userSettings/saved-jobs"
                className={({ isActive }: { isActive: boolean }) =>
                  `flex cursor-pointer items-center justify-between rounded-sm border-b-2 border-l-4 border-b-[#eee] p-5 hover:border-b-main ${
                    isActive ? "border-l-main bg-white" : "border-l-white"
                  }`
                }
              >
                <div className="flex items-center gap-5">
                  <FontAwesomeIcon icon={faBookmark} />
                  <span>Saved Job</span>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
              </NavLink>
            </li>

            {/* <li className="mb-6 flex cursor-pointer items-center rounded-sm px-2 hover:bg-main hover:text-white">
              <FontAwesomeIcon icon={faFileLines} className="" />
              <span className="ml-4">Overview</span>
            </li>

            <li className="mb-6 flex cursor-pointer items-center rounded-sm px-2 hover:bg-main hover:text-white">
              <FontAwesomeIcon icon={faBriefcase} className="" />
              <span className="ml-4">Applied-Jobs</span>
            </li>*/}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
