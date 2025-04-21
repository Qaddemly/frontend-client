import { useApplication } from "../../context/ApplicationContext";
import { useForm } from "react-hook-form";
import { Prefixes } from "../../enums/index.enums";

import InputField from "../common/InputField";
import Input from "../common/Input";
import Select from "../common/Select";
import DatePicker from "../common/DatePicker";

interface PersonalFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
}

function ApplicationPersonal() {
  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value == "string",
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalFormData>();
  const { setApplicationData } = useApplication();

  const onSubmit = (data: PersonalFormData) => {
    setApplicationData((prev) => ({ ...prev, personal: data }));
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-center text-3xl font-bold">Personal Info</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField errors={errors} id="customfName">
          <Input
            register={register}
            name={"firstName"}
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
            name={"lastName"}
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
            name={"email"}
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
            name="phone"
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
              name={"phone"}
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
            name={"dob"}
            props={{ id: "customdob", className: "w-full" }}
          />
          {errors.dob && typeof errors.dob?.message === "string" && (
            <span className="text-sm text-danger-300">
              {errors.dob.message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default ApplicationPersonal;
