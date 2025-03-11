import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import StartToEndDate from "../../common/StartToEndDate.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import { useState } from "react";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import {
  useAddResumeEducationMutation,
  useDeleteResumeEducationMutation,
  useUpdateResumeEducationMutation,
} from "../../../services/resumeBuilderApi.ts";
import { handleApiError } from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IEducationInputs } from "../../../interfaces/ResumeBuilder.interfaces.ts";

type FormMode = "add" | "edit";

function ResumeEducationForm({ mode }: { mode: FormMode }) {
  const { resumeId } = useParams();
  const { currEduId, resumeInfo, setResumeInfo, setStatus } =
    useResumeBuilder();
  const [addResumeEducation] = useAddResumeEducationMutation();
  const [updateResumeEducation] = useUpdateResumeEducationMutation();
  const [deleteResumePersonal] = useDeleteResumeEducationMutation();

  const indexOfCurrEdu = resumeInfo?.education?.findIndex(
    (edu) => edu?.id === currEduId,
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
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.startDate
      ? resumeInfo.education[indexOfCurrEdu].startDate
      : "",
  );
  const [endDate, setEndDate] = useState(
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.endDate
      ? resumeInfo.education[indexOfCurrEdu].endDate
      : "",
  );
  const [description, setDescription] = useState(
    mode === "edit" && resumeInfo?.education?.[indexOfCurrEdu]?.description
      ? resumeInfo.education[indexOfCurrEdu].description
      : "",
  );

  const { register, handleSubmit } = useForm<IEducationInputs>();

  const submitForm: SubmitHandler<IEducationInputs> = (data) => {
    if (mode === "add")
      try {
        if (data?.degree.length > 0 && mode === "add") {
          const res = addResumeEducation({
            data: {
              degree: data.degree,
              school: data.school,
              city: data.city,
              country: data.country,
              start_year: data.start_year,
              start_month: data.start_month,
              end_year: data.end_year,
              end_month: data.end_month,
              description: data.school,
              school_link: "",
              is_current: false,
            },
            resumeId: resumeId || "",
          });

          toast.promise(res, {
            loading: "Adding",
            success: "Added education info successfully",
            error: "Could not save education info",
          });
        }
      } catch (error) {
        handleApiError(error);
      }
    else {
      try {
        const res = updateResumeEducation({
          data: {
            degree: data.degree,
            school: data.school,
            city: data.city,
            country: data.country,
            start_year: data.start_year,
            start_month: data.start_month,
            end_year: data.end_year,
            end_month: data.end_month,
            description: data.school,
            school_link: "",
            is_current: false,
          },
          resumeId: resumeId || "",
          educationId: currEduId.toString() || "",
        });

        toast.promise(res, {
          loading: "Updating",
          success: "Updated education info successfully",
          error: "Could not save education info",
        });
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    switch (name) {
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
      const updatedArray = [...prevInfo.education];
      if (mode === "add") {
        const existingEdu = updatedArray.find((edu) => edu.id === 303030);
        if (existingEdu) {
          console.log("exist", resumeInfo?.education?.length - 1);
          updatedArray[resumeInfo?.education?.length - 1] = {
            ...updatedArray[resumeInfo?.education?.length - 1],
            [name]: value,
          };
        } else {
          console.log("not exist");
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
            description: value,
            school_link: "",
            is_current: false,
          });
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrEdu]) {
          updatedArray[indexOfCurrEdu] = {
            ...updatedArray[indexOfCurrEdu],
            [name]: value,
          };
        }
      }
      return {
        ...prevInfo,
        education: updatedArray,
      };
    });
  }

  function handleOnChangeTextEditor(e: ContentEditableEvent) {
    const { value } = e.target;
    setDescription(value);
    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.education];
      if (mode === "add") {
        const existingEdu = updatedArray.find((edu) => edu.id === 303030);
        if (existingEdu) {
          updatedArray[resumeInfo?.education?.length - 1] = {
            ...updatedArray[resumeInfo?.education?.length - 1],
            description: value,
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
            description: value,
            school_link: "",
            is_current: false,
          });
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrEdu]) {
          updatedArray[indexOfCurrEdu] = {
            ...updatedArray[indexOfCurrEdu],
            description: value,
          };
        }
      }
      return {
        ...prevInfo,
        education: updatedArray,
      };
    });
  }

  function handleDelte(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      const res = deleteResumePersonal({
        resumeId: resumeId || "",
        educationId: currEduId.toString() || "",
      }).unwrap();
      toast.promise(res, {
        loading: "Deleting",
        success: "Deleted education info successfully",
        error: "Could not delete education info",
      });
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.education.filter(
          (edu) => edu.id !== currEduId,
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
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full flex-col gap-5"
      >
        <InputField id="degree" label="Degree">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e)}
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
            register={register}
            onChange={(e) => handleOnChange(e)}
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
              register={register}
              onChange={(e) => handleOnChange(e)}
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
              register={register}
              onChange={(e) => handleOnChange(e)}
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
          register={register}
          startDate="start_Date"
          startDateDefaultValue={startDate?.toString()}
          onChangeStartDate={(e) => handleOnChange(e)}
          endDate="end_Date"
          onChangeEndDate={(e) => handleOnChange(e)}
          endDateDefaultValue={endDate?.toString()}
        />

        <RichTextEditor
          label="Description"
          value={description}
          onChange={(e) => handleOnChangeTextEditor(e)}
        />
        <ResumeFormButtons mode={mode} handleDelete={(e) => handleDelte(e)} />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeEducationForm;
