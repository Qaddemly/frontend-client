import { useParams } from "react-router-dom";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import {
  useAddResumeCustomMutation,
  useDeleteResumeCustomMutation,
  useGetAllResumeCustomQuery,
  useUpdateResumeCustomMutation,
} from "../../../services/resumeBuilderApi.ts";
import { FormEvent, useState } from "react";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import StartToEndDate from "../../common/StartToEndDate.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import { FormMode } from "../../../interfaces/ResumeBuilder.interfaces.ts";

function ResumeCustomForm({ mode }: { mode: FormMode }) {
  const { resumeId } = useParams();
  const { currId, resumeInfo, setResumeInfo, setStatus } = useResumeBuilder();

  const { refetch } = useGetAllResumeCustomQuery({
    resumeId: resumeId || "",
  });
  const [addResumeCustom] = useAddResumeCustomMutation();
  const [updateResumeCustom] = useUpdateResumeCustomMutation();
  const [deleteResumeCustom] = useDeleteResumeCustomMutation();

  const indexOfCurrCustom = resumeInfo?.custom?.findIndex(
    (custom) => custom?.id === currId,
  );
  const [sectionName, setSectionName] = useState(
    mode === "edit" && resumeInfo?.custom?.[indexOfCurrCustom]?.section_name
      ? resumeInfo.custom[indexOfCurrCustom].section_name
      : "",
  );
  const [title, setTitle] = useState(
    mode === "edit" && resumeInfo?.custom?.[indexOfCurrCustom]?.title
      ? resumeInfo.custom[indexOfCurrCustom].title
      : "",
  );
  const [subtitle, setSubtitle] = useState(
    mode === "edit" && resumeInfo?.custom?.[indexOfCurrCustom]?.subtitle
      ? resumeInfo.custom[indexOfCurrCustom].subtitle
      : "",
  );
  const [country, setCountry] = useState(
    mode === "edit" && resumeInfo?.custom?.[indexOfCurrCustom]?.country
      ? resumeInfo.custom[indexOfCurrCustom].country
      : "",
  );
  const [city, setCity] = useState(
    mode === "edit" && resumeInfo?.custom?.[indexOfCurrCustom]?.city
      ? resumeInfo.custom[indexOfCurrCustom].city
      : "",
  );
  const [startDate, setStartDate] = useState(
    mode === "edit" && resumeInfo?.custom?.[indexOfCurrCustom]?.start_date
      ? resumeInfo.custom[indexOfCurrCustom].start_date
      : "",
  );
  const [endDate, setEndDate] = useState(
    mode === "edit" && resumeInfo?.custom?.[indexOfCurrCustom]?.end_date
      ? resumeInfo.custom[indexOfCurrCustom].end_date
      : "",
  );
  const [description, setDescription] = useState(
    mode === "edit" && resumeInfo?.custom?.[indexOfCurrCustom]?.description
      ? resumeInfo.custom[indexOfCurrCustom].description
      : "",
  );

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customData = {
      section_name: sectionName,
      title: title,
      subtitle: subtitle,
      city: city,
      country: country,
      start_date: startDate,
      end_date: endDate,
      description: description,
      is_current: false,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeCustom({
              data: customData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        setStatus(["normal"]);
        refetch();
      } else {
        await handleResumeAction(
          () =>
            updateResumeCustom({
              data: customData,
              resumeId: resumeId || "",
              customId: currId.toString() || "",
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
      case "section_name":
        setSectionName(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "subtitle":
        setSubtitle(value);
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
      const updatedArray = [...prevInfo.custom];

      if (mode === "add") {
        const existingCustom = updatedArray.find(
          (custom) => custom.id === 303030,
        );
        if (existingCustom) {
          updatedArray[resumeInfo?.custom?.length - 1] = {
            ...updatedArray[resumeInfo?.custom?.length - 1],
            [field]: value,
          };
        } else {
          updatedArray.push({
            id: 303030,
            section_name: "",
            title: "",
            subtitle: "",
            country: "",
            city: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
          });
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrCustom]) {
          updatedArray[indexOfCurrCustom] = {
            ...updatedArray[indexOfCurrCustom],
            [field]: value,
          };
        }
      }
      return {
        ...prevInfo,
        custom: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumeCustom({
            resumeId: resumeId || "",
            customId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.custom.filter(
          (custom) => custom.id !== currId,
        );
        return {
          ...prevInfo,
          custom: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "edit" ? "Edit Custom section" : "Add Custom section"}
      autoFill={true}
      tips={true}
    >
      <form
        onSubmit={(e) => submitForm(e)}
        className="flex w-full flex-col gap-5"
      >
        <InputField id="sectionName" label="Section Name">
          <Input
            onChange={(e) => handleOnChange(e, "section_name")}
            value={sectionName}
            name="sectionName"
            props={{
              placeholder: "custom",
              type: "text",
              id: "sectionName",
            }}
          />
        </InputField>
        <InputField id="title" label="Title">
          <Input
            onChange={(e) => handleOnChange(e, "title")}
            value={title}
            name="title"
            props={{
              placeholder: "School/University",
              type: "text",
              id: "title",
            }}
          />
        </InputField>
        <InputField id="subtitle" label="Title">
          <Input
            onChange={(e) => handleOnChange(e, "subtitle")}
            value={subtitle}
            name="subtitle"
            props={{
              placeholder: "Enter subtitle",
              type: "text",
              id: "subtitle",
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
          onChangeStartDate={(e) => handleOnChange(e, "start_date")}
          endDate="end_date"
          onChangeEndDate={(e) => handleOnChange(e, "end_date")}
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
              const updatedArray = prevInfo.custom.filter(
                (custom) => custom.id !== 303030,
              );
              return {
                ...prevInfo,
                custom: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeCustomForm;
