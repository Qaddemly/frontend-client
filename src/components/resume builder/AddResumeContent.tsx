import ResumeContentBox from "./ResumeContentBox.tsx";
import {
  faAddressCard,
  faBookOpen,
  faBriefcase,
  faBrush,
  faCertificate,
  faClose,
  faCompassDrafting,
  faGear,
  faHandshakeAngle,
  faLanguage,
  faListCheck,
  faMedal,
  faPenFancy,
  faPersonHiking,
  faScroll,
  faUser,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useResumeBuilder } from "../../context/ResumeBuilderContext.tsx";

function AddResumeContent() {
  const { setShowAddContent, setStatus } = useResumeBuilder();
  return (
    <div className="min-h-screen w-[70rem] bg-white p-10">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-3xl font-semibold">Add Content</p>
        <Button
          onClick={() => setShowAddContent(false)}
          className="rounded-full px-5"
        >
          <FontAwesomeIcon icon={faClose} className="text-2xl" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-3">
        <ResumeContentBox
          title="Profile"
          icon={faUser}
          description="A brief statement summarizing your career goal and what you bring to the
        role."
          onClick={() => setStatus(() => ["add", "aboutme"])}
        />
        <ResumeContentBox
          title="Education"
          icon={faUserGraduate}
          description="Displays your academic background Degree(s)."
          onClick={() => setStatus(() => ["add", "education"])}
        />
        <ResumeContentBox
          title="Skills"
          icon={faPersonHiking}
          description="Showcases your relevant hard (technical) and soft skills."
          onClick={() => setStatus(() => ["add", "skills"])}
        />
        <ResumeContentBox
          title="Work Experience"
          icon={faBriefcase}
          description="Highlights your professional history and achievements."
          onClick={() => setStatus(() => ["add", "workExperience"])}
        />
        <ResumeContentBox
          title="Certifications"
          icon={faCertificate}
          description="Highlights additional qualifications that enhance your expertise."
          onClick={() => setStatus(() => ["add", "certifications"])}
        />
        <ResumeContentBox
          title="Projects"
          icon={faListCheck}
          description="Showcases specific work or initiatives, especially useful for creative roles."
          onClick={() => setStatus(() => ["add", "projects"])}
        />
        <ResumeContentBox
          title="Volunteering"
          icon={faHandshakeAngle}
          description="Demonstrates community involvement and transferable skills."
          onClick={() => setStatus(() => ["add", "volunteering"])}
        />
        <ResumeContentBox
          title="Languages"
          icon={faLanguage}
          description="Highlights multilingual abilities, especially useful for international roles."
          onClick={() => setStatus(() => ["add", "languages"])}
        />
        <ResumeContentBox
          title="Hobbies"
          icon={faBookOpen}
          description="Adds a personal touch and can showcase transferable skills or cultural fit."
          onClick={() => setStatus(() => ["add", "hobbies"])}
        />
        <ResumeContentBox
          title="References"
          icon={faPenFancy}
          description="Provides contacts who can vouch for your skills and experience."
          onClick={() => setStatus(() => ["add", "references"])}
        />
        <ResumeContentBox
          title="Achievements and Awards"
          icon={faMedal}
          description="Highlights accomplishments that demonstrate your excellence."
          onClick={() => setStatus(() => ["add", "achievements"])}
        />
        <ResumeContentBox
          title="Publications"
          icon={faScroll}
          description="Showcases your written work, relevant for academic or writing-focused roles."
          onClick={() => setStatus(() => ["add", "publications"])}
        />
        <ResumeContentBox
          title="Technical Proficiencies"
          icon={faCompassDrafting}
          description="Lists specific tools or technologies you’re skilled in (great for tech roles)."
          onClick={() => setStatus(() => ["add", "technicalProficiencies"])}
        />
        <ResumeContentBox
          title="Training and Workshops"
          icon={faGear}
          description="Highlights additional learning experiences that enhance your skills."
          onClick={() => setStatus(() => ["add", "training"])}
        />
        <ResumeContentBox
          title="Portfolio/ Personal Website"
          icon={faAddressCard}
          description="Provides a link to your work samples (Useful for creative or technical roles)."
          onClick={() => setStatus(() => ["add", "portfolio"])}
        />
        <ResumeContentBox
          title="Custom"
          icon={faBrush}
          description="Create a unique section to highlight something specific."
          onClick={() => setStatus(() => ["add", "custom"])}
        />
      </div>
    </div>
  );
}

export default AddResumeContent;
