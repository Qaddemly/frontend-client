import { useGetArchivedJobApplicationQuery } from "../../../services/jobApi";
import Loader from "../../common/Loader";
import Footer from "../../home/Footer";
import Navbar from "../../home/Navbar";
import JobTrackerHeader from "./JobTrackerHeader";
import JobTrackerItem from "./JobTrackerItem";

function JobTrackerArchived() {
  const { data, isLoading } = useGetArchivedJobApplicationQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-20">
        <JobTrackerHeader userType="user" />
        <div className="mt-6 space-y-4">
          {data?.jobApplications.length ? (
            data.jobApplications.map((jobApplication) => (
              <JobTrackerItem
                key={jobApplication.id}
                userType="user"
                jobApplication={{ ...jobApplication, archived: true }}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No archived job applications found.
            </p>
          )}
        </div>
        {/* <JobTrackerItem userType="user" archive={false} /> */}
      </div>
      <Footer />
    </>
  );
}

export default JobTrackerArchived;
