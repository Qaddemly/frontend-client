import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import StartToEndDate from "../../common/StartToEndDate.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import Button from "../../common/Button.tsx";

type EucationlForm = {
  degree: string;
  school: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  description: string;
};
function ResumeEucationForm() {
  const { resumeInfo, setResumeInfo } = useResumeBuilder();
  const { register, handleSubmit } = useForm<EucationlForm>();
  console.log(resumeInfo);
  const submitForm: SubmitHandler<EucationlForm> = async (data) => {
    console.log(data);
  };

  function handleOnChange(e: ContentEditableEvent) {
    const { name, value } = e.target;

    setResumeInfo((prevInfo) => {
      const education = prevInfo.education || [];
      const existingEntry = education.find(
        (entry) => entry[name as keyof typeof entry] !== undefined,
      );
      if (existingEntry) {
        existingEntry[name as keyof typeof existingEntry] = value;
      } else {
        education.push({
          degree: "",
          school: "",
          country: "",
          city: "",
          startDate: "",
          endDate: "",
          description: "",
          [name as keyof typeof existingEntry]: value,
        });
      }
      return { ...prevInfo, education };
    });
  }
  return (
    <FormPreviewSection title="Create Education" autoFill={true} tips={true}>
      <div className="">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-3"
        >
          <InputField id="degree" label="Degree">
            <Input
              register={register}
              onChange={handleOnChange}
              value={resumeInfo.education[0].degree}
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
              onChange={handleOnChange}
              value={resumeInfo.education[0].school}
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
                onChange={handleOnChange}
                value={resumeInfo.education[0].country}
                name="country"
                props={{
                  placeholder: "Ex.Egypt",
                  type: "text",
                  id: "country",
                }}
              />
            </InputField>
            <InputField id="city" label="City">
              <Input
                register={register}
                onChange={handleOnChange}
                value={resumeInfo.education[0].city}
                name="city"
                props={{
                  placeholder: "Ex.cairo",
                  type: "text",
                  id: "city",
                }}
              />
            </InputField>
          </div>

          <StartToEndDate
            register={register}
            startDate="startDate"
            endDate="endDate"
          />

          <RichTextEditor
            value={resumeInfo.education[0].description}
            onChange={(e) => handleOnChange(e)}
          />
          <div className="self-end">
            <Button className="px-3">Save</Button>
          </div>
        </form>
      </div>
    </FormPreviewSection>
  );
}

export default ResumeEucationForm;
