import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsSpin,
  faBriefcase,
  faCircleCheck,
  faCloudArrowUp,
  faLocationDot,
  faMagnifyingGlassPlus,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "./HomeIcon";
import ArrowDown from "./ArrowDown";
import ArrowUpFirst from "./ArrowUpFirst";
import ArrowUpSecond from "./ArrowUpSecond";
import GoogleLogo from "../common/GoogleLogo";

function Main() {
  return (
    <>
      <div className="mx-6 my-20 md:my-20">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="text-center md:w-1/2 md:text-left">
            <p className="text-xl font-semibold md:text-4xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              provident temporibus eius odit earum.
            </p>
            <p className="mt-4 text-sm text-gray-600 md:mt-6 md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut in
              architecto molestiae autem enim unde tempore explicabo
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
        <div className="relative mx-10 mb-10 flex flex-col justify-around gap-10 md:flex-row">
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
          <ArrowUpFirst />
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
          <ArrowDown />
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
          <ArrowUpSecond />
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
          <button className="mt-4 rounded-md border-2 border-[#eee] px-5 py-2 text-main hover:border-main hover:bg-main hover:text-white md:mt-0">
            View All <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>

        <div className="p-4">
          <ul className="mt-5 grid grid-cols-1 gap-5 px-3 sm:grid-cols-2 lg:grid-cols-3">
            <li className="border border-offWhite p-5 shadow-md">
              <p className="my-2 text-lg font-medium">
                Techical Support Specialist
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                  <span className="rounded-md bg-light-green px-1 font-medium text-green-100">
                    Part-Time
                  </span>
                  <span className="block text-gray-600">
                    Salary: $20,000 - $25,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div className="w-fit rounded-md bg-[#eee] p-2">
                      <GoogleLogo />
                    </div>
                    <div className="felx flex-col">
                      <p className="font-medium">Google Inc.</p>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>USA</p>
                      </div>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="text-2xl text-gray-300"
                  />
                </div>
              </div>
            </li>
            <li className="border border-offWhite p-5 shadow-md">
              <p className="my-2 text-lg font-medium">
                Techical Support Specialist
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                  <span className="rounded-md bg-light-green px-1 font-medium text-green-100">
                    Part-Time
                  </span>
                  <span className="block text-gray-600">
                    Salary: $20,000 - $25,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div className="w-fit rounded-md bg-[#eee] p-2">
                      <GoogleLogo />
                    </div>
                    <div className="felx flex-col">
                      <p className="font-medium">Google Inc.</p>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>USA</p>
                      </div>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="text-2xl text-gray-300"
                  />
                </div>
              </div>
            </li>
            <li className="border border-offWhite p-5 shadow-md">
              <p className="my-2 text-lg font-medium">
                Techical Support Specialist
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                  <span className="rounded-md bg-light-green px-1 font-medium text-green-100">
                    Part-Time
                  </span>
                  <span className="block text-gray-600">
                    Salary: $20,000 - $25,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div className="w-fit rounded-md bg-[#eee] p-2">
                      <GoogleLogo />
                    </div>
                    <div className="felx flex-col">
                      <p className="font-medium">Google Inc.</p>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>USA</p>
                      </div>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="text-2xl text-gray-300"
                  />
                </div>
              </div>
            </li>
            <li className="border border-offWhite p-5 shadow-md">
              <p className="my-2 text-lg font-medium">
                Techical Support Specialist
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                  <span className="rounded-md bg-light-green px-1 font-medium text-green-100">
                    Part-Time
                  </span>
                  <span className="block text-gray-600">
                    Salary: $20,000 - $25,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div className="w-fit rounded-md bg-[#eee] p-2">
                      <GoogleLogo />
                    </div>
                    <div className="felx flex-col">
                      <p className="font-medium">Google Inc.</p>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>USA</p>
                      </div>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="text-2xl text-gray-300"
                  />
                </div>
              </div>
            </li>
            <li className="border border-offWhite p-5 shadow-md">
              <p className="my-2 text-lg font-medium">
                Techical Support Specialist
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                  <span className="rounded-md bg-light-green px-1 font-medium text-green-100">
                    Part-Time
                  </span>
                  <span className="block text-gray-600">
                    Salary: $20,000 - $25,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div className="w-fit rounded-md bg-[#eee] p-2">
                      <GoogleLogo />
                    </div>
                    <div className="felx flex-col">
                      <p className="font-medium">Google Inc.</p>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>USA</p>
                      </div>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="text-2xl text-gray-300"
                  />
                </div>
              </div>
            </li>
            <li className="border border-offWhite p-5 shadow-md">
              <p className="my-2 text-lg font-medium">
                Techical Support Specialist
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                  <span className="rounded-md bg-light-green px-1 font-medium text-green-100">
                    Part-Time
                  </span>
                  <span className="block text-gray-600">
                    Salary: $20,000 - $25,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div className="w-fit rounded-md bg-[#eee] p-2">
                      <GoogleLogo />
                    </div>
                    <div className="felx flex-col">
                      <p className="font-medium">Google Inc.</p>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>USA</p>
                      </div>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="text-2xl text-gray-300"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Main;
