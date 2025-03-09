import ResumePersonalPreview from "./preview/ResumePersonalPreview.tsx";
import ResumeAboutmePreview from "./preview/ResumeAboutmePreview.tsx";
import ResumeEducationPreview from "./preview/ResumeEducationPreview.tsx";
import ResumeSkillsPreview from "./preview/ResumeSkillsPreview.tsx";

function ResumePreview({ className }: { className?: string }) {
  const width = className?.split(" ").find((x) => x.match("w-"));
  const height = className?.split(" ").find((x) => x.match("h-"));
  return (
    <div
      className={`${width ? width : "w-1/2"} ${height ? height : "min-h-screen"} rounded-md bg-white p-14 font-[Arial] shadow-lg ${className}`}
    >
      <ResumePersonalPreview />
      <ResumeAboutmePreview />
      <ResumeEducationPreview />
      <ResumeSkillsPreview />
    </div>
  );
}

export default ResumePreview;
