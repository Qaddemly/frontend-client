import { Outlet, useParams } from "react-router-dom";
import ApplicationsTable from "./ApplicationsTable";

function JobApplications() {
  const { companyId, jobId } = useParams();
  const isJobTrackerRoute = location.pathname.includes(
    `/businessDashboard/companyJobs/${companyId}/active/jobApplications/${jobId}/jobTracker`,
  );

  return (
    <>
      {isJobTrackerRoute ? (
        <Outlet />
      ) : (
        <div className="my-8 flex flex-col items-center gap-3">
          <ApplicationsTable />
        </div>
      )}
    </>
  );
}

export default JobApplications;
