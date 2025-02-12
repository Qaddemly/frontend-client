import {
  faBookOpen,
  faBriefcase,
  faCertificate,
  faFileWord,
  faHandshakeAngle,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NavbarLink from "../common/NavbarLink";

function ProfileHeader() {
  return (
    <>
      <div className="ml-10 mt-5">
        <ul className="mt-10 flex justify-start space-x-9 text-gray-600">
          <NavbarLink
            to="/userSettings/profile/personal"
            content="Personal"
            icon={faUser}
          />
          <NavbarLink
            to="/userSettings/profile/education"
            content="Education"
            icon={faBookOpen}
          />
          <NavbarLink
            to="/userSettings/profile/experience"
            content="Experiences"
            icon={faBriefcase}
          />
          <NavbarLink
            to="/userSettings/profile/my-skills"
            content="My Skills"
            icon={faListCheck}
          />
          <NavbarLink
            to="/userSettings/profile/projects"
            content="Projects"
            icon={faFileWord}
          />
          <NavbarLink
            to="/userSettings/profile/certificates"
            content="Certificates"
            icon={faCertificate}
          />
          <NavbarLink
            to="/userSettings/profile/volunteering"
            content="Volunteering"
            icon={faHandshakeAngle}
          />
        </ul>
      </div>
    </>
  );
}

export default ProfileHeader;
