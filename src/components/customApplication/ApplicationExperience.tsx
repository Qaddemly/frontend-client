import { useApplication } from "../../context/ApplicationContext";
import { useFormContext } from "react-hook-form";
import { LocationType, Country } from "../../enums/index.enums";
import Input from "../common/Input";
import InputField from "../common/InputField";
import Select from "../common/Select";
import Button from "../common/Button";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useGetExperienceQuery } from "../../services/profileApi";
import { IExperience } from "../../interfaces/Auth.interfaces";
import Loader from "../common/Loader";

function ApplicationExperience() {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    trigger,
  } = useFormContext();
  const { setExperience, experience } = useApplication();

  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);

  const { data: experienceData, isLoading } = useGetExperienceQuery({});

  const [errorMessage, setErrorMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [autofillOptions, setAutofillOptions] = useState<IExperience[]>([]);

  useEffect(() => {
    if (experienceData) {
      setAutofillOptions(experienceData.experiences || []);
    }
  }, [experienceData]);

  const handleAddExperience = async () => {
    const isValid = await trigger("experience");
    if (!isValid) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    const jobTitle = getValues("experience.jobTitle");
    const companyName = getValues("experience.companyName");
    const location = getValues("experience.location");
    // const city = getValues("experience.city");
    const locationType = getValues("experience.locationType");
    const startDate = getValues("experience.startDate");
    const endDate = getValues("experience.endDate");
    const stillWorking = getValues("experience.stillWorking");
    const employmentType = getValues("experience.employmentType");

    if (
      !jobTitle ||
      !companyName ||
      !location ||
      !locationType ||
      !startDate ||
      !endDate
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const newExperience: IExperience = {
      id: Date.now(),
      job_title: jobTitle,
      company_name: companyName,
      location,
      // city,
      location_type: locationType,
      start_date: startDate,
      end_date: endDate,
      still_working: stillWorking || false,
      employment_type: employmentType,
      // account_id: 0,
    };

    setExperience([...experience, newExperience]);

    clearErrors("experience");
    setErrorMessage("");
    setValue("experience.jobTitle", "");
    setValue("experience.companyName", "");
    setValue("experience.location", "");
    setValue("experience.city", "");
    setValue("experience.locationType", "");
    setValue("experience.startDate", "");
    setValue("experience.endDate", "");
  };

  const handleRemoveExperience = (id: number) => {
    setExperience((prev: IExperience[]) => prev.filter((exp) => exp.id !== id));
  };

  const handleAutofill = (data: IExperience) => {
    setValue("experience.jobTitle", data.job_title);
    setValue("experience.companyName", data.company_name);
    setValue("experience.location", data.location);
    // setValue("experience.city", data.city);
    setValue("experience.locationType", data.location_type);
    setValue("experience.startDate", data.start_date);
    setValue("experience.endDate", data.end_date);
    setShowDropdown(false);
  };

  if (isLoading) return <Loader />;

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
                  onClick={() => handleAutofill(option)}
                >
                  {option.job_title} - {option.company_name}
                </button>
              ))}
            </div>
          )}
        </div>

        <InputField errors={errors} id="jobTitle">
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

        <InputField errors={errors} id="companyName">
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

          <InputField errors={errors} id="city" props={{ className: "w-full" }}>
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
          register={register}
          name="experience.locationType"
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

        {errorMessage && (
          <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>
        )}

        {experience.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 text-base font-medium">Experiences Added</h3>
            <div className="flex flex-row flex-wrap gap-2">
              {experience.map((exp) => (
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
      </div>
    </>
  );
}

export default ApplicationExperience;
