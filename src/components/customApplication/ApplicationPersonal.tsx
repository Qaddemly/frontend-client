import { useFormContext } from "react-hook-form";
import { Prefixes } from "../../enums/index.enums";
import InputField from "../common/InputField";
import Input from "../common/Input";
import Select from "../common/Select";
import DatePicker from "../common/DatePicker";

function ApplicationPersonal() {
  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value === "string",
  );

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <div className="mb-3">
        <InputField errors={errors} id="customfName">
          <Input
            register={register}
            name={"personal.firstName"}
            options={{ required: "First Name field is required" }}
            props={{
              id: "customfName",
              type: "text",
              placeholder: "First name",
            }}
          />
        </InputField>
      </div>

      <div className="mb-3">
        <InputField errors={errors} id="customlName">
          <Input
            register={register}
            name={"personal.lastName"}
            options={{ required: "Last Name field is required" }}
            props={{
              id: "customlName",
              type: "text",
              placeholder: "Last name",
            }}
          />
        </InputField>
      </div>

      <div className="mb-3">
        <InputField errors={errors} id="customeMail">
          <Input
            register={register}
            name={"personal.email"}
            options={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            props={{
              id: "customeMail",
              type: "text",
              placeholder: "Mail",
            }}
          />
        </InputField>
      </div>

      <div className="mb-3 flex gap-2">
        <Select
          register={register}
          name="personal.phone.countryCode"
          id="customphone"
          className="w-1/4"
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
          props={{ className: "w-3/4" }}
        >
          <Input
            register={register}
            name={"personal.phone.number"}
            options={{
              required: "Phone number is required",
              minLength: {
                value: 8,
                message: "Phone number must be at least 8 digits",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Phone number must be numeric",
              },
            }}
            props={{
              placeholder: "Phone Number",
              id: "customphone",
              type: "text",
            }}
          />
        </InputField>
      </div>

      <div className="mb-4">
        <DatePicker
          register={register}
          name={"personal.dob"}
          props={{ id: "customdob", className: "w-full" }}
        />
        {errors?.personal?.dob &&
          typeof errors.personal.dob.message === "string" && (
            <span className="text-sm text-danger-300">
              {errors.personal.dob.message}
            </span>
          )}
      </div>
    </div>
  );
}

export default ApplicationPersonal;
