import {
  faEarthAmericas,
  faImage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import AuthInput from "../AuthInput";
import AuthSelect from "../AuthSelect";
import DatePicker from "../DatePicker";
import FileUpload from "../FileUpload";
import AuthButton from "../AuthButton";
import { UserInfoStep } from "../../../types/index.types";
import UserInfoLayout from "../../../layout/UserInfoLayout";

function UserInfoPersonal({ setStep }: UserInfoStep) {
  return (
    <UserInfoLayout title="More infromations lead you to right profile">
      <div className="flex flex-col gap-5">
        <div className="flex items-end gap-3">
          <AuthSelect label="Phone" id="country" className="w-fit">
            <option value="Egypt">Egypt (+20)</option>
            <option value="US"> United States (+1)</option>
            <option value="CA">United Kingdom (+44)</option>
            <option value="FR">Australia (+61)</option>
            <option value="DE">Germany (+49)</option>
            <option value="DE">France (+33)</option>
            <option value="DE"> Germany (+49)</option>
          </AuthSelect>

          <AuthInput
            icon={faPhone}
            props={{ placeholder: "123-456-789", id: "phone", type: "tel" }}
          />
        </div>

        <div className="flex items-end gap-3 text-left">
          <AuthInput
            icon={faEarthAmericas}
            label="Address"
            props={{
              placeholder: "Country",
              type: "text",
              id: "country",
              className: "w-[9rem]",
            }}
          />
          <AuthInput
            icon={faEarthAmericas}
            props={{
              placeholder: "City",
              type: "text",
              id: "city",
              className: "w-[9rem]",
            }}
          />
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="dateOfBirth" className="font-medium">
            Date of Birth
          </label>
          <DatePicker id="dateOfBirth" />
        </div>

        <FileUpload icon={faImage} />

        <div className="mt-5 flex justify-between">
          <AuthButton className="w-fit px-4 py-2">Submit</AuthButton>
          <AuthButton
            className="w-fit px-4 py-2"
            onClick={() => setStep((s: number) => s + 1)}
          >
            Skip
          </AuthButton>
        </div>
      </div>
    </UserInfoLayout>
  );
}
export default UserInfoPersonal;
