import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import { useFormContext } from "react-hook-form";
import Input from "../../common/Input";
import InputField from "../../common/InputField";
import StartToEndDate from "../../common/StartToEndDate";

function UserInfoEducation() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <UserInfoLayout title="Education">
      <div className="flex flex-col gap-4 text-left">
        <InputField
          errors={errors}
          id="University"
          label="University"
          icon={faGraduationCap}
        >
          <Input
            register={register}
            name={"education.university"}
            icon={faGraduationCap}
            props={{
              id: "university",
              type: "text",
              placeholder: "Ex. Tanta University",
            }}
          />
        </InputField>

        <InputField errors={errors} id="fieldOfStudy" label="Field of Study">
          <Input
            register={register}
            name={"education.fieldOfStudy"}
            props={{
              id: "fieldOfStudy",
              type: "text",
              placeholder: "Ex. Engineering",
            }}
          />
        </InputField>
        <InputField errors={errors} id="gpa" label="GPA">
          <Input
            register={register}
            name={"education.gpa"}
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
        </InputField>

        <StartToEndDate
          startDate="education.startDate"
          endDate="education.endDate"
          register={register}
        />
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoEducation;
