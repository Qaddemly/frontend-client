import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import AuthStartToEndDate from "../AuthStartToEndDate";
import { useFormContext } from "react-hook-form";
import AuthInput from "../AuthInput";
import AuthInputField from "../AuthInputField";

function UserInfoEducation() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <UserInfoLayout title="Education">
      <div className="flex flex-col gap-4 text-left">
        <AuthInputField
          errors={errors}
          id="University"
          label="University"
          icon={faGraduationCap}
        >
          <AuthInput
            register={register}
            name={"university"}
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
            name={"fieldOfStudy"}
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
            name={"gpa"}
            options={{
              min: { value: 1, message: "min value 1" },
              max: { value: 4, message: "max value 4" },
            }}
            props={{
              id: "gpa",
              type: "number",
              placeholder: "Ex. 3.67",
            }}
          />
        </AuthInputField>

        <AuthStartToEndDate
          startDate="startEducationDate"
          endDate="endEducationDate"
          register={register}
        />
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoEducation;
