import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import { IEducation } from "../../interfaces/Auth.interfaces";
import InputField from "../common/InputField";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useUpdateEducationMutation } from "../../services/profileApi";
import Loader from "../common/Loader";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";

function Education() {
  const [updateEducation, { isLoading }] = useUpdateEducationMutation();
  const currentEducation = useSelector(
    (state: RootState) => state.user.user.education,
  );

  const methods = useForm<IEducation>({
    defaultValues: {
      university: currentEducation?.university || "",
      field_of_study: currentEducation?.field_of_study || "",
      gpa: currentEducation?.gpa ? Number(currentEducation.gpa) : undefined,
      start_date: currentEducation?.start_date || "",
      end_date: currentEducation?.end_date || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitForm: SubmitHandler<IEducation> = async (data) => {
    try {
      await updateEducation({ data }).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    methods.reset({
      university: currentEducation?.university || "",
      field_of_study: currentEducation?.field_of_study || "",
      gpa: currentEducation?.gpa ? Number(currentEducation.gpa) : undefined,
      start_date: currentEducation?.start_date || "",
      end_date: currentEducation?.end_date || "",
    });
  }, [currentEducation, methods.reset, methods]);

  if (isLoading) return <Loader />;
  return (
    <FormProvider {...methods}>
      <form
        className="mt-10 flex w-[40rem] flex-col gap-3 px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <InputField id="University" errors={errors} label="University">
          <Input
            register={register}
            name="university"
            props={{
              placeholder: "Ex. Tanta University",
              type: "text",
              id: "University",
            }}
          />
        </InputField>

        <InputField id="Field of study" errors={errors} label="Field of study">
          <Input
            register={register}
            name="field_of_study"
            props={{
              placeholder: "Ex. Engineering",
              type: "text",
              id: "Field of study",
            }}
          />
        </InputField>

        <InputField id="GPA" errors={errors} label="GPA">
          <Input
            register={register}
            name="gpa"
            options={{
              min: { value: 1, message: "min value 1" },
              max: { value: 4, message: "max value 4" },
            }}
            props={{
              placeholder: "Ex. 3.65",
              type: "number",
              step: "0.01",
              id: "GPA",
            }}
          />
        </InputField>

        <div>
          <StartToEndDate
            startDate="start_date"
            endDate="end_date"
            register={register}
          />
        </div>

        <div className="self-end">
          <Button className="px-2 py-2">Save Changes</Button>
        </div>
      </form>
    </FormProvider>
  );
}
export default Education;
