import { faLink, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IBasicInfo } from "../../interfaces/Auth.interfaces";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function UserProfileConnections({ basicInfo }: { basicInfo: IBasicInfo }) {
  return (
    <div className="w-[40rem] p-10">
      <p className="mb-5 text-xl font-semibold">Connect</p>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPhone} className="text-xl" />
          <p className="text-gray-500">
            +{basicInfo?.phone?.country_code} {basicInfo?.phone?.number}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLink} className="text-xl" />
          <p className="text-gray-500">{basicInfo?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          {basicInfo?.links?.website && (
            <>
              <FontAwesomeIcon icon={faLink} className="text-xl" />
              <p className="text-gray-500">{basicInfo?.links?.website}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {basicInfo?.links?.facebook && (
            <>
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
              <p className="text-gray-500">{basicInfo?.links?.facebook}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {basicInfo?.links?.github && (
            <>
              <FontAwesomeIcon icon={faGithub} className="text-xl" />
              <p className="text-gray-500">{basicInfo?.links?.github}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {basicInfo?.links?.linkedin && (
            <>
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
              <p className="text-gray-500">{basicInfo?.links?.linkedin}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {basicInfo?.links?.instagram && (
          <>
            <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            <p className="text-gray-500">{basicInfo?.links?.instagram}</p>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        {basicInfo?.links?.twitter && (
          <>
            <FontAwesomeIcon icon={faTwitter} className="text-xl" />
            <p className="text-gray-500">{basicInfo?.links?.twitter}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfileConnections;
