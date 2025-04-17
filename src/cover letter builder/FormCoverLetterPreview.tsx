import Button from "../components/common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useCoverLetter } from "../context/CoverLetterContext.tsx";
import { useParams } from "react-router-dom";
import CoverLetterPersonalSection from "./sections/CoverLetterPersonalSection.tsx";
import CoverLetterPersonalForm from "./forms/CoverLetterPersonalForm.tsx";
import CoverLetterBodySection from "./sections/CoverLetterBodySection.tsx";
import CoverLetterBodyForm from "./forms/CoverLetterBodyForm.tsx";
import CoverLetterRecipientSection from "./sections/CoverLetterRecipientSection.tsx";
import { IRecipientDetails } from "../interfaces/CoverLetter.interfaces.ts";
import CoverLetterRecipientForm from "./forms/CoverLetterRecipientForm.tsx";

function FormCoverLetterPreview() {
  const { coverLetterTemplates, status } = useCoverLetter();
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
      {/*/////////////////////////////////////////// Create Forms  ///////////////////////////////////////////////*/}
      {status.includes("add") && status.includes("personal") && (
        <CoverLetterPersonalForm mode="add" />
      )}
      {status.includes("add") && status.includes("body") && (
        <CoverLetterBodyForm mode="add" />
      )}
      {status.includes("add") && status.includes("recipientDetails") && (
        <CoverLetterRecipientForm mode="add" />
      )}
      {/*/////////////////////////////////////////// Edit Forms  ///////////////////////////////////////////////*/}
      {status.includes("edit") && status.includes("personal") && (
        <CoverLetterPersonalForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("body") && (
        <CoverLetterBodyForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("recipientDetails") && (
        <CoverLetterRecipientForm mode="edit" />
      )}
      {/*///////////////////////////////////////////  Sections  ///////////////////////////////////////////////*/}
      {status[0] === "normal" && <CoverLetterPersonalSection />}
      {status[0] === "normal" && (
        <CoverLetterBodySection
          body={currentCoverLetterTemplate[0]?.body ?? ""}
        />
      )}
      {status[0] === "normal" && (
        <CoverLetterRecipientSection
          recipientDetails={
            currentCoverLetterTemplate[0]?.recipientDetails ??
            ({} as IRecipientDetails)
          }
        />
      )}
    </div>
  );
}

export default FormCoverLetterPreview;
