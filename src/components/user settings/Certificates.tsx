import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import InputField from "../common/InputField";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import FileUpload from "../common/FileUpload";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
} from "../../services/profileApi";
import { createFormData, handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import { ICertificate } from "../../interfaces/Profile.interfaces";
import { useParams } from "react-router-dom";

// interface IUpdateCertificateInputs {
//   title: string;
//   issuingOrganization: string;
//   startDate: string;
//   endDate: string;
//   certificate: string;
// }

function Certificates() {
  const methods = useForm<ICertificate>();
  const { register, handleSubmit } = methods;
  const { expId } = useParams();

  const [certificate, setCertificate] = useState<FileList | null>(null);
  const [data, { isLoading: isLoading1 }] = useCreateCertificateMutation();
  const [updateCertificate, { isLoading: isLoading2 }] =
    useUpdateCertificateMutation();

  async function handleCreateCertificate() {
    if (certificate) {
      const formData = createFormData({ certificates: certificate });
      try {
        await data({ certificates: formData }).unwrap();
        toast.success("certificate created successfully");
        setCertificate(null);
      } catch (error) {
        handleApiError(error);
      }
    }
  }

  if (isLoading1 || isLoading2) return <Loader />;

  const submitForm: SubmitHandler<ICertificate> = async (data) => {
    try {
      await updateCertificate({ data, id: expId || "" }).unwrap();
      toast.success("Certificate updated successfully");
    } catch (error) {
      handleApiError(error);
    }
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        className="mt-10 flex w-[35rem] flex-col gap-5 px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <InputField id="title" label="Title">
          <Input
            register={register}
            name="title"
            props={{
              placeholder: "Ex: Microsoft certified network associate security",
              type: "text",
              id: "organization",
              // defaultValue: currentVolunteering?.organization,
            }}
          />
        </InputField>
        <InputField id="issuingOrganization" label="Issuing organization">
          <Input
            register={register}
            name="issuing_organization"
            props={{
              placeholder: "Ex: Microsoft",
              type: "text",
              id: "issuingOrganization",
              // defaultValue: currentVolunteering?.organization,
            }}
          />
        </InputField>

        <StartToEndDate
          register={register}
          start_Date="startDate"
          endDate="endDate"
          //   startDateDefaultValue={currentExperience?.start_date || ""}
          //   endDateDefaultValue={currentExperience?.end_date || ""}
        />

        <FileUpload register={register} name={"title"} icon={faImage} />

        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Save Changes</Button>
        </div>
        <div className="mt-5 flex w-full justify-end">
          {certificate && (
            <Button className="px-3" onClick={handleCreateCertificate}>
              Create
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default Certificates;
