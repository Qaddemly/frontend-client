import { faImage } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../common/DatePicker";
import FileUpload from "../../common/FileUpload";
import Input from "../../common/Input";
import InputField from "../../common/InputField";
import Button from "../../common/Button";
import { useFormContext } from "react-hook-form";
import React from "react";

function CreateBusinessAccountStep2({
  updateAccount,
  setStep,
  setImage,
  selectedFileName,
  setSelectedFileName,
}: {
  updateAccount: boolean;
  setStep?: React.Dispatch<React.SetStateAction<string>>;
  image?: File | null;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
  selectedFileName: string | null;
  setSelectedFileName: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (setImage) setImage(file);
    setSelectedFileName(file.name);
  };

  return (
    <div
      className={`flex flex-col gap-5 ${updateAccount ? "lg:mt-10" : "mt-10"}`}
    >
      <div className="flex gap-5">
        <InputField
          errors={!updateAccount ? errors : {}}
          label="CEO"
          id="CEO"
          required={!updateAccount}
          props={{ className: "w-full" }}
        >
          <Input
            register={register}
            name="CEO"
            options={
              !updateAccount ? { required: "this field is required" } : {}
            }
            props={{
              type: "text",
              id: "CEO",
              placeholder: "Enter CEO name",
            }}
          />
        </InputField>
      </div>

      <div className="flex items-end justify-between gap-3">
        <InputField
          errors={!updateAccount ? errors : {}}
          label="Founder"
          id="founder"
          required={!updateAccount}
          props={{ className: "w-full" }}
        >
          <Input
            register={register}
            name="founder"
            options={
              !updateAccount ? { required: "this field is required" } : {}
            }
            props={{
              type: "text",
              id: "founder",
              placeholder: "Enter founder name",
            }}
          />
        </InputField>

        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="dateOfBirth" className="font-medium">
            Founded Year{" "}
            {!updateAccount && <span className="text-danger-300">*</span>}
          </label>
          <DatePicker register={register} name="founded" />
        </div>
      </div>

      <InputField
        errors={!updateAccount ? errors : {}}
        label="Company website"
        id="website"
      >
        <Input
          register={register}
          name="website"
          options={!updateAccount ? { required: "this field is required" } : {}}
          props={{ type: "text", id: "website" }}
        />
      </InputField>
      <InputField
        errors={!updateAccount ? errors : {}}
        label="Company size"
        id="company_size"
        required={!updateAccount}
      >
        <Input
          register={register}
          name="company_size"
          options={!updateAccount ? { required: "this field is required" } : {}}
          props={{ type: "number", id: "company_size" }}
        />
      </InputField>
      <InputField
        errors={!updateAccount ? errors : {}}
        label="Company head quarter"
        id="headquarter"
        required={!updateAccount}
      >
        <Input
          register={register}
          name="headquarter"
          options={!updateAccount ? { required: "this field is required" } : {}}
          props={{ type: "text", id: "headquarter" }}
        />
      </InputField>

      <div className="flex flex-col gap-2 font-medium">
        <label className="">
          Company Logo{" "}
          {!updateAccount && <span className="text-danger-300">*</span>}
        </label>
        <FileUpload
          onChange={handleFileChange}
          fileName={selectedFileName}
          icon={faImage}
        />
      </div>
      <div className="flex items-center justify-between">
        {!updateAccount && (
          <Button
            type="button"
            onClick={() => setStep && setStep("1")}
            className="px-3"
          >
            Back
          </Button>
        )}
        <Button type="submit" className={`px-3 ${updateAccount && "w-full"}`}>
          Submit {updateAccount && <span>changes</span>}
        </Button>
      </div>
    </div>
  );
}

export default CreateBusinessAccountStep2;
