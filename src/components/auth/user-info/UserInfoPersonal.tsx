import {
  faEarthAmericas,
  faImage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../DatePicker";
import FileUpload from "../FileUpload";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import AuthInputField from "../AuthInputField";
import AuthInput from "../AuthInput";
import { Country, Prefixes } from "..";
import AuthSelect from "../AuthSelect";
import { useFormContext } from "react-hook-form";
import { validateDateOfBirth } from "../../../utils/helpers";

function UserInfoPersonal() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value == "string",
  );
  const coutnryValues = Object.values(Country);

  return (
    <UserInfoLayout title="More infromations lead you to right profile">
      <div className="flex flex-col gap-5">
        <div className="flex items-end gap-3">
          <AuthSelect
            register={register}
            name={"prefix"}
            label="Phone"
            id="phone"
            className="w-fit"
          >
            {prefixValues.map((key) => (
              <option key={key} value={key}>
                {key} +({Prefixes[key as keyof typeof Prefixes]})
              </option>
            ))}
          </AuthSelect>

          <AuthInputField errors={errors} icon={faPhone} id="phone">
            <AuthInput
              register={register}
              name={"phone"}
              icon={faPhone}
              props={{ placeholder: "123-456-789", id: "phone", type: "tel" }}
            />
          </AuthInputField>
        </div>

        <div className="flex items-end gap-3 text-left">
          <AuthSelect
            register={register}
            name={"country"}
            label="Address"
            id="country"
            className="w-fit"
          >
            {coutnryValues.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </AuthSelect>

          <AuthInputField errors={errors} icon={faEarthAmericas} id="city">
            <AuthInput
              register={register}
              name={"city"}
              icon={faEarthAmericas}
              props={{
                placeholder: "City",
                type: "text",
                id: "city",
                className: "w-[9rem]",
              }}
            />
          </AuthInputField>
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

        <FileUpload register={register} name={"image"} icon={faImage} />
      </div>
    </UserInfoLayout>
  );
}
export default UserInfoPersonal;
