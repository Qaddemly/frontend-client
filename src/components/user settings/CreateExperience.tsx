import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import Select from "../common/Select";
import { Country, EmploymentType, LocationType } from "../../enums/index.enums";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import { useAddNewExperienceMutation } from "../../services/profileApi";
import { handleApiError } from "../../utils/helpers";
import Loader from "../common/Loader";

type TCreateExperience = {
  jobTitle: string;
  companyName: string;
  location: string;
  locationType: string;
  stillWorking: boolean;
  employmentType: string;
  startDate: string;
  endDate: string;
};
function CreateExperience() {
  const employmentTypeValues = Object.keys(EmploymentType);
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);
  const methods = useForm<TCreateExperience>();
  const { register, handleSubmit } = methods;
  const [addNewExperience, { isLoading }] = useAddNewExperienceMutation();

  const submitForm: SubmitHandler<TCreateExperience> = async (data) => {
    if (
      data.jobTitle.length &&
      data.companyName.length &&
      data.location.length &&
      data.locationType.length &&
      data.employmentType.length &&
      data.jobTitle.length &&
      data.startDate.length &&
      data.endDate.length
    )
      console.log(data);

    try {
      await addNewExperience(data).unwrap();
    } catch (error) {
      handleApiError(error);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <FormProvider {...methods}>
      <form
        className="mt-10 flex w-[35rem] flex-col px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <p className="mb-10 text-xl font-semibold">Add new experience</p>
        <div className="mb-5 flex justify-between">
          <InputField id="Job title" label="Job title">
            <Input
              register={register}
              name="jobTitle"
              props={{
                placeholder: "Ex. Retail Sales Manager",
                type: "text",
                id: "Job title",
              }}
            />
          </InputField>

          <Select
            register={register}
            name="employmentType"
            label="Employment type"
            id="employmentType"
            props={{
              id: "employmentType",
              defaultValue: "",
            }}
          >
            <option value="">Select employment type</option>
            {employmentTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>

        <InputField id="Company name" label="Company name">
          <Input
            register={register}
            name="companyName"
            props={{
              placeholder: "Ex. Microsoft",
              type: "text",
              id: "Company name",
            }}
          />
        </InputField>

        <div className="my-5 flex justify-between">
          <Select
            register={register}
            name="location"
            label="Location"
            id="location"
            props={{
              id: "location",
              defaultValue: "",
            }}
          >
            <option value="">Select location value</option>
            {countryValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>

          <Select
            name="locationType"
            register={register}
            label="Location type"
            id="locationType"
            props={{
              id: "locationType",
              defaultValue: "",
            }}
          >
            <option value="">Select location type value</option>
            {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>

        <StartToEndDate
          startDate="startDate"
          endDate="endDate"
          register={register}
        />

        <div className="my-5 flex items-center">
          <input
            {...register("stillWorking")}
            type="checkbox"
            id="stillWorking"
            className="text-green-600 focus:ring-green-500 h-4 w-4 rounded border-gray-300"
          />

          <label htmlFor="stillWorking" className="ms-2 font-medium">
            I am currently working in this role
          </label>
        </div>
        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Create</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default CreateExperience;
