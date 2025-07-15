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
import { useArchiveJobApplicationMutation } from "../../../services/jobApi";

type JobTrackerItemProps = {
  userType: "business" | "user";
  jobApplication?: IJobApplication & { archived?: boolean };
};

type ArchiveButtonProps = {
  jobId: string;
  isArchived: boolean;
};

function JobTrackerItem({ userType, jobApplication }: JobTrackerItemProps) {
  const { jobId } = useParams();

  const key = jobApplication?.job_application_state
    ?.state as keyof typeof JobApplicationStateIndex;
  const stateValue = key ? JobApplicationStateIndex[key] : undefined;
  const stateKey = stateValue
    ? (
        Object.keys(JobApplicationStateIndex) as Array<
          keyof typeof JobApplicationStateIndex
        >
      ).find((k) => JobApplicationStateIndex[k] === stateValue)
    : undefined;

  const currentIndexValue = stateKey ? parseInt(stateValue as string, 10) : 0;
  const [currentIndex, setCurrentIndex] = useState<number>(currentIndexValue);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const ArchiveButton: React.FC<ArchiveButtonProps> = ({
    jobId,
    isArchived,
  }) => {
    const [archiveJobApplication] = useArchiveJobApplicationMutation();

    const handleArchive = async () => {
      try {
        await archiveJobApplication({
          id: jobId,
          archive: !isArchived,
        }).unwrap();
        toast.success(
          isArchived
            ? "Job unarchived successfully"
            : "Job archived successfully",
        );
      } catch (error) {
        handleApiError(error);
      }
    };

    return (
      <Button onClick={handleArchive} className="flex justify-center px-2">
        {isArchived ? "Unarchive" : "Archive"}
      </Button>
    );
  };

  const { data } = useGetBusinessAccountInfoQuery({
    id: jobApplication?.id.toString() || "",
  });

  if (isLoading1) return <Loader />;

  return (
    <div className="mt-4 flex items-center gap-5 rounded-md bg-white p-5 shadow-md">
      <div className="flex w-full gap-5">
        <div className="w-fit rounded-md bg-gray-200 p-5">
          {userType === "user" ? (
            <GoogleLogo className="h-12 w-12" />
          ) : (
            <FontAwesomeIcon icon={faUser} className="text-5xl" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          {userType === "user" ? (
            <>
              {/*<div className="text-lg font-semibold">*/}
              {/*  {jobApplication?.job?.title}*/}
              {/*</div>*/}
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
                {jobApplication?.first_name} {jobApplication?.last_name}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{jobApplication?.email}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faPhone} />
                <p>
                  +{jobApplication?.phone.country_code}{" "}
                  {jobApplication?.phone.number}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <JobTrackerStatus
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        userType={userType}
        setShowConfirm={setShowConfirm}
        jobApplicationId={jobApplication?.id.toString() || ""}
      />

      <div>
        {userType === "user" && jobApplication ? (
          <ArchiveButton
            jobId={jobApplication?.id.toString()}
            isArchived={jobApplication?.archived || false}
          />
        ) : (
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
