import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApplicationsTable from "./ApplicationsTable";
import { useGetJobApplicationsQuery } from "../../../services/businessDashboardApi";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { IMeta } from "../../../interfaces/BusinessDashboard.interfaces";
import { IError } from "../../../interfaces/Common.interfaces";
import toast from "react-hot-toast";
import { useEffect } from "react";

function JobApplications() {
  const { jobId } = useParams();
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
    <div className="my-8 flex flex-col items-center gap-3">
      <h2 className="text-center text-4xl font-bold">
        Senior UX designer - Full time
      </h2>
      <div className="flex w-fit flex-row rounded-lg bg-white p-5 shadow-md">
        <div className="flex items-center rounded-full bg-light-secondary p-4 text-center text-4xl text-main">
          <FontAwesomeIcon icon={faUsers} />
        </div>
        <div className="ml-4 flex flex-col">
          <p className="text-md text-gray-500">Total Applications</p>
          <p className="text-3xl font-bold">{jobApplications?.length}</p>
          <p>
            <span className="font-medium text-yellow">↑ 16%</span> this month
            {/* TODO: remove or evaluate */}
          </p>
        </div>
      </div>
      <ApplicationsTable
        applications={jobApplications || []}
        meta={meta || ({} as IMeta)}
      />
    </div>
  );
}

export default JobApplications;
