import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import StartToEndDate from "../../common/StartToEndDate.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import { FormEvent, useState } from "react";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import {
  useAddResumeEducationMutation,
  useDeleteResumeEducationMutation,
  useGetAllResumeEducationQuery,
  useUpdateResumeEducationMutation,
} from "../../../services/resumeBuilderApi.ts";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";

type FormMode = "add" | "edit";

function ResumeEducationForm({ mode }: { mode: FormMode }) {
  const { resumeId } = useParams();
  const { currId, resumeInfo, setResumeInfo, setStatus } = useResumeBuilder();

  const { refetch } = useGetAllResumeEducationQuery({
    resumeId: resumeId || "",
  });
  const [addResumeEducation] = useAddResumeEducationMutation();
  const [updateResumeEducation] = useUpdateResumeEducationMutation();
  const [deleteResumeEducation] = useDeleteResumeEducationMutation();

  const indexOfCurrEdu = resumeInfo?.education?.findIndex(
    (edu) => edu?.id === currId,
  );
  const [degree, setDegree] = useState(
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.degree
      ? resumeInfo.education[indexOfCurrEdu].degree
      : "",
  );
  const [school, setSchool] = useState(
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.school
      ? resumeInfo.education[indexOfCurrEdu].school
      : "",
  );
  const [country, setCountry] = useState(
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.country
      ? resumeInfo.education[indexOfCurrEdu].country
      : "",
  );
  const [city, setCity] = useState(
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.city
      ? resumeInfo.education[indexOfCurrEdu].city
      : "",
  );
  const [startDate, setStartDate] = useState(
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.start_date
      ? resumeInfo.education[indexOfCurrEdu].start_date
      : "",
  );
  const [endDate, setEndDate] = useState(
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.end_date
      ? resumeInfo.education[indexOfCurrEdu].end_date
      : "",
  );
  const [description, setDescription] = useState(
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.description
      ? resumeInfo.education[indexOfCurrEdu].description
      : "",
  );

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const educationData = {
      degree: degree,
      school: school,
      city: city,
      country: country,
      start_year: Number(startDate?.split("-")[0]),
      start_month: Number(startDate?.split("-")[1]),
      end_year: Number(endDate?.split("-")[0]),
      end_month: Number(endDate?.split("-")[1]),
      description: description,
      school_link: "",
      is_current: false,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeEducation({
              data: educationData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        setStatus(["normal"]);
        refetch();
      } else {
        await handleResumeAction(
          () =>
            updateResumeEducation({
              data: educationData,
              resumeId: resumeId || "",
              educationId: currId.toString() || "",
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
      case "degree":
        setDegree(value);
        break;
      case "school":
        setSchool(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "city":
        setCity(value);
        break;
      case "start_date":
        setStartDate(value);
        break;
      case "end_date":
        setEndDate(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }

    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.education];

      if (mode === "add") {
        const existingEducation = updatedArray.find((edu) => edu.id === 303030);
        if (existingEducation) {
          updatedArray[resumeInfo?.education?.length - 1] = {
            ...updatedArray[resumeInfo?.education?.length - 1],
            [field]: value,
          };
        } else {
          updatedArray.push({
            id: 303030,
            degree: "",
            school: "",
            country: "",
            city: "",
            start_year: 0,
            start_month: 0,
            end_year: 0,
            end_month: 0,
            description: "",
            school_link: "",
            is_current: false,
          });
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrEdu]) {
          updatedArray[indexOfCurrEdu] = {
            ...updatedArray[indexOfCurrEdu],
            [field]: value,
          };
        }
      }
      return {
        ...prevInfo,
        education: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumeEducation({
            resumeId: resumeId || "",
            educationId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.education.filter(
          (edu) => edu.id !== currId,
        );
        return {
          ...prevInfo,
          education: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "edit" ? "Edit Education" : "Add Education"}
      autoFill={true}
      tips={true}
    >
      <form
        onSubmit={(e) => submitForm(e)}
        className="flex w-full flex-col gap-5"
      >
        <InputField id="degree" label="Degree">
          <Input
            onChange={(e) => handleOnChange(e, "degree")}
            value={degree}
            name="degree"
            props={{
              placeholder: "Degree / Field of study",
              type: "text",
              id: "degree",
            }}
          />
        </InputField>

        <InputField id="school" label="School">
          <Input
            onChange={(e) => handleOnChange(e, "school")}
            value={school}
            name="school"
            props={{
              placeholder: "School / University",
              type: "text",
              id: "school",
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
          onChangeStartDate={(e) => handleOnChange(e, "end_date")}
          endDate="end_date"
          onChangeEndDate={(e) => handleOnChange(e, "start_date")}
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
              const updatedArray = prevInfo.education.filter(
                (edu) => edu.id !== 303030,
              );
              return {
                ...prevInfo,
                education: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeEducationForm;
