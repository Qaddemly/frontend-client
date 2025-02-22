import { useParams } from "react-router-dom";
import JobTrackerHeader from "./JobTrackerHeader";
import JobTrackerItem from "./JobTrackerItem";
import { useGetJobApplicationsQuery } from "../../../services/businessDashboardApi";
import Loader from "../../common/Loader";

function JobTrackerBusiness() {
  const { jobId } = useParams();
  const { data, isLoading } = useGetJobApplicationsQuery({
    id: jobId || "",
  });
  const jobApplication = data?.jobApplications.data;

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen bg-[#eee] p-10">
      <JobTrackerHeader
        userType="business"
        businessJobApplicationsLength={jobApplication?.length}
      />
      {jobApplication?.map((jobApplication) => (
        <JobTrackerItem userType="business" jobApplication={jobApplication} />
      ))}
    </div>
  );
}

export default JobTrackerBusiness;
