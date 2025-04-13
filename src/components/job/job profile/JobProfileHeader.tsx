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
  useApplyToJobMutation,
  useGetJobDetailsQuery,
  useSaveJobMutation,
  useUnSaveJobMutation,
} from "../../../services/jobApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetAllResumesQuery } from "../../../services/profileApi";

function JobProfileHeader({ job }: { job: IJob }) {
  const [close, setClose] = useState(false);
  const { jobId } = useParams();
  const [saveJob, { isLoading: loadingSaveJob }] = useSaveJobMutation();
  const [unSaveJob, { isLoading: loadingUnSaveJob }] = useUnSaveJobMutation();
  const { refetch } = useGetJobDetailsQuery({ id: jobId || "" });
  const { data } = useGetAllResumesQuery();
  const [applyToJob, { isLoading: loadingApplyJob }] = useApplyToJobMutation();

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

  async function handleApplyToJob(resumeId: number) {
    try {
      const res = await applyToJob({
        resume_id: resumeId,
        id: jobId || "",
      }).unwrap();
      toast.success(res.message);
      setClose(false);
    } catch (error) {
      handleApiError(error);
    }
  }

  if (loadingSaveJob || loadingUnSaveJob || loadingApplyJob) return <Loader />;
  return (
    <div className="flex w-full flex-col items-center bg-light-secondary py-4">
      <div className="mx-5 flex w-full flex-col items-center justify-evenly gap-2 px-[25rem] py-10 lg:mx-0 lg:items-start">
        <img
          src={job?.business.logo}
          alt={job.title}
          className="mr-4 h-20 w-20 rounded-full"
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
        <div className="flex w-full items-center justify-between px-10 lg:px-0">
          <Button
            className="rounded-lg px-6 py-3 text-xl text-white"
            onClick={() => setClose(true)}
          >
            Easy Apply <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
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

        {close && (data?.resumes?.length || 0) === 0 && (
          <p className="w-[20rem] rounded-md bg-[#eee] p-5 text-gray-500">
            You currently have no resumes uploaded. Please add a resume to apply
            for jobs.
          </p>
        )}

        {close && (data?.resumes?.length || 0) > 0 && (
          <div className="min-h-50 w-[20rem] rounded-md bg-[#eee] p-5 shadow-lg">
            <p className="text-gray-300">Choose resume</p>
            {data?.resumes.map((resume) => (
              <>
                <div
                  className="cursor-pointer rounded-md px-1 py-2 hover:bg-gray-200"
                  onClick={() => handleApplyToJob(resume.id)}
                >
                  {resume.name}
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobProfileHeader;
