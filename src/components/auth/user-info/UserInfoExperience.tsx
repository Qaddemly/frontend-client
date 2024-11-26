import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import AuthSelect from "../AuthSelect";
import AuthStartToEndDate from "../AuthStartToEndDate";
import AuthButton from "../AuthButton";
import { UserInfoProps } from "../../../types/Auth.types";
import { FieldValues, Path } from "react-hook-form";
import AuthInputField from "../AuthInputField";
import AuthInput from "../AuthInput";
import { EmploymentType, LocationType } from "..";

function UserInfoExperience<T extends FieldValues>({
  register,
  errors,
}: UserInfoProps<T>) {
  const employmentTypeValues = Object.values(EmploymentType);
  const locationTypesValues = Object.values(LocationType);

  return (
    <UserInfoLayout title="Eperience">
      <div className="flex flex-col gap-4 text-left">
        <AuthInputField
          errors={errors}
          id="jobTitle"
          icon={faBriefcase}
          label="Job Title"
        >
          <AuthInput
            register={register}
            name={"jobTitle" as Path<T>}
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
          name={"employmentType" as Path<T>}
          label="Employment type"
          id="employmentType"
        >
          <option value="fullTime">Full Time</option>
          {employmentTypeValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </AuthSelect>

        <AuthInputField errors={errors} id="companyName" label="Company name">
          <AuthInput
            register={register}
            name={"companyName" as Path<T>}
            props={{
              id: "companyName",
              type: "text",
              placeholder: "Ex. Microsoft",
            }}
          />
        </AuthInputField>

        <AuthInputField errors={errors} id="location" label="Location">
          <AuthInput
            register={register}
            name={"location" as Path<T>}
            props={{
              id: "location",
              type: "text",
              placeholder: "Ex. London, United Kingdom",
            }}
          />
        </AuthInputField>

        <AuthSelect label="Location type" id="locationType">
          {locationTypesValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
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

        {register && <AuthStartToEndDate register={register} />}

        <AuthButton type="button" className="w-full px-4 py-2">
          Add New Experience
        </AuthButton>
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoExperience;
