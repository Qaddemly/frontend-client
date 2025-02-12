import { useNavigate } from "react-router-dom";
import ProfileCard from "../common/ProfileCard";

function VolunteeringCards() {
  const naviagate = useNavigate();
  return (
    <div className="grid grid-cols-2 p-10">
      <ProfileCard
        title="HR & OC Member"
        startDate="Jan 2022"
        endDate="Present"
        handleDelete={() => {}}
        handleEdit={() => naviagate(`/userSettings/profile/volunteering/1`)}
      >
        <p>Organizing events and managing H...</p>
      </ProfileCard>
    </div>
  );
}

export default VolunteeringCards;
