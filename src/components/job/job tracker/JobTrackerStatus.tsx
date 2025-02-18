import { JobApplicationState } from "../../../enums/index.enums";

function JobTrackerStatus() {
  const stages = Object.keys(JobApplicationState);
  const currentIndex = stages.indexOf(stages[0]);
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex justify-between gap-12 text-xs text-gray-700">
        {stages.map((stage) => (
          <span key={stage}>{stage}</span>
        ))}
      </div>

      <div className="mt-2 flex w-full items-center">
        {stages.map((stage, index) => (
          <div key={stage} className="flex w-full items-center">
            {currentIndex !== 4 && (
              <div
                className={`flex items-center justify-center rounded-full p-3 ${index <= currentIndex ? "bg-green-100" : "bg-gray-100"}`}
              ></div>
            )}

            {currentIndex === 4 && (
              <div
                className={`flex items-center justify-center rounded-full p-3 ${index === 4 ? "bg-danger-300" : "bg-gray-100"}`}
              ></div>
            )}
            {index < stages.length - 1 &&
              (currentIndex !== 4 ? (
                <div
                  className={`h-2 w-28 ${index < currentIndex ? "bg-green-100" : "bg-gray-100"}`}
                />
              ) : (
                <div className={`h-2 w-28 bg-gray-100`} />
              ))}
          </div>
        ))}
      </div>

      <div className="mt-2 text-sm text-gray-500">{"10/10/2025"}</div>
    </div>
  );
}

export default JobTrackerStatus;
