import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumePersonalPreview() {
  const { resumeInfo } = useResumeBuilder();
  const personalInfo = resumeInfo.personal;
  return (
    <div>
      <h2 className="text-center text-xl font-bold">{personalInfo.fullName}</h2>
      <h2 className="text-center text-sm font-medium">
        {personalInfo.jobTitle}
      </h2>
      <h2 className="text-center text-sm font-normal">
        {personalInfo.address}
      </h2>
      <div className="flex justify-between">
        <h2 className="text-sm font-normal">{personalInfo.phone}</h2>
        <h2 className="text-sm font-normal">{personalInfo.email}</h2>
      </div>
      <hr className="my-2 border-[1.5px]" />
    </div>
  );
}

export default ResumePersonalPreview;
