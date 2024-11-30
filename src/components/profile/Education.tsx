import AuthInput from "../auth/AuthInput";
import AuthInputField from "../auth/AuthInputField";
import AuthStartToEndDate from "../auth/AuthStartToEndDate";

function Education() {
  return (
    <div className="mb-10 mt-5 space-y-5">
      <div className="flex">
        <AuthInputField id="University" label="University">
          <AuthInput
            props={{
              placeholder: "Ex. Tanta University",
              type: "text",
              id: "University",
            }}
          />
        </AuthInputField>
      </div>
      <div className="flex">
        <AuthInputField id="Field of study" label="Field of study">
          <AuthInput
            props={{
              placeholder: "Ex. Engineering",
              type: "text",
              id: "Field of study",
            }}
          />
        </AuthInputField>
      </div>
      <div className="flex">
        <AuthInputField id="GPA" label="GPA">
          <AuthInput
            props={{
              placeholder: "Ex. 3.65",
              type: "text",
              id: "GPA",
            }}
          />
        </AuthInputField>
      </div>
      <div>
        <AuthStartToEndDate />
      </div>
    </div>
  );
}
export default Education;
