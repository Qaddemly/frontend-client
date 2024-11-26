import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import FileUpload from "../FileUpload";
import AuthButton from "../AuthButton";
import AuthPrevAndSkipButtons from "../AuthPrevAndSkipButtons";
import { UserInfoStep } from "../../../types/index.types";

function UserInfoResume({ setStep }: UserInfoStep) {
  return (
    <UserInfoLayout title="Upload Your Resume">
      <FileUpload icon={faCloudArrowUp} />
      <AuthButton className="mt-5 px-2">Create by AI</AuthButton>
      <AuthPrevAndSkipButtons setStep={setStep} />
    </UserInfoLayout>
  );
}

export default UserInfoResume;
