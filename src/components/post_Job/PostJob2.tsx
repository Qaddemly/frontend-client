import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarBusiness from "../business account/NavbarBusiness";
import SideNavBusiness from "../business account/SideNavBusiness";
import Button from "../common/Button";

import Select from "../common/Select";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function PostJob2() {
  return (
    <div className="flex min-h-screen">
      <SideNavBusiness />
      <div className="w-full">
        <NavbarBusiness />

        <div className="m-10 rounded-lg bg-[#eee] p-10">
          <p className="text-3xl font-medium">Post Job</p>
          <p className="text-gray-300">
            A few steps give you the power to your Job
          </p>
          <div className="mt-10 flex flex-col gap-5">
            <Select label="Skills " id="skills">
              it
            </Select>
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white">
                <p>it</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl"
                />
              </div>
            </div>
            <Select label="Required Experiences " id="experience">
              it
            </Select>
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white">
                <p>it</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl"
                />
              </div>
            </div>
            <Select label="Keywords " id="keywords">
              it
            </Select>
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white">
                <p>it</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl"
                />
              </div>
            </div>

            <Button className="ml-[1150px] mt-5 flex items-center justify-center px-8 py-2">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostJob2;
