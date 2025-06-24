import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumePersonalPreview() {
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
      <h2 className="text-center text-xl font-bold">
        {personalInfo?.fullName}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {personalInfo?.jobTitle}
      </h2>
      <h2 className="text-center text-sm font-normal">
        {personalInfo?.address}
      </h2>
      <div className="flex justify-center gap-5">
        <h2 className="text-sm font-normal">{personalInfo?.email}</h2>
        <h2 className="text-sm font-normal">{personalInfo?.phone}</h2>
      </div>
    </div>
  );
}

export default ResumePersonalPreview;
