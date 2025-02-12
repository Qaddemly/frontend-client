import { faLink, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "../../interfaces/Auth.interfaces";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function UserProfileConnections({ user }: { user: IUser }) {
  return (
    <div className="w-[40rem] p-10">
      <p className="mb-5 text-xl font-semibold">Connect</p>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPhone} className="text-xl" />
          <p className="text-gray-500">{user?.phone?.phone_number}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLink} className="text-xl" />
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faInstagram} className="text-xl" />
          {/* <p className="text-gray-500"></p> */}
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faGithub} className="text-xl" />
          {/* <p className="text-gray-500"></p> */}
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
          {/* <p className="text-gray-500"></p> */}
        </div>
      </div>
    </div>
  );
}

export default UserProfileConnections;
