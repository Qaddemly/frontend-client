import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "./GoogleLogo";
import { faBookmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";

type JobCardProps = {
  jobTitle: string;
  employmentType: string;
  salaryRange: string;
  companyName: string;
  companyLocation: string;
};

function JobCard({
  jobTitle,
  employmentType,
  salaryRange,
  companyName,
  companyLocation,
}: JobCardProps) {
  return (
    <>
      <li className="border border-offWhite p-5 shadow-md">
        <p className="my-2 text-lg font-medium">{jobTitle}</p>{" "}
        {/* Techical Support Specialist */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-3">
            <span className="rounded-md bg-light-green px-1 font-medium text-green-100">
              {/* Part-Time */}
              {employmentType}
            </span>
            <span className="block text-gray-600">
              Salary: {/* $20,000 - $25,000 */}
              {salaryRange}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <div className="w-fit rounded-md bg-[#eee] p-2">
                <GoogleLogo />
                {/*companyLogo} */}
              </div>
              <div className="felx flex-col">
                <p className="font-medium">
                  {/* Google Inc. */}
                  {companyName}
                </p>
                <div className="flex items-center gap-2 text-gray-300">
                  <FontAwesomeIcon //location icon
                    icon={faLocationDot}
                  />
                  <p>
                    {/* USA */}
                    {companyLocation}
                  </p>
                </div>
              </div>
            </div>
            <FontAwesomeIcon // Bookmark icon
              icon={faBookmark}
              className="text-2xl text-gray-300"
            />
          </div>
        </div>
      </li>
    </>
  );
}

export default JobCard;
