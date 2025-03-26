import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormMode,
  IProjectsInputs,
} from "../../../interfaces/ResumeBuilder.interfaces.ts";
import {
  useAddResumeProjectMutation,
  useDeleteResumeProjectMutation,
  useGetAllResumeProjectsQuery,
  useUpdateResumeProjectMutation,
} from "../../../services/resumeBuilderApi.ts";
import { useState } from "react";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import StartToEndDate from "../../common/StartToEndDate.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import InputWithLink from "../../common/InputWithLink.tsx";
import Button from "../../common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function ResumeProjectForm({ mode }: { mode: FormMode }) {
  const { setStatus, resumeInfo, setResumeInfo, currId } = useResumeBuilder();
  const { resumeId } = useParams();
  const { register, handleSubmit } = useForm<IProjectsInputs>();
  const indexOfCurrProject = resumeInfo?.projects?.findIndex(
    (pro) => pro?.id === currId,
  );

  const { refetch } = useGetAllResumeProjectsQuery({
    resumeId: resumeId || "",
  });
  const [addResumeProject] = useAddResumeProjectMutation();
  const [updateResumeProject] = useUpdateResumeProjectMutation();
  const [deleteResumeProject] = useDeleteResumeProjectMutation();

  const [title, setTitle] = useState(
    mode === "edit" && resumeInfo?.projects?.[indexOfCurrProject]?.title
      ? resumeInfo.projects[indexOfCurrProject].title
      : "",
  );
  const [subtitle, setSubtitle] = useState(
    mode === "edit" && resumeInfo?.projects?.[indexOfCurrProject]?.subtitle
      ? resumeInfo.projects[indexOfCurrProject].subtitle
      : "",
  );
  const [projectLink, setProjectLink] = useState(
    mode === "edit" && resumeInfo?.projects?.[indexOfCurrProject]?.project_link
      ? resumeInfo.projects[indexOfCurrProject].project_link
      : "",
  );
  const [startDate, setStartDate] = useState(
    mode === "edit" && resumeInfo?.projects?.[indexOfCurrProject]?.start_date
      ? resumeInfo.projects[indexOfCurrProject].start_date
      : "",
  );
  const [endDate, setEndDate] = useState(
    mode === "edit" && resumeInfo?.projects?.[indexOfCurrProject]?.end_date
      ? resumeInfo.projects[indexOfCurrProject].end_date
      : "",
  );
  const [description, setDescription] = useState(
    mode === "edit" && resumeInfo?.projects?.[indexOfCurrProject]?.description
      ? resumeInfo.projects[indexOfCurrProject].description
      : "",
  );
  const [showLink, setShowLink] = useState(false);

  const submitForm: SubmitHandler<IProjectsInputs> = async () => {
    const projectData = {
      title: title,
      subtitle: subtitle,
      project_link: projectLink,
      start_date: startDate,
      end_date: endDate,
      description: description,
      is_current: false,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeProject({
              data: projectData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        refetch();
        setStatus(["normal"]);
      } else {
        await handleResumeAction(
          () =>
            updateResumeProject({
              data: projectData,
              resumeId: resumeId || "",
              projectId: currId.toString() || "",
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
      case "title":
        setTitle(value);
        break;
      case "subtitle":
        setSubtitle(value);
        break;
      case "project_link":
        setProjectLink(value);
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
      const updatedArray = [...prevInfo.projects];

      if (mode === "add") {
        const existingProject = updatedArray.find((pro) => pro.id === 303030);
        if (existingProject) {
          updatedArray[resumeInfo?.projects?.length - 1] = {
            ...updatedArray[resumeInfo?.projects?.length - 1],
            [field]: value,
          };
        } else {
          const newProjects = {
            id: 303030,
            title: "",
            subtitle: "",
            project_link: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
          } as IProjectsInputs;
          newProjects[field] = value;
          updatedArray.push(newProjects);
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrProject]) {
          updatedArray[indexOfCurrProject] = {
            ...updatedArray[indexOfCurrProject],
            [field]: value,
          };
        }
      }
      return {
        ...prevInfo,
        projects: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumeProject({
            resumeId: resumeId || "",
            projectId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.projects.filter(
          (pro) => pro.id !== currId,
        );
        return {
          ...prevInfo,
          projects: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "add" ? "Add Project" : "Edit Project"}
      tips={true}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="relative flex w-full flex-col gap-5"
      >
        <InputField id="title" label="Project title">
          <div className="mb-5 flex items-center gap-3">
            <Input
              register={register}
              onChange={(e) => handleOnChange(e, "title")}
              value={title}
              name="title"
              props={{
                placeholder: "Enter project title",
                type: "text",
                id: "title",
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
            value={projectLink}
            handleOnChange={(e) => handleOnChange(e, "project_link")}
            setShowLink={setShowLink}
            setValue={setProjectLink}
            name="project_link"
            id="project_link"
          />
        )}

        <InputField id="subtitle" label="Subtitle">
          <Input
            register={register}
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
              const updatedArray = prevInfo.projects.filter(
                (pro) => pro.id !== 303030,
              );
              return {
                ...prevInfo,
                projects: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeProjectForm;
