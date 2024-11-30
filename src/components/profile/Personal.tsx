import {
  faEarthAmericas,
  faImage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthInput from "../auth/AuthInput";

import AuthInputField from "../auth/AuthInputField";
import AuthSelect from "../auth/AuthSelect";
import { Country, Prefixes } from "../auth";
import DatePicker from "../auth/DatePicker";

function Personal() {
  const coutnryValues = Object.values(Country);
  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value == "string",
  );

  return (
    <div className="mt-5 flex">
      <div className="mt-10">
        <span className="text-gray-500"> Profile Photo</span>
        <div className="mt-5 block h-[250px] w-[250px] items-center border-2 border-dashed bg-gray-100">
          <FontAwesomeIcon
            icon={faImage}
            className="ml-[100px] mt-[90px] text-4xl text-gray-600"
          />

          <span className="mt-3 flex items-center justify-center text-light-main underline">
            Click to upload
          </span>
          <p className="mt-3 flex items-center justify-center text-gray-500">
            Max File Size 15MB
          </p>
        </div>
      </div>

      <div className="mt-10 px-10">
        <div className="mt-10 flex space-x-5">
          <AuthInputField id="firstName" label="FirstName">
            <AuthInput
              props={{
                placeholder: "John",
                type: "text",
                id: "firstName",
              }}
            />
          </AuthInputField>

          <AuthInputField id="lastName" label="LastName">
            <AuthInput
              props={{
                placeholder: "Tom",
                type: "text",
                id: "lastName",
              }}
            />
          </AuthInputField>
        </div>

        <div className="mt-10 flex items-end gap-3">
          <AuthSelect
            name={"prefix"}
            label="Phone"
            id="phone"
            className="w-fit"
          >
            <option value="" className="flex" disabled>
              USA (+1)
            </option>
            {prefixValues.map((key) => (
              <option key={key} value={key}>
                {key} +({Prefixes[key as keyof typeof Prefixes]})
              </option>
            ))}
          </AuthSelect>

          <AuthInputField icon={faPhone} id="phone">
            <AuthInput
              name={"phone"}
              icon={faPhone}
              props={{ placeholder: "123-456-789", id: "phone", type: "tel" }}
            />
          </AuthInputField>
        </div>
        <div className="mt-10 flex items-end gap-3 text-left">
          <AuthSelect label="Address" id="country" className="w-fit">
            <option value="" disabled>
              Select a country
            </option>
            {coutnryValues.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </AuthSelect>

          <AuthInputField icon={faEarthAmericas} id="city">
            <AuthInput
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
        <div className="mt-10 flex flex-col gap-2 text-left">
          <label htmlFor="dateOfBirth" className="font-medium">
            Date of Birth
          </label>
          <DatePicker name={"dateOfBirth"} />
        </div>
      </div>
    </div>
  );
}
export default Personal;
