import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import { UserInfoStep } from "../../../types/index.types";
import AuthInput from "../AuthInput";
import AuthButton from "../AuthButton";
import AuthStartToEndDate from "../AuthStartToEndDate";
import AuthPrevAndSkipButtons from "../AuthPrevAndSkipButtons";

function UserInfoEducation({ setStep }: UserInfoStep) {
  return (
    <UserInfoLayout title="Education">
      <div className="flex flex-col gap-4 text-left">
        <AuthInput
          icon={faGraduationCap}
          label="University"
          props={{
            id: "university",
            type: "text",
            placeholder: "Ex. Tanta University",
          }}
        />
        <AuthInput
          label="Field of Study"
          props={{
            id: "fieldOfStudy",
            type: "text",
            placeholder: "Ex. Engineering",
          }}
        />
        <AuthInput
          label="GPA"
          props={{
            id: "gpa",
            type: "number",
            placeholder: "Ex. 3.67",
          }}
        />

        <AuthStartToEndDate />

        <AuthButton className="px-4 py-2">Submit</AuthButton>

        <AuthPrevAndSkipButtons setStep={setStep} />
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoEducation;
