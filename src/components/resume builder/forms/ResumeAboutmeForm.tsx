import FormPreviewSection from "./FormPreviewSection.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import { FormEvent, useState } from "react";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import { useAddOrEditAboutmeMutation } from "../../../services/resumeBuilderApi.ts";
import { handleApiError } from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

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
      const res = addOrEditAboutme({
        resumeId: resumeId || "",
        data: { profile: aboutme },
      });
      toast.promise(res, {
        loading: mode === "add" ? "Saving..." : "Updating...",
        success:
          mode === "add"
            ? "Profile created successfully"
            : "Profile updated successfully",
        error: "Failed to save Profile",
      });
      await res;
      setStatus(["normal"]);
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "edit" ? "Edit Profile" : "Add Profile"}
      tips={true}
      autoFill={false}
    >
      <form onSubmit={(e) => submitForm(e)} className="w-full">
        <RichTextEditor value={aboutme} onChange={handleOnChange} />
        <ResumeFormButtons
          mode={mode}
          handleDelete={() => {
            setAboutme("");
            setResumeInfo((prevInfo) => ({
              ...prevInfo,
              personal: {
                ...prevInfo?.personal,
                aboutMe: "",
              },
            }));
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeAboutmeForm;
