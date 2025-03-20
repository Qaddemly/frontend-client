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
  const stages = Object.values(JobApplicationState); // Enum values for stages
  const [archiveJobApplication] = useArchiveJobApplicationMutation(); // API hook to archive job

  // Handles archiving the job application when clicking on a stage
  const handleChangeStatus = async (index: number) => {
    if (index >= 0 && index < stages.length) {
      try {
        if (index === stages.length - 1) {
          // Automatically archive if final stage is reached
          await archiveJobApplication({
            id: jobApplicationId,
            archive: true,
          }).unwrap();
        }

        setCurrentIndex(index);
        setShowConfirm(true); // Show confirmation modal or feedback
      } catch (error) {
        console.error("Failed to archive status:", error);
        // Optionally, show an error to the user
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-start">
      {/* Display stages of the job application */}
      <div className="flex w-full justify-between text-xs text-gray-700">
        {stages.map((stage) => (
          <span key={stage}>{stage}</span>
        ))}
      </div>

      {/* Visual representation of the stages */}
      <div className="mt-2 flex w-full">
        {stages.map((stage, index) => (
          <div
            key={stage}
            className={`flex ${index === stages.length - 1 ? "" : "w-full"} items-center`}
          >
            {/* Clickable circle for changing status */}
            <div
              onClick={() => {
                if (userType === "business") handleChangeStatus(index);
              }}
              className={`flex cursor-pointer rounded-full p-3 transition-all duration-200 ${
                currentIndex === stages.length - 1 &&
                index === stages.length - 1
                  ? "bg-danger-300" // Special styling for the final stage
                  : index <= currentIndex
                    ? "bg-green-400" // Past stages are green
                    : "bg-gray-200" // Future stages are gray
              }`}
            ></div>

            {/* Line between stages */}
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

      {/* Show the current date below the stages */}
      <div className="mt-2 text-sm text-gray-500">
        {new Date().toLocaleDateString()} {/* Display current date */}
      </div>
    </div>
  );
};

export default JobTrackerStatus;
