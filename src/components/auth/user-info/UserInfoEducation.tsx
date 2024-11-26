import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import AuthStartToEndDate from "../AuthStartToEndDate";
import { UserInfoProps } from "../../../types/Auth.types";
import { FieldValues, Path } from "react-hook-form";
import AuthInputField from "../AuthInputField";
import AuthInput from "../AuthInput";

function UserInfoEducation<T extends FieldValues>({
  register,
  errors,
}: UserInfoProps<T>) {
  return (
    <UserInfoLayout title="Education">
      <div className="flex flex-col gap-4 text-left">
        <AuthInputField
          id="university"
          label="University"
          icon={faGraduationCap}
          errors={errors}
        >
          <AuthInput
            register={register}
            name={"university" as Path<T>}
            icon={faGraduationCap}
            props={{
              id: "university",
              type: "text",
              placeholder: "Ex. Tanta University",
            }}
          />
        </AuthInputField>

        <AuthInputField
          errors={errors}
          id="fieldOfStudy"
          label="Field of Study"
        >
          <AuthInput
            register={register}
            name={"fieldOfStudy" as Path<T>}
            props={{
              id: "fieldOfStudy",
              type: "text",
              placeholder: "Ex. Engineering",
            }}
          />
        </AuthInputField>

        <AuthInputField errors={errors} id="gpa" label="GPA">
          <AuthInput
            register={register}
            name={"gpa" as Path<T>}
            props={{
              id: "gpa",
              type: "number",
              placeholder: "Ex. 3.67",
            }}
          />
        </AuthInputField>

        {register && <AuthStartToEndDate register={register} />}
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoEducation;
