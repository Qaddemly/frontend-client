import { FieldErrors, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useCreateEducationMutation } from "../../services/profileApi";
import { IEducation } from "../../interfaces/Auth.interfaces";
import { IApplicationData } from "../../interfaces/CustomApplication.interfaces";
import { useGetEducationQuery } from "../../services/profileApi";
import Button from "../common/Button";

function ApplicationEducation() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const { data: educationData, isLoading } = useGetEducationQuery({});
  const [educations, setEducations] = useState<IEducation[]>([]);

  const [createEducation] = useCreateEducationMutation();
  const [showDropdown, setShowDropdown] = useState(false);
  // const toggleDropdown = () => setShowDropdown((prev) => !prev);
  // const autofillProfile = educationData?.educations?.[0];

  const handleAutofill = (edu: IEducation) => {
    setValue("education.university", edu.university || "");
    setValue("education.fieldOfStudy", edu.field_of_study || "");
    setValue("education.gpa", String(edu.gpa || ""));
    setValue("education.startDate.month", edu.start_date || "");

    setValue("education.endDate.month", edu.end_date || "");

    setShowDropdown(false);
  };
  const handleAddExperience = () => {
    handleSubmit(onSubmit)();
  };

  const handleRemoveEducation = (id: number) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id));
  };

  const onSubmit = async (data: IApplicationData) => {
    const education: IEducation = {
      university: data.education?.university || "",
      field_of_study: data.education?.fieldOfStudy || "",
      gpa: parseFloat(data.education?.gpa || ""),
      start_date: data.education?.startDate || "",
      end_date: data.education?.endDate || "",
      id: 0,
      account_id: 0,
    };

    try {
      await createEducation({ data: education }).unwrap();
      setEducations((prev) => [...prev, education]);

      console.log("Education added successfully!");
    } catch (error) {
      console.error("Error adding education:", error);
      console.log("Something went wrong.");
    }
  };
  const educationList = educationData?.educations ?? [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-left"
    >
      <div className="relative mx-2 mb-4 flex items-center justify-end">
        {!isLoading && educationList.length > 0 && (
          <button
            type="button"
            onClick={() => setShowDropdown((prev) => !prev)}
            className="text-blue-600 flex items-center text-sm underline"
          >
            <FontAwesomeIcon icon={faGlasses} className="mr-2" />
            Autofill?
          </button>
        )}

        {showDropdown && educationList.length > 0 && (
          <div className="absolute right-0 z-10 mt-2 max-h-60 w-64 overflow-auto rounded border bg-white shadow">
            {educationList.map((edu, index) => (
              <button
                key={index}
                type="button"
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  handleAutofill(edu);
                  setShowDropdown(false);
                }}
              >
                {edu.university} - {edu.field_of_study}
              </button>
            ))}
          </div>
        )}
      </div>

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
      <Button
        onClick={handleAddExperience}
        type="button"
        className="m-auto mt-2 w-fit px-4 py-2 md:mt-6"
      >
        Add Education
      </Button>
      {educations?.length ? (
        <div className="mt-4">
          <h3 className="mb-2 text-base font-medium">Educations Added</h3>
          <div className="flex flex-row flex-wrap gap-2">
            {educations.map((edu) => (
              <div
                key={edu.id}
                className="flex w-fit flex-row items-center justify-between gap-3 rounded-full bg-green-200 p-3 text-white"
              >
                <p>
                  {edu.university} - {edu.field_of_study}
                </p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer"
                  onClick={() => handleRemoveEducation(edu.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </form>
  );
}

export default ApplicationEducation;
