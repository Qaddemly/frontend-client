import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="flex p-5">
        <div className="h-[100vh] border-r border-r-gray-100">
          <ul className="text-xl text-gray-600">
            <Link
              to="/profile/personal"
              className="mb-6 flex cursor-pointer items-center rounded-sm px-2 hover:bg-main hover:text-white"
            >
              <FontAwesomeIcon icon={faFileLines} className="" />
              <span className="ml-4">Profile</span>
            </Link>

            <li className="mb-6 flex cursor-pointer items-center rounded-sm px-2 hover:bg-main hover:text-white">
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
            </li>

            <li className="mb-6 flex cursor-pointer items-center rounded-sm px-2 hover:bg-main hover:text-white">
              <FontAwesomeIcon icon={faGear} className="" />
              <span className="ml-4">Settings</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
