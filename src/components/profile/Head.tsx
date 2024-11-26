import {
  faBookOpen,
  faBriefcase,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Head() {
  return (
    <>
      <span className="text-2xl">Profile</span>
      <ul className="mt-10 flex justify-start space-x-9 text-gray-600">
        <li className="hover:cursor-pointer hover:text-main hover:underline">
          <FontAwesomeIcon icon={faUser} />
          <span className="ml-2">Personal</span>
        </li>

        <li className="hover:cursor-pointer hover:text-main hover:underline">
          <FontAwesomeIcon icon={faBookOpen} />
          <span className="ml-2">Education</span>
        </li>

        <li className="hover:cursor-pointer hover:text-main hover:underline">
          <FontAwesomeIcon icon={faBriefcase} />
          <span className="ml-2">Experience</span>
        </li>

        <li className="hover:cursor-pointer hover:text-main hover:underline">
          <FontAwesomeIcon icon={faListCheck} />
          <span className="ml-2">My Skills</span>
        </li>
      </ul>
    </>
  );
}

export default Head;
