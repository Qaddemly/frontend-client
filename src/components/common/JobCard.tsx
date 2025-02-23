import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "./GoogleLogo";
import {
  // faBookmark as faBookmarkSolid,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { IJob } from "../../interfaces/Job.interfaces";

function JobCard({ job }: { job: IJob }) {
  const navigate = useNavigate();
  // ask backend to put isSaved in getAlljobs api
  // const savedJobs = useSelector((state: RootState) => state.user.savedJobs);
  // const isSavedJob = savedJobs?.some((j) => job.id === j.id);

  // const [saveJob, { isLoading: loadingSaveJob }] = useSaveJobMutation();
  // const [unSaveJob, { isLoading: loadingUnSaveJob }] = useUnSaveJobMutation();

  // async function handleSaveJob(
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) {
  //   e.stopPropagation();
  //   try {
  //     const res = await saveJob({ id: job.id.toString() }).unwrap();
  //     toast.success(res.message);
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  // }

  // async function handleUnSaveJob(
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) {
  //   e.stopPropagation();
  //   try {
  //     const res = await unSaveJob({ id: job.id.toString() }).unwrap();
  //     toast.success(res.message);
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  // }

  // if (loadingSaveJob || loadingUnSaveJob) return <Loader />;
  return (
    <div
      className="cursor-pointer rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg"
      onClick={() => navigate(`/findJob/jobProfile/${job?.id}`)}
    >
      <h3 className="my-2 text-lg font-medium">{job?.title}</h3>
      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          <span
            className={`rounded-md bg-light-green px-1 text-sm font-medium text-green-100`}
          >
            {job?.employee_type.toUpperCase()}
          </span>
          <span className="block text-sm text-gray-600">
            Salary: {job?.salary}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <div className="w-fit rounded-md bg-[#eee] p-2">
              <GoogleLogo />
              {/*companyLogo} */}
            </div>
            <div className="felx flex-col">
              <p className="text-base font-medium">{job?.business.name}</p>
              <div className="flex items-center gap-2 text-gray-300">
                <FontAwesomeIcon //location icon
                  icon={faLocationDot}
                />
                <p className="text-sm">
                  {job?.business.address.country} {job?.business.address.city}
                </p>
              </div>
            </div>
          </div>
          {/* {isSavedJob === undefined ? (
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
          )} */}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
