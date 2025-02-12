import { useNavigate } from "react-router-dom";
import ProfileCard from "../common/ProfileCard";

function CertificateCards() {
  const naviagate = useNavigate();

  return (
    <div className="grid grid-cols-2 p-10">
      <ProfileCard
        title="Front-End Development with React"
        startDate="Jan 2022"
        endDate="May 2022"
        handleDelete={() => {}}
        handleEdit={() => naviagate(`/userSettings/profile/certificates/1`)}
      >
        <p>Udemy - React Course (Jonas)</p>
      </ProfileCard>
    </div>
  );
}

export default CertificateCards;
