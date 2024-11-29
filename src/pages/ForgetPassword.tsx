import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import AuthInputField from "../components/auth/AuthInputField";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSettings } from "../components/auth";
interface IForgetPassword {
  email: string;
}

function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPassword>(formSettings);

  const onSubmit: SubmitHandler<IForgetPassword> = (data) => {
    console.log(data);
  };
  return (
    <AuthLayout>
      <Logo />
      <p className="mt-5 text-xl font-medium">Forget Password</p>
      <p className="text-sm text-gray-300">
        Please enter you email to reset the password
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 space-y-5 text-left"
      >
        <AuthInputField
          errors={errors}
          icon={faEnvelope}
          id="email"
          label="Email Address"
        >
          <AuthInput
            register={register}
            name="email"
            options={{ required: "email is required" }}
            props={{
              type: "email",
              placeholder: " test@example.com",
              id: "email",
            }}
            icon={faEnvelope}
          />
        </AuthInputField>

        <AuthButton className="w-full">Reset Password</AuthButton>
      </form>
    </AuthLayout>
  );
}

export default ForgetPassword;
