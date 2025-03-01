import Navbar from "../components/home/Navbar";
import JobTrackerHeader from "../components/job/job tracker/JobTrackerHeader";
import Footer from "../components/home/Footer";
import {
  useArchiveJobApplicationMutation,
  useGetArchivedJobApplicationQuery,
  useGetUserJobApplicationsQuery,
} from "../services/jobApi";
import Loader from "../components/common/Loader";
import JobTrackerItem from "../components/job/job tracker/JobTrackerItem";
import Button from "../components/common/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/helpers";

function JobTracker() {
  const { data, isLoading } = useGetUserJobApplicationsQuery({});
  const [archive, setArchive] = useState(false);
  const { refetch } = useGetArchivedJobApplicationQuery();
  const [getarchive, { isLoading: isLoading1 }] =
    useArchiveJobApplicationMutation();
  async function handleArchive(jobId: string) {
    try {
      await getarchive({
        id: jobId.toString(),
        archive: true,
      }).unwrap();
      setArchive(false);
      refetch();
      toast.success("This job is archived successfully");
    } catch (err) {
      setArchive(false);
      handleApiError(err);
    }
  }
  console.log(archive);
  if (isLoading || isLoading1) return <Loader />;
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-20">
        <JobTrackerHeader userType="user" />
        {data?.jobApplications.data.length === 0 && (
          <p className="py-5 italic text-gray-400">No job applications</p>
        )}
        {data?.jobApplications.data.map((jobApplication) => (
          <>
            <JobTrackerItem
              key={jobApplication.id}
              archive={true}
              jobApplication={jobApplication}
              userType="user"
            />
            <Button
              onClick={() => handleArchive(jobApplication.job.id.toString())}
            >
              Archive
            </Button>
          </>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default JobTracker;
