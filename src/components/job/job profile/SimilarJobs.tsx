import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobCard from "../../common/JobCard";

function SimilarJobs() {
  return (
    <div className="w-full px-2 py-3">
      {/* Section Title */}
      <div className="flex flex-col items-center justify-between gap-0 font-semibold md:flex-row">
        <h2 className="text-center text-3xl text-gray-800">Similar Jobs</h2>
        <button className="space-x-2 pt-2 text-xl text-main md:self-end md:pt-0">
          <span>View All</span>
          <FontAwesomeIcon icon={faCircleRight} />
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <JobCard
          jobTitle="Technical Support Specialist"
          employmentType="PART-TIME"
          salaryRange="$20,000 - $25,000"
          companyName="Google Inc."
          companyLocation="Dhaka, Bangladesh"
        />
        <JobCard
          jobTitle="Senior UX Designer"
          employmentType="FULL-TIME"
          salaryRange="$20,000 - $25,000"
          companyName="Google Inc."
          companyLocation="Dhaka, Bangladesh"
        />
        <JobCard
          jobTitle="Technical Support Specialist"
          employmentType="PART-TIME"
          salaryRange="$20,000 - $25,000"
          companyName="Google Inc."
          companyLocation="Dhaka, Bangladesh"
        />
      </div>
    </div>
  );
}

export default SimilarJobs;
