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
import ResumeProjectForm from "./forms/ResumeProjectForm.tsx";
import ResumeCustomForm from "./forms/ResumeCustomForm.tsx";
import { useParams } from "react-router-dom";
import ResumeAwardsForm from "./forms/ResumeAwardsForm.tsx";
import ResumePublicationsForm from "./forms/ResumePublicationsForm.tsx";


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
  // Edit resume name need handle from backend
  // const [resumeName, setResumeName] = useState(currentResumeTemplate[0].name);
  // const [showEditResumeName, setShowEditResumeName] = useState(false);

  return (
    <div className="flex w-1/3 flex-col gap-10">
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
        <Button className="flex items-center gap-3 px-3">
          Download
          <FontAwesomeIcon icon={faFileArrowDown} className="text-xl" />
        </Button>
      </div>
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
              titles={[`${resumeInfo?.personal?.aboutMe.slice(0, 1000)}`]}
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
