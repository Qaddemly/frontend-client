import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import FileUpload from "../FileUpload";
import AuthButton from "../AuthButton";
import { useFormContext } from "react-hook-form";

function UserInfoResume() {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col">
      <UserInfoLayout title="Upload Your Resume">
        <FileUpload name="resume" register={register} icon={faCloudArrowUp} />
        <AuthButton type="button" className="mt-5 px-2">
          Create by AI
        </AuthButton>
      </UserInfoLayout>
    </div>
  );
}

export default UserInfoResume;
