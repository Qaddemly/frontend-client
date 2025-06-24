import { FieldErrors, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { IEducation } from "../../interfaces/Auth.interfaces";
import { useGetEducationQuery } from "../../services/profileApi";
import Button from "../common/Button";
import { useApplication } from "../../context/ApplicationContext";
import { ICustomEducation } from "../../interfaces/CustomApplication.interfaces";

function ApplicationEducation() {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { data: educationData, isLoading } = useGetEducationQuery({});
  const { educations, setEducations } = useApplication();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAutofill = (edu: IEducation) => {
    setValue("education.university", edu.university || "");
    setValue("education.fieldOfStudy", edu.field_of_study || "");
    setValue("education.gpa", String(edu.gpa || ""));
    setValue("education.startDate", edu.start_date || "");
    setValue("education.endDate", edu.end_date || "");
    setShowDropdown(false);
  };

  const handleAddEducation = () => {
    const edu = getValues("education");

    if (
      !edu.university ||
      !edu.fieldOfStudy ||
      !edu.gpa ||
      !edu.startDate ||
      !edu.endDate
    )
      return;

    const newEducation: ICustomEducation = {
      id: educations.length + 1,
      university: edu.university,
      fieldOfStudy: edu.fieldOfStudy,
      gpa: edu.gpa,
      startDate: edu.startDate,
      endDate: edu.endDate,
    };

    setEducations((prev) => [...prev, newEducation]);

    setValue("education.university", "");
    setValue("education.fieldOfStudy", "");
    setValue("education.gpa", "");
    setValue("education.startDate", "");
    setValue("education.endDate", "");
  };

  const handleRemoveEducation = (id: number) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id));
  };

  const educationList = educationData?.educations ?? [];

  return (
    <>
      <div className="relative mx-2 mb-4 flex items-center justify-end">
        {!isLoading && educationList.length > 0 && (
          <button
            type="button"
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center text-sm text-gray-600 underline"
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
        onClick={handleAddEducation}
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
                  {edu.university} - {edu.fieldOfStudy}
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
    </>
  );
}

export default ApplicationEducation;
