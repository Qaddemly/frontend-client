import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "./GoogleLogo";
import {
  // faBookmark as faBookmarkSolid,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { IJob } from "../../interfaces/Job.interfaces";

function JobCard({ job }: { job: IJob }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="cursor-pointer rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg"
        onClick={() => navigate(`/jobProfile/${job.id}`)}
      >
        <h3 className="my-2 text-lg font-medium">{job.title}</h3>
        <div className="flex flex-col gap-6">
          <div className="flex gap-3">
            <span
              className={`rounded-md bg-light-green px-1 text-sm font-medium ${
                job.employee_type.toLowerCase() === "full-time"
                  ? "text-green-100"
                  : "text-yellow"
              }`}
            >
              {job.employee_type.toUpperCase()}
            </span>
            <span className="block text-sm text-gray-600">
              Salary: {job.salary}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <div className="w-fit rounded-md bg-[#eee] p-2">
                <GoogleLogo />
                {/*companyLogo} */}
              </div>
              <div className="felx flex-col">
                <p className="text-base font-medium">{job.business.name}</p>
                <div className="flex items-center gap-2 text-gray-300">
                  <FontAwesomeIcon //location icon
                    icon={faLocationDot}
                  />
                  <p className="text-sm">
                    {job.business.address.country} {job.business.address.city}
                  </p>
                </div>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faBookmark}
              className="text-2xl text-gray-300"
            />
            {/* <FontAwesomeIcon // Solid Bookmark icon
              icon={faBookmarkSolid}
              className="text-yellow text-2xl"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCard;
