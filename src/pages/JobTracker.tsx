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
import { IGetArchivedJobApplication } from "../interfaces/Job.interfaces";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/helpers";

function JobTracker({ job }: { job: IGetArchivedJobApplication }) {
  const { data, isLoading } = useGetUserJobApplicationsQuery({});
  const [archive, setArchive] = useState(false);
  const { refetch } = useGetArchivedJobApplicationQuery();
  const [getarchive, { isLoading: isLoading1 }] =
    useArchiveJobApplicationMutation();
  async function handleArchive() {
    try {
      await getarchive({
        id: job.id?.toString(),
        archive: job.is_archived,
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
            <div className="flex items-center justify-between gap-4 rounded-lg bg-white p-5 shadow-md">
              <JobTrackerItem
                key={jobApplication.id}
                archive={true}
                jobApplication={jobApplication}
                userType="user"
              />
              <Button
                onClick={handleArchive}
                className="rounded-md bg-main px-4 py-2 text-white shadow-md transition-all duration-300 hover:border hover:bg-white hover:text-main hover:outline-1"
              >
                Archive
              </Button>
            </div>
          </>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default JobTracker;
