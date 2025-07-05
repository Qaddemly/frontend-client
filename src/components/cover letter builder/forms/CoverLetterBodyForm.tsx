import { useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import {
  handleApiError,
  handleResumeAction,
  isEditorContentEmpty,
} from "../../../utils/helpers.ts";
import FormPreviewSection from "../../resume builder/forms/FormPreviewSection.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import { useCoverLetter } from "../../../context/CoverLetterContext.tsx";
import { FormMode } from "../../../interfaces/ResumeBuilder.interfaces.ts";
import {
  useGenerateOrEnhanceCoverLetterBodyMutation,
  useGetCoverLettersQuery,
  useUpdateCoverLetterMutation,
} from "../../../services/coverLetterBuilderApi.ts";
import CoverLetterFormButtons from "../CoverLetterFormButtons.tsx";
import GenerateOrEnhanceButton from "../../common/GenerateOrEnhanceButton.tsx";
import toast from "react-hot-toast";

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
  const { refetch } = useGetCoverLettersQuery();

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
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  }
  ///////////////////////////////////////////// Cover Letter Builder Enhancement (AI Feature) //////////////////////////////////////////////
  const [jobDescription, setJobDescription] = useState("");
  const [generateOrEnhanceCoverLetterBody] =
    useGenerateOrEnhanceCoverLetterBodyMutation();

  async function handleGenerateOrEnhanceBody() {
    const isBodyEmpty = isEditorContentEmpty(body);
    if (isBodyEmpty) setBody("");
    if (jobDescription) {
      try {
        const promise = generateOrEnhanceCoverLetterBody({
          existingBody: body || "",
          jobDescription,
        }).unwrap();
        toast.promise(promise, {
          loading: `${!isEditorContentEmpty(body) ? "Enhancing" : "Generating"} body`,
          success: `Body ${!isEditorContentEmpty(body) ? "enhanced" : "generated"} successfully`,
          error: `Could not ${!isEditorContentEmpty(body) ? "enhance" : "generate"} body`,
        });
        const res = await promise;
        const responseBody = res?.coverLetterBody;
        if (responseBody) {
          setBody(responseBody);
          setCoverLetterInfo((prevInfo) => ({
            ...prevInfo,
            personal: {
              ...prevInfo?.personal,
              body: responseBody,
            },
          }));
          setJobDescription("");
        }
      } catch (error) {
        handleApiError(error);
      }
    } else toast.error("Please enter job description to generate body");
  }

  return (
    <>
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
      <div className="relative mt-10">
        <textarea
          className="h-[10rem] w-full rounded-md border border-gray-300 p-4 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
          placeholder="Tell me about job description and I will generate body for you"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <GenerateOrEnhanceButton
          className="bottom-4 right-5"
          text={`${body && body?.length > 0 ? "Enhance" : "Generate"} body with AI`}
          noAnimation={true}
          onClick={handleGenerateOrEnhanceBody}
        />
      </div>
    </>
  );
}

export default CoverLetterBodyForm;
