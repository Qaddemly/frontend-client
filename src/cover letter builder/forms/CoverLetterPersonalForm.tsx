import InputField from "../../components/common/InputField.tsx";
import Input from "../../components/common/Input.tsx";
import FormPreviewSection from "../../components/resume builder/forms/FormPreviewSection.tsx";
import { FormMode } from "../../interfaces/ResumeBuilder.interfaces.ts";
import { useCoverLetter } from "../../context/CoverLetterContext.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddPersonalCoverLetterMutation,
  useGetPersonalCoverLetterQuery,
  useUpdatePersonalCoverLetterMutation,
} from "../../services/coverLetterBuilderApi.ts";
import {
  createFormData,
  handleApiError,
  handleResumeAction,
} from "../../utils/helpers.ts";
import CoverLetterFormButtons from "../CoverLetterFormButtons.tsx";

type PersonalForm = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
};

function CoverLetterPersonalForm({ mode }: { mode: FormMode }) {
  const { coverLetterId } = useParams();
  const { coverLetterInfo, setCoverLetterInfo, setStatus } = useCoverLetter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalForm>();

  const { refetch } = useGetPersonalCoverLetterQuery({
    id: coverLetterId || "",
  });
  const [addPersonalCoverLetter] = useAddPersonalCoverLetterMutation();
  const [updatePersonalCoverLetter] = useUpdatePersonalCoverLetterMutation();

  const initialPersonalInfo: PersonalForm =
    mode === "add"
      ? {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          address: "",
        }
      : coverLetterInfo?.personal;

  const [personal, setPersonal] = useState<PersonalForm>(
    mode === "edit" ? coverLetterInfo?.personal : initialPersonalInfo,
  );

  const submitForm: SubmitHandler<PersonalForm> = async (data) => {
    const personalData = {
      full_name: data.fullName,
      job_title: data.jobTitle,
      email: data.email,
      phone_number: data.phone,
      address: data.address,
    };

    const personalFormData = createFormData(personalData);

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addPersonalCoverLetter({
              coverLetter: personalFormData,
              id: coverLetterId || "",
            }).unwrap(),
          mode,
        );
      } else {
        await handleResumeAction(
          () =>
            updatePersonalCoverLetter({
              coverLetter: personalFormData,
              id: coverLetterId || "",
            }).unwrap(),
          mode,
        );
      }
      setStatus(() => ["normal"]);
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPersonal((prevInfo) => ({ ...prevInfo, [name]: value }));
    setCoverLetterInfo((prevInfo) => ({
      ...(prevInfo || {}),
      personal: {
        ...(prevInfo?.personal || {}),
        [name]: value,
      },
    }));
  }

  return (
    <FormPreviewSection
      title={mode === "edit" ? "Edit Personal Info" : "Add Personal Info"}
      tips={false}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full flex-col gap-5"
      >
        <div className="flex justify-between gap-2">
          <InputField errors={errors} id="fullName" label="Full name">
            <Input
              register={register}
              onChange={handleOnChange}
              value={personal?.fullName}
              name="fullName"
              options={{ required: "full name is required" }}
              props={{
                placeholder: "John Doe",
                type: "text",
                id: "fullName",
              }}
            />
          </InputField>

          <InputField errors={errors} id="jobTitle" label="Job title">
            <Input
              register={register}
              onChange={handleOnChange}
              value={personal?.jobTitle}
              name="jobTitle"
              props={{
                placeholder: "Full Stack",
                type: "text",
                id: "jobTitle",
              }}
            />
          </InputField>
        </div>

        <InputField errors={errors} id="email" label="Email">
          <Input
            register={register}
            onChange={handleOnChange}
            value={personal?.email}
            name="email"
            props={{
              placeholder: "your.name@mail.com",
              type: "email",
              id: "email",
            }}
          />
        </InputField>

        <div className="flex justify-between gap-2">
          <InputField errors={errors} id="phone" label="Phone">
            <Input
              register={register}
              onChange={handleOnChange}
              value={personal?.phone}
              name="phone"
              props={{
                placeholder: "Enter Phone",
                type: "text",
                id: "phone",
              }}
            />
          </InputField>

          <InputField errors={errors} id="address" label="Address">
            <Input
              register={register}
              onChange={handleOnChange}
              value={personal?.address}
              name="address"
              props={{
                placeholder: "City, Country",
                type: "text",
                id: "address",
              }}
            />
          </InputField>
        </div>
        <CoverLetterFormButtons
          mode={mode}
          hiddenDeleteBtn={true}
          handleCancel={() => {
            if (mode === "add")
              setCoverLetterInfo((prevInfo) => ({
                ...prevInfo,
                personal: {
                  ...prevInfo.personal,
                  fullName: "",
                  jobTitle: "",
                  email: "",
                  phone: "",
                  address: "",
                },
              }));
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default CoverLetterPersonalForm;
