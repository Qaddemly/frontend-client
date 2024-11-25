import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Content from "./Personal";

function Sidebar() {
  return (
    <>
      <div className="mt-5 flex">
        <div className="h-[100vh] w-[20%] px-10">
          <ul className="text-xl text-gray-600">
            <li className="mb-6 cursor-pointer hover:bg-secondary hover:px-2 hover:text-main">
              <FontAwesomeIcon icon={faFileLines} className="" />
              <span className="ml-4">Profile</span>
            </li>

            <li className="mb-6 cursor-pointer hover:bg-secondary hover:px-2 hover:text-main">
              <FontAwesomeIcon icon={faFileLines} className="" />
              <span className="ml-4">Overview</span>
            </li>

            <li className="mb-6 cursor-pointer hover:bg-secondary hover:px-2 hover:text-main">
              <FontAwesomeIcon icon={faBriefcase} className="" />
              <span className="ml-4">Applied-Jobs</span>
            </li>

            <li className="mb-6 cursor-pointer hover:bg-secondary hover:px-2 hover:text-main">
              <FontAwesomeIcon icon={faBookmark} />

              <span className="ml-4">Favorite Job</span>
            </li>

            <li className="mb-6 cursor-pointer hover:bg-secondary hover:px-2 hover:text-main">
              <FontAwesomeIcon icon={faGear} className="" />
              <span className="ml-4">Settings</span>
            </li>
          </ul>
        </div>

        <Content />
      </div>
    </>
  );
}

export default Sidebar;
