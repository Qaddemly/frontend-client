import { FieldErrors, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { IExperience } from "../../interfaces/Auth.interfaces";
import { IApplicationData } from "../../interfaces/CustomApplication.interfaces";
import { useGetExperienceQuery } from "../../services/profileApi";
import Button from "../common/Button";
import { Country, EmploymentType, LocationType } from "../../enums/index.enums";

function ApplicationExperience() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const { data: experienceData, isLoading } = useGetExperienceQuery({});
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAutofill = (exp: IExperience) => {
    setValue("experience.jobTitle", exp.job_title || "");
    setValue("experience.companyName", exp.company_name || "");
    setValue("experience.location", exp.location || "");
    // setValue("experience.city", exp.city || "");
    setValue("experience.locationType", exp.location_type || "");
    setValue("experience.startDate", exp.start_date || "");
    setValue("experience.endDate", exp.end_date || "");
    setValue("experience.stillWorking", exp.still_working);
    setShowDropdown(false);
  };

  const handleAddExperience = () => {
    handleSubmit(onSubmit)();
  };

  const handleRemoveExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const onSubmit = (data: IApplicationData) => {
    const experience: IExperience = {
      job_title: data.experience?.jobTitle || "",
      company_name: data.experience?.companyName || "",
      location: data.experience?.location as Country,
      // city: data.experience?.city || "",
      location_type: data.experience?.locationType as LocationType,
      start_date: data.experience?.startDate || "",
      end_date: data.experience?.endDate || "",
      still_working: data.experience?.currentlyWorking || false,
      id: Math.random(),
      employment_type: data.experience?.employment_type as EmploymentType,
    };

    setExperiences((prev) => [...prev, experience]);
    console.log("Experience added:", experience);
  };

  const experienceList = experienceData?.experiences ?? [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-left"
    >
      <div className="relative mx-2 mb-4 flex items-center justify-end">
        {!isLoading && experienceList.length > 0 && (
          <button
            type="button"
            onClick={() => setShowDropdown((prev) => !prev)}
            className="text-blue-600 flex items-center text-sm underline"
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

      <InputField errors={errors.experience as FieldErrors} id="location">
        <Input
          register={register}
          name={"experience.location"}
          options={{ required: "Location is required" }}
          props={{ id: "location", type: "text", placeholder: "Location" }}
        />
      </InputField>

      <InputField errors={errors.experience as FieldErrors} id="city">
        <Input
          register={register}
          name={"experience.city"}
          options={{ required: "City is required" }}
          props={{ id: "city", type: "text", placeholder: "City" }}
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
                  {exp.job_title} - {exp.company_name}
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
    </form>
  );
}

export default ApplicationExperience;
