import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import {
  FormMode,
  IExperienceInputs,
} from "../../../interfaces/ResumeBuilder.interfaces.ts";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useAddResumeExperienceMutation,
  useDeleteResumeExperienceMutation,
  useGetAllResumeExperienceQuery,
  useUpdateResumeExperienceMutation,
} from "../../../services/resumeBuilderApi.ts";
import { useState } from "react";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import StartToEndDate from "../../common/StartToEndDate.tsx";

function ResumeExperienceForm({ mode }: { mode: FormMode }) {
  const { setStatus, resumeInfo, setResumeInfo, currId } = useResumeBuilder();
  const { resumeId } = useParams();
  const { register, handleSubmit } = useForm<IExperienceInputs>();
  const indexOfCurrExp = resumeInfo?.experience?.findIndex(
    (exp) => exp?.id === currId,
  );

  const { refetch } = useGetAllResumeExperienceQuery({
    resumeId: resumeId || "",
  });
  const [addResumeExperience] = useAddResumeExperienceMutation();
  const [updateResumeExperience] = useUpdateResumeExperienceMutation();
  const [deleteResumeExperience] = useDeleteResumeExperienceMutation();

  const [jobTitle, setJobTitle] = useState(
    mode === "edit" && resumeInfo?.experience?.[indexOfCurrExp]?.name
      ? resumeInfo.experience[indexOfCurrExp].job_title
      : "",
  );
  const [company, setCompany] = useState(
    mode === "edit" && resumeInfo?.experience?.[indexOfCurrExp]?.information
      ? resumeInfo.experience[indexOfCurrExp].company_name
      : "",
  );
  const [country, setCountry] = useState(
    mode === "edit" && resumeInfo?.experience?.[indexOfCurrExp]?.level
      ? resumeInfo.experience[indexOfCurrExp].country
      : "",
  );
  const [city, setCity] = useState(
    mode === "edit" && resumeInfo?.experience?.[indexOfCurrExp]?.level
      ? resumeInfo.experience[indexOfCurrExp].city
      : "",
  );
  const [startDate, setStartDate] = useState(
    mode === "edit" && resumeInfo?.experience?.[indexOfCurrExp]?.level
      ? resumeInfo.experience[indexOfCurrExp].start_date
      : "",
  );
  const [endDate, setEndDate] = useState(
    mode === "edit" && resumeInfo?.experience?.[indexOfCurrExp]?.level
      ? resumeInfo.experience[indexOfCurrExp].end_date
      : "",
  );
  const [description, setDescription] = useState(
    mode === "edit" && resumeInfo?.experience?.[indexOfCurrExp]?.level
      ? resumeInfo.experience[indexOfCurrExp].description
      : "",
  );

  const submitForm: SubmitHandler<IExperienceInputs> = async () => {
    const experienceData = {
      job_title: jobTitle,
      company_name: company,
      country: country,
      city: city,
      start_date: startDate,
      end_date: endDate,
      description: description,
      is_current: false,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeExperience({
              data: experienceData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        refetch();
        setStatus(["normal"]);
      } else {
        await handleResumeAction(
          () =>
            updateResumeExperience({
              data: experienceData,
              resumeId: resumeId || "",
              experienceId: currId.toString() || "",
            }).unwrap(),
          mode,
        );
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement> | ContentEditableEvent,
    field: string,
  ) {
    const value = "target" in e ? e.target.value : e;
    switch (field) {
      case "job_title":
        setJobTitle(value);
        break;
      case "company_name":
        setCompany(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "city":
        setCity(value);
        break;
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }

    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.experience];

      if (mode === "add") {
        const existingExp = updatedArray.find((exp) => exp.id === 303030);
        if (existingExp) {
          updatedArray[resumeInfo?.experience?.length - 1] = {
            ...updatedArray[resumeInfo?.experience?.length - 1],
            [field]: value,
          };
        } else {
          updatedArray.push({
            id: 303030,
            job_title: "",
            company_name: "",
            country: "",
            city: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
          });
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrExp]) {
          updatedArray[indexOfCurrExp] = {
            ...updatedArray[indexOfCurrExp],
            [field]: value,
          };
        }
      }

      return {
        ...prevInfo,
        experience: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumeExperience({
            resumeId: resumeId || "",
            experienceId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.experience.filter(
          (exp) => exp.id !== currId,
        );
        return {
          ...prevInfo,
          experience: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "add" ? "Add Experience" : "Edit Experience"}
      tips={true}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full flex-col gap-5"
      >
        <InputField id="jobTitle" label="Job title">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "job_title")}
            value={jobTitle}
            name="jobTitle"
            props={{
              placeholder: "Enter job title",
              type: "text",
              id: "jobTitle",
            }}
          />
        </InputField>

        <InputField id="company" label="Employer">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "company_name")}
            value={company}
            name="company"
            props={{
              placeholder: "Enter employer",
              type: "text",
              id: "company",
            }}
          />
        </InputField>

        <div className="flex gap-5">
          <InputField id="country" label="Country">
            <Input
              onChange={(e) => handleOnChange(e, "country")}
              value={country}
              name="country"
              props={{
                placeholder: "Ex. Egypt",
                type: "text",
                id: "country",
              }}
            />
          </InputField>
          <InputField id="city" label="City">
            <Input
              onChange={(e) => handleOnChange(e, "city")}
              value={city}
              name="city"
              props={{
                placeholder: "Ex. Cairo",
                type: "text",
                id: "city",
              }}
            />
          </InputField>
        </div>

        <StartToEndDate
          startDate="start_date"
          startDateDefaultValue={startDate?.toString()}
          onChangeStartDate={(e) => handleOnChange(e, "endDate")}
          endDate="end_date"
          onChangeEndDate={(e) => handleOnChange(e, "startDate")}
          endDateDefaultValue={endDate?.toString()}
        />

        <RichTextEditor
          label="Description"
          value={description}
          onChange={(e) => handleOnChange(e, "description")}
        />

        <ResumeFormButtons
          mode={mode}
          handleDelete={(e) => handleDelete(e)}
          handleCancel={() => {
            setResumeInfo((prevInfo) => {
              const updatedArray = prevInfo.experience.filter(
                (exp) => exp.id !== 303030,
              );
              return {
                ...prevInfo,
                experience: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeExperienceForm;
