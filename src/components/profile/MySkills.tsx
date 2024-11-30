import AuthInput from "../auth/AuthInput";
import AuthInputField from "../auth/AuthInputField";

function MySkills() {
  return (
    <div>
      <div className="mt-10">
        <AuthInputField id="My-Skills" label="My Skills">
          <AuthInput
            props={{
              placeholder: "Ex. creative, problem solving, ... ",
              type: "text",
              id: "My-Skills",
            }}
          />
        </AuthInputField>
      </div>

      <div className="my-5 pl-[450px]">
        <button className="mt-5 rounded-md border-2 border-main bg-main px-4 py-2 text-white">
          Add New Skill
        </button>
      </div>

      <div className="">
        <AuthInputField id="Your-languages" label="Your languages">
          <AuthInput
            props={{
              placeholder: "Ex. Arabic, English, French ...  ",
              type: "text",
              id: "Your-languages",
            }}
          />
        </AuthInputField>
      </div>
    </div>
  );
}

export default MySkills;
