import React from "react";
import { JobApplicationState } from "../../../enums/index.enums";
import { useArchiveJobApplicationMutation } from "../../../services/jobApi";

interface JobTrackerStatusProps {
  setShowConfirm: (flag: boolean) => void;
  userType: "business" | "user";
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
  jobApplicationId: string;
}

const JobTrackerStatus: React.FC<JobTrackerStatusProps> = ({
  userType,
  setShowConfirm,
  currentIndex,
  setCurrentIndex,
  jobApplicationId,
}) => {
  const stages = React.useMemo(
    () =>
      Object.values(JobApplicationState).filter(
        (v) => isNaN(Number(v)) && v !== JobApplicationState.ARCHIVED,
      ) as JobApplicationState[],
    [],
  );

  const [archiveJobApplication] = useArchiveJobApplicationMutation();

  const handleChangeStatus = async (idx: number) => {
    if (idx < 0 || idx >= stages.length) return;

    // archive only when last visible stage clicked
    const isLast = idx === stages.length - 1;

    try {
      if (isLast && userType === "business") {
        await archiveJobApplication({
          id: jobApplicationId,
          archive: true,
        }).unwrap();
      }
      setCurrentIndex(idx);
      setShowConfirm(true);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  console.log(stages.length, currentIndex);
  const circleStyle = (idx: number): string => {
    const isLast = idx === stages.length - 1;

    if (isLast) return "bg-danger-300";
    if (idx <= currentIndex) return "bg-green-100";
    return "bg-gray-100";
  };

  return (
    <div className="flex w-full flex-col">
      {/* stage labels */}
      <div className="flex gap-10 text-xs text-gray-700">
        {stages.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>

      {/* progress bar */}
      <div className="mt-2 flex w-full items-center">
        {stages.map((_, idx) => (
          <div key={idx} className="flex w-full items-center">
            {/* status circle */}
            <button
              type="button"
              disabled={userType !== "business"}
              onClick={() => handleChangeStatus(idx)}
              className={`h-4 w-4 rounded-full transition ${circleStyle(idx)}`}
            />
            {/* connecting line (skip after last) */}
            {idx < stages.length - 1 && (
              <div
                className={`h-1 flex-1 ${
                  idx < currentIndex ? "bg-green-100" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* timestamp */}
      <span className="mt-2 text-sm text-gray-500">
        {new Date().toLocaleDateString()}
      </span>
    </div>
  );
};

export default JobTrackerStatus;
