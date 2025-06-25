import { useState } from "react";

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
  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => setShowPreview((prev) => !prev);

  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:hidden">
        <button
          onClick={togglePreview}
          className="z-10 mt-4 rounded bg-main px-4 py-2 text-white shadow-md md:hidden"
        >
          {showPreview ? "Hide" : "Show CV"}
        </button>
      </div>
      {showPreview && (
        <div className="bg-black/30 fixed inset-0 z-50 flex justify-center overflow-y-auto py-6 backdrop-blur-sm md:hidden">
          <div className="flex min-h-screen w-[90%] flex-col rounded-md bg-white p-6 shadow-xl" id="resume">
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

            <button
              onClick={togglePreview}
              className="fixed bottom-4 right-10 z-50 rounded bg-danger-300 px-4 py-2 text-white shadow-md md:hidden"
            >
              Hide
            </button>
          </div>
        </div>
      )}

      {/* big screens*/}
      <div className="print-area hidden w-full flex-col gap-8 md:flex">
        <div className="mx-auto min-h-screen w-full rounded-md bg-white p-14 font-[Arial] shadow-lg md:w-3/4" id="resume">
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
      </div>
    </div>
  );
}

export default ResumePreview;
