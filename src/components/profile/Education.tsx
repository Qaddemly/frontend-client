import { SubmitHandler, useForm } from "react-hook-form";
import AuthInput from "../auth/AuthInput";
import AuthInputField from "../auth/AuthInputField";
import AuthButton from "../auth/AuthButton";

function Education() {
  type TEducation = {
    university: string;
    fieldOfStudy: string;
    GPA: string;
    date: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEducation>();
  const submitForm: SubmitHandler<TEducation> = (data) => {
    console.log(data);
  };
  return (
    <form className="mb-10 mt-5 space-y-5" onSubmit={handleSubmit(submitForm)}>
      <div className="flex">
        <AuthInputField id="University" errors={errors} label="University">
          <AuthInput
            register={register}
            name="university"
            props={{
              placeholder: "Ex. Tanta University",
              type: "text",
              id: "University",
            }}
          />
        </AuthInputField>
      </div>
      <div className="flex">
        <AuthInputField
          id="Field of study"
          errors={errors}
          label="Field of study"
        >
          <AuthInput
            register={register}
            name="fieldOfStudy"
            props={{
              placeholder: "Ex. Engineering",
              type: "text",
              id: "Field of study",
            }}
          />
        </AuthInputField>
      </div>
      <div className="flex">
        <AuthInputField id="GPA" errors={errors} label="GPA">
          <AuthInput
            register={register}
            name="GPA"
            options={{
              min: { value: 1, message: "min value 1" },
              max: { value: 4, message: "max value 4" },
            }}
            props={{
              placeholder: "Ex. 3.65",
              type: "text",
              id: "GPA",
            }}
          />
        </AuthInputField>
      </div>

      {/* <AuthStartToEndDate
        startDate="startEducationDate"
        endDate="endEducationDate"
        register={register}
      /> */}
      <AuthButton className="ml-[650px] px-2 py-2">Save Changes</AuthButton>
    </form>
  );
}
export default Education;
