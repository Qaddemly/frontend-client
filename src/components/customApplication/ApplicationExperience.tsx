import { useApplication } from "../../context/ApplicationContext";
import { useForm } from "react-hook-form";
import { LocationType, Country } from "../../enums/index.enums";
import Input from "../common/Input";
import InputField from "../common/InputField";
import Select from "../common/Select";
import Button from "../common/Button";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ExperienceFormData {
  jobTitle: string;
  companyName: string;
  location: Country;
  city: string;
  locationType: LocationType;
  startDate: string;
  endDate?: string;
  // currentlyWorking: boolean;
  // description?: string;
}

interface ExperienceData {
  id: number;
  jobTitle: string;
  companyName: string;
  location: string;
  city: string;
  locationType: string;
  startDate: string;
  endDate?: string;
  // currentlyWorking: boolean;
}

function ApplicationExperience({
  nextStep,
  // prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    resetField,
  } = useForm<ExperienceFormData>();
  const { applicationData, setApplicationData } = useApplication();

  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);

  const handleAddExperience = () => {
    const newExperience: ExperienceData = {
      id: Date.now(),
      jobTitle: getValues("jobTitle"),
      companyName: getValues("companyName"),
      location: getValues("location"),
      city: getValues("city"),
      locationType: getValues("locationType"),
      startDate: getValues("startDate"),
      endDate: getValues("endDate"),
      // currentlyWorking: getValues("currentlyWorking"),
    };

    setApplicationData((prev) => ({
      ...prev,
      experience: [...(prev.experience || []), newExperience],
    }));

    // Reset form fields
    resetField("jobTitle");
    resetField("companyName");
    resetField("location");
    resetField("city");
    resetField("locationType");
    resetField("startDate");
    resetField("endDate");
    // resetField("currentlyWorking");
  };

  const handleRemoveExperience = (id: number) => {
    setApplicationData((prev) => ({
      ...prev,
      experience: prev.experience?.filter((exp) => exp.id !== id),
    }));
  };

  const onSubmit = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-center text-3xl font-bold">Experiences</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-left">
          <InputField errors={errors} id="customJobTitle">
            <Input
              register={register}
              name={"jobTitle"}
              props={{
                id: "customJobTitle",
                type: "text",
                placeholder: "Job Title",
              }}
            />
          </InputField>

          <InputField errors={errors} id="customCompanyName">
            <Input
              register={register}
              name={"companyName"}
              props={{
                id: "customCompanyName",
                type: "text",
                placeholder: "Company Name",
              }}
            />
          </InputField>

          <div className="flex w-full items-center gap-3">
            <Select register={register} name="location" id="customLocation">
              {countryValues.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>

            <InputField
              errors={errors}
              id="customCity"
              props={{ className: "w-full" }}
            >
              <Input
                register={register}
                name={"city"}
                props={{
                  id: "customCity",
                  type: "text",
                  placeholder: "City",
                }}
              />
            </InputField>
          </div>

          <Select name="locationType" register={register} id="locationType">
            {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>

          <StartToEndDate
            startDate={"startDate"}
            endDate={"endDate"}
            register={register}
            // currentlyWorkingField="currentlyWorking"
          />

          {/* <div className="flex items-center justify-end">
            <input
              {...register("currentlyWorking")}
              type="checkbox"
              id="currentlyWorking"
              className="text-green-600 focus:ring-green-500 h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="currentlyWorking" className="ms-2 font-medium">
              I currently work here
            </label>
          </div> */}

          <Button
            onClick={handleAddExperience}
            type="button"
            className="m-auto mt-2 w-fit px-4 py-2 md:mt-6"
          >
            Add Experience
          </Button>
        </div>

        {/* Display added experiences */}
        {applicationData?.experience?.length ? (
          <div className="mt-4">
            <h3 className="mb-2 text-base font-medium">Experiences Added</h3>
            <div className="flex flex-row flex-wrap gap-2">
              {applicationData.experience.map((exp) => (
                <div className="flex w-fit flex-row items-center justify-between gap-3 rounded-full bg-green-200 p-3 text-white">
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
      </form>
    </div>
  );
}

export default ApplicationExperience;
