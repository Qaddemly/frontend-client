import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumeAboutmePreview() {
  const { resumeInfo } = useResumeBuilder();
  const personalInfo = resumeInfo?.personal;
  if (
    !personalInfo ||
    Object.values(personalInfo).every(
      (value) => value === undefined || value === null || value === "",
    )
  ) {
    return null;
  }
  return (
    <div>
      {personalInfo?.aboutMe?.length > 0 && (
        <>
          <p className="text-lg font-medium">Profile</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: personalInfo?.aboutMe }}
        className="rich-text-editor break-words text-xs"
      ></div>
    </div>
  );
}

export default ResumeAboutmePreview;
