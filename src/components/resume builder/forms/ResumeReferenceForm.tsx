import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import { useState } from "react";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import {
  useAddResumeReferenceMutation,
  useDeleteResumeReferenceMutation,
  useGetAllResumeReferenceQuery,
  useUpdateResumeReferenceMutation,
} from "../../../services/resumeBuilderApi.ts";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IReferenceInputs } from "../../../interfaces/ResumeBuilder.interfaces.ts";

type FormMode = "add" | "edit";

function ResumeReferenceForm({ mode }: { mode: FormMode }) {
  const { resumeId } = useParams();
  const { currId, resumeInfo, setResumeInfo, setStatus } = useResumeBuilder();
  const { register, handleSubmit } = useForm<IReferenceInputs>();

  const { refetch } = useGetAllResumeReferenceQuery({
    resumeId: resumeId || "",
  });
  const [addResumeReference] = useAddResumeReferenceMutation();
  const [updateResumeReference] = useUpdateResumeReferenceMutation();
  const [deleteResumePersonal] = useDeleteResumeReferenceMutation();

  const indexOfCurrRef = resumeInfo?.references?.findIndex(
    (ref) => ref?.id === currId,
  );
  const [name, setName] = useState(
    mode === "edit" && resumeInfo?.references?.[indexOfCurrRef]?.name
      ? resumeInfo.references[indexOfCurrRef].name
      : "",
  );
  const [jobTitle, setJobTitle] = useState(
    mode === "edit" && resumeInfo?.references?.[indexOfCurrRef]?.job_title
      ? resumeInfo.references[indexOfCurrRef].job_title
      : "",
  );
  const [organization, setOrganization] = useState(
    mode === "edit" && resumeInfo?.references?.[indexOfCurrRef]?.organization
      ? resumeInfo.references[indexOfCurrRef].organization
      : "",
  );
  const [email, setEmail] = useState(
    mode === "edit" && resumeInfo?.references?.[indexOfCurrRef]?.email
      ? resumeInfo.references[indexOfCurrRef].email
      : "",
  );
  const [phone, setPhone] = useState(
    mode === "edit" && resumeInfo?.references?.[indexOfCurrRef].phone
      ? resumeInfo.references[indexOfCurrRef].phone
      : "",
  );

  const submitForm: SubmitHandler<IReferenceInputs> = async (data) => {
    const referencesData = {
      name: name,
      job_title: jobTitle,
      organization: organization,
      email: email,
      phone: phone,
      resume_template_id: data.resume_template_id,
      id: data.id,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeReference({
              data: referencesData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        setStatus(["normal"]);
        refetch();
      } else {
        await handleResumeAction(
          () =>
            updateResumeReference({
              data: referencesData,
              resumeId: resumeId || "",
              referenceId: currId.toString() || "",
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
      case "name":
        setName(value);
        break;
      case "job_title":
        setJobTitle(value);
        break;
      case "organization":
        setOrganization(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }

    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.references];

      if (mode === "add") {
        const existingReference = updatedArray.find((ref) => ref.id === 303030);
        if (existingReference) {
          updatedArray[resumeInfo?.references?.length - 1] = {
            ...updatedArray[resumeInfo?.references?.length - 1],
            [field]: value,
          };
        } else {
          const newRefrence = {
            name: "",
            job_title: "",
            organization: "",
            email: "",
            phone: "",
            resume_template_id: 0,
            id: 303030,
          } as IReferenceInputs;
          newRefrence[field] = value;
          updatedArray.push(newRefrence);
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrRef]) {
          updatedArray[indexOfCurrRef] = {
            ...updatedArray[indexOfCurrRef],
            [field]: value,
          };
        }
      }
      return {
        ...prevInfo,
        references: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumePersonal({
            resumeId: resumeId || "",
            referenceId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.references.filter(
          (ref) => ref.id !== currId,
        );
        return {
          ...prevInfo,
          references: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "edit" ? "Edit Reference" : "Add Reference"}
      autoFill={true}
      tips={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full flex-col gap-5"
      >
        <InputField id="name" label="Name">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "name")}
            value={name}
            name="name"
            props={{
              placeholder: "Enter your full name",
              type: "text",
              id: "name",
            }}
          />
        </InputField>

        <div className="flex gap-5">
          <InputField id="jobTitle" label="Job Title">
            <Input
              register={register}
              onChange={(e) => handleOnChange(e, "job_title")}
              value={jobTitle}
              name="jobTitle"
              props={{
                placeholder: "Enter job title",
                type: "text",
                id: "jobTitle",
              }}
            />
          </InputField>
          <InputField id="organization" label="Organization">
            <Input
              register={register}
              onChange={(e) => handleOnChange(e, "organization")}
              value={organization}
              name="organization"
              props={{
                placeholder: "Enter Organization",
                type: "text",
                id: "organization",
              }}
            />
          </InputField>
        </div>

        <div className="flex gap-5">
          <InputField id="e-mail" label="E-mail">
            <Input
              register={register}
              onChange={(e) => handleOnChange(e, "email")}
              value={email}
              name="email"
              props={{
                placeholder: "Enter your e-mail",
                type: "text",
                id: "e-mail",
              }}
            />
          </InputField>
          <InputField id="phone" label="Phone">
            <Input
              register={register}
              onChange={(e) => handleOnChange(e, "phone")}
              value={phone}
              name="phone"
              props={{
                placeholder: "123 456 789",
                type: "number",
                id: "phone",
              }}
            />
          </InputField>
        </div>

        <ResumeFormButtons
          mode={mode}
          handleDelete={(e) => handleDelete(e)}
          handleCancel={() => {
            setResumeInfo((prevInfo) => {
              const updatedArray = prevInfo.references.filter(
                (edu) => edu.id !== 303030,
              );
              return {
                ...prevInfo,
                references: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeReferenceForm;
