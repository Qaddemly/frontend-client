import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import RichTextEditor from "../../common/RichTextEditor.tsx";

type SkillsForm = {
  skill: string;
  description: string;
  level: string;
};

function ResumeSkillsForm() {
  const { resumeInfo, handleOnChange, handleOnChangeTextEditor } =
    useResumeBuilder();
  const { register } = useForm<SkillsForm>();

  const submitForm: SubmitHandler<SkillsForm> = async (data) => {
    console.log(data);
  };

  return (
    <FormPreviewSection
      onSubmit={submitForm}
      title="Create Skills"
      tips={true}
      autoFill={true}
    >
      <InputField id="skill" label="Skill">
        <Input
          register={register}
          onChange={(e) => handleOnChange(0, "skills", e)}
          value={resumeInfo.skills[0].skill}
          name="skill"
          props={{
            placeholder: "Ex.Python, Data Analysis, Project management",
            type: "text",
            id: "skill",
          }}
        />
      </InputField>

      <RichTextEditor
        label="Description/Sub-skill"
        value={resumeInfo.skills[0].description}
        onChange={(e) => handleOnChangeTextEditor(0, "skills", e)}
      />

      <InputField id="level" label="Skill level">
        <Input
          register={register}
          onChange={(e) => handleOnChange(0, "skills", e)}
          value={resumeInfo.skills[0].level}
          name="level"
          props={{
            placeholder: "Ex. Beginner, Intermediate, Expert",
            type: "text",
            id: "level",
          }}
        />
      </InputField>
    </FormPreviewSection>
  );
}

export default ResumeSkillsForm;
