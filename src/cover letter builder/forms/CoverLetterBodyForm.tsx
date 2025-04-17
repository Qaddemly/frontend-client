import { useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import { handleApiError, handleResumeAction } from "../../utils/helpers.ts";
import FormPreviewSection from "../../components/resume builder/forms/FormPreviewSection.tsx";
import RichTextEditor from "../../components/common/RichTextEditor.tsx";
import { useCoverLetter } from "../../context/CoverLetterContext.tsx";
import { FormMode } from "../../interfaces/ResumeBuilder.interfaces.ts";
import { useUpdateCoverLetterMutation } from "../../services/coverLetterBuilderApi.ts";
import CoverLetterFormButtons from "../CoverLetterFormButtons.tsx";

function CoverLetterBodyForm({ mode }: { mode: FormMode }) {
  const { coverLetterId } = useParams();
  const { setCoverLetterInfo, coverLetterTemplates, setStatus } =
    useCoverLetter();
  const currentCoverLetterTemplate = coverLetterTemplates?.filter(
    (cover) => cover.id === Number(coverLetterId),
  );

  const [body, setBody] = useState(
    mode === "edit" ? currentCoverLetterTemplate[0]?.body : "",
  );

  const [updateCoverLetter] = useUpdateCoverLetterMutation();

  function handleOnChange(e: ContentEditableEvent) {
    const { value } = e.target;
    setBody(value);
    setCoverLetterInfo((prevInfo) => ({
      ...prevInfo,
      personal: {
        ...prevInfo?.personal,
        body: value,
      },
    }));
  }

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await handleResumeAction(
        () =>
          updateCoverLetter({
            id: coverLetterId || "",
            coverLetter: {
              body,
            },
          }).unwrap(),
        mode,
      );
      setStatus(["normal"]);
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "edit" ? "Edit Body" : "Add Body"}
      tips={true}
      autoFill={false}
    >
      <form onSubmit={(e) => submitForm(e)} className="w-full">
        <RichTextEditor value={body ?? ""} onChange={handleOnChange} />
        <CoverLetterFormButtons
          mode={mode}
          hiddenDeleteBtn={true}
          handleCancel={() => {
            if (mode === "add")
              setCoverLetterInfo((prevInfo) => ({
                ...prevInfo,
                personal: {
                  ...prevInfo.personal,
                  body: "",
                },
              }));
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default CoverLetterBodyForm;
