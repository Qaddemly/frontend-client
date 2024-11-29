import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import AuthSelect from "../AuthSelect";
import AuthStartToEndDate from "../AuthStartToEndDate";
import AuthButton from "../AuthButton";
import { useFormContext } from "react-hook-form";
import AuthInputField from "../AuthInputField";
import AuthInput from "../AuthInput";
import { Country, EmploymentType, LocationType } from "..";

function UserInfoExperience() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const employmentTypeValues = Object.values(EmploymentType);
  const locationTypeValues = Object.values(LocationType);
  const coutnryValues = Object.values(Country);
  return (
    <UserInfoLayout title="Eperience">
      <div className="flex flex-col gap-4 text-left">
        <AuthInputField
          icon={faBriefcase}
          errors={errors}
          id="jobTitle"
          label="Job Title"
        >
          <AuthInput
            register={register}
            name={"jobTitle"}
            icon={faBriefcase}
            props={{
              id: "jobTitle",
              type: "text",
              placeholder: "Ex. Software Engineer",
            }}
          />
        </AuthInputField>
        <AuthSelect
          register={register}
          name="employmentType"
          label="Employment type"
          id="employmentType"
        >
          {employmentTypeValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </AuthSelect>
        <AuthInputField errors={errors} id="companyName" label="Company name">
          <AuthInput
            register={register}
            name={"companyName"}
            props={{
              id: "companyName",
              type: "text",
              placeholder: "Ex. Microsoft",
            }}
          />
        </AuthInputField>
        <AuthSelect
          register={register}
          name="location"
          label="Location"
          id="location"
        >
          {coutnryValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </AuthSelect>
        <AuthSelect
          name="locationType"
          register={register}
          label="Location type"
          id="locationType"
        >
          {locationTypeValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </AuthSelect>

        <div className="mb-4 flex items-center">
          <input
            {...register("currentlyWork")}
            type="checkbox"
            className="text-green-600 focus:ring-green-500 h-4 w-4 rounded border-gray-300"
          />

          <label htmlFor="default-checkbox" className="ms-2 font-medium">
            I am currently working in this role
          </label>
        </div>

        <AuthStartToEndDate
          startDate="startJobDate"
          endDate="endJobDate"
          register={register}
        />

        <AuthButton type="button" className="w-full px-4 py-2">
          Add New Experience
        </AuthButton>
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoExperience;
