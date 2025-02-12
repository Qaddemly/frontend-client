import { useNavigate } from "react-router-dom";
import ProfileCard from "../common/ProfileCard";

function ProjectCards() {
  const naviagate = useNavigate();
  return (
    <div className="grid grid-cols-2 p-10">
      <ProfileCard
        title="E-Commerce Website"
        startDate="Jan 2022"
        endDate="May 2022"
        handleDelete={() => {}}
        handleEdit={() => naviagate(`/userSettings/profile/projects/1`)}
      >
        <p>A fully functional e-commerce plat</p>
        <p>Skills: HTML, CSS, JavaScri...</p>
      </ProfileCard>
    </div>
  );
}

export default ProjectCards;
