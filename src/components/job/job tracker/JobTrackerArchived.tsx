import { useGetArchivedJobApplicationQuery } from "../../../services/jobApi";
import JobTrackerItem from "./JobTrackerItem";
import Loader from "../../common/Loader";
import { IJobApplication } from "../../../interfaces/BusinessDashboard.interfaces";
import JobTrackerLayout from "../../../layout/JobTrackerLayout.tsx";

function JobTrackerArchived() {
  const { data, isLoading, isError } = useGetArchivedJobApplicationQuery();

  if (isLoading) return <Loader />;
  if (isError || !data || !data.jobApplications)
    return <div>Error loading archived jobs.</div>;

  return (
    <JobTrackerLayout>
      {data?.jobApplications?.length === 0 ? (
        <p>No archived job applications available.</p>
      ) : (
        data?.jobApplications?.map((jobApplication: IJobApplication) => (
          <JobTrackerItem
            key={jobApplication.id}
            userType="user"
            jobApplication={jobApplication}
          />
        ))
      )}
    </JobTrackerLayout>
  );
}
export default JobTrackerArchived;
