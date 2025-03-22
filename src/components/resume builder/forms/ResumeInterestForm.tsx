import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import {
  FormMode,
  IInterestsInput,
} from "../../../interfaces/ResumeBuilder.interfaces.ts";
import { useState } from "react";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import {
  useAddResumeInterestMutation,
  useDeleteResumeInterestMutation,
  useGetAllResumeInterestsQuery,
  useUpdateResumeInterestMutation,
} from "../../../services/resumeBuilderApi.ts";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";
import ResumeFormButtons from "../ResumeFormButtons.tsx";

function ResumeInterestForm({ mode }: { mode: FormMode }) {
  const { setStatus, resumeInfo, setResumeInfo, currId } = useResumeBuilder();
  const { resumeId } = useParams();
  const { register, handleSubmit } = useForm<IInterestsInput>();
  const indexOfCurrInterest = resumeInfo?.hobbies?.findIndex(
    (interest) => interest?.id === currId,
  );

  const { refetch } = useGetAllResumeInterestsQuery({
    resumeId: resumeId || "",
  });
  const [addResumeInterest] = useAddResumeInterestMutation();
  const [updateResumeInterest] = useUpdateResumeInterestMutation();
  const [deleteResumeInterest] = useDeleteResumeInterestMutation();

  const [name, setName] = useState(
    mode === "edit" && resumeInfo?.hobbies?.[indexOfCurrInterest]?.interest
      ? resumeInfo.hobbies?.[indexOfCurrInterest].interest
      : "",
  );
  const [information, setInformation] = useState(
    mode === "edit" && resumeInfo?.hobbies?.[indexOfCurrInterest]?.description
      ? resumeInfo.hobbies?.[indexOfCurrInterest].description
      : "",
  );

  const submitForm: SubmitHandler<IInterestsInput> = async (data) => {
    const interestsData = {
      interest: data.interest,
      description: information,
      id: data.id,
      resume_template_id: data.resume_template_id,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeInterest({
              data: interestsData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        refetch();
        setStatus(["normal"]);
      } else {
        await handleResumeAction(
          () =>
            updateResumeInterest({
              data: interestsData,
              resumeId: resumeId || "",
              interestId: currId.toString() || "",
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
    if (field === "interest") setName(value);
    if (field === "description") setInformation(value);

    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.hobbies];

      if (mode === "add") {
        const existingInterest = updatedArray.find(
          (interest) => interest.id === 303030,
        );
        if (existingInterest) {
          updatedArray[resumeInfo?.hobbies?.length - 1] = {
            ...updatedArray[resumeInfo?.hobbies?.length - 1],
            [field]: value,
          };
        } else {
          updatedArray.push({
            id: 303030,
            interest: "",
            description: "",
            resume_template_id: 0,
          });
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrInterest]) {
          updatedArray[indexOfCurrInterest] = {
            ...updatedArray[indexOfCurrInterest],
            [field]: value,
          };
        }
      }

      return {
        ...prevInfo,
        hobbies: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumeInterest({
            resumeId: resumeId || "",
            interestId: currId.toString() || "",
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
      title={mode === "add" ? "Add Interests" : "Edit Interests"}
      tips={true}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full flex-col gap-5"
      >
        <InputField id="interest" label="Interests">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "interest")}
            value={name}
            name="interest"
            props={{
              placeholder: "Ex: photography, Avid runner,...",
              type: "text",
              id: "interest",
            }}
          />
        </InputField>

        <RichTextEditor
          label="Description/Sub-interest"
          value={information}
          onChange={(e) => handleOnChange(e, "description")}
        />

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

export default ResumeInterestForm;
