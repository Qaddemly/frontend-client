import { faImage } from "@fortawesome/free-solid-svg-icons";
import { validateDateOfBirth } from "../../../utils/helpers";
import { Prefixes } from "../../auth";
import DatePicker from "../../common/DatePicker";
import FileUpload from "../../common/FileUpload";
import Input from "../../common/Input";
import InputField from "../../common/InputField";
import Select from "../../common/Select";
import Button from "../../common/Button";
import { useFormContext } from "react-hook-form";

function CreateBusinessAccountStep2() {
  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value == "string",
  );
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-10 flex flex-col gap-5">
      <div className="flex gap-10">
        <InputField errors={errors} label="CEO" id="CEO" required>
          <Input
            register={register}
            name="CEO"
            options={{ required: "this field is required" }}
            props={{
              type: "text",
              id: "CEO",
              placeholder: "Enter CEO name",
            }}
          />
        </InputField>
        <InputField errors={errors} label="Founder" id="founder" required>
          <Input
            register={register}
            name="founder"
            options={{ required: "this field is required" }}
            props={{
              type: "text",
              id: "founder",
              placeholder: "Enter founder name",
            }}
          />
        </InputField>
      </div>

      <div className="flex items-end gap-2">
        <Select
          register={register}
          name="phone"
          label="Phone number"
          id="phone"
        >
          {prefixValues.map((value) => (
            <option
              key={value}
              value={Prefixes[value as keyof typeof Prefixes]}
            >
              {value} +({Prefixes[value as keyof typeof Prefixes]})
            </option>
          ))}
        </Select>

        <InputField id="phone">
          <Input
            name={"phone.number"}
            props={{
              placeholder: "123-456-789",
              id: "phone",
              type: "number",
            }}
          />
        </InputField>
      </div>

      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="dateOfBirth" className="font-medium">
          Founded Year <span className="text-danger-300">*</span>
        </label>
        <DatePicker
          register={register}
          name="founded"
          options={{
            validate: (value) => validateDateOfBirth(value),
            required: "this field is required",
          }}
        />
      </div>

      <InputField errors={errors} label="Company website" id="website">
        <Input
          register={register}
          name="website"
          options={{ required: "this field is required" }}
          props={{ type: "text", id: "website" }}
        />
      </InputField>
      <InputField
        errors={errors}
        label="Company size"
        id="company_size"
        required
      >
        <Input
          register={register}
          name="company_size"
          options={{ required: "this field is required" }}
          props={{ type: "text", id: "company_size" }}
        />
      </InputField>
      <InputField
        errors={errors}
        label="Company head quarter"
        id="headquarter"
        required
      >
        <Input
          register={register}
          name="headquarter"
          options={{ required: "this field is required" }}
          props={{ type: "text", id: "headquarter" }}
        />
      </InputField>

      <div className="flex flex-col gap-2 font-medium">
        <label className="">
          Company Logo <span className="text-danger-300">*</span>
        </label>
        <FileUpload
          icon={faImage}
          register={register}
          name="logo"
          options={{ required: "this field is required" }}
        />
      </div>
      <Button className="px-3">Submit</Button>
    </div>
  );
}

export default CreateBusinessAccountStep2;
