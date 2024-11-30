import { SubmitHandler, useForm } from "react-hook-form";
import AuthButton from "../auth/AuthButton";
import AuthInput from "../auth/AuthInput";
import AuthInputField from "../auth/AuthInputField";
import AuthSelect from "../auth/AuthSelect";
import AuthStartToEndDate from "../auth/AuthStartToEndDate";

function Experience() {
  type TExperience = {
    job_title: string;
    employment_type: string;
    company_name: string;
    location: string;
    location_type: string;
  };
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<TExperience>();
  const submitForm: SubmitHandler<TExperience> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mt-10 flex space-x-5">
        <AuthInputField id="Job title" label="Job title">
          <AuthInput
            register={register}
            name="job_title"
            props={{
              placeholder: "Ex. Retail Sales Manager",
              type: "text",
              id: "Job title",
            }}
          />
        </AuthInputField>

        <AuthSelect
          label="Employment type"
          register={register}
          name="employment_type"
          id="employmentType"
        >
          <option value="fullTime">Full Time</option>
          <option value="internship">Internship</option>
          <option value="partTime">Part Time</option>
        </AuthSelect>
      </div>
      <div className="mt-10 flex">
        <AuthInputField id="Company name" label="Company name">
          <AuthInput
            register={register}
            name="company_name"
            props={{
              placeholder: "Ex. Microsoft",
              type: "text",
              id: "Company name",
            }}
          />
        </AuthInputField>
      </div>
      <div className="mt-10 flex space-x-5">
        <AuthInputField id="location" label="Location">
          <AuthInput
            register={register}
            name="location"
            props={{
              id: "location",
              type: "text",
              placeholder: "Ex. London, United Kingdom",
            }}
          />
        </AuthInputField>
        <AuthSelect
          register={register}
          name="location_type"
          label="Location type"
          id="locationType"
        >
          <option value="insite">Insite</option>
          <option value="remote">Remote</option>
        </AuthSelect>
      </div>
      <div className="mb-10 mt-10 flex items-center">
        <input
          id="green-checkbox"
          type="checkbox"
          value="d"
          className="text-green-600 focus:ring-green-500 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2"
        />

        <label htmlFor="default-checkbox" className="ms-2 font-medium">
          I am currently working in this role
        </label>
      </div>
      {/* <AuthStartToEndDate
        startDate="startEducationDate"
        endDate="endEducationDate"
        register={register}
      /> */}
      {/* <AuthStartToEndDate /> */}
      <AuthButton className="ml-[650px] px-2 py-2">Save Changes</AuthButton>
    </form>
  );
}

export default Experience;
