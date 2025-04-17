import { useParams } from "react-router-dom";
import { useCoverLetter } from "../../context/CoverLetterContext.tsx";
import { useState } from "react";
import { useUpdateCoverLetterMutation } from "../../services/coverLetterBuilderApi.ts";
import { handleApiError, handleResumeAction } from "../../utils/helpers.ts";
import { FormMode } from "../../interfaces/ResumeBuilder.interfaces.ts";
import { IRecipientDetails } from "../../interfaces/CoverLetter.interfaces.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../components/common/InputField.tsx";
import Input from "../../components/common/Input.tsx";
import FormPreviewSection from "../../components/resume builder/forms/FormPreviewSection.tsx";
import CoverLetterFormButtons from "../CoverLetterFormButtons.tsx";

function CoverLetterRecipientForm({ mode }: { mode: FormMode }) {
  const { coverLetterId } = useParams();
  const { setCoverLetterInfo, coverLetterInfo, setStatus } = useCoverLetter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecipientDetails>();

  const [nameOfRecipient, setNameOfRecipient] = useState(
    mode === "edit" ? coverLetterInfo.personal.nameOfRecipient : "",
  );

  const [companyName, setCompanyName] = useState(
    mode === "edit" ? coverLetterInfo.personal.companyName : "",
  );
  const [recipientAddress, setRecipientAddress] = useState(
    mode === "edit" ? coverLetterInfo.personal.recipientAddress : "",
  );
  const [updateCoverLetter] = useUpdateCoverLetterMutation();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    switch (name) {
      case "nameOfRecipient":
        setNameOfRecipient(value);
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "recipientAddress":
        setRecipientAddress(value);
        break;
      default:
        break;
    }
    setCoverLetterInfo((prevInfo) => ({
      ...(prevInfo || {}),
      personal: {
        ...(prevInfo?.personal || {}),
        [name]: value,
      },
    }));
  }

  const submitForm: SubmitHandler<IRecipientDetails> = async (data) => {
    const recipientDetailsData = {
      nameOfRecipient: data.nameOfRecipient,
      companyName: data.companyName,
      address: recipientAddress,
    };

    try {
      await handleResumeAction(
        () =>
          updateCoverLetter({
            id: coverLetterId || "",
            coverLetter: {
              recipientDetails: recipientDetailsData,
            },
          }).unwrap(),
        mode,
      );
      setStatus(["normal"]);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <FormPreviewSection
      title={
        mode === "edit"
          ? "Edit Recipient Details Info"
          : "Add Recipient Details Info"
      }
      tips={false}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full flex-col gap-5"
      >
        <InputField
          errors={errors}
          id="nameOfRecipient"
          label="Name of recipient/department"
        >
          <Input
            register={register}
            onChange={handleOnChange}
            value={nameOfRecipient}
            name="nameOfRecipient"
            options={{ required: "name of recipient is required" }}
            props={{
              placeholder: "Enter name of recipient/department",
              type: "text",
              id: "nameOfRecipient",
            }}
          />
        </InputField>

        <InputField errors={errors} id="companyName" label="Company name">
          <Input
            register={register}
            onChange={handleOnChange}
            value={companyName}
            name="companyName"
            props={{
              placeholder: "Enter company name",
              type: "text",
              id: "companyName",
            }}
          />
        </InputField>

        <InputField errors={errors} id="recipientAddress" label="Address">
          <Input
            register={register}
            onChange={handleOnChange}
            value={recipientAddress}
            name="recipientAddress"
            props={{
              placeholder: "Enter address",
              type: "text",
              id: "email",
            }}
          />
        </InputField>
        <CoverLetterFormButtons
          mode={mode}
          hiddenDeleteBtn={true}
          handleCancel={() => {
            if (mode === "add")
              setCoverLetterInfo((prevInfo) => ({
                ...prevInfo,
                personal: {
                  ...prevInfo.personal,
                  recipientDetails: {
                    nameOfRecipient: "",
                    companyName: "",
                    address: "",
                  },
                },
              }));
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default CoverLetterRecipientForm;
