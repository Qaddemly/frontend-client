import Button from "../common/Button.tsx";
import {
  // faCheck,
  faFileArrowDown,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ResumePersonalForm from "./forms/ResumePersonalForm.tsx";
import ResumeAboutmeForm from "./forms/ResumeAboutmeForm.tsx";
import { useResumeBuilder } from "../../context/ResumeBuilderContext.tsx";
import ResumePersonalSection from "./sections/ResumePersonalSection.tsx";
import ResumeSection from "./sections/ResumeSection.tsx";
import ResumeSkillsForm from "./forms/ResumeSkillsForm.tsx";
import ResumeEucationForm from "./forms/ResumeEucationForm.tsx";
import ResumeCertificatesForm from "./forms/ResumeCertificatesForm.tsx";
import ResumeExperienceForm from "./forms/ResumeExperienceForm.tsx";
import ResumeLanguagesForm from "./forms/ResumeLanguageForm.tsx";
import ResumeInterestForm from "./forms/ResumeInterestForm.tsx";
import ResumeReferenceForm from "./forms/ResumeReferenceForm.tsx";
import ResumeProjectForm from "./forms/ResumeProjectForm.tsx";
import ResumeCustomForm from "./forms/ResumeCustomForm.tsx";
import { useParams } from "react-router-dom";
import ResumeAwardsForm from "./forms/ResumeAwardsForm.tsx";
import ResumePublicationsForm from "./forms/ResumePublicationsForm.tsx";
import ResumeOrganizationForm from "./forms/ResumeVolunteeringForm.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import html2pdf from "html2pdf.js";

function FormPreview() {
  const {
    setShowAddContent,
    status,
    setStatus,
    resumeInfo,
    setCurrId,
    resumeTemplates,
  } = useResumeBuilder();
  const { resumeId } = useParams();
  const currentResumeTemplate = resumeTemplates?.filter(
    (resume) => resume.id === Number(resumeId),
  );
  // TODO: Edit resume name need handle from backend
  // const [resumeName, setResumeName] = useState(currentResumeTemplate[0].name);
  // const [showEditResumeName, setShowEditResumeName] = useState(false);

  function handleDownload() {
    const element = document.getElementById("resume");
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  }

  return (
    <div className="no-print flex w-full flex-col gap-10 md:w-1/3">
      <div className="flex items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
        {/*{showEditResumeName ? (*/}
        {/*  <div className="flex items-center gap-5">*/}
        {/*    <Input*/}
        {/*      props={{ type: "text", id: "resumeName" }}*/}
        {/*      value={resumeName}*/}
        {/*      onChange={(e) => setResumeName(e.target.value)}*/}
        {/*    />*/}
        {/*    <FontAwesomeIcon*/}
        {/*      icon={faCheck}*/}
        {/*      className="cursor-pointer rounded-md bg-main p-2 text-lg text-white"*/}
        {/*      onClick={() => setShowEditResumeName(false)}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*)}*/}
        <p className="flex items-center gap-3 text-2xl font-medium">
          {currentResumeTemplate[0]?.name}
          {/*<FontAwesomeIcon*/}
          {/*  icon={faPenToSquare}*/}
          {/*  className="cursor-pointer text-xl text-gray-400"*/}
          {/*  onClick={() => setShowEditResumeName(true)}*/}
          {/*/>*/}
        </p>
        <Button
          // onClick={() => {
          //   window.print();
          // }}
          onClick={handleDownload}
          className="flex items-center gap-3 px-3"
        >
          Download
          <FontAwesomeIcon icon={faFileArrowDown} className="text-xl" />
        </Button>
      </div>

      {/*/////////////////////////////////////////// Main Content  ///////////////////////////////////////////////*/}
      {(status[0] === "normal" && status[1] === "personal") ||
      status.includes("start") ? (
        <div className="flex items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
          <p className="text-lg font-semibold">Add your main content</p>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="cursor-pointer rounded-full bg-main p-2 text-xl text-white"
            onClick={() => setStatus(["add", "personal"])}
          />
        </div>
      ) : null}
      {/*/////////////////////////////////////////// Create Forms  ///////////////////////////////////////////////*/}
      {status.includes("add") && status.includes("personal") && (
        <ResumePersonalForm mode="add" />
      )}
      {status.includes("add") && status.includes("aboutme") && (
        <ResumeAboutmeForm mode="add" />
      )}
      {status.includes("add") && status.includes("education") && (
        <ResumeEucationForm mode="add" />
      )}
      {status.includes("add") && status.includes("workExperience") && (
        <ResumeExperienceForm mode="add" />
      )}
      {status.includes("add") && status.includes("skills") && (
        <ResumeSkillsForm mode="add" />
      )}
      {status.includes("add") && status.includes("certifications") && (
        <ResumeCertificatesForm mode="add" />
      )}
      {status.includes("add") && status.includes("languages") && (
        <ResumeLanguagesForm mode="add" />
      )}
      {status.includes("add") && status.includes("hobbies") && (
        <ResumeInterestForm mode="add" />
      )}
      {status.includes("add") && status.includes("references") && (
        <ResumeReferenceForm mode="add" />
      )}
      {status.includes("add") && status.includes("projects") && (
        <ResumeProjectForm mode="add" />
      )}
      {status.includes("add") && status.includes("custom") && (
        <ResumeCustomForm mode="add" />
      )}
      {status.includes("add") && status.includes("achievements") && (
        <ResumeAwardsForm mode="add" />
      )}
      {status.includes("add") && status.includes("publications") && (
        <ResumePublicationsForm mode="add" />
      )}
      {status.includes("add") && status.includes("volunteering") && (
        <ResumeOrganizationForm mode="add" />
      )}
      {/*/////////////////////////////////////////// Edit Forms  ///////////////////////////////////////////////*/}
      {status.includes("edit") && status.includes("personal") && (
        <ResumePersonalForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("aboutme") && (
        <ResumeAboutmeForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("education") && (
        <ResumeEucationForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("workExperience") && (
        <ResumeExperienceForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("skills") && (
        <ResumeSkillsForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("certifications") && (
        <ResumeCertificatesForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("languages") && (
        <ResumeLanguagesForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("hobbies") && (
        <ResumeInterestForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("references") && (
        <ResumeReferenceForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("projects") && (
        <ResumeProjectForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("custom") && (
        <ResumeCustomForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("achievements") && (
        <ResumeAwardsForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("publications") && (
        <ResumePublicationsForm mode="edit" />
      )}
      {status.includes("edit") && status.includes("volunteering") && (
        <ResumeOrganizationForm mode="edit" />
      )}
      {/*///////////////////////////////////////////  Sections  ///////////////////////////////////////////////*/}
      {status[0] === "normal" && (
        <>
          {/* Personal Section */}
          {resumeInfo?.personal?.fullName?.length > 0 && (
            <ResumePersonalSection />
          )}
          {/* Aboutme Section */}
          {resumeInfo?.personal?.aboutMe && (
            <ResumeSection
              title="Profile"
              type="aboutme"
              titles={[`${resumeInfo?.personal?.aboutMe.slice(0, 50)}...`]}
              handleEditAboutme={() => setStatus(() => ["edit", "aboutme"])}
            />
          )}
          {/* Education Section */}
          {resumeInfo?.education?.length > 0 && (
            <ResumeSection
              title="Education"
              items={resumeInfo.education}
              idField="id"
              displayField="degree"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "education"]);
                }
              }}
            />
          )}
          {/* Experience Section */}
          {resumeInfo?.experience?.length > 0 && (
            <ResumeSection
              title="Experience"
              items={resumeInfo.experience}
              idField="id"
              displayField="job_title"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "workExperience"]);
                }
              }}
            />
          )}
          {/* Skills Section */}
          {resumeInfo?.skills?.length > 0 && (
            <ResumeSection
              title="Skills"
              items={resumeInfo.skills}
              idField="id"
              displayField="name"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "skills"]);
                }
              }}
            />
          )}
          {/* Certificates Section */}
          {resumeInfo?.certificates?.length > 0 && (
            <ResumeSection
              title="Certificates"
              items={resumeInfo.certificates}
              idField="id"
              displayField="certificate"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "certifications"]);
                }
              }}
            />
          )}

          {/* Language Section */}
          {resumeInfo?.languages?.length > 0 && (
            <ResumeSection
              title="Languages"
              items={resumeInfo.languages}
              idField="id"
              displayField="language"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "languages"]);
                }
              }}
            />
          )}
          {/* Interests Section */}
          {resumeInfo?.hobbies?.length > 0 && (
            <ResumeSection
              title="Interest"
              items={resumeInfo.hobbies}
              idField="id"
              displayField="interest"
              titles={[`${resumeInfo?.hobbies?.length}`]}
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "hobbies"]);
                }
              }}
            />
          )}

          {/* Organization Section */}
          {resumeInfo?.volunteering?.length > 0 && (
            <ResumeSection
              title="Organization"
              items={resumeInfo.volunteering}
              idField="id"
              displayField="organization"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "volunteering"]);
                }
              }}
            />
          )}
          {/* Reference Section */}
          {resumeInfo?.references?.length > 0 && (
            <ResumeSection
              title="References"
              items={resumeInfo.references}
              idField="id"
              displayField="reference"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "references"]);
                }
              }}
            />
          )}

          {/* Projects Section */}
          {resumeInfo?.projects?.length > 0 && (
            <ResumeSection
              title="Projects"
              items={resumeInfo.projects}
              idField="id"
              displayField="title"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "projects"]);
                }
              }}
            />
          )}

          {/* Custom Section */}
          {resumeInfo?.custom?.length > 0 && (
            <ResumeSection
              title="Custom sections"
              items={resumeInfo.custom}
              idField="id"
              displayField="section_name"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "custom"]);
                }
              }}
            />
          )}
          {/* Achievements and Awards Section */}
          {resumeInfo?.awards?.length > 0 && (
            <ResumeSection
              title="Achievements and Awards"
              items={resumeInfo.awards}
              idField="id"
              displayField="award"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "achievements"]);
                }
              }}
            />
          )}
          {/* Publications Section */}
          {resumeInfo?.publications?.length > 0 && (
            <ResumeSection
              title="Publications"
              items={resumeInfo.publications}
              idField="id"
              displayField="title"
              handleEdit={(id) => {
                if (typeof id === "number") {
                  setCurrId(id);
                  setStatus(["edit", "publications"]);
                }
              }}
            />
          )}
        </>
      )}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowAddContent(true)}
          className="space-x-2 rounded-full px-8"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add Content</span>
        </Button>
      </div>
    </div>
  );
}

export default FormPreview;
