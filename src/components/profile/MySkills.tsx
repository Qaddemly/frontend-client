import { SubmitHandler, useForm } from "react-hook-form";
import AuthInput from "../auth/AuthInput";
import AuthInputField from "../auth/AuthInputField";
import AuthButton from "../auth/AuthButton";

function MySkills() {
  type TMySkills = {
    my_skills: string;
    languages: string;
  };

  const { register, handleSubmit } = useForm<TMySkills>();
  const submitForm: SubmitHandler<TMySkills> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mt-10">
        <AuthInputField id="My-Skills" label="My Skills">
          <AuthInput
            register={register}
            name="my_skills"
            props={{
              placeholder: "Ex. creative, problem solving, ... ",
              type: "text",
              id: "My-Skills",
              className: "w-[30rem]",
            }}
          />
        </AuthInputField>
      </div>

      <AuthButton className="my-5 px-2 py-2">Add New Skill</AuthButton>

      <div className="mb-10">
        <AuthInputField id="Your-languages" label="Your languages">
          <AuthInput
            register={register}
            name="languages"
            props={{
              placeholder: "Ex. Arabic, English, French ...  ",
              type: "text",
              id: "Your-languages",
              className: "w-[30rem]",
            }}
          />
        </AuthInputField>
        <AuthButton className="my-5 px-2 py-2">Add New Language</AuthButton>
      </div>
    </form>
  );
}

export default MySkills;
