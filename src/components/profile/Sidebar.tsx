import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <>
      <div className="flex h-screen w-[20rem] flex-col gap-5 border-r border-r-gray-100 bg-[#eee]">
        <div>
          <p className="p-5 text-3xl font-medium">Settings</p>
        </div>
        <div className="">
          <ul className="text-xl">
            <Link
              to="/profile/personal"
              onClick={() => setActiveTab("profile")}
              className={`flex cursor-pointer items-center justify-between rounded-sm border-b-2 border-b-[#eee] p-5 hover:border-b-main ${activeTab === "profile" ? "border-l-4 border-l-main bg-white" : "border-l-0"}`}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </div>
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </Link>

            {/* <li className="mb-6 flex cursor-pointer items-center rounded-sm px-2 hover:bg-main hover:text-white">
              <FontAwesomeIcon icon={faFileLines} className="" />
              <span className="ml-4">Overview</span>
            </li>

            <li className="mb-6 flex cursor-pointer items-center rounded-sm px-2 hover:bg-main hover:text-white">
              <FontAwesomeIcon icon={faBriefcase} className="" />
              <span className="ml-4">Applied-Jobs</span>
            </li>

            <li className="mb-6 flex cursor-pointer items-center rounded-sm px-2 hover:bg-main hover:text-white">
              <FontAwesomeIcon icon={faBookmark} />

              <span className="ml-4">Favorite Job</span>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
