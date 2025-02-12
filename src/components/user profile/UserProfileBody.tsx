import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import UserProfileSection from "./UserProfileSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function UserProfileBody({ user }: { user: IUser }) {
function UserProfileBody() {
  return (
    <div className="border-r-2 border-[#eee]">
      {/* About me Section */}
      <div className="border-b-2 border-[#eee] px-32 py-10">
        <p className="mb-5 text-xl font-semibold">About me</p>
        <p>
          I'm just a normal person. I try to live my life simply. I've never
          been someone who talks a lot; I prefer to prove myself on the
          field.Talent alone is not enough; you have to work hard to be the best
        </p>
      </div>

      {/* Education Section */}
      <div className="border-b-2 border-[#eee] px-32 py-10">
        <p className="mb-5 text-xl font-semibold">Education</p>
        <UserProfileSection
          title="Barcelona University"
          startDate="1988"
          endDate="2003"
        >
          <p>Bachelor's degree, Football controlling</p>
          <p>Grade: Non-measurable</p>
        </UserProfileSection>
        <UserProfileSection
          title="Barcelona University"
          startDate="1988"
          endDate="2003"
        >
          <p>Bachelor's degree, Football controlling</p>
          <p>Grade: Non-measurable</p>
        </UserProfileSection>
      </div>

      {/* Project Section */}
      <div className="border-b-2 border-[#eee] px-32 py-10">
        <p className="mb-5 text-xl font-semibold">Projects</p>
        <UserProfileSection
          title="E-Commerce Website"
          startDate="Jan 2022"
          endDate="May 2022"
        >
          <p>
            A fully functional e-commerce platform with authentication, cart
            management, and product filtering Associated with: Self-Learning
            Skills: HTML, CSS, JavaScript
          </p>
        </UserProfileSection>
        <UserProfileSection
          title="Guess the Word Game"
          startDate="Nov 2024"
          endDate="Dec 2024"
        >
          <p>
            A fully functional e-commerce platform with authentication, cart
            management, and product filtering Associated with: JSAcademy Skills:
            TailwindCSS, React
          </p>
        </UserProfileSection>
      </div>

      {/* Volunteering Section */}
      <div className="border-b-2 border-[#eee] px-32 py-10">
        <p className="mb-5 text-xl font-semibold">Volunteering</p>
        <UserProfileSection
          title="HR Member & OC at GDSC"
          startDate="2024"
          endDate="Present"
        >
          <p>
            Organizing events and managing HR activities for Google Developer
            Student Clubs.
          </p>
        </UserProfileSection>
      </div>

      {/* Certificates Section */}
      <div className="border-b-2 border-[#eee] px-32 py-10">
        <p className="mb-5 text-xl font-semibold">Certificates</p>
        <UserProfileSection
          title="Front-End Development with React"
          startDate="2024"
          endDate="Present"
        >
          <p>Udemy - React Course (Jonas)</p>
          <p className="text-gray-500 underline">
            See the certificate
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </p>
        </UserProfileSection>
      </div>
    </div>
  );
}

export default UserProfileBody;
