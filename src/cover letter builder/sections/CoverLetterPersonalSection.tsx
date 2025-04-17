import Button from "../../components/common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPenToSquare,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useCoverLetter } from "../../context/CoverLetterContext.tsx";

function CoverLetterPersonalSection() {
  const { coverLetterInfo, setStatus } = useCoverLetter();
  const personalInfo = coverLetterInfo?.personal;
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white px-8 py-5 shadow-md">
      <div className="flex w-full items-center justify-between pb-3">
        <div>
          <p className="text-xl font-semibold">
            {personalInfo?.fullName?.length
              ? personalInfo?.fullName
              : "Your name"}
          </p>
          <p className="text-sm text-gray-300">{personalInfo?.jobTitle}</p>
        </div>
        <Button
          onClick={() => {
            if (personalInfo?.fullName?.length)
              setStatus(() => ["edit", "personal"]);
            else setStatus(() => ["add", "personal"]);
          }}
          className="flex items-center gap-2 bg-white text-gray-300 hover:bg-white"
        >
          <span>{personalInfo?.fullName?.length ? "Edit" : "Add"}</span>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="cursor-pointer text-xl text-gray-400"
          />
        </Button>
      </div>
      <div className="space-y-2">
        <p className="flex items-center gap-1 text-gray-500">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>
            {personalInfo?.email?.length ? personalInfo?.email : "Email"}
          </span>
        </p>
        <p className="flex items-center gap-1 text-gray-500">
          <FontAwesomeIcon icon={faPhone} />
          <span>
            {personalInfo?.phone?.length ? personalInfo?.phone : "Phone"}
          </span>
        </p>
        <p className="flex items-center gap-1 text-gray-500">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>
            {personalInfo?.address?.length ? personalInfo?.address : "Address"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default CoverLetterPersonalSection;
