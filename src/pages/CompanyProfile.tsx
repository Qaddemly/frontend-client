import CompanyProfileBody from "../components/company profile/CompanyProfileBody";
import CompanyProfileHeader from "../components/company profile/CompanyProfileHeader";
import { useGetBusinessAccountInfoQuery } from "../services/businessAccountApi";
import Loader from "../components/common/Loader";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

function CompanyProfile() {
  const { companyId } = useParams();
  const { data, isLoading, refetch } = useGetBusinessAccountInfoQuery({
    id: companyId || "",
  });
  if (isLoading) return <Loader />;
  return (
    <div className="bg-background">
      <MainLayout>
        <CompanyProfileHeader
          refetch={refetch}
          isFollowed={data?.ifFollowedByLoggedInUser ?? null}
          data={data?.business}
        />
        <CompanyProfileBody data={data?.business} id={Number(companyId)} />
      </MainLayout>
    </div>
  );
}

export default CompanyProfile;
