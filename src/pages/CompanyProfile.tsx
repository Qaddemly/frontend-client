import CompanyProfileBody from "../components/common/CompanyProfileBody";
import Profile from "../components/common/Profile";
import Navbar from "../components/home/Navbar";

function CompanyProfile() {
  return (
    <div className="bg-background">
      <Navbar />
      <Profile name="Google Inc." rating={4.8} numberOfReviews={25} />
      <CompanyProfileBody />
    </div>
  );
}

export default CompanyProfile;
