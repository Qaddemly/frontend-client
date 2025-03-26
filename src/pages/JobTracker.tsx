import { useGetUserJobApplicationsQuery } from "../services/jobApi";
import Loader from "../components/common/Loader";
import JobTrackerItem from "../components/job/job tracker/JobTrackerItem";
import JobTrackerLayout from "../layout/JobTrackerLayout.tsx";

function JobTracker() {
  const { data, isLoading } = useGetUserJobApplicationsQuery({});

  if (isLoading) return <Loader />;

  return (
    <JobTrackerLayout>
      {data?.jobApplications.data.length === 0 && (
        <p className="py-5 italic text-gray-400">No job applications</p>
      )}
      {data?.jobApplications.data.map((jobApplication) => (
        <JobTrackerItem
          key={jobApplication.id}
          jobApplication={{ ...jobApplication, archived: false }}
          userType="user"
        />
      ))}
    </JobTrackerLayout>
  );
}

export default JobTracker;
