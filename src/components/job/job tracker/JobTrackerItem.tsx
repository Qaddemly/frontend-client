import {
  faBuilding,
  faEnvelope,
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "../../common/GoogleLogo";
import Button from "../../common/Button";
import JobTrackerStatus from "./JobTrackerStatus";
import { useState } from "react";
import Loader from "../../common/Loader";
import { handleApiError } from "../../../utils/helpers";
import toast from "react-hot-toast";
import { IJobApplication } from "../../../interfaces/BusinessDashboard.interfaces";
import { useUpdateJobApplicationStatusMutation } from "../../../services/businessDashboardApi";
import { useParams } from "react-router-dom";
import {
  JobApplicationState,
  JobApplicationStateIndex,
} from "../../../enums/index.enums";
import { useGetBusinessAccountInfoQuery } from "../../../services/businessAccountApi";

type JobTrackerItemProps = {
  userType: "business" | "user";
  archive?: boolean;
  jobApplication?: IJobApplication;
};

function JobTrackerItem({
  userType,
  // archive,
  jobApplication,
}: JobTrackerItemProps) {
  const { jobId } = useParams();
  //////////////////////////// For Business ///////////////////////////

  const key = jobApplication?.job_application_state
    .state as keyof typeof JobApplicationStateIndex;
  const stateValue = key ? JobApplicationStateIndex[key] : undefined;
  const stateKey = stateValue
    ? (
        Object.keys(JobApplicationStateIndex) as Array<
          keyof typeof JobApplicationStateIndex
        >
      ).find((k) => JobApplicationStateIndex[k] === stateValue)
    : undefined;

  // Convert stateKey to an index number
  const currentIndexValue = stateKey ? parseInt(stateValue as string, 10) : 0;
  const [currentIndex, setCurrentIndex] = useState<number>(currentIndexValue);

  const [showConfirm, setShowConfirm] = useState(false);
  const user = jobApplication?.account;
  const [updateJobApplicationStatus, { isLoading: isLoading1 }] =
    useUpdateJobApplicationStatusMutation();

  async function handleUpdateJobApplicationStatus() {
    setShowConfirm(false);
    const status = Object.values(JobApplicationState)[currentIndex];
    try {
      const res = await updateJobApplicationStatus({
        jobId: jobId || "",
        applicationId: jobApplication?.id.toString() || "",
        status,
      }).unwrap();
      toast.success(res.message);
    } catch (error) {
      handleApiError(error);
    }
  }

  //////////////////////////// For User ///////////////////////////
  // const [archiveJobApplication, { isLoading: isLoading2 }] =
  //   useArchiveJobApplicationMutation();

  // async function handleArchiveJobApplication() {
  //   try {
  //     await archiveJobApplication({ id: "1", archive: true }).unwrap();
  //     toast.success("Job application archived successfully");
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  // }

  // useEffect(() => {
  //   businessesAccounts.userBusinessesAccounts.map((business) => {
  //     console.log(business.id);
  //     console.log(jobApplication?.job.business_id);

  //     if (jobApplication?.job.business_id === business.id)
  //       setCurrentBusinessId(business.id.toString());
  //   });
  // }, [businessesAccounts.userBusinessesAccounts, jobApplication]);
  const { data } = useGetBusinessAccountInfoQuery({
    id: jobApplication?.job.business_id.toString() || "",
  });

  if (isLoading1) return <Loader />;

  return (
    <div className="mt-4 flex items-center gap-5 rounded-md bg-white p-5 shadow-md">
      <div className="flex w-full gap-5">
        <div className="w-fit rounded-md bg-gray-200 p-5">
          {userType === "user" ? (
            <GoogleLogo className="h-12 w-12" />
          ) : user?.profile_picture ? (
            <img
              src={user.profile_picture}
              alt="profile photo"
              className="h-20 w-20 rounded-md object-cover"
            />
          ) : (
            <FontAwesomeIcon icon={faUser} className="text-5xl" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          {userType === "user" ? (
            <>
              <div className="text-lg font-semibold">
                {jobApplication?.job.title}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faBuilding} />
                <p>{data?.business.name}.</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{data?.business.location_type}</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{user?.email}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faPhone} />
                <p>
                  +{user?.phone.country_code} {user?.phone.number}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <JobTrackerStatus
        currentIndex={userType === "user" ? currentIndex - 1 : currentIndex}
        setCurrentIndex={setCurrentIndex}
        userType={userType}
        setShowConfirm={setShowConfirm}
      />

      <div>
        {userType === "user" ? (
          <></>
        ) : (
          // <Button onClick={handleArchiveJobApplication} className="px-3">
          //   {archive ? "Archive" : "Unarchive"}
          // </Button>
          showConfirm && (
            <Button onClick={handleUpdateJobApplicationStatus} className="px-3">
              Confirm
            </Button>
          )
        )}
      </div>
    </div>
  );
}

export default JobTrackerItem;
