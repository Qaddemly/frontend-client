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
  useGenerateOrEnhanceSkillsBasedOnJobMutation,
  useGetAllResumeSkillsQuery,
  useUpdateResumeSkillMutation,
} from "../../../services/resumeBuilderApi.ts";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import GenerateOrEnhanceButton from "../../common/GenerateOrEnhanceButton.tsx";
import toast from "react-hot-toast";

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
          const newSkills = {
            id: 303030,
            name: "",
            information: "",
            level: "",
          } as ISkillsInputs;
          newSkills[field] = value;
          updatedArray.push(newSkills);
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

  ///////////////////////////////////////////// Resume Builder Enhancement (AI Feature) /////////////////////
  const [jobDescription, setJobDescription] = useState("");
  const [generateOrEnhanceSkillsBasedOnJob] =
    useGenerateOrEnhanceSkillsBasedOnJobMutation();

  async function handleGenerateOrEnhanceSkillsBasedOnJob() {
    const skills = resumeInfo.skills.map((skill) => skill.name);
    if (jobDescription) {
      try {
        const promise = generateOrEnhanceSkillsBasedOnJob({
          skills,
          jobDescription,
        }).unwrap();
        toast.promise(promise, {
          loading: `Generating skills`,
          success: `skills generated successfully`,
          error: `Could not generate skills`,
        });
        const res = await promise;
        const generatedSkills = res?.enhancedSkills;
        if (generatedSkills) {
          setJobDescription(generatedSkills.join(", "));
        }
      } catch (error) {
        handleApiError(error);
      }
    } else toast.error("Please enter job description to generate profile");
  }

  return (
    <>
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
      <div className="relative mt-10">
        <textarea
          className="h-[10rem] w-full rounded-md border border-gray-300 p-4 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
          placeholder="Tell me about job description and I will generate skills for you"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <GenerateOrEnhanceButton
          className="bottom-4 right-5"
          text="Generate skills with AI"
          noAnimation={true}
          onClick={handleGenerateOrEnhanceSkillsBasedOnJob}
        />
      </div>
    </>
  );
}

export default ResumeSkillsForm;
