import { Link } from "react-router-dom";
import {
  faBell,
  faChevronDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavProfile() {
  return (
    <>
      <div className="flex items-center justify-between bg-white px-6 py-3">
        <Link to="/" className="text-[40px] font-bold text-main">
          Qaddemly
        </Link>
        <div>
          <ul className="flex items-center justify-between space-x-8">
            <li className="text-main hover:font-semibold hover:underline">
              Home
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              Find Job
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              Job Tracker
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              Build Resume
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              ATS Scan
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              Post Job
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-5">
          <FontAwesomeIcon icon={faBell} className="text-2xl" />
          <FontAwesomeIcon
            icon={faUser}
            className="rounded-full border-2 border-gray-200 bg-gray-200 px-2 py-2 text-xl"
          />
          <Link to="/profile/personal" className="text-2xl font-semibold">
            UserName
          </Link>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </>
  );
}
export default NavProfile;
