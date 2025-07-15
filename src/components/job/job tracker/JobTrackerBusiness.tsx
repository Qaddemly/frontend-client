import JobTrackerHeader from "./JobTrackerHeader";
import JobTrackerItem from "./JobTrackerItem";
import { useLazyGetJobApplicationsQuery } from "../../../services/businessDashboardApi";
import Loader from "../../common/Loader";
import { useParams } from "react-router-dom";
import { IJobApplicationState } from "../../../interfaces/BusinessDashboard.interfaces";

function JobTrackerBusiness() {
  const { jobId } = useParams();
  const [fetchApplications, { data, isLoading }] =
    useLazyGetJobApplicationsQuery();
  const jobApplications = data?.jobApplications.data;
  const currentStateJob: IJobApplicationState | undefined =
    jobApplications?.find(
      (application) =>
        application?.job_application_state?.job_id?.toString() === jobId,
    )?.job_application_state;

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen bg-[#eee] p-10">
      <JobTrackerHeader
        currentState={currentStateJob?.state || ""}
        fetchApplications={fetchApplications}
        userType="business"
        businessJobApplicationsLength={jobApplications?.length}
      />
      {jobApplications?.length === 0 && (
        <p className="mt-5 italic text-gray-300">No job applications</p>
      )}
      {jobApplications?.map((jobApplication) => (
        <JobTrackerItem userType="business" jobApplication={jobApplication} />
      ))}
    </div>
  );
}

export default JobTrackerBusiness;
