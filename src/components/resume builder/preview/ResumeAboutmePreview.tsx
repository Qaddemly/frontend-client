import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumeAboutmePreview() {
  const { resumeInfo } = useResumeBuilder();
  const personalInfo = resumeInfo.personal;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: personalInfo.aboutMe }}
      className="rich-text-editor text-sm"
    ></div>
  );
}

export default ResumeAboutmePreview;
