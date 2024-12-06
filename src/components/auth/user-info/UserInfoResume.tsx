import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import FileUpload from "../../common/FileUpload";
import { useFormContext } from "react-hook-form";
import Button from "../../common/Button";

function UserInfoResume() {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col">
      <UserInfoLayout title="Upload Your Resume">
        <FileUpload name="resume" register={register} icon={faCloudArrowUp} />
        <Button type="button" className="mt-5 px-2">
          Create by AI
        </Button>
      </UserInfoLayout>
    </div>
  );
}

export default UserInfoResume;
