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
import { FieldValues, Path } from "react-hook-form";
import { UserInfoProps } from "../../../types/Auth.types";

function UserInfoPersonal<T extends FieldValues>({
  register,
  errors,
}: UserInfoProps<T>) {
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
            name={"prefix" as Path<T>}
            label="Phone"
            id="phone"
            className="w-fit"
          >
            <option value="" disabled>
              USA (+1)
            </option>
            {prefixValues.map((key) => (
              <option key={key} value={key}>
                {key} +({Prefixes[key as keyof typeof Prefixes]})
              </option>
            ))}
          </AuthSelect>

          <AuthInputField errors={errors} icon={faPhone} id="phone">
            <AuthInput
              register={register}
              name={"phone" as Path<T>}
              icon={faPhone}
              props={{ placeholder: "123-456-789", id: "phone", type: "tel" }}
            />
          </AuthInputField>
        </div>

        <div className="flex items-end gap-3 text-left">
          <AuthSelect
            register={register}
            name={"country" as Path<T>}
            label="Address"
            id="country"
            className="w-fit"
          >
            <option value="" disabled>
              Select a country
            </option>
            {coutnryValues.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </AuthSelect>

          <AuthInputField errors={errors} icon={faEarthAmericas} id="city">
            <AuthInput
              register={register}
              name={"city" as Path<T>}
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
          <DatePicker register={register} name={"dateOfBirth" as Path<T>} />
        </div>

        <FileUpload
          register={register}
          name={"image" as Path<T>}
          icon={faImage}
        />

        {/* <div className="mt-5 flex justify-between">
          <AuthButton name="submit" className="w-fit px-4 py-2">
            Submit
          </AuthButton>
        </div> */}
      </div>
    </UserInfoLayout>
  );
}
export default UserInfoPersonal;
