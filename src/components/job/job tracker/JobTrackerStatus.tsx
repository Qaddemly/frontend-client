import { useState } from "react";
import { JobApplicationState } from "../../../enums/index.enums";

function JobTrackerStatus({
  userType,
  setShowConfirm,
}: {
  setShowConfirm: (s: boolean) => void;
  userType: "business" | "user";
}) {
  const stages = Object.keys(JobApplicationState);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChangeStatus = (index: number) => {
    setCurrentIndex(index);
    setShowConfirm(true);
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
            className={`flex ${index === 4 ? "" : "w-full"} items-center`}
          >
            {currentIndex !== 4 && (
              <div
                onClick={() => {
                  if (userType === "business") handleChangeStatus(index);
                }}
                className={`flex cursor-pointer rounded-full p-3 ${index <= currentIndex ? "bg-green-100" : "bg-gray-100"}`}
              ></div>
            )}

            {currentIndex === 4 && (
              <div
                onClick={() => {
                  if (userType === "business") handleChangeStatus(index);
                }}
                className={`flex cursor-pointer rounded-full p-3 ${index === 4 ? "bg-danger-300" : "bg-gray-100"}`}
              ></div>
            )}
            {index < stages.length - 1 &&
              (currentIndex !== 4 ? (
                <div
                  className={`h-2 w-full ${index < currentIndex ? "bg-green-100" : "bg-gray-100"}`}
                />
              ) : (
                <div className={`h-2 w-full bg-gray-100`} />
              ))}
          </div>
        ))}
      </div>

      <div className="mt-2 text-sm text-gray-500">{"10/10/2025"}</div>
    </div>
  );
}

export default JobTrackerStatus;
