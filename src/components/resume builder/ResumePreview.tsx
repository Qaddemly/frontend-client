import ResumePersonalPreview from "./previews/ResumePersonalPreview.tsx";
import ResumeAboutmePreview from "./previews/ResumeAboutmePreview.tsx";
import ResumeEducationPreview from "./previews/ResumeEducationPreview.tsx";
import ResumeSkillsPreview from "./previews/ResumeSkillsPreview.tsx";
import ResumeCertificatesPreview from "./previews/ResumeCertificatesPreview.tsx";
import ResumeExperiencePreview from "./previews/ResumeExperiencePreview.tsx";
import ResumeLanguagePreview from "./previews/ResumeLanguagePreview.tsx";
import ResumeInterestPreview from "./previews/ResumeInterestPreview.tsx";
import ResumeReferencePreview from "./previews/ResumeReferencePreview.tsx";
import ResumeProjectsPreview from "./previews/ResumeProjectsPreview.tsx";
import ResumeCustomPreview from "./previews/ResumeCustomPreview.tsx";
import ResumeAwardPreview from "./previews/ResumeAwardPreview.tsx";
import ResumePublicationPreview from "./previews/ResumePublicationPreview.tsx";
import ResumeOrganizationPreview from "./previews/ResumeVolunteeringPreview.tsx";

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
        <ResumeReferencePreview />
        <ResumePublicationPreview />
        <ResumeCustomPreview />
        <ResumeOrganizationPreview />
      </div>
      {/*<div className="min-h-screen rounded-md bg-white p-14 font-[Arial] shadow-lg">*/}
      {/*</div>*/}
    </div>
  );
}

export default ResumePreview;
