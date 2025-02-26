import CompanyProfileBody from "../components/company profile/CompanyProfileBody";
import CompanyProfileHeader from "../components/company profile/CompanyProfileHeader";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import { useGetBusinessAccountInfoQuery } from "../services/businessAccountApi";
import Loader from "../components/common/Loader";
import { useParams } from "react-router-dom";

function CompanyProfile() {
  const { companyId } = useParams();
  const { data, isLoading, refetch } = useGetBusinessAccountInfoQuery({
    id: companyId || "",
  });
  if (isLoading) return <Loader />;
  return (
    <div className="bg-background">
      <Navbar />
      <CompanyProfileHeader
        refetch={refetch}
        isFollowed={data?.ifFollowedByLoggedInUser ?? null}
        data={data?.business}
      />
      <CompanyProfileBody data={data?.business} id={Number(companyId)} />
      <Footer />
    </div>
  );
}

export default CompanyProfile;
