import FormPreviewSection from "./FormPreviewSection.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import Button from "../../common/Button.tsx";

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

  return (
    <FormPreviewSection title="Create About me" tips={true} autoFill={false}>
      <div className="flex w-full flex-col">
        <RichTextEditor
          value={resumeInfo.personal.aboutMe}
          onChange={(e) => handleOnChange(e)}
        />
        <div className="mt-5 flex gap-3 self-end">
          <Button className="bg-white px-3 text-main hover:bg-main hover:text-white">
            cancel
          </Button>
          <Button className="px-3">Save</Button>
        </div>
      </div>
    </FormPreviewSection>
  );
}

export default ResumeAboutmeForm;
