import {
  faCirclePlus,
  faFileLines,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from "../common/InputField";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
// import NavProfile from "../profile/NavProfile";

function Apply() {
  return (
    <>
      {/* <NavProfile /> */}
      <div>
        <p className="ml-8 mt-5 text-3xl font-semibold">Apply For Job</p>
        <p className="ml-10 mt-2">A few steps give you the power to your Job</p>
        <div className="m-auto my-20 flex w-1/2 flex-col items-center justify-center gap-3 rounded-xl bg-gray-200 py-10">
          <InputField id="firstName" label="FirstName">
            <Input
              props={{
                placeholder: "John",
                type: "text",
                id: "firstName",
              }}
            />
          </InputField>

          <InputField id="lastName" label="LastName">
            <Input
              props={{
                placeholder: "Tom",
                type: "text",
                id: "lastName",
              }}
            />
          </InputField>
          <div className="flex items-end gap-3">
            <Select label="Phone" id="phone" className="w-fit">
              +20
            </Select>

            <InputField icon={faPhone} id="phone">
              <Input
                icon={faPhone}
                props={{
                  placeholder: "123-456-789",
                  id: "phone",
                  type: "number",
                }}
              />
            </InputField>
          </div>
          <InputField id="email" label="Email Address">
            <Input
              props={{
                placeholder: "user@gmail.com",
                type: "text",
                id: "email",
              }}
            />
          </InputField>
          <p className="mr-[120px] font-semibold">Your Resume</p>
          <div className="space-x-2 rounded-md bg-white py-3">
            <FontAwesomeIcon icon={faFileLines} className="text-main" />
            <span className="">Professional Resume</span>
            <button className="px-2 text-xl text-gray-300">...</button>
            <span className="block px-3 text-gray-300">3.5MB</span>
          </div>
          <Button className="mt-5 rounded-md border-2 border-dashed border-gray-200 px-5 py-3">
            <FontAwesomeIcon icon={faCirclePlus} className="text-main" />

            <span className="px-3">Add CV/Resume</span>
            <span className="block text-sm text-gray-300">
              Browse file or drop here; only pdf
            </span>
          </Button>
          <InputField id="experience" label="Experience">
            <Input
              props={{
                placeholder: "Team leader in Microsoft ...",
                type: "text",
                id: "experience",
              }}
            />
          </InputField>
          <InputField id="education" label="Education">
            <Input
              props={{
                placeholder: "Engineering",
                type: "text",
                id: "education",
              }}
            />
          </InputField>
          <Button className="ml-[600px] px-2 py-1">Apply</Button>
        </div>
      </div>
    </>
  );
}

export default Apply;
