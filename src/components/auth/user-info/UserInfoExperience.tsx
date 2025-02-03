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

function UserInfoExperience() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // const { setExperience } = useUserInfo();
  const employmentTypeValues = Object.values(EmploymentType);
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);

  // function handleAddNewExperience() {
  //   setExperience((experience) => [
  //     ...experience,
  //     {
  //       jobTitle: getValues("experience.jobTitle"),
  //       employmentType: getValues("experience.employmentType"),
  //       companyName: getValues("experience.companyName"),
  //       location: getValues("experience.location"),
  //       locationType: getValues("experience.locationType"),
  //       stillWorking: getValues("experience.stillWorking"),
  //       startDate: getValues("experience.startDate"),
  //       endDate: getValues("experience.endDate"),
  //     },
  //   ]);
  //   resetField("experience.jobTitle");
  //   resetField("experience.employmentType");
  //   resetField("experience.companyName");
  //   resetField("experience.location");
  //   resetField("experience.locationType");
  //   resetField("experience.stillWorking");
  //   resetField("experience.startJobDate");
  //   resetField("experience.endJobDate");
  // }

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
            name={"experience.jobTitle"}
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
          name="experience.employmentType"
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
            name={"experience.companyName"}
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
          name="experience.locationType"
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
            id="stillWorking"
            className="text-green-600 focus:ring-green-500 h-4 w-4 rounded border-gray-300"
          />

          <label htmlFor="stillWorking" className="ms-2 font-medium">
            I am currently working in this role
          </label>
        </div>

        <StartToEndDate
          startDate={"experience.startDate"}
          endDate={"experience.endDate"}
          register={register}
        />

        <Button
          // onClick={handleAddNewExperience}
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
