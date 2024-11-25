import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import AuthInput from "../AuthInput";
import { UserInfoStep } from "../../../types/index.types";
import AuthSelect from "../AuthSelect";
import AuthStartToEndDate from "../AuthStartToEndDate";
import AuthButton from "../AuthButton";
import AuthPrevAndSkipButtons from "../AuthPrevAndSkipButtons";

function UserInfoExperience({ setStep }: UserInfoStep) {
  return (
    <UserInfoLayout title="Eperience">
      <div className="flex flex-col gap-4 text-left">
        <AuthInput
          icon={faBriefcase}
          label="Job Title"
          props={{
            id: "jobTitle",
            type: "text",
            placeholder: "Ex. Software Engineer",
          }}
        />
        <AuthSelect label="Employment type" id="employmentType">
          <option value="fullTime">Full Time</option>
          <option value="internship">Internship</option>
          <option value="partTime">Part Time</option>
        </AuthSelect>
        <AuthInput
          label="Company name"
          props={{
            id: "companyName",
            type: "text",
            placeholder: "Ex. Microsoft",
          }}
        />
        <AuthInput
          label="Location"
          props={{
            id: "location",
            type: "text",
            placeholder: "Ex. London, United Kingdom",
          }}
        />
        <AuthSelect label="Location type" id="locationType">
          <option value="insite">Insite</option>
          <option value="remote">Remote</option>
        </AuthSelect>

        <div className="mb-4 flex items-center">
          <input
            id="green-checkbox"
            type="checkbox"
            value="d"
            className="text-green-600 focus:ring-green-500 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2"
          />

          <label htmlFor="default-checkbox" className="ms-2 font-medium">
            I am currently working in this role
          </label>
        </div>

        <AuthStartToEndDate />

        <div className="flex gap-5">
          <AuthButton className="w-full px-4 py-2">Submit</AuthButton>
          <AuthButton className="w-full px-4 py-2">
            Add New Experience
          </AuthButton>
        </div>

        <AuthPrevAndSkipButtons setStep={setStep} />
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoExperience;
