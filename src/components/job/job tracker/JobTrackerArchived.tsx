import { useGetArchivedJobApplicationQuery } from "../../../services/jobApi";
import JobTrackerItem from "./JobTrackerItem";
import Loader from "../../common/Loader";
import { IJobApplication } from "../../../interfaces/BusinessDashboard.interfaces";
import Navbar from "../../home/Navbar";
import Footer from "../../home/Footer";

function JobTrackerArchived() {
  const { data, isLoading, isError } = useGetArchivedJobApplicationQuery();

  if (isLoading) return <Loader />;
  if (isError || !data || !data.jobApplications)
    return <div>Error loading archived jobs.</div>;

  return (
    <>
      <Navbar />
      <div className="ml-5 mt-4">
        <h2 className="mb-5 text-2xl font-semibold">
          Archived Job Applications
        </h2>
        <div className="space-y-5">
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
        </div>
      </div>
      <Footer />
    </>
  );
}
export default JobTrackerArchived;
