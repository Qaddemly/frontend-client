import CompanyProfileBody from "../components/company profile/CompanyProfileBody";
import CompanyProfileHeader from "../components/company profile/CompanyProfileHeader";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import { useGetBusinessAccountInfoQuery } from "../services/businessAccountApi";
import Loader from "../components/common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function CompanyProfile() {
  const { businessAccount } = useSelector(
    (state: RootState) => state.businessAccount,
  );
  const { data, isLoading } = useGetBusinessAccountInfoQuery({
    id: businessAccount.id.toString(),
  });

  if (isLoading) return <Loader />;
  return (
    <div className="bg-background">
      {/* {data?.status === "fail" && toast.error("There is an Error")} */}
      <Navbar />
      <CompanyProfileHeader data={data?.business} />
      <CompanyProfileBody
        data={data?.business}
        id={Number(businessAccount.id)}
      />
      <Footer />
    </div>
  );
}

export default CompanyProfile;
