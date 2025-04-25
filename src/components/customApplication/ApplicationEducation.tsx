import { useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import StartToEndDate from "../common/StartToEndDate";

function ApplicationEducation() {
  const {
    register,
    // watch,
    formState: { errors },
  } = useFormContext();
  // const { setApplicationData } = useApplication();
  // const currentlyStudying = watch("currentlyStudying");

  // const onSubmit = (data: EducationFormData) => {
  //   setApplicationData((prev) => ({
  //     ...prev,
  //     education: data,
  //   }));
  // };

  return (
    <>
      <InputField errors={errors} id="customUniversity">
        <Input
          register={register}
          name={"education.university"}
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
          name={"education.fieldOfStudy"}
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
          name={"education.gpa"}
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
        startDate="education.startDate"
        endDate="education.endDate"
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
    </>
  );
}

export default ApplicationEducation;
