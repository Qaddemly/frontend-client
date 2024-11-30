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
      <div className="mx-6 my-20">
        <div className="flex items-center justify-around">
          <div className="w-1/2">
            <p className="text-4xl font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              provident temporibus eius odit earum.
            </p>
            <p className="mt-6 text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut in
              architecto molestiae autem enim unde tempore explicabo
            </p>
          </div>
          <HomeIcon />
        </div>
      </div>

      <ul className="flex items-center justify-center gap-10">
        <li className="flex h-[6rem] w-[14rem] items-center justify-around rounded-md bg-white p-3 shadow-md">
          <FontAwesomeIcon
            icon={faBriefcase}
            className="mr-3 rounded-md bg-light-secondary p-3 text-3xl text-main"
          />
          <div className="flex flex-col">
            <span className="mr-3 font-bold"> 4,593,456</span>
            <span className="block text-gray-600">Live Jobs</span>
          </div>
        </li>

        <li className="flex h-[6rem] w-[14rem] items-center justify-around rounded-md bg-white p-3 shadow-md">
          <FontAwesomeIcon
            icon={faBuilding}
            className="mr-3 rounded-md bg-main p-3 text-3xl text-light-secondary"
          />
          <div className="flex flex-col">
            <span className="mr-3 font-bold"> 4,593,456</span>
            <span className="block text-gray-600">Companies</span>
          </div>
        </li>

        <li className="flex h-[6rem] w-[14rem] items-center justify-around rounded-md bg-white p-3 shadow-md">
          <FontAwesomeIcon
            icon={faUsers}
            className="mr-3 rounded-md bg-light-secondary p-3 text-3xl text-main"
          />
          <div className="flex flex-col">
            <span className="mr-3 font-bold"> 4,593,456</span>
            <span className="block text-gray-600">Candidates</span>
          </div>
        </li>

        <li className="flex h-[6rem] w-[14rem] items-center justify-around rounded-md bg-white p-3 shadow-md">
          <FontAwesomeIcon
            icon={faArrowsSpin}
            className="mr-3 rounded-md bg-light-secondary p-3 text-3xl text-main"
          />
          <div className="flex flex-col">
            <span className="mr-3 font-bold"> 4,593,456</span>
            <span className="block text-gray-600">New Jobs</span>
          </div>
        </li>
      </ul>

      <div className="mt-20 flex flex-col items-center justify-center bg-light-secondary">
        <p className="my-20 text-3xl font-bold">How Qaddemly work ?</p>
        <div className="relative mb-32 flex justify-around px-4">
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
        <div className="mt-20 flex items-center justify-between">
          <p className="px-7 text-2xl font-bold">Recommended Jobs</p>
          <button className="mr-7 rounded-md border-2 border-[#eee] p-2 px-7 text-main hover:border-main hover:bg-main hover:text-white">
            View All <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>

        <div className="p-4">
          <ul className="mt-5 grid grid-cols-3 gap-5 px-3">
            <li className="border-offWhite border p-5 shadow-md">
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
            <li className="border-offWhite border p-5 shadow-md">
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
            <li className="border-offWhite border p-5 shadow-md">
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
            <li className="border-offWhite border p-5 shadow-md">
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
            <li className="border-offWhite border p-5 shadow-md">
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
            <li className="border-offWhite border p-5 shadow-md">
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
