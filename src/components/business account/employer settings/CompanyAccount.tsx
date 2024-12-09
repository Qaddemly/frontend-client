import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardEmployerSettings from "./CardEmployerSettings";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function CompanyAccount() {
  return (
    <div>
      <div className="font-medium">
        <p className="text-3xl">About company</p>
        <p className="text-gray-300">
          Your name and role may be visible to job seekers and other members of
          your company
        </p>
      </div>
      <div className="mt-10 flex gap-10">
        <div className="flex w-1/2 flex-col gap-5">
          <CardEmployerSettings className="items-center justify-center">
            <p>Company name</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p>Contact</p>
            <div className="flex items-center gap-2 text-gray-300">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>CompanyName@email.com</p>
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
            <p className="text-md font-medium">Website</p>
            <p className="text-gray-300">No websites added</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">Industry</p>
            <p className="text-gray-300">No industry added</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">Specialists</p>
            <p className="text-gray-300">No specialists added</p>
          </CardEmployerSettings>
        </div>
      </div>
    </div>
  );
}

export default CompanyAccount;
