import CompanyProfileBody from "../components/company profile/CompanyProfileBody";
import CompanyProfileHeader from "../components/company profile/CompanyProfileHeader";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";

function CompanyProfile() {
  return (
    <div className="bg-background">
      <Navbar />
      <CompanyProfileHeader
        name="Google Inc."
        rating={4.8}
        numberOfReviews={25}
      />
      <CompanyProfileBody />
      <Footer />
    </div>
  );
}

export default CompanyProfile;
