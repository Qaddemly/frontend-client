import { useApplication } from "../../context/ApplicationContext";
import { FieldErrors, useFormContext } from "react-hook-form";
import { LocationType, Country } from "../../enums/index.enums";
import Input from "../common/Input";
import InputField from "../common/InputField";
import Select from "../common/Select";
import Button from "../common/Button";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  useCreateExperienceMutation,
  useDeleteExperienceMutation,
} from "../../services/profileApi";
import { IExperience } from "../../interfaces/Auth.interfaces";
import { ICustomExperience } from "../../interfaces/CustomApplication.interfaces";

function ApplicationExperience() {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    resetField,
  } = useFormContext();
  const { setExperience, experience } = useApplication();

  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);

  const [createExperience] = useCreateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const transformToCustomExperience = (
    experience: IExperience,
  ): ICustomExperience => ({
    id: experience.id,
    jobTitle: experience.job_title,
    companyName: experience.company_name,
    location: experience.location,
    city: "",
    locationType: experience.location_type,
    startDate: experience.start_date,
    endDate: experience.end_date,
    currentlyWorking: experience.still_working,
  });

  const handleAddExperience = async () => {
    const newExperience = {
      jobTitle: getValues("experience.jobTitle"),
      companyName: getValues("experience.companyName"),
      location: getValues("experience.location"),
      city: getValues("experience.city") || "",
      locationType: getValues("experience.locationType"),
      startDate: getValues("experience.startDate"),
      endDate: getValues("experience.endDate"),
      employmentType: getValues("experience.employmentType"),
      stillWorking: getValues("experience.stillWorking") || false,
    };

    console.log("newExperience:", newExperience);

    try {
      const res = await createExperience({ data: newExperience }).unwrap();

      const transformedExperience = transformToCustomExperience(res.experience);

      setExperience((prev) => [...prev, transformedExperience]);

      resetField("experience.jobTitle");
      resetField("experience.companyName");
      resetField("experience.location");
      resetField("experience.city");
      resetField("experience.locationType");
      resetField("experience.startDate");
      resetField("experience.endDate");
    } catch (error) {
      console.error("Failed to add experience:", error);
    }
  };

  const handleRemoveExperience = async (id: number | string) => {
    try {
      await deleteExperience({ id }).unwrap();
      setExperience((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  const autofillOptions = [
    {
      label: "Software Engineer at Google",
      data: {
        jobTitle: "Software Engineer",
        companyName: "Google",
        location: "United States",
        city: "Mountain View",
        locationType: "Onsite",
        startDate: { month: "06", year: "2021" },
        endDate: { month: "04", year: "2023" },
      },
    },
    {
      label: "Data Analyst at Microsoft",
      data: {
        jobTitle: "Data Analyst",
        companyName: "Microsoft",
        location: "United States",
        city: "Redmond",
        locationType: "Hybrid",
        startDate: { month: "01", year: "2020" },
        endDate: { month: "12", year: "2022" },
      },
    },
  ];

  const [showDropdown, setShowDropdown] = useState(false);

  const handleAutofill = (data) => {
    setValue("experience.jobTitle", data.jobTitle);
    setValue("experience.companyName", data.companyName);
    setValue("experience.location", data.location);
    setValue("experience.city", data.city);
    setValue("experience.locationType", data.locationType);
    setValue("experience.startDate.month", data.startDate.month);
    setValue("experience.startDate.year", data.startDate.year);
    setValue("experience.endDate.month", data.endDate.month);
    setValue("experience.endDate.year", data.endDate.year);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 text-left">
        <div className="mx-2 mb-4 flex items-center justify-end">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-blue-600 text-sm underline"
          >
            <FontAwesomeIcon icon={faGlasses} className="mr-2" />
            Autofill?
          </button>

          {showDropdown && (
            <div className="absolute right-0 z-10 mt-1 w-64 rounded border bg-white shadow">
              {autofillOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleAutofill(option.data)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <InputField errors={errors} id="customJobTitle">
          <Input
            register={register}
            name={"experience.jobTitle"}
            props={{
              id: "jobTitle",
              type: "text",
              placeholder: "Job Title",
            }}
          />
        </InputField>

        <InputField errors={errors.experience as FieldErrors} id="companyName">
          <Input
            register={register}
            name={"experience.companyName"}
            props={{
              id: "companyName",
              type: "text",
              placeholder: "Company Name",
            }}
          />
        </InputField>

        <div className="flex w-full items-center gap-3">
          <Select register={register} name="experience.location" id="location">
            {countryValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>

          <InputField
            errors={errors.experience as FieldErrors}
            id="city"
            props={{ className: "w-full" }}
          >
            <Input
              register={register}
              name={"experience.city"}
              props={{
                id: "city",
                type: "text",
                placeholder: "City",
              }}
            />
          </InputField>
        </div>

        <Select
          name="experience.locationType"
          register={register}
          id="locationType"
        >
          {locationTypeValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </Select>

        <StartToEndDate
          startDate={"experience.startDate"}
          endDate={"experience.endDate"}
          register={register}
        />

        <Button
          onClick={handleAddExperience}
          type="button"
          className="m-auto mt-2 w-fit px-4 py-2 md:mt-6"
        >
          Add Experience
        </Button>
      </div>

      {experience?.length ? (
        <div className="mt-4">
          <h3 className="mb-2 text-base font-medium">Experiences Added</h3>
          <div className="flex flex-row flex-wrap gap-2">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="flex w-fit flex-row items-center justify-between gap-3 rounded-full bg-green-200 p-3 text-white"
              >
                <p>{exp.jobTitle}</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer"
                  onClick={() => handleRemoveExperience(exp.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ApplicationExperience;
