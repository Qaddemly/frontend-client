import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import InputField from "../common/InputField";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import Select from "../common/Select";
import { IError, IExperience } from "../../interfaces/Auth.interfaces";
import { useUpdateProfileMutation } from "../../services/profileApi";
import Loader from "../common/Loader";
import { Country, EmploymentType, LocationType } from "../auth";
import { createFormData } from "../../utils/helpers";
import toast from "react-hot-toast";

function Experience() {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const employmentTypeValues = Object.values(EmploymentType);
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);

  type TExperience = {
    experience: IExperience;
  };
  const methods = useForm<TExperience>();
  const { register, handleSubmit, reset } = methods;

  const submitForm: SubmitHandler<TExperience> = async (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data.experience).filter(([key]) => key !== "experience"),
    );

    const formData = createFormData(filteredData);
    if (Object.entries(filteredData).length)
      try {
        const res = await updateProfile(formData).unwrap();
        console.log(res);
        toast.success("Profile Updated");
        reset();
      } catch (err) {
        const error = err as IError;
        toast.error(error.data.message);
      }
  };

  return (
    <FormProvider {...methods}>
      {isLoading && <Loader />}
      <form
        className="mt-10 flex w-[30rem] flex-col px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="mb-5 flex justify-between">
          <InputField id="Job title" label="Job title">
            <Input
              register={register}
              name="experience.jobTitle"
              props={{
                placeholder: "Ex. Retail Sales Manager",
                type: "text",
                id: "Job title",
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
        </div>

        <InputField id="Company name" label="Company name">
          <Input
            register={register}
            name="experience.companyName"
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
        </div>

        <StartToEndDate
          startDate="experience.startDate"
          endDate="experience.endDate"
          register={register}
        />
        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Save Changes</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Experience;
