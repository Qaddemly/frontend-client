import { faLock } from "@fortawesome/free-solid-svg-icons";
import AuthInput from "../components/auth/AuthInput";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

function SetNewPassword() {
  return (
    <AuthLayout>
      <Logo />
      <p className="mt-5 text-xl font-medium">Set a new password</p>
      <p className="text-sm text-gray-300">
        Create a new password. Ensure it differs <br /> from previous ones for
        security.
      </p>

      <div className="mt-5 space-y-5 text-left">
        <AuthInput
          props={{
            type: "password",
            id: "newPassword",
            placeholder: "new password",
          }}
          label="New Password"
          icon={faLock}
        />
        <AuthInput
          props={{
            type: "password",
            id: "confirmNewPassword",
            placeholder: "•••••••••",
          }}
          label="Confirm New Password"
          icon={faLock}
        />
        <AuthButton className="w-full">Upadate Password</AuthButton>
      </div>
    </AuthLayout>
  );
}

export default SetNewPassword;
