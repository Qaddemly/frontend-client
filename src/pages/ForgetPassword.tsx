import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import AuthInputField from "../components/auth/AuthInputField";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

function ForgetPassword() {
  return (
    <AuthLayout>
      <Logo />
      <p className="mt-5 text-xl font-medium">Forget Password</p>
      <p className="text-sm text-gray-300">
        Please enter you email to reset the password
      </p>

      <div className="mt-5 space-y-5 text-left">
        <AuthInputField icon={faEnvelope} id="email" label="Email Address">
          <AuthInput
            props={{
              type: "email",
              placeholder: " test@example.com",
              id: "email",
            }}
            icon={faEnvelope}
          />
        </AuthInputField>

        <AuthButton className="w-full">Reset Password</AuthButton>
      </div>
    </AuthLayout>
  );
}

export default ForgetPassword;
