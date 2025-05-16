import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import InputField from "../common/InputField";
import Input from "../common/Input";
import StartToEndDate from "../common/StartToEndDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IEducation } from "../../interfaces/Auth.interfaces";
import Button from "../common/Button";
import { useGetEducationQuery } from "../../services/profileApi";
import Loader from "../common/Loader";

function ApplicationEducation() {
  const { register, setValue, getValues, clearErrors, trigger } =
    useFormContext();

  const [educationList, setEducationList] = useState<IEducation[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAutofillOpen, setIsAutofillOpen] = useState(false);
  const [autofillOptions, setAutofillOptions] = useState<IEducation[]>([]);

  const { data: educationData, isLoading, error } = useGetEducationQuery({});
  console.log(error);
  useEffect(() => {
    if (educationData) {
      setAutofillOptions(educationData.educations || []);
      setEducationList(educationData.educations || []);
    }
  }, [educationData]);

  const handleAddEducation = async () => {
    const isValid = await trigger("education");
    if (!isValid) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    const university = getValues("education.university")?.trim() || "";
    const fieldOfStudy = getValues("education.fieldOfStudy")?.trim() || "";
    const gpa = getValues("education.gpa");
    const startDate = getValues("education.startDate") || "";
    const endDate = getValues("education.endDate") || "";

    if (!university || !fieldOfStudy || !gpa || !startDate || !endDate) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const newEducation: IEducation = {
      id: Date.now(),
      university,
      field_of_study: fieldOfStudy,
      gpa: parseFloat(gpa),
      start_date: startDate,
      end_date: endDate,
      account_id: 0,
    };

    setEducationList((prev) => [...prev, newEducation]);

    clearErrors("education");
    setErrorMessage("");
    setValue("education.university", "");
    setValue("education.fieldOfStudy", "");
    setValue("education.gpa", "");
    setValue("education.startDate", "");
    setValue("education.endDate", "");
  };

  const handleRemoveEducation = (id: number) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
  };

  const handleAutofill = (data: IEducation) => {
    setValue("education.university", data.university);
    setValue("education.fieldOfStudy", data.field_of_study);
    setValue("education.gpa", String(data.gpa));
    setValue("education.startDate", data.start_date);
    setValue("education.endDate", data.end_date);
    setIsAutofillOpen(false);
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="flex flex-col gap-4 text-left">
        <div className="mx-2 mb-4 flex items-center justify-end">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsAutofillOpen((prev) => !prev)}
              className="text-blue-600 text-sm underline"
            >
              <FontAwesomeIcon icon={faGlasses} className="mr-2" />
              Autofill?
            </button>

            {isAutofillOpen && (
              <div className="absolute right-0 z-10 mt-2 w-64 rounded border bg-white shadow">
                {autofillOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => handleAutofill(option)}
                  >
                    {option.university} - {option.field_of_study}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <InputField id="university">
          <Input
            register={register}
            name={"education.university"}
            // options={{ required: "University is required" }}
            props={{
              id: "university",
              type: "text",
              placeholder: "University",
            }}
          />
        </InputField>

        <InputField id="fieldOfStudy">
          <Input
            register={register}
            name={"education.fieldOfStudy"}
            // options={{ required: "Field Of Study is required" }}
            props={{
              id: "fieldOfStudy",
              type: "text",
              placeholder: "Field Of Study",
            }}
          />
        </InputField>

        <InputField id="gpa">
          <Input
            register={register}
            name={"education.gpa"}
            options={{
              // required: "GPA is required",
              pattern: {
                value: /^[0-4](\.\d{1,2})?$/,
                message: "GPA must be a number between 0 and 4",
              },
            }}
            props={{ id: "gpa", type: "number", placeholder: "GPA" }}
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

        {errorMessage && (
          <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>
        )}

        {educationList.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 text-base font-medium">Educations Added</h3>
            <div className="flex flex-row flex-wrap gap-2">
              {educationList.map((edu) => (
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
        )}
      </div>
    </>
  );
}

export default ApplicationEducation;
