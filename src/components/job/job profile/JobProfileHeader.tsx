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
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetAllResumesQuery } from "../../../services/profileApi";
import BackButton from "../../common/BackButton";

function JobProfileHeader({ job }: { job: IJob }) {
  const { jobId } = useParams();
  const [saveJob, { isLoading: loadingSaveJob }] = useSaveJobMutation();
  const [unSaveJob, { isLoading: loadingUnSaveJob }] = useUnSaveJobMutation();
  const { refetch } = useGetJobDetailsQuery({ id: jobId || "" });
  const navigate = useNavigate();

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
      <BackButton />
      <div className="mx-5 flex w-full flex-col items-center justify-evenly gap-2 px-5 py-10 sm:px-20 md:mx-0 md:items-start md:px-52 lg:px-[15rem] xl:px-[25rem]">
        <div className="flex w-full items-center justify-center md:justify-start">
          <img
            src={job?.business.logo}
            alt={job.title}
            className="mr-4 h-20 w-20 rounded-full"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
          <h2 className="text-center text-4xl font-bold md:text-left lg:text-5xl">
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
        <div className="flex w-full items-center justify-evenly md:justify-between">
          {job.has_extra_link_application ? (
            <a
              className="rounded-lg bg-main px-6 py-3 text-xl text-white"
              target="_blank"
              href={job.extra_application_link}
            >
              Apply Now <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          ) : (
            <Button
              className="rounded-lg px-6 py-3 text-xl text-white"
              onClick={() => navigate(`/apply/custom/${job.id}`)}
            >
              Apply Now <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Button>
          )}
          {!job?.isSaved ? (
            <button onClick={(e) => handleSaveJob(e)}>
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-3xl text-gray-300 transition-colors duration-100 hover:text-main"
              />
            </button>
          ) : (
            <button onClick={(e) => handleUnSaveJob(e)}>
              <FontAwesomeIcon
                icon={faBookmarkSolid}
                className="text-3xl text-yellow"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobProfileHeader;
