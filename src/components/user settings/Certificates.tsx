import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import InputField from "../common/InputField";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import FileUpload from "../common/FileUpload";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface IUpdateCertificateInputs {
  title: string;
  issuingOrganization: string;
  startDate: string;
  endDate: string;
  certificate: string;
}

function Certificates() {
  const methods = useForm<IUpdateCertificateInputs>();
  const { register, handleSubmit } = methods;

  const submitForm: SubmitHandler<IUpdateCertificateInputs> = async (data) => {
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
            name="issuingOrganization"
            props={{
              placeholder: "Ex: Microsoft",
              type: "text",
              id: "issuingOrganization",
              // defaultValue: currentVolunteering?.organization,
            }}
          />
        </InputField>

        <StartToEndDate
          startDate="startDate"
          endDate="endDate"
          register={register}
          //   startDateDefaultValue={currentExperience?.start_date || ""}
          //   endDateDefaultValue={currentExperience?.end_date || ""}
        />

        <FileUpload register={register} name={"certificate"} icon={faImage} />

        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Save Changes</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Certificates;
