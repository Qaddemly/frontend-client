import { useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useCreateEducationMutation } from "../../services/profileApi";
import { IEducation } from "../../interfaces/Auth.interfaces";
import { IApplicationData } from "../../interfaces/CustomApplication.interfaces";

function ApplicationEducation() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const [createEducation] = useCreateEducationMutation();
  const [showDropdown, setShowDropdown] = useState(false);

  const autofillOptions = [
    {
      label: "BE Computer Engineering",
      data: {
        university: "Tanta University",
        fieldOfStudy: "Computer Engineering",
        gpa: "3.5",
        startDate: { month: "09", year: "2017" },
        endDate: { month: "07", year: "2021" },
      },
    },
    {
      label: "Masters of Data Analytics",
      data: {
        university: "AUC",
        fieldOfStudy: "Data Analytics",
        gpa: "3.9",
        startDate: { month: "09", year: "2021" },
        endDate: { month: "06", year: "2023" },
      },
    },
  ];

  const handleAutofill = (data) => {
    setValue("education.university", data.university);
    setValue("education.fieldOfStudy", data.fieldOfStudy);
    setValue("education.gpa", data.gpa);
    setValue("education.startDate.month", data.startDate.month);
    setValue("education.startDate.year", data.startDate.year);
    setValue("education.endDate.month", data.endDate.month);
    setValue("education.endDate.year", data.endDate.year);
    setShowDropdown(false);
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
      console.log("Education added successfully!");
    } catch (error) {
      console.error("Error adding education:", error);
      console.log("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-left"
    >
      <div className="mx-2 mb-4 flex items-center justify-end">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-blue-600 text-sm underline"
        >
          <FontAwesomeIcon icon={faGlasses} className="mr-2" />
          Autofill?
        </button>

        {showDropdown && (
          <div className="absolute right-0 z-10 mt-[7.5rem] w-64 rounded border bg-white shadow">
            {autofillOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => handleAutofill(option.data)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <InputField errors={errors} id="customUniversity">
        <Input
          register={register}
          name={"education.university"}
          options={{ required: "University is required" }}
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
          options={{ required: "Field Of Study is required" }}
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
            required: "GPA is required",
            pattern: {
              value: /^[0-4](\.\d{1,2})?$/,
              message: "GPA must be a number between 0 and 4",
            },
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
    </form>
  );
}

export default ApplicationEducation;
