import { FieldErrors, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import StartToEndDate from "../common/StartToEndDate";

function ApplicationEducation() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <InputField errors={errors.education as FieldErrors} id="university">
        <Input
          register={register}
          name={"education.university"}
          options={{ required: "University is required" }}
          props={{
            id: "university",
            type: "text",
            placeholder: "University",
          }}
        />
      </InputField>

      <InputField errors={errors.education as FieldErrors} id="fieldOfStudy">
        <Input
          register={register}
          name={"education.fieldOfStudy"}
          options={{ required: "Field Of Study is required" }}
          props={{
            id: "fieldOfStudy",
            type: "text",
            placeholder: "Field Of Study",
          }}
        />
      </InputField>

      <InputField errors={errors.education as FieldErrors} id="gpa">
        <Input
          register={register}
          name={"education.gpa"}
          options={{
            required: "GPA is required",
            pattern: {
              value: /^[0-4](\.\d{1,2})?$/,
              message: "GPA must be a number between 0 and 4",
            },
          }}
          props={{
            id: "gpa",
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
