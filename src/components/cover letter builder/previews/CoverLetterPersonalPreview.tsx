import { useCoverLetter } from "../../../context/CoverLetterContext.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function CoverLetterPersonalPreview() {
  const { coverLetterInfo } = useCoverLetter();
  const personalInfo = coverLetterInfo?.personal;
  return (
    <div className="mb-20">
      <h2 className="text-center text-xl font-bold">
        {personalInfo?.fullName}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {personalInfo?.jobTitle}
      </h2>
      <div className="flex justify-center gap-5">
        <h2 className="space-x-2 text-sm font-normal">
          {personalInfo?.email && <FontAwesomeIcon icon={faEnvelope} />}
          <span>{personalInfo?.email}</span>
        </h2>
        <h2 className="space-x-2 text-sm font-normal">
          {personalInfo?.phone && <FontAwesomeIcon icon={faPhone} />}
          <span>{personalInfo?.phone}</span>
        </h2>
        <h2 className="space-x-2 text-center text-sm font-normal">
          {personalInfo?.address && <FontAwesomeIcon icon={faLocationDot} />}
          <span>{personalInfo?.address}</span>
        </h2>
      </div>
    </div>
  );
}

export default CoverLetterPersonalPreview;
