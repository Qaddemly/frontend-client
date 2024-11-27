import { faLock } from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import AuthInputField from "../components/auth/AuthInputField";
import AuthInput from "../components/auth/AuthInput";
import { useState } from "react";

function SetNewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <AuthLayout>
      <Logo />
      <p className="mt-5 text-xl font-medium">Set a new password</p>
      <p className="text-sm text-gray-300">
        Create a new password. Ensure it differs <br /> from previous ones for
        security.
      </p>

      <div className="mt-5 space-y-5 text-left">
        <AuthInputField
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          icon={faLock}
          id="newPassword"
          label="New Password"
        >
          <AuthInput
            showPassword={showPassword}
            props={{
              type: "password",
              id: "newPassword",
              placeholder: "•••••••••",
            }}
            icon={faLock}
          />
        </AuthInputField>
        <AuthInputField
          icon={faLock}
          id="confirmNewPassword"
          label="Confirm New Password"
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        >
          <AuthInput
            showPassword={showConfirmPassword}
            props={{
              type: "password",
              id: "confirmNewPassword",
              placeholder: "•••••••••",
            }}
            icon={faLock}
          />
        </AuthInputField>
        <AuthButton className="w-full">Upadate Password</AuthButton>
      </div>
    </AuthLayout>
  );
}

export default SetNewPassword;
