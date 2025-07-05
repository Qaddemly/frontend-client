import FormPreviewSection from "./FormPreviewSection.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import { FormEvent, useState } from "react";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import {
  useAddOrEditAboutmeMutation,
  useGenerateOrEnhanceAboutMeBasedOnJobMutation,
  useGenerateOrEnhanceAboutMeMutation,
} from "../../../services/resumeBuilderApi.ts";
import {
  handleApiError,
  handleResumeAction,
  isEditorContentEmpty,
} from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import GenerateOrEnhanceButton from "../../common/GenerateOrEnhanceButton.tsx";

type FormMode = "add" | "edit";

function ResumeAboutmeForm({ mode }: { mode: FormMode }) {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo, setStatus } = useResumeBuilder();

  const [aboutme, setAboutme] = useState(
    mode === "edit" ? resumeInfo.personal?.aboutMe : "",
  );

  const [addOrEditAboutme] = useAddOrEditAboutmeMutation();

  function handleOnChange(e: ContentEditableEvent) {
    const { value } = e.target;
    setAboutme(value);
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      personal: {
        ...prevInfo?.personal,
        aboutMe: value,
      },
    }));
  }

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await handleResumeAction(
        () =>
          addOrEditAboutme({
            resumeId: resumeId || "",
            data: { profile: aboutme },
          }).unwrap(),
        mode,
      );
      setStatus(["normal"]);
    } catch (error) {
      handleApiError(error);
    }
  }

  ///////////////////////////////////////////// Resume Builder Enhancement (AI Feature) /////////////////////
  const [jobDescription, setJobDescription] = useState("");
  const [generateOrEnhanceAboutMe] = useGenerateOrEnhanceAboutMeMutation();
  const [generateOrEnhanceAboutMeBasedOnJob] =
    useGenerateOrEnhanceAboutMeBasedOnJobMutation();

  async function handleGenerateOrEnhanceAboutMe() {
    const isAboutMeEmpty = isEditorContentEmpty(aboutme);
    if (isAboutMeEmpty) setAboutme("");
    try {
      const promise = generateOrEnhanceAboutMe({
        aboutMe: aboutme,
      }).unwrap();
      toast.promise(promise, {
        loading: `${!isEditorContentEmpty(aboutme) ? "Enhancing" : "Generating"}  profile`,
        success: `Profile ${!isEditorContentEmpty(aboutme) ? "enhanced" : "generated"} successfully`,
        error: `Could not ${!isEditorContentEmpty(aboutme) ? "enhance" : "generate"} profile`,
      });
      const res = await promise;
      const enhancedProfile = res?.enhancedAboutMe;
      if (enhancedProfile) {
        setAboutme(enhancedProfile);
        setResumeInfo((prevInfo) => ({
          ...prevInfo,
          personal: {
            ...prevInfo?.personal,
            aboutMe: enhancedProfile,
          },
        }));
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleGenerateOrEnhanceAboutMeBasedOnJob() {
    const isAboutMeEmpty = isEditorContentEmpty(aboutme);
    if (isAboutMeEmpty) setAboutme("");
    if (jobDescription) {
      try {
        const promise = generateOrEnhanceAboutMeBasedOnJob({
          aboutMe: aboutme,
          jobDescription,
        }).unwrap();
        toast.promise(promise, {
          loading: `${!isEditorContentEmpty(aboutme) ? "Enhancing" : "Generating"}  profile`,
          success: `Profile ${!isEditorContentEmpty(aboutme) ? "enhanced" : "generated"} successfully`,
          error: `Could not ${!isEditorContentEmpty(aboutme) ? "enhance" : "generate"} profile`,
        });
        const res = await promise;
        const enhancedProfile = res?.enhancedAboutMe;
        if (enhancedProfile) {
          setJobDescription("");
          setAboutme(enhancedProfile);
          setResumeInfo((prevInfo) => ({
            ...prevInfo,
            personal: {
              ...prevInfo?.personal,
              aboutMe: enhancedProfile,
            },
          }));
        }
      } catch (error) {
        handleApiError(error);
      }
    } else toast.error("Please enter job description to generate profile");
  }

  return (
    <>
      <FormPreviewSection
        title={mode === "edit" ? "Edit Profile" : "Add Profile"}
        tips={true}
        autoFill={false}
      >
        <form onSubmit={(e) => submitForm(e)} className="w-full">
          <RichTextEditor
            value={aboutme}
            onChange={handleOnChange}
            generateBtn={true}
            generateBtnText={`${isEditorContentEmpty(aboutme) ? "Generate Profile" : "Enhance Profile"}`}
            generateBtnOnClick={handleGenerateOrEnhanceAboutMe}
          />
          <div className="mt-10">
            <ResumeFormButtons
              mode={mode}
              hiddenDeleteBtn={true}
              handleCancel={() => {}}
            />
          </div>
        </form>
      </FormPreviewSection>
      <div className="relative mt-10">
        <textarea
          className="h-[10rem] w-full rounded-md border border-gray-300 p-4 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
          placeholder="Tell me about job description and I will generate profile for you"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <GenerateOrEnhanceButton
          className="bottom-4 right-5"
          text="Generate profile with AI"
          noAnimation={true}
          onClick={handleGenerateOrEnhanceAboutMeBasedOnJob}
        />
      </div>
    </>
  );
}

export default ResumeAboutmeForm;
