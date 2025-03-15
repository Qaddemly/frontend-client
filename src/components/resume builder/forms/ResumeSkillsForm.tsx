import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import {
  FormMode,
  ISkillsInputs,
} from "../../../interfaces/ResumeBuilder.interfaces.ts";
import { useState } from "react";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import {
  useAddResumeSkillMutation,
  useDeleteResumeSkillMutation,
  useGetAllResumeSkillsQuery,
  useUpdateResumeSkillMutation,
} from "../../../services/resumeBuilderApi.ts";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";
import ResumeFormButtons from "../ResumeFormButtons.tsx";

function ResumeSkillsForm({ mode }: { mode: FormMode }) {
  const { setStatus, resumeInfo, setResumeInfo, currId } = useResumeBuilder();
  const { resumeId } = useParams();
  const { register, handleSubmit } = useForm<ISkillsInputs>();
  const indexOfCurrSkill = resumeInfo?.skills?.findIndex(
    (skill) => skill?.id === currId,
  );

  const { refetch } = useGetAllResumeSkillsQuery({ resumeId: resumeId || "" });
  const [addResumeSkill] = useAddResumeSkillMutation();
  const [updateResumeSkill] = useUpdateResumeSkillMutation();
  const [deleteResumeSkill] = useDeleteResumeSkillMutation();

  const [name, setName] = useState(
    mode === "edit" && resumeInfo?.skills?.[indexOfCurrSkill]?.name
      ? resumeInfo.skills[indexOfCurrSkill].name
      : "",
  );
  const [information, setInformation] = useState(
    mode === "edit" && resumeInfo?.skills?.[indexOfCurrSkill]?.information
      ? resumeInfo.skills[indexOfCurrSkill].information
      : "",
  );
  const [level, setLevel] = useState(
    mode === "edit" && resumeInfo?.skills?.[indexOfCurrSkill]?.level
      ? resumeInfo.skills[indexOfCurrSkill].level
      : "",
  );

  const submitForm: SubmitHandler<ISkillsInputs> = async (data) => {
    const skillsData = {
      name: data.name,
      information: information,
      level: data.level,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeSkill({
              data: skillsData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        refetch();
        setStatus(["normal"]);
      } else {
        await handleResumeAction(
          () =>
            updateResumeSkill({
              data: skillsData,
              resumeId: resumeId || "",
              skillId: currId.toString() || "",
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
    if (field === "name") setName(value);
    if (field === "level") setLevel(value);
    if (field === "information") setInformation(value);

    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.skills];

      if (mode === "add") {
        const existingSkill = updatedArray.find((skill) => skill.id === 303030);
        if (existingSkill) {
          updatedArray[resumeInfo?.skills?.length - 1] = {
            ...updatedArray[resumeInfo?.skills?.length - 1],
            [field]: value,
          };
        } else {
          updatedArray.push({
            id: 303030,
            name: "",
            information: "",
            level: "",
          });
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrSkill]) {
          updatedArray[indexOfCurrSkill] = {
            ...updatedArray[indexOfCurrSkill],
            [field]: value,
          };
        }
      }

      return {
        ...prevInfo,
        skills: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumeSkill({
            resumeId: resumeId || "",
            skillId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.skills.filter(
          (skill) => skill.id !== currId,
        );
        return {
          ...prevInfo,
          skills: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "add" ? "Add Skills" : "Edit Skills"}
      tips={true}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full flex-col gap-5"
      >
        <InputField id="skill" label="Skill">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "name")}
            value={name}
            name="name"
            props={{
              placeholder: "Ex.Python, Data Analysis, Project management",
              type: "text",
              id: "skill",
            }}
          />
        </InputField>

        <RichTextEditor
          label="Description/Sub-skill"
          value={information}
          onChange={(e) => handleOnChange(e, "information")}
        />

        <InputField id="level" label="Skill level">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "level")}
            value={level}
            name="level"
            props={{
              placeholder: "Ex. Beginner, Intermediate, Expert",
              type: "text",
              id: "level",
            }}
          />
        </InputField>
        <ResumeFormButtons
          mode={mode}
          handleDelete={(e) => handleDelete(e)}
          handleCancel={() => {
            setResumeInfo((prevInfo) => {
              const updatedArray = prevInfo.skills.filter(
                (skill) => skill.id !== 303030,
              );
              return {
                ...prevInfo,
                skills: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeSkillsForm;
