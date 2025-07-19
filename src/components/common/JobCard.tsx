import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faBookmark as faBookmarkSolid,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { IJob } from "../../interfaces/Job.interfaces";

function formatSalary(currency?: string, salary?: number): string {
  if (!currency || salary === undefined || salary === null)
    return "Not specified";

  const normalizedCurrency = currency.toLowerCase();
  let symbol = "";
  let suffix = "";

  switch (normalizedCurrency) {
    case "usd":
      symbol = "$";
      break;
    case "eur":
      symbol = "€";
      break;
    case "gbp":
      symbol = "£";
      break;
    case "jpy":
      symbol = "¥";
      break;
    // Add more currencies as needed
    default:
      suffix = ` ${currency.toUpperCase()}`;
  }

  // Format salary with commas (optional)
  const formattedSalary = salary.toLocaleString();

  return `${symbol}${formattedSalary}${suffix}`;
}

function JobCard({ job }: { job: IJob }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full cursor-pointer rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg"
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
            Salary: {formatSalary(job?.currency, job?.salary)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <div className="w-fit rounded-md bg-[#eee] p-2">
              <img
                src={job?.business.logo}
                alt={job?.business.name}
                className="h-8 w-8 rounded-lg object-cover"
              />
            </div>
            <div className="felx flex-col">
              <p className="text-base font-medium">{job?.business.name}</p>
              <div className="flex items-center gap-2 text-gray-300">
                <FontAwesomeIcon //location icon
                  icon={faLocationDot}
                />
                <p className="text-sm">
                  {job?.country} {job?.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
