import FormPreviewSection from "./FormPreviewSection.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { ContentEditableEvent } from "react-simple-wysiwyg";

function ResumeAboutmeForm() {
  const { resumeInfo, setResumeInfo } = useResumeBuilder();

  function handleOnChange(e: ContentEditableEvent) {
    const { value } = e.target;
    setResumeInfo((prevInfo) => ({
      ...(prevInfo || {}),
      personal: {
        ...(prevInfo.personal || {}),
        aboutMe: value,
      },
    }));
  }

  function submitForm() {}

  return (
    <FormPreviewSection
      onSubmit={submitForm}
      title="Create About me"
      tips={true}
      autoFill={false}
    >
      <div className="flex w-full flex-col">
        <RichTextEditor
          value={resumeInfo.personal.aboutMe}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
    </FormPreviewSection>
  );
}

export default ResumeAboutmeForm;
