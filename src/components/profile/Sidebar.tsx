import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="mt-5 flex">
        <div className="h-[100vh] px-10">
          <ul className="text-xl text-gray-600">
            <Link
              to="/profile/personal"
              className="mb-6 flex cursor-pointer px-2 hover:bg-secondary hover:text-white"
            >
              <FontAwesomeIcon icon={faFileLines} className="" />
              <span className="ml-4">Profile</span>
            </Link>

            <li className="mb-6 cursor-pointer px-2 hover:bg-secondary hover:text-white">
              <FontAwesomeIcon icon={faFileLines} className="" />
              <span className="ml-4">Overview</span>
            </li>

            <li className="mb-6 cursor-pointer px-2 hover:bg-secondary hover:text-white">
              <FontAwesomeIcon icon={faBriefcase} className="" />
              <span className="ml-4">Applied-Jobs</span>
            </li>

            <li className="mb-6 cursor-pointer px-2 hover:bg-secondary hover:text-white">
              <FontAwesomeIcon icon={faBookmark} />

              <span className="ml-4">Favorite Job</span>
            </li>

            <li className="mb-6 cursor-pointer px-2 hover:bg-secondary hover:text-white">
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
