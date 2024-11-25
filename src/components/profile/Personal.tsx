import {
  faBookOpen,
  faBriefcase,
  faListCheck,
  faUser,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Personal() {
  return (
    <>
      <div className="mt-5">
        <div className="px-10">
          <div>
            <span className="text-2xl">Profile</span>
            <ul className="mt-5 flex items-center space-x-9 text-gray-600">
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
          </div>
        </div>

        <div className="mt-20 px-10">
          <span className="text-gray-500"> Profile Photo</span>
          <div className="mt-5 block h-[250px] w-[250px] items-center border-2 border-dashed bg-gray-100">
            <FontAwesomeIcon
              icon={faImage}
              className="ml-[100px] mt-[90px] text-4xl text-gray-600"
            />

            <span className="mt-3 flex items-center justify-center text-light-main underline">
              Click to upload
            </span>
            <p className="mt-3 flex items-center justify-center text-gray-500">
              Max File Size 15MB
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Personal;
