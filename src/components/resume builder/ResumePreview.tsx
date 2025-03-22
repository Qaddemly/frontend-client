import ResumePersonalPreview from "./preview/ResumePersonalPreview.tsx";
import ResumeAboutmePreview from "./preview/ResumeAboutmePreview.tsx";
import ResumeEducationPreview from "./preview/ResumeEducationPreview.tsx";
import ResumeSkillsPreview from "./preview/ResumeSkillsPreview.tsx";
import ResumeCertificatesPreview from "./preview/ResumeCertificatesPreview.tsx";
import ResumeExperiencePreview from "./preview/ResumeExperiencePreview.tsx";
import ResumeLanguagePreview from "./preview/ResumeLanguagePreview.tsx";
import ResumeInterestPreview from "./preview/ResumeInterestPreview.tsx";
import ResumeReferencePreview from "./preview/ResumeReferencePreview.tsx";
import ResumeProjectsPreview from "./preview/ResumeProjectsPreview.tsx";
import ResumeCustomPreview from "./preview/ResumeCustomPreview.tsx";
import ResumeAwardPreview from "./preview/ResumeAwardPreview.tsx";
import ResumePublicationPreview from "./preview/ResumepublicationPreview.tsx";

function ResumePreview() {
  return (
    <div className="print-area w-full space-y-8 md:w-1/2">
      <div className="min-h-screen rounded-md bg-white p-14 font-[Arial] shadow-lg">
        <ResumePersonalPreview />
        <ResumeAboutmePreview />
        <ResumeEducationPreview />
        <ResumeExperiencePreview />
        <ResumeSkillsPreview />
        <ResumeCertificatesPreview />
        <ResumeProjectsPreview />
        <ResumeAwardPreview />
        <ResumeLanguagePreview />
        <ResumeInterestPreview />
        <ResumePublicationPreview />
        <ResumeCustomPreview />
      </div>
      {/*<div className="min-h-screen rounded-md bg-white p-14 font-[Arial] shadow-lg">*/}
      {/*</div>*/}
    </div>
  );
}

export default ResumePreview;
