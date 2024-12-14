import {
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardEmployerSettings from "./CardEmployerSettings";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

// this component will added to user profile not in business account
function EmployerAccount() {
  return (
    <div>
      <div className="font-medium">
        <p className="text-3xl">Personal info</p>
        <p className="text-gray-300">
          Your name and role may be visible to job seekers and other members of
          your company
        </p>
      </div>
      <div className="mt-10 flex gap-10">
        <div className="flex w-1/2 flex-col gap-5">
          <CardEmployerSettings className="h-[15rem] items-center justify-center">
            {/* {!user.profilePicture ? ( */}
            <FontAwesomeIcon
              icon={faUser}
              className="rounded-full border-2 border-gray-200 bg-gray-200 px-5 py-4 text-[4rem]"
            />
            {/* ) : (
          <img src={user.profilePicture} className="h-12 w-12 rounded-full" />
          )} */}
            <p>userName</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p>Contact</p>
            <div className="flex items-center gap-2 text-gray-300">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>Username@email.com</p>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FontAwesomeIcon icon={faPhone} />
              <p>239489238</p>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FontAwesomeIcon icon={faLocationDot} />
              <p>Location</p>
            </div>
          </CardEmployerSettings>
        </div>
        <div className="flex w-full flex-col gap-5">
          <CardEmployerSettings>
            <p className="text-md font-medium">Work Experience</p>
            <p className="text-gray-300">No experience</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">Education</p>
            <p className="text-gray-300">No educations added</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">Skills</p>
            <p className="text-gray-300">No experience</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">Languages</p>
            <p className="text-gray-300">No items added</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">Resumes</p>
            <p className="text-gray-300">No experience</p>
          </CardEmployerSettings>
        </div>
      </div>
    </div>
  );
}

export default EmployerAccount;
