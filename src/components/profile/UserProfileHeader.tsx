import {
  faBookOpen,
  faBriefcase,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NavbarLink from "../common/NavbarLink";

function UserProfileHeader() {
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
        </ul>
      </div>
    </>
  );
}

export default UserProfileHeader;
