import ApplicationsTable from "./ApplicationsTable";
import { useGetJobApplicationsQuery } from "../../../services/businessDashboardApi";
import { Outlet, useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { IMeta } from "../../../interfaces/BusinessDashboard.interfaces";
import { IError } from "../../../interfaces/Common.interfaces";
import toast from "react-hot-toast";
import { useEffect } from "react";

function JobApplications() {
  const { jobId } = useParams();
  const isJobTrackerRoute = location.pathname.endsWith(`jobTracker`);
  const { data, isLoading, isError, error } = useGetJobApplicationsQuery({
    id: jobId || "",
  });

  const jobApplications = data?.jobApplications.data;
  const meta = data?.jobApplications.meta;

  const errorData = (error as { data?: IError })?.data;

  useEffect(() => {
    let toastId: string | undefined;
    if (isError && errorData) {
      toastId = toast.error(errorData.message);
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isError, errorData]);

  if (isLoading) return <Loader />;

  return (
    <>
      {isJobTrackerRoute ? (
        <Outlet />
      ) : (
        <div className="my-8 flex flex-col items-center gap-3">
          <ApplicationsTable
            applications={jobApplications || []}
            meta={meta || ({} as IMeta)}
          />
        </div>
      )}
    </>
  );
}

export default JobApplications;
