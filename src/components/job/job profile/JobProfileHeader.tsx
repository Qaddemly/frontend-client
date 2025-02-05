import {
  faArrowUpRightFromSquare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../common/Button";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { IJob } from "../../../interfaces/Job.interfaces";
import { formatDate, handleApiError } from "../../../utils/helpers";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";
import {
  useGetJobDetailsQuery,
  useSaveJobMutation,
  useUnSaveJobMutation,
} from "../../../services/jobApi";
import { useParams } from "react-router-dom";

function JobProfileHeader({ job }: { job: IJob }) {
  const { jobId } = useParams();
  const [saveJob, { isLoading: loadingSaveJob }] = useSaveJobMutation();
  const [unSaveJob, { isLoading: loadingUnSaveJob }] = useUnSaveJobMutation();
  const { refetch } = useGetJobDetailsQuery({ id: jobId || "" });

  async function handleSaveJob(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    try {
      const res = await saveJob({ id: job.id.toString() }).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleUnSaveJob(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    try {
      const res = await unSaveJob({ id: job.id.toString() }).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  }

  if (loadingSaveJob || loadingUnSaveJob) return <Loader />;
  return (
    <div className="flex w-full flex-col items-center bg-light-secondary py-4">
      <div className="mx-5 flex w-full max-w-[1000px] flex-col items-center justify-evenly gap-2 lg:mx-0 lg:items-start">
        <img
          src={job?.business.logo}
          alt={job.title}
          className="mr-4 h-8 w-8"
        />
        <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row lg:gap-0">
          <h2 className="text-center text-4xl font-bold md:text-left md:text-5xl">
            {job?.title}
          </h2>
          <p className="text-base text-gray-500">
            Updated {formatDate(job.updated_at)}
          </p>
        </div>
        <div className="flex w-fit flex-row items-center gap-1 text-lg">
          <a href={job?.business.website} target="_blank" className="underline">
            {job?.business.name}
          </a>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-sm"
          />
          {/* ask backend about rating */}
          {/* <p className="ml-2">{job.business.rating}</p> */}
          {/* <FontAwesomeIcon icon={faStar} /> */}
        </div>
        <div className="flex w-full items-center justify-between">
          <Button className="rounded-lg px-6 py-3 text-xl text-white">
            Apply Now <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Button>
          {!job?.isSaved ? (
            <button onClick={(e) => handleSaveJob(e)}>
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-2xl text-gray-300 transition-colors duration-100 hover:text-main"
              />
            </button>
          ) : (
            <button onClick={(e) => handleUnSaveJob(e)}>
              <FontAwesomeIcon
                icon={faBookmarkSolid}
                className="text-2xl text-yellow"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobProfileHeader;
