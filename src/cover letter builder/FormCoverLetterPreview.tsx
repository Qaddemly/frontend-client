import Button from "../components/common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useCoverLetter } from "../context/CoverLetterContext.tsx";
import { useParams } from "react-router-dom";
import CoverLetterPersonalSection from "./CoverLetterPersonalSection.tsx";

function FormCoverLetterPreview() {
  const { coverLetterInfo, coverLetterTemplates, status, setStatus } =
    useCoverLetter();
  const { coverLetterId } = useParams();
  const currentCoverLetterTemplate = coverLetterTemplates?.filter(
    (cover) => cover.id === Number(coverLetterId),
  );
  // TODO: Edit cover letter name need handle from backend
  // const [coverLetterName, setCoverLetterName] = useState(currentCoverLetterTemplate[0].name);
  // const [showEditCoverLetterName, setShowEditCoverLetterName] = useState(false);

  return (
    <div className="no-print flex w-1/3 flex-col gap-10">
      <div className="flex items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
        {/*{showEditCoverLetterName ? (*/}
        {/*  <div className="flex items-center gap-5">*/}
        {/*    <Input*/}
        {/*      props={{ type: "text", id: "coverLetterName" }}*/}
        {/*      value={coverLetterName}*/}
        {/*      onChange={(e) => setCoverLetterName(e.target.value)}*/}
        {/*    />*/}
        {/*    <FontAwesomeIcon*/}
        {/*      icon={faCheck}*/}
        {/*      className="cursor-pointer rounded-md bg-main p-2 text-lg text-white"*/}
        {/*      onClick={() => setShowEditCoverLetterName(false)}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*)}*/}
        <p className="flex items-center gap-3 text-2xl font-medium">
          {currentCoverLetterTemplate[0]?.name}
          {/*<FontAwesomeIcon*/}
          {/*  icon={faPenToSquare}*/}
          {/*  className="cursor-pointer text-xl text-gray-400"*/}
          {/*  onClick={() => setShowEditResumeName(true)}*/}
          {/*/>*/}
        </p>
        <Button
          onClick={() => {
            window.print();
          }}
          className="flex items-center gap-3 px-3"
        >
          Download
          <FontAwesomeIcon icon={faFileArrowDown} className="text-xl" />
        </Button>
      </div>
      {/*/////////////////////////////////////////// Main Content  ///////////////////////////////////////////////*/}
      {(status[0] === "normal" && status[1] === "personal") ||
      status.includes("start") ? (
        <div className="flex items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
          <p className="text-lg font-semibold">Add your main content</p>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="cursor-pointer rounded-full bg-main p-2 text-xl text-white"
            onClick={() => setStatus(["add", "personal"])}
          />
        </div>
      ) : null}
      {/*/////////////////////////////////////////// Create Forms  ///////////////////////////////////////////////*/}
      {status.includes("add") && status.includes("personal") && (
        // <ResumePersonalForm mode="add" />
        <div></div>
      )}
      {/*/////////////////////////////////////////// Edit Forms  ///////////////////////////////////////////////*/}
      {status.includes("edit") && status.includes("personal") && (
        // <ResumePersonalForm mode="edit" />
        <div></div>
      )}
      {/*///////////////////////////////////////////  Sections  ///////////////////////////////////////////////*/}
      {status[0] === "normal" && (
        <>
          Personal Section
          {coverLetterInfo?.personal?.fullName?.length > 0 && (
            <CoverLetterPersonalSection />
          )}
        </>
      )}
    </div>
  );
}

export default FormCoverLetterPreview;
