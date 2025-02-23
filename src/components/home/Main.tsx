import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsSpin,
  faBriefcase,
  faCircleCheck,
  faCloudArrowUp,
  faMagnifyingGlassPlus,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "./HomeIcon";
import { useNavigate } from "react-router-dom";
import { useGetRecommendedJobsQuery } from "../../services/jobApi";
import JobCard from "../common/JobCard";

function Main() {
  const navigate = useNavigate();

  const { data } = useGetRecommendedJobsQuery();

  return (
    <>
      <div className="mx-6 my-20 md:my-20">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="ml-20 text-center md:text-left">
            <p className="text-[3.2rem] font-semibold">
              Find Your Dream Job with Qaddemly!
            </p>
            <p className="mt-4 w-[45rem] text-[1.5rem] text-gray-600">
              We make job searching effortless—personalized recommendations,
              AI-assisted resume building, and more to help you land your
              perfect role.
            </p>
          </div>
          <HomeIcon />
        </div>
      </div>

      <ul className="mx-6 grid gap-6 sm:grid-cols-1 md:mx-auto md:w-3/4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: faBriefcase, text: "Live Jobs" },
          { icon: faBuilding, text: "Companies" },
          { icon: faUsers, text: "Candidates" },
          { icon: faArrowsSpin, text: "New Jobs" },
        ].map((item, index) => (
          <li
            key={index}
            className="flex h-24 items-center justify-around rounded-md bg-white p-3 shadow-md"
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="mr-3 rounded-md bg-light-secondary p-3 text-3xl text-main"
            />
            <div className="flex flex-col">
              <span className="mr-3 font-bold"> 4,593,456</span>
              <span className="block text-gray-600">{item.text}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-20 flex flex-col items-center justify-center bg-light-secondary">
        <p className="my-10 text-center text-2xl font-bold md:text-3xl">
          How Qaddemly work ?
        </p>
        <div className="relative mx-10 mb-10 flex flex-col justify-around gap-10 lg:flex-row">
          <div className="flex flex-col items-center gap-1 p-5 text-center">
            <div className="text mb-7 h-fit w-fit rounded-full bg-white px-3 py-5">
              <FontAwesomeIcon
                icon={faUserCheck}
                width={50}
                height={64}
                className="text-3xl text-main"
              />
            </div>
            <p className="text-lg font-medium">Create account</p>
            <p className="text-gray-400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos.
            </p>
          </div>
          {/* <ArrowUpFirst /> */}
          <div className="flex flex-col items-center gap-1 rounded-md bg-white p-5 text-center">
            <div className="text mb-7 h-fit w-fit rounded-full bg-main px-3 py-5">
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                width={50}
                height={64}
                className="text-3xl text-white"
              />
            </div>
            <p className="text-lg font-medium">Upload CV/Resume</p>
            <p className="text-gray-400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos.
            </p>
          </div>
          {/* <ArrowDown /> */}
          <div className="flex flex-col items-center gap-1 p-5 text-center">
            <div className="text mb-7 h-fit w-fit rounded-full bg-white px-3 py-5">
              <FontAwesomeIcon
                icon={faMagnifyingGlassPlus}
                width={50}
                height={64}
                className="text-3xl text-main"
              />
            </div>
            <p className="text-lg font-medium">Find suitable job</p>
            <p className="text-gray-400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos.
            </p>
          </div>
          {/* <ArrowUpSecond /> */}
          <div className="flex flex-col items-center gap-1 rounded-md bg-white p-5 text-center">
            <div className="text mb-7 h-fit w-fit rounded-full bg-main px-3 py-5">
              <FontAwesomeIcon
                icon={faCircleCheck}
                width={50}
                height={64}
                className="text-3xl text-white"
              />
            </div>
            <p className="text-lg font-medium">Apply job</p>
            <p className="text-gray-400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 pb-32">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-xl font-bold md:text-2xl">Recommended Jobs</p>
          <button
            onClick={() => navigate("/findJob")}
            className="mt-4 rounded-md border-2 border-[#eee] px-5 py-2 text-main hover:border-main hover:bg-main hover:text-white md:mt-0"
          >
            View All <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>

        <div className="p-4">
          <ul className="mt-5 grid grid-cols-1 gap-5 px-3 sm:grid-cols-2 lg:grid-cols-3">
            {data?.recommendedJobs.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Main;
