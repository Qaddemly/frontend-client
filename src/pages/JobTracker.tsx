import Navbar from "../components/home/Navbar";
import JobTrackerHeader from "../components/job/job tracker/JobTrackerHeader";
import Footer from "../components/home/Footer";
import { useGetUserJobApplicationsQuery } from "../services/jobApi";
import Loader from "../components/common/Loader";
import JobTrackerItem from "../components/job/job tracker/JobTrackerItem";

function JobTracker() {
  const { data, isLoading } = useGetUserJobApplicationsQuery({});

  if (isLoading) return <Loader />;
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-20">
        <JobTrackerHeader userType="user" />
        {data?.jobApplications.data.length === 0 && (
          <p className="py-5 italic text-gray-400">No job applications</p>
        )}
        {data?.jobApplications.data.map((jobApplication) => (
          <JobTrackerItem
            key={jobApplication.id}
            archive={true}
            jobApplication={jobApplication}
            userType="user"
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default JobTracker;
