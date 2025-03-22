import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import {
  FormMode,
  IPublicationsInputs,
} from "../../../interfaces/ResumeBuilder.interfaces.ts";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  useAddResumePublicationMutation,
  useDeleteResumePublicationMutation,
  useGetAllResumePublicationsQuery,
  useUpdateResumePublicationMutation,
} from "../../../services/resumeBuilderApi.ts";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import Button from "../../common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import InputWithLink from "../../common/InputWithLink.tsx";
import DatePicker from "../../common/DatePicker.tsx";

function ResumePublicationsForm({ mode }: { mode: FormMode }) {
  const { setStatus, resumeInfo, setResumeInfo, currId } = useResumeBuilder();
  const { resumeId } = useParams();
  const { register, handleSubmit } = useForm<IPublicationsInputs>();
  const indexOfCurrPublication = resumeInfo?.publications?.findIndex(
    (publication) => publication?.id === currId,
  );

  const { refetch } = useGetAllResumePublicationsQuery({
    resumeId: resumeId || "",
  });
  const [addResumePublication] = useAddResumePublicationMutation();
  const [updateResumePublication] = useUpdateResumePublicationMutation();
  const [deleteResumePublication] = useDeleteResumePublicationMutation();

  const [title, setTitle] = useState(
    mode === "edit" && resumeInfo?.publications?.[indexOfCurrPublication]?.title
      ? resumeInfo.publications[indexOfCurrPublication].title
      : "",
  );
  const [publicationUrl, setPublicationUrl] = useState(
    mode === "edit" &&
      resumeInfo?.publications?.[indexOfCurrPublication]?.publication_url
      ? resumeInfo.publications[indexOfCurrPublication].publication_url
      : "",
  );
  const [publisher, setPublisher] = useState(
    mode === "edit" &&
      resumeInfo?.publications?.[indexOfCurrPublication]?.publisher
      ? resumeInfo.publications[indexOfCurrPublication].publisher
      : "",
  );
  const [date, setDate] = useState(
    mode === "edit" && resumeInfo?.publications?.[indexOfCurrPublication]?.date
      ? resumeInfo.publications[indexOfCurrPublication].date
      : "",
  );
  const [description, setDescription] = useState(
    mode === "edit" &&
      resumeInfo?.publications?.[indexOfCurrPublication]?.description
      ? resumeInfo.publications[indexOfCurrPublication].description
      : "",
  );
  const [showLink, setShowLink] = useState(false);

  const submitForm: SubmitHandler<IPublicationsInputs> = async () => {
    const publicationsData = {
      title: title,
      publication_url: publicationUrl,
      publisher: publisher,
      date: date,
      description: description,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumePublication({
              data: publicationsData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        refetch();
        setStatus(["normal"]);
      } else {
        await handleResumeAction(
          () =>
            updateResumePublication({
              data: publicationsData,
              resumeId: resumeId || "",
              publicationId: currId.toString() || "",
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
    if (field === "title") setTitle(value);
    else if (field === "publication_url") setPublicationUrl(value);
    else if (field === "publisher") setPublisher(value);
    else if (field === "date") setDate(value);
    else if (field === "description") setDescription(value);

    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.publications];
      if (mode === "add") {
        const existingSkill = updatedArray.find(
          (publication) => publication.id === 303030,
        );
        if (existingSkill) {
          updatedArray[resumeInfo?.publications?.length - 1] = {
            ...updatedArray[resumeInfo?.publications?.length - 1],
            [field]: value,
          };
        } else {
          const newPublication = {
            id: 303030,
            title: "",
            publication_url: "",
            publisher: "",
            date: "",
            description: "",
          } as IPublicationsInputs;
          newPublication[field] = value;
          updatedArray.push(newPublication);
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrPublication]) {
          updatedArray[indexOfCurrPublication] = {
            ...updatedArray[indexOfCurrPublication],
            [field]: value,
          };
        }
      }
      return {
        ...prevInfo,
        publications: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumePublication({
            resumeId: resumeId || "",
            publicationId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.publications.filter(
          (publication) => publication.id !== currId,
        );
        return {
          ...prevInfo,
          publications: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "add" ? "Add Publication" : "Edit Publication"}
      tips={true}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="relative flex w-full flex-col"
      >
        <InputField id="publication" label="Title">
          <div className="mb-5 flex items-center gap-3">
            <Input
              register={register}
              onChange={(e) => handleOnChange(e, "title")}
              value={title}
              name="title"
              props={{
                placeholder: "Enter Publication title",
                type: "text",
                id: "publication",
              }}
            />
            <Button
              type="button"
              className="flex items-center gap-1 border-2 border-gray-200 bg-white px-3 text-gray-300 hover:bg-white"
              onClick={() => setShowLink(true)}
            >
              <FontAwesomeIcon icon={faLink} />
              <span>Link</span>
            </Button>
          </div>
        </InputField>

        {showLink && (
          <InputWithLink
            register={register}
            value={publicationUrl}
            handleOnChange={(e) => handleOnChange(e, "publication_url")}
            setShowLink={setShowLink}
            setValue={setPublicationUrl}
            name="publicationUrl"
            id="publicationUrl"
          />
        )}

        <InputField id="Publisher" label="Publisher">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "publisher")}
            value={publisher}
            name="publisher"
            props={{
              placeholder: "Enter Publisher",
              type: "text",
              id: "Publisher",
            }}
          />
        </InputField>

        <div className="my-5">
          <label htmlFor="education" className="font-medium">
            Date
          </label>
          <DatePicker
            name="date" // TODO solve error
            register={register}
            onChange={(e) => handleOnChange(e, "date")}
          />
        </div>

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
              const updatedArray = prevInfo.publications.filter(
                (publication) => publication.id !== 303030,
              );
              return {
                ...prevInfo,
                publications: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumePublicationsForm;
