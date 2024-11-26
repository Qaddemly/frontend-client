import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import FileUpload from "../FileUpload";
import AuthButton from "../AuthButton";
import { UserInfoProps } from "../../../types/Auth.types";
import { FieldValues } from "react-hook-form";

function UserInfoResume<T extends FieldValues>({ register }: UserInfoProps<T>) {
  return (
    <div className="flex flex-col">
      <UserInfoLayout title="Upload Your Resume">
        <FileUpload register={register} icon={faCloudArrowUp} />
        <AuthButton type="button" className="mt-5 px-2">
          Create by AI
        </AuthButton>
        {/* <AuthPrevAndSkipButtons setStep={setStep} /> */}
      </UserInfoLayout>
    </div>
  );
}

export default UserInfoResume;
