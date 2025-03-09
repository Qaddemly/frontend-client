import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import StartToEndDate from "../../common/StartToEndDate.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";

type FormMode = "add" | "edit";

type EducationForm = {
  degree: string;
  school: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  description: string;
};

function ResumeEducationForm({ mode }: { mode: FormMode }) {
  const { resumeInfo, handleOnChange, handleOnChangeTextEditor } =
    useResumeBuilder();
  const { register, handleSubmit } = useForm<EducationForm>();

  const initialEducationInfo: EducationForm = {
    degree: "",
    school: "",
    country: "",
    city: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const educationData =
    mode === "edit"
      ? (resumeInfo?.education?.[0] ?? initialEducationInfo)
      : initialEducationInfo;

  const submitForm: SubmitHandler<EducationForm> = async (data) => {
    console.log(data);
  };

  return (
    <FormPreviewSection
      title={mode === "edit" ? "Edit Education" : "Add Education"}
      autoFill={true}
      tips={true}
    >
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-5">
        <InputField id="degree" label="Degree">
          <Input
            register={register}
            onChange={(e) => handleOnChange(0, "education", e, mode)}
            value={educationData.degree}
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
            onChange={(e) => handleOnChange(0, "education", e, mode)}
            value={educationData.school}
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
              onChange={(e) => handleOnChange(0, "education", e, mode)}
              value={educationData.country}
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
              onChange={(e) => handleOnChange(0, "education", e, mode)}
              value={educationData.city}
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
          startDate="startDate"
          startDateDefaultValue={educationData.startDate}
          onChangeStartDate={(e) => handleOnChange(0, "education", e, mode)}
          endDate="endDate"
          endDateDefaultValue={educationData.endDate}
          onChangeEndDate={(e) => handleOnChange(0, "education", e, mode)}
        />

        <RichTextEditor
          label="Description"
          value={educationData.description}
          onChange={(e) => handleOnChangeTextEditor(0, "education", e)}
        />
        <ResumeFormButtons mode={mode} handleDelete={() => {}} />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeEducationForm;
