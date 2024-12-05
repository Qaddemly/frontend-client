import { faImage, faPhone } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../common/DatePicker";
import FileUpload from "../../common/FileUpload";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import { Country, Prefixes } from "..";
import InputField from "../../common/InputField";
import { useFormContext } from "react-hook-form";
import { validateDateOfBirth } from "../../../utils/helpers";
import Select from "../../common/Select";
import Input from "../../common/Input";

function UserInfoPersonal() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value == "string",
  );
  // const countryValues = Object.values(Country).filter(
  //   (value) => typeof value == "string",
  // );
  const countryKeys = Object.keys(Country).filter(
    (key) => typeof Country[key as keyof typeof Country] === "string",
  );

  return (
    <UserInfoLayout title="More infromations lead you to right profile">
      <div className="flex flex-col gap-5">
        <div className="flex items-end gap-3">
          <Select
            register={register}
            name="phone.countryCode"
            label="Phone"
            id="phone"
            className="w-fit"
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

          <InputField errors={errors} icon={faPhone} id="phone">
            <Input
              register={register}
              name={"phone.number"}
              icon={faPhone}
              props={{
                placeholder: "123-456-789",
                id: "phone",
                type: "number",
              }}
            />
          </InputField>
        </div>

        <div className="flex items-end gap-3 text-left">
          <Select
            register={register}
            name={"address.country"}
            label="Address"
            id="country"
            className="w-fit"
          >
            {countryKeys.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>

          <InputField errors={errors} id="city">
            <Input
              register={register}
              name={"address.city"}
              props={{
                placeholder: "City",
                type: "text",
                id: "city",
                className: "w-[9rem]",
              }}
            />
          </InputField>
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="dateOfBirth" className="font-medium">
            Date of Birth
          </label>
          <DatePicker
            register={register}
            name={"dateOfBirth"}
            options={{
              validate: (value) => validateDateOfBirth(value),
            }}
          />
          {errors.dateOfBirth &&
            typeof errors.dateOfBirth?.message === "string" && (
              <p className="text-sm text-danger">
                {errors.dateOfBirth.message}
              </p>
            )}
        </div>

        <p className="mt-4 text-left font-medium">Profile Picture</p>
        <FileUpload
          register={register}
          name={"profilePicture"}
          icon={faImage}
        />
      </div>
    </UserInfoLayout>
  );
}
export default UserInfoPersonal;
