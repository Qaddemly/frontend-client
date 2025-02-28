import { NavLink, useParams } from "react-router-dom";
import SearchBar from "../../common/SearchBar";
import { JobApplicationState } from "../../../enums/index.enums";
import { useEffect, useState } from "react";

type JobTrackerHeaderProps = {
  userType: "business" | "user";
  businessJobApplicationsLength?: number;
  currentState: string;
  fetchApplications: (params: { id: string; filterByState: string }) => void;
};

function JobTrackerHeader({
  userType,
  businessJobApplicationsLength,
  currentState,
  fetchApplications,
}: JobTrackerHeaderProps) {
  const { companyId, jobId } = useParams();
  const jobApplicationsStateValues = Object.values(JobApplicationState);
  const [applicationsState, setApplicationsState] = useState(currentState);

  useEffect(() => {
    fetchApplications({ id: jobId || "", filterByState: applicationsState });
  }, [fetchApplications, applicationsState]);

  return (
    <div className="relative">
      <p className="text-4xl font-semibold text-gray-800">Track your jobs</p>
      <div className="mt-4 flex gap-10 pb-2">
        <p className="font-medium">
          {businessJobApplicationsLength} Total{" "}
          {userType === "user" ? "Jobs" : "Applications"}
        </p>
        <NavLink
          end
          to={
            userType === "user"
              ? `/jobTracker`
              : `/businessDashboard/companyJobs/${companyId}/jobApplications/${jobId}/jobTracker`
          }
          className={({ isActive }: { isActive: boolean }) =>
            `cursor-pointer border-b-4 pb-2 hover:border-main hover:text-main ${
              isActive
                ? "border-b-main text-main"
                : "border-b-background text-gray-600"
            }`
          }
        >
          Active{" "}
          {userType === "business"
            ? `(${businessJobApplicationsLength})`
            : `()`}
        </NavLink>
        {userType === "user" && (
          <NavLink
            end
            to="/jobTracker/archived"
            className={({ isActive }: { isActive: boolean }) =>
              `cursor-pointer border-b-4 pb-2 hover:border-main hover:text-main ${
                isActive
                  ? "border-b-main text-main"
                  : "border-b-background text-gray-600"
              }`
            }
          >
            Archived (4)
          </NavLink>
        )}
      </div>
      <hr className="absolute top-[5.7rem] w-full border border-gray-200" />

      <div className="mt-4 flex items-center gap-5">
        <SearchBar
          placeholder={`Search for ${userType === "user" ? "roles or companies" : "Applicant name or email"}`}
          buttonName="Search"
          className="flex min-w-[60%] items-center rounded-lg border border-gray-100 bg-white px-5 py-2 shadow-sm outline-none focus-within:ring-2"
          btnClassName="hidden"
        />

        <select
          value={applicationsState}
          onChange={(e) => setApplicationsState(e.target.value)}
          className="w-[15rem] rounded-md border border-gray-100 px-5 py-2 text-gray-400 outline-none focus:border-secondary"
        >
          {userType === "user" ? (
            <option value="All">Job Type</option>
          ) : (
            jobApplicationsStateValues.map((state) => (
              <option value={state}>{state}</option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}

export default JobTrackerHeader;
