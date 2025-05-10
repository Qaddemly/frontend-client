import { FieldErrors, useFormContext } from "react-hook-form";
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
    <>
      <InputField errors={errors?.personal as FieldErrors} id="firstName">
        <Input
          register={register}
          name={"personal.firstName"}
          options={{ required: "First Name field is required" }}
          props={{
            id: "firstName",
            type: "text",
            placeholder: "First name",
          }}
        />
      </InputField>

      <InputField errors={errors?.personal as FieldErrors} id="lastName">
        <Input
          register={register}
          name={"personal.lastName"}
          options={{ required: "Last Name field is required" }}
          props={{
            id: "lastName",
            type: "text",
            placeholder: "Last name",
          }}
        />
      </InputField>

      <InputField errors={errors?.personal as FieldErrors} id="email">
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
            id: "email",
            type: "text",
            placeholder: "Email",
          }}
        />
      </InputField>

      <div className="mb-3 flex gap-2">
        <Select
          register={register}
          name="personal.phone.countryCode"
          id="phone"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          className={`${errors?.personal?.phone ? "mb-6" : ""} w-3 sm:w-fit`}
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          errors={errors?.personal?.phone as FieldErrors}
          id="number"
          props={{
            className: "w-full",
          }}
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
              placeholder: "Phone number",
              id: "number",
              type: "number",
            }}
          />
        </InputField>
      </div>

      <div className="mb-4">
        <DatePicker
          options={{
            required: "Date of Birth is required",
          }}
          register={register}
          name={"personal.dob"}
          props={{ id: "dob", className: "w-full" }}
        />
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/* @ts-ignore */}
        {errors?.personal?.dob && (
          <span className="text-sm font-medium text-danger-300">
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/* @ts-ignore */}
            {errors?.personal?.dob?.message as string}
          </span>
        )}
      </div>
    </>
  );
}

export default ApplicationPersonal;
