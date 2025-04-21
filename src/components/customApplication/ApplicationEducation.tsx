import { useApplication } from "../../context/ApplicationContext";
import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import StartToEndDate from "../common/StartToEndDate";

interface EducationFormData {
  university: string;
  fieldOfStudy: string;
  gpa: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
}

function ApplicationEducation({
  nextStep,
  // prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<EducationFormData>();
  const { setApplicationData } = useApplication();
  // const currentlyStudying = watch("currentlyStudying");

  const onSubmit = (data: EducationFormData) => {
    setApplicationData((prev) => ({
      ...prev,
      education: data,
    }));
    nextStep();
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-center text-3xl font-bold">Education</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField errors={errors} id="customUniversity">
          <Input
            register={register}
            name={"university"}
            props={{
              id: "customUniversity",
              type: "text",
              placeholder: "University",
            }}
          />
        </InputField>

        <InputField errors={errors} id="customFieldOfStudy">
          <Input
            register={register}
            name={"fieldOfStudy"}
            props={{
              id: "customFieldOfStudy",
              type: "text",
              placeholder: "Field Of Study",
            }}
          />
        </InputField>

        <InputField errors={errors} id="customGpa">
          <Input
            register={register}
            name={"gpa"}
            options={{
              min: { value: 1, message: "min value 1" },
              max: { value: 4, message: "max value 4" },
            }}
            props={{
              id: "customGpa",
              type: "number",
              placeholder: "GPA",
            }}
          />
        </InputField>

        <StartToEndDate
          startDate="startDate"
          endDate="endDate"
          register={register}
        />
        {/* TODO : add currentlyStudying checkbox  */}
        {/* <div className="flex items-center justify-end gap-2">
          <input
            type="checkbox"
            id="currentlyStudying"
            {...register("currentlyStudying")}
            className="h-4 w-4"
          />
          <label htmlFor="currentlyStudying">I currently study here</label>
        </div> */}

        {/* <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="rounded bg-gray-300 px-4 py-2"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-blue-500 rounded px-4 py-2 text-white"
          >
            Next
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default ApplicationEducation;
