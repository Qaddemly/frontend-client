import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import InputField from "../common/InputField";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import FileUpload from "../common/FileUpload";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {
  useCreateCertificateMutation,
  useGetCertificateQuery,
  useUpdateCertificateMutation,
} from "../../services/profileApi";
import { createFormData, handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { ICertificate } from "../../interfaces/Profile.interfaces";
import { useEffect } from "react";

type CertificateStatus = "update" | "create";

function Certificates() {
  const methods = useForm<ICertificate>();
  const { register, handleSubmit } = methods;
  const { certificateId } = useParams();
  const certificateStatus: CertificateStatus =
    certificateId === "0" ? "create" : "update";

  const navigate = useNavigate();

  const [createCertificate, { isLoading: isLoading1 }] =
    useCreateCertificateMutation();
  const [updateCertificate, { isLoading: isLoading2 }] =
    useUpdateCertificateMutation();
  const { data, isLoading: isLoading3 } = useGetCertificateQuery({
    id: certificateId || "",
  });
  const certificate = data?.certificate;

  const submitForm: SubmitHandler<ICertificate> = async (data) => {
    const formData = createFormData(data as unknown as Record<string, unknown>);
    if (certificateStatus === "update") {
      try {
        await updateCertificate({
          data: formData,
          id: certificateId || "",
        }).unwrap();
        toast.success("Certificate updated successfully");
      } catch (error) {
        handleApiError(error);
      }
    } else {
      if (
        data.title &&
        data.issuing_organization &&
        data.start_date &&
        data.end_date &&
        data.media
      )
        try {
          await createCertificate({ certificates: formData }).unwrap();
          toast.success("Certificate created successfully");
          navigate("/userSettings/profile/certificates");
        } catch (error) {
          handleApiError(error);
        }
    }
  };

  useEffect(() => {
    if (certificateStatus === "update")
      methods.reset({
        title: certificate?.title || "",
        issuing_organization: certificate?.issuing_organization || "",
        start_date: certificate?.start_date || "",
        end_date: certificate?.end_date || "",
      });
  }, [certificate, methods, certificateStatus]);

  if (isLoading1 || isLoading2 || isLoading3) return <Loader />;

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
            }}
          />
        </InputField>

        <StartToEndDate
          register={register}
          startDate="start_date"
          endDate="end_date"
        />

        <FileUpload register={register} name={"media"} icon={faImage} />

        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Save Changes</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Certificates;
