import {
  faBookOpen,
  faBriefcase,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Head() {
  return (
    <>
      <div className="ml-10 mt-5">
        <Link to="/profile/personal" className="text-2xl">
          Profile
        </Link>
        <ul className="mt-10 flex justify-start space-x-9 text-gray-600">
          <Link
            to="/profile/personal"
            className="hover:cursor-pointer hover:text-main hover:underline focus:text-main"
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-2">Personal</span>
          </Link>

          <Link
            to="/profile/education"
            className="hover:cursor-pointer hover:text-main hover:underline focus:text-main"
          >
            <FontAwesomeIcon icon={faBookOpen} />
            <span className="ml-2">Education</span>
          </Link>

          <Link
            to="/profile/experience"
            className="hover:cursor-pointer hover:text-main hover:underline focus:text-main"
          >
            <FontAwesomeIcon icon={faBriefcase} />
            <span className="ml-2">Experience</span>
          </Link>

          <Link
            to="/profile/my-skills"
            className="hover:cursor-pointer hover:text-main hover:underline focus:text-main"
          >
            <FontAwesomeIcon icon={faListCheck} />
            <span className="ml-2">My Skills</span>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Head;
