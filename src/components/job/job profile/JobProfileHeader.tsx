import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../common/Button";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { IJob } from "../../../interfaces/Job.interfaces";
import { formatDate } from "../../../utils/helpers";

function JobProfileHeader({ job }: { job: IJob }) {
  return (
    <div className="flex w-full flex-col items-center bg-light-secondary py-4">
      <div className="mx-5 flex w-full max-w-[1000px] flex-col items-center justify-evenly gap-2 lg:mx-0 lg:items-start">
        <FontAwesomeIcon
          icon={faGoogle}
          className="text-[60px] text-main md:text-[80px]"
        />
        {/* <img src={logo} alt={name} className="w-8 h-8 mr-4" /> */}
        {/* {logo} */}
        <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row lg:gap-0">
          <h2 className="text-center text-4xl font-bold md:text-left md:text-5xl">
            {job.title}
          </h2>
          <p className="text-base text-gray-500">
            Updated {formatDate(job.updated_at)}
          </p>
        </div>
        <div className="flex w-fit flex-row items-center gap-1 text-lg">
          <a href={job.business.website} target="_blank" className="underline">
            {job.business.name}
          </a>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-sm"
          />
          {/* ask backend about rating */}
          {/* <p className="ml-2">{job.business.rating}</p> */}
          {/* <FontAwesomeIcon icon={faStar} /> */}
        </div>
        <div className="flex items-center justify-between gap-5">
          <Button className="rounded-lg px-6 py-3 text-xl text-white">
            Apply Now <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Button>
          <Button className="bg-white px-3 py-2 text-main-dark hover:bg-light-main hover:text-white">
            <FontAwesomeIcon icon={faBookmark} className="text-4xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobProfileHeader;
