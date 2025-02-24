import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import { IJob } from "../../interfaces/Job.interfaces";

function EditJobCard({
  job,
  handleJobStatus,
  handleArchiveJob,
}: {
  job: IJob;
  handleJobStatus: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: "Closed" | "Opened",
    id: number,
  ) => void;
  handleArchiveJob: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}) {
  const { companyId } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className={`${job.status === "Opened" ? "border-green-100" : "border-danger-300"} flex cursor-pointer flex-col gap-2 rounded-xl border-2 bg-background p-4 shadow-lg shadow-gray-200 hover:bg-gray-100 hover:bg-opacity-30`}
      onClick={() =>
        navigate(
          `/businessDashboard/companyJobs/${companyId}/jobApplications/${job.id}`,
        )
      }
    >
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-800">
          Job title: {job.title}
        </h3>
        <p className="pl-1 text-sm text-gray-600">
          <span className="font-medium">Job type:</span> {job.location_type}
        </p>
        <p className="pl-1 text-sm text-gray-600">
          <span className="font-medium">No. of Applications:</span>{" "}
          {/* {job.noOfApps} */}2
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          className="border border-main bg-white px-1 py-1 text-xs text-main hover:bg-main hover:text-white"
          onClick={() =>
            navigate(
              `/businessDashboard/companyJobs/${companyId}/jobApplications/${job.id}`,
            )
          }
        >
          Show Applications
        </Button>
        <Button
          onClick={(e) => {
            if (job.status === "Opened") handleJobStatus(e, "Closed", job.id);
            else handleJobStatus(e, "Opened", job.id);
          }}
          className={`border px-3 py-1 text-xs hover:text-white ${
            job.status === "Opened"
              ? "border-danger-300 bg-white text-danger-300 hover:bg-danger-300"
              : "border-green-100 bg-white text-green-100 hover:bg-green-100"
          }`}
        >
          {job.status === "Opened" ? "Set Unavailable" : "Set Available"}
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/businessDashboard/updatejob/${job.id}`);
          }}
          className="border border-main bg-white px-3 py-1 text-xs text-main hover:bg-main hover:text-white"
        >
          Edit
        </Button>
        <Button
          onClick={(e) => handleArchiveJob(e)}
          className="border border-main bg-main px-3 py-1 text-xs text-white hover:bg-white hover:text-main"
        >
          Archive
        </Button>
      </div>
    </div>
  );
}

export default EditJobCard;
