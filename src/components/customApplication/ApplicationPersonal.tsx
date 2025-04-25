import { useFormContext } from "react-hook-form";
import { Prefixes } from "../../enums/index.enums";
import InputField from "../common/InputField";
import Input from "../common/Input";
import Select from "../common/Select";
import DatePicker from "../common/DatePicker";
// import { ICustomPersonal } from "../../interfaces/CustomApplication.interfaces";

function ApplicationPersonal() {
  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value == "string",
  );
  const {
    register,
    formState: { errors },
  } = useFormContext();
  // const { setApplicationData } = useApplication();

  // const onSubmit = (data: PersonalFormData) => {
  //   setApplicationData((prev) => ({ ...prev, personal: data }));
  // };

  return (
    <>
      <InputField errors={errors} id="customfName">
        <Input
          register={register}
          name={"personal.firstName"}
          props={{
            id: "customfName",
            type: "text",
            placeholder: "First name",
          }}
        />
      </InputField>

      <InputField errors={errors} id="customlName">
        <Input
          register={register}
          name={"personal.lastName"}
          props={{
            id: "customlName",
            type: "text",
            placeholder: "Last name",
          }}
        />
      </InputField>

      <InputField errors={errors} id="customeMail">
        <Input
          register={register}
          name={"personal.email"}
          props={{
            id: "customeMail",
            type: "text",
            placeholder: "Mail",
          }}
          // TODO : check email validation
          // pattern= {
          //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          //   message: "Invalid email address",}
        />
      </InputField>

      <div className="flex w-full items-center gap-3">
        <Select
          register={register}
          name="personal.phone.countryCode"
          id="customphone"
          className="w-3 sm:w-fit"
        >
          {prefixValues.map((value) => (
            <option
              key={value}
              value={Prefixes[value as keyof typeof Prefixes]}
            >
              {value}
            </option>
          ))}
        </Select>

        <InputField
          errors={errors}
          id="customphone"
          props={{
            className: "w-full",
          }}
        >
          <Input
            register={register}
            name={"personal.phone.number"}
            props={{
              placeholder: "Phone number",
              id: "customphone",
              type: "number",
            }}
          />
        </InputField>
      </div>

      <div className="flex flex-col gap-1">
        <DatePicker
          register={register}
          name={"personal.dob"}
          props={{ id: "customdob", className: "w-full" }}
        />
        {errors.dob && typeof errors.dob?.message === "string" && (
          <span className="text-sm text-danger-300">{errors.dob.message}</span>
        )}
      </div>
    </>
  );
}

export default ApplicationPersonal;
