import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import EditJobCardItem from "./EditJobCardItem";
import { IJob } from "../../interfaces/Job.interfaces";
import {
  useMakeJobArchivedMutation,
  useMakeJobClosedMutation,
  useMakeJobOpenedMutation,
} from "../../services/businessDashboardApi";
import Loader from "../common/Loader";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";

function EditJobCard({ job }: { job: IJob }) {
  const { companyId, jobId } = useParams();
  const [makeJobArchived, { isLoading: loadingArchive }] =
    useMakeJobArchivedMutation();
  const [makeJobClosed, { isLoading: loadingClosed }] =
    useMakeJobClosedMutation();
  const [makeJobOpened, { isLoading: loadingOpened }] =
    useMakeJobOpenedMutation();

  const navigate = useNavigate();

  async function handleJobStatus(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: "Delete" | "Archive" | "Open",
  ) {
    e.stopPropagation();
    try {
      let res;
      if (status === "Delete") {
        res = await makeJobClosed({ id: companyId || "" }).unwrap();
      } else if (status === "Archive") {
        res = await makeJobArchived({ id: companyId || "" }).unwrap();
      } else {
        res = await makeJobOpened({ id: companyId || "" }).unwrap();
      }
      toast.success(res?.message || "");
    } catch (err) {
      handleApiError(err);
    }
  }

  if (loadingArchive || loadingClosed || loadingOpened) return <Loader />;

  return (
    <div
      className={`${job.status === "open" ? "border-green-100" : "border-danger-300"} max-w-md cursor-pointer rounded-xl border-2 bg-offWhite p-4 shadow-lg transition-all duration-100 hover:translate-x-1 hover:shadow-gray-400`}
      onClick={() =>
        navigate(
          `/businessDashboard/companyJobs/${companyId}/jobApplications/${jobId}`,
        )
      }
    >
      <h3 className="text-lg font-medium text-gray-800">
        Job title: {job.title}
      </h3>
      <EditJobCardItem title="Location type:" content={job.location_type} />
      <EditJobCardItem title="Location:" content={job.location} />
      <EditJobCardItem title="Salary:" content={job.salary.toString()} />
      <EditJobCardItem title="Skills:" content={job.skills?.join(", ")} />
      <EditJobCardItem title="Employment type:" content={job.employee_type} />
      <EditJobCardItem
        title="Job experience:"
        content={job.experience.toString()}
      />
      <EditJobCardItem title="Key words:" content={job.keywords?.join(", ")} />
      {/* <EditJobCardItem title="Position:" content={job.position} />   {/* ask backend about position */}

      <EditJobCardItem title="Description:" content={job.description} />
      <div className="mt-4 flex justify-between pl-1">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/businessDashboard/updatejob/1");
          }}
          className="border border-main bg-white px-3 text-base text-main hover:bg-main hover:text-white md:text-sm lg:text-base"
        >
          Edit
        </Button>
        <Button
          onClick={(e) => {
            if (job.status === "open") handleJobStatus(e, "Delete");
            else handleJobStatus(e, "Open");
          }}
          className="border border-main bg-white px-1 text-base text-main hover:bg-main hover:text-white md:text-sm lg:text-base"
        >
          {job.status === "open" ? "Set Unavailable" : "Set Available"}
        </Button>
        <Button
          onClick={(e) => handleJobStatus(e, "Archive")}
          className="border border-main bg-white px-1 text-base text-main hover:bg-main hover:text-white md:text-sm lg:text-base"
        >
          Archive
        </Button>
        <Button
          onClick={(e) => handleJobStatus(e, "Delete")}
          className="border border-main bg-white px-1 text-base text-main hover:bg-main hover:text-white md:text-sm lg:text-base"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EditJobCard;
