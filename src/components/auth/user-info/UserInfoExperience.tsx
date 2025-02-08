import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import Input from "../../common/Input";
import InputField from "../../common/InputField";
import StartToEndDate from "../../common/StartToEndDate";
import { useFormContext } from "react-hook-form";
import {
  Country,
  EmploymentType,
  LocationType,
} from "../../../enums/index.enums";
import Select from "../../common/Select";
import Button from "../../common/Button";
import { useUserInfo } from "../../../context/UserInfoContext";

function UserInfoExperience() {
  const {
    register,
    formState: { errors },
    getValues,
    resetField,
  } = useFormContext();

  const { setExperience } = useUserInfo();
  const employmentTypeValues = Object.values(EmploymentType);
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);

  function handleAddNewExperience() {
    setExperience((experience) => [
      ...experience,
      {
        id: new Date().getTime(),
        job_title: getValues("experience.job_title"),
        employment_type: getValues("experience.employment_type"),
        company_name: getValues("experience.company_name"),
        location: getValues("experience.location"),
        location_type: getValues("experience.location_type"),
        still_working: getValues("experience.still_working"),
        start_date: getValues("experience.start_date"),
        end_date: getValues("experience.end_date"),
      },
    ]);
    resetField("experience.job_title");
    resetField("experience.employment_type");
    resetField("experience.company_name");
    resetField("experience.location");
    resetField("experience.location_type");
    resetField("experience.still_working");
    resetField("experience.start_date");
    resetField("experience.end_date");
  }

  return (
    <UserInfoLayout title="Experience">
      <div className="flex flex-col gap-4 text-left">
        <InputField
          icon={faBriefcase}
          errors={errors}
          id="jobTitle"
          label="Job Title"
        >
          <Input
            register={register}
            name={"experience.job_title"}
            icon={faBriefcase}
            props={{
              id: "jobTitle",
              type: "text",
              placeholder: "Ex. Software Engineer",
            }}
          />
        </InputField>
        <Select
          register={register}
          name="experience.employment_type"
          label="Employment type"
          id="employmentType"
        >
          {employmentTypeValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </Select>
        <InputField errors={errors} id="companyName" label="Company name">
          <Input
            register={register}
            name={"experience.company_name"}
            props={{
              id: "companyName",
              type: "text",
              placeholder: "Ex. Microsoft",
            }}
          />
        </InputField>
        <Select
          register={register}
          name="experience.location"
          label="Location"
          id="location"
        >
          {countryValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          name="experience.location_type"
          register={register}
          label="Location type"
          id="locationType"
        >
          {locationTypeValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </Select>

        <div className="mb-4 flex items-center">
          <input
            {...register("experience.stillWorking")}
            type="checkbox"
            id="still_working"
            className="text-green-600 focus:ring-green-500 h-4 w-4 rounded border-gray-300"
          />

          <label htmlFor="stillWorking" className="ms-2 font-medium">
            I am currently working in this role
          </label>
        </div>

        <StartToEndDate
          startDate={"experience.start_date"}
          endDate={"experience.end_date"}
          register={register}
        />

        <Button
          onClick={handleAddNewExperience}
          type="button"
          className="w-full px-4 py-2"
        >
          Add New Experience
        </Button>
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoExperience;
