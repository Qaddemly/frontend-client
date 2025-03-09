import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { useState } from "react";
import { FormMode } from "../../../interfaces/ResumeBuilder.interfaces.ts";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import {
  useAddResumePersonalMutation,
  useDeleteResumePersonalMutation,
  useUpdateResumePersonalMutation,
} from "../../../services/resumeBuilderApi.ts";
import toast from "react-hot-toast";
import { createFormData, handleApiError } from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";

type PersonalForm = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
};

function ResumePersonalForm({ mode }: { mode: FormMode }) {
  const { resumeId } = useParams();
  const {
    resumeInfo,
    setResumeInfo,
    setStatus,
    setResumePersonalId,
    resumePersonalId,
  } = useResumeBuilder();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalForm>();

  const [addResumePersonal] = useAddResumePersonalMutation();
  const [updateResumePersonal] = useUpdateResumePersonalMutation();
  const [deleteResumePersonal] = useDeleteResumePersonalMutation();

  const initialPersonalInfo: PersonalForm =
    mode === "add"
      ? {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          address: "",
        }
      : resumeInfo?.personal;

  const [personal, setPersonal] = useState<PersonalForm>(
    mode === "edit" ? resumeInfo?.personal : initialPersonalInfo,
  );

  const submitForm: SubmitHandler<PersonalForm> = async (data) => {
    const personalData = {
      full_name: data.fullName,
      job_title: data.jobTitle,
      email: data.email,
      phone_number: data.phone,
      address: data.address,
    };

    if (personalData?.full_name && mode === "add") {
      const personalFormData = createFormData(personalData);
      try {
        const res = addResumePersonal({
          data: personalFormData,
          resumeId: resumeId || "",
        }).unwrap();
        toast.promise(res, {
          loading: "Saving",
          success: "Added personal info successfully",
          error: "Could not save personal info",
        });
        await res.then((data) =>
          setResumePersonalId(data.personaInfoContent.id),
        );

        setStatus(() => ["normal"]);
      } catch (error) {
        handleApiError(error);
      }
    }

    if (mode === "edit") {
      const personalFormData = createFormData(personalData);
      try {
        const res = updateResumePersonal({
          data: personalFormData,
          resumeId: resumeId || "",
          personalInfoId: resumePersonalId.toString(),
        }).unwrap();
        toast.promise(res, {
          loading: "Updating",
          success: "Update personal info successfully",
          error: "Could not update personal info",
        });
        await res;
        setStatus(() => ["normal"]);
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  async function handleDeletePersonal() {
    try {
      const res = deleteResumePersonal({
        resumeId: resumeId || "",
        personalInfoId: resumePersonalId.toString(),
      }).unwrap();
      toast.promise(res, {
        loading: "Deleting",
        success: "Deleted personal info successfully",
        error: "Could not delete personal info",
      });
      await res;
      setStatus(() => ["normal"]);
    } catch (error) {
      handleApiError(error);
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPersonal((prevInfo) => ({ ...prevInfo, [name]: value }));
    setResumeInfo((prevInfo) => ({
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
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-5">
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
        <ResumeFormButtons mode={mode} handleDelete={handleDeletePersonal} />
      </form>
    </FormPreviewSection>
  );
}

export default ResumePersonalForm;
