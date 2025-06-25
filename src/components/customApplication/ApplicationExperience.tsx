import { FieldErrors, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { IExperience } from "../../interfaces/Auth.interfaces";
import { useGetExperienceQuery } from "../../services/profileApi";
import Button from "../common/Button";
import { Country, EmploymentType, LocationType } from "../../enums/index.enums";
import { ICustomExperience } from "../../interfaces/CustomApplication.interfaces";
import { useApplication } from "../../context/ApplicationContext";
import Select from "../common/Select.tsx";

function ApplicationExperience() {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { data: experienceData, isLoading } = useGetExperienceQuery({});
  const [showDropdown, setShowDropdown] = useState(false);
  const { experiences, setExperiences } = useApplication();
  const employmentType = Object.keys(EmploymentType);

  const handleAutofill = (exp: IExperience) => {
    setValue("experience.jobTitle", exp.job_title || "");
    setValue("experience.companyName", exp.company_name || "");
    setValue("experience.location", exp.location || "");
    setValue("experience.locationType", exp.location_type || "");
    setValue("experience.startDate", exp.start_date || "");
    setValue("experience.endDate", exp.end_date || "");
    setValue("experience.stillWorking", exp.still_working);
    setValue("experience.employmentType", exp.employment_type || "");
    setShowDropdown(false);
  };

  const handleAddExperience = () => {
    const exp = getValues("experience");

    if (
      !exp.jobTitle ||
      !exp.companyName ||
      !exp.location ||
      !exp.locationType ||
      !exp.startDate ||
      (exp.endDate && exp.endDate < exp.startDate) ||
      (exp.stillWorking && exp.endDate)
    )
      return;

    const experience: ICustomExperience = {
      id: experiences.length + 1,
      employmentType: exp?.employmentType,
      jobTitle: exp?.jobTitle || "",
      companyName: exp?.companyName || "",
      location: exp?.location as Country,
      locationType: exp?.locationType as LocationType,
      startDate: exp?.startDate || "",
      endDate: exp?.endDate || "",
      stillWorking: exp?.stillWorking || false,
    };

    setExperiences((prev) => [...prev, experience]);

    setValue("experience.jobTitle", "");
    setValue("experience.employmentType", "");
    setValue("experience.companyName", "");
    setValue("experience.location", "");
    setValue("experience.locationType", "");
    setValue("experience.startDate", "");
    setValue("experience.endDate", "");
    setValue("experience.stillWorking", false);
  };

  const handleRemoveExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const experienceList = experienceData?.experiences ?? [];

  return (
    <>
      <div className="relative mx-2 mb-4 flex items-center justify-end">
        {!isLoading && experienceList.length > 0 && (
          <button
            type="button"
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center text-sm text-gray-600 underline"
          >
            <FontAwesomeIcon icon={faGlasses} className="mr-2" />
            Autofill?
          </button>
        )}

        {showDropdown && experienceList.length > 0 && (
          <div className="absolute right-0 z-10 mt-2 max-h-60 w-64 overflow-auto rounded border bg-white shadow">
            {experienceList.map((exp, index) => (
              <button
                key={index}
                type="button"
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => handleAutofill(exp)}
              >
                {exp.job_title} - {exp.company_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <InputField errors={errors.experience as FieldErrors} id="jobTitle">
        <Input
          register={register}
          name={"experience.jobTitle"}
          options={{ required: "Job title is required" }}
          props={{ id: "jobTitle", type: "text", placeholder: "Job Title" }}
        />
      </InputField>

      <InputField errors={errors.experience as FieldErrors} id="companyName">
        <Input
          register={register}
          name={"experience.companyName"}
          options={{ required: "Company name is required" }}
          props={{
            id: "companyName",
            type: "text",
            placeholder: "Company Name",
          }}
        />
      </InputField>

      <div className="flex flex-col space-y-3">
        <Select register={register} name={"experience.employmentType"}>
          <option disabled>Employee type</option>
          {employmentType.map((employmentType) => (
            <option key={employmentType} value={employmentType}>
              {employmentType}
            </option>
          ))}
        </Select>
      </div>

      <InputField errors={errors.experience as FieldErrors} id="location">
        <Input
          register={register}
          name={"experience.location"}
          options={{ required: "Location is required" }}
          props={{ id: "location", type: "text", placeholder: "Location" }}
        />
      </InputField>

      <InputField errors={errors.experience as FieldErrors} id="locationType">
        <Input
          register={register}
          name={"experience.locationType"}
          options={{ required: "Location type is required" }}
          props={{
            id: "locationType",
            type: "text",
            placeholder: "Location Type",
          }}
        />
      </InputField>

      <StartToEndDate
        startDate="experience.startDate"
        endDate="experience.endDate"
        register={register}
      />

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

      <Button
        onClick={handleAddExperience}
        type="button"
        className="m-auto mt-2 w-fit px-4 py-2 md:mt-6"
      >
        Add Experience
      </Button>

      {experiences?.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-base font-medium">Experiences Added</h3>
          <div className="flex flex-row flex-wrap gap-2">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="flex w-fit flex-row items-center justify-between gap-3 rounded-full bg-green-200 p-3 text-white"
              >
                <p>
                  {exp.jobTitle} - {exp.companyName}
                </p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer"
                  onClick={() => handleRemoveExperience(exp.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ApplicationExperience;
