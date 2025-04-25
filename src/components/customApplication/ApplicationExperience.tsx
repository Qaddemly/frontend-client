import { useApplication } from "../../context/ApplicationContext";
import { useFormContext } from "react-hook-form";
import { LocationType, Country } from "../../enums/index.enums";
import Input from "../common/Input";
import InputField from "../common/InputField";
import Select from "../common/Select";
import Button from "../common/Button";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ICustomExperience } from "../../interfaces/CustomApplication.interfaces";

function ApplicationExperience() {
  const {
    register,
    formState: { errors },
    getValues,
    resetField,
  } = useFormContext();
  const { setExperience, experience } = useApplication();

  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);

  const handleAddExperience = () => {
    const newExperience: ICustomExperience = {
      id: Date.now(),
      jobTitle: getValues("experience.jobTitle"),
      companyName: getValues("experience.companyName"),
      location: getValues("experience.location"),
      city: getValues("experience.city"),
      locationType: getValues("experience.locationType"),
      startDate: getValues("experience.startDate"),
      endDate: getValues("experience.endDate"),
      // currentlyWorking: getValues("currentlyWorking"),
    };
    setExperience((prev) => [...prev, newExperience]);

    // Reset form fields
    resetField("experience.jobTitle");
    resetField("experience.companyName");
    resetField("experience.location");
    resetField("experience.city");
    resetField("experience.locationType");
    resetField("experience.startDate");
    resetField("experience.endDate");
    // resetField("currentlyWorking");
  };

  const handleRemoveExperience = (id: number) => {
    setExperience((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <>
      <div className="flex flex-col gap-4 text-left">
        <InputField errors={errors} id="customJobTitle">
          <Input
            register={register}
            name={"experience.jobTitle"}
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
            name={"experience.companyName"}
            props={{
              id: "customCompanyName",
              type: "text",
              placeholder: "Company Name",
            }}
          />
        </InputField>

        <div className="flex w-full items-center gap-3">
          <Select
            register={register}
            name="experience.location"
            id="customLocation"
          >
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
              name={"experience.city"}
              props={{
                id: "customCity",
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
