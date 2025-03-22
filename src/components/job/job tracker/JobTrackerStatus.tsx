import React from "react";
import { JobApplicationState } from "../../../enums/index.enums";
import { useArchiveJobApplicationMutation } from "../../../services/jobApi"; // API service

interface JobTrackerStatusProps {
  setShowConfirm: (s: boolean) => void;
  userType: "business" | "user";
  currentIndex: number;
  setCurrentIndex: (s: number) => void;
  jobApplicationId: string;
}

const JobTrackerStatus: React.FC<JobTrackerStatusProps> = ({
  userType,
  setShowConfirm,
  currentIndex,
  setCurrentIndex,
  jobApplicationId,
}) => {
  const stages = Object.values(JobApplicationState);
  const [archiveJobApplication] = useArchiveJobApplicationMutation();

  const handleChangeStatus = async (index: number) => {
    if (index >= 0 && index < stages.length) {
      try {
        if (index === stages.length - 1) {
          await archiveJobApplication({
            id: jobApplicationId,
            archive: true,
          }).unwrap();
        }

        setCurrentIndex(index);
        setShowConfirm(true);
      } catch (error) {
        console.error("Failed to archive status:", error);
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full justify-between text-xs text-gray-700">
        {stages.map((stage) => (
          <span key={stage}>{stage}</span>
        ))}
      </div>

      <div className="mt-2 flex w-full">
        {stages.map((stage, index) => (
          <div
            key={stage}
            className={`flex ${index === stages.length - 1 ? "" : "w-full"} items-center`}
          >
            <div
              onClick={() => {
                if (userType === "business") handleChangeStatus(index);
              }}
              className={`flex cursor-pointer rounded-full p-3 transition-all duration-200 ${
                currentIndex === stages.length - 1 &&
                index === stages.length - 1
                  ? "bg-danger-300"
                  : index <= currentIndex
                    ? "bg-green-400"
                    : "bg-gray-200"
              }`}
            ></div>

            {index < stages.length - 1 && (
              <div
                className={`h-2 w-full ${
                  index < currentIndex ? "bg-green-400" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default JobTrackerStatus;
