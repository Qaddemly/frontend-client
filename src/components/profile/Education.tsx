import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import AuthInput from "../auth/AuthInput";
import AuthInputField from "../auth/AuthInputField";
import AuthButton from "../auth/AuthButton";
import AuthStartToEndDate from "../auth/AuthStartToEndDate";
import Loader from "../common/Loader";
import { useUpdateProfileMutation } from "../../services/profileApi";
import { IEducation, IError } from "../../interfaces/Auth.interfaces";
import { createFormData } from "../../utils/helpers";
import toast from "react-hot-toast";

function Education() {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  type TEducation = {
    education: IEducation;
  };

  const methods = useForm<TEducation>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const submitForm: SubmitHandler<TEducation> = async (data) => {
    let filteredData: Partial<TEducation> = data;
    if (data.education?.university?.length === 0)
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "education"),
      );
    console.log(filteredData);
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
        className="mt-10 w-[40rem] space-y-3 px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <AuthInputField id="University" errors={errors} label="University">
          <AuthInput
            register={register}
            name="education.university"
            props={{
              placeholder: "Ex. Tanta University",
              type: "text",
              id: "University",
            }}
          />
        </AuthInputField>

        <AuthInputField
          id="Field of study"
          errors={errors}
          label="Field of study"
        >
          <AuthInput
            register={register}
            name="education.fieldOfStudy"
            props={{
              placeholder: "Ex. Engineering",
              type: "text",
              id: "Field of study",
            }}
          />
        </AuthInputField>

        <AuthInputField id="GPA" errors={errors} label="GPA">
          <AuthInput
            register={register}
            name="education.gpa"
            options={{
              min: { value: 1, message: "min value 1" },
              max: { value: 4, message: "max value 4" },
            }}
            props={{
              placeholder: "Ex. 3.65",
              type: "number",
              id: "GPA",
            }}
          />
        </AuthInputField>

        <div>
          <AuthStartToEndDate
            startDate="education.startDate"
            endDate="education.endDate"
            register={register}
          />
        </div>

        <AuthButton className="ml-[650px] px-2 py-2">Save Changes</AuthButton>
      </form>
    </FormProvider>
  );
}
export default Education;
