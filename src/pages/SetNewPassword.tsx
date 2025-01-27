import { faLock } from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/common/Input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISetNewPassword } from "../interfaces/Auth.interfaces";
import { useSetNewPasswordMutation } from "../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { formSettings, IError } from "../interfaces/Common.interfaces";

function SetNewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();
  const naviagate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ISetNewPassword>(formSettings);

  const onSubmit: SubmitHandler<ISetNewPassword> = async ({
    newPassword,
    newPasswordConfirm,
  }) => {
    const passwordResetToken = localStorage.getItem("passwordResetToken");
    if (passwordResetToken?.length)
      try {
        const res = await setNewPassword({
          newPassword,
          newPasswordConfirm,
          passwordResetToken,
        }).unwrap();
        toast.success(res.message);
        naviagate("/login");
        localStorage.removeItem("passwordResetToken");
      } catch (err) {
        const error = err as IError;
        toast.error(error.message);
      }
  };

  return (
    <AuthLayout>
      <Logo />
      {isLoading && <Loader />}
      <p className="mt-5 text-xl font-medium">Set a new password</p>
      <p className="text-sm text-gray-300">
        Create a new password. Ensure it differs <br /> from previous ones for
        security.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 space-y-5 text-left"
      >
        <InputField
          errors={errors}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          icon={faLock}
          id="newPassword"
          label="New Password"
        >
          <Input
            register={register}
            name="newPassword"
            options={{
              required: "new password is reqiured",
              minLength: { value: 8, message: "min value 8 charcters" },
            }}
            showPassword={showPassword}
            props={{
              type: "password",
              id: "newPassword",
              placeholder: "•••••••••",
            }}
            icon={faLock}
          />
        </InputField>
        <InputField
          errors={errors}
          icon={faLock}
          id="newPasswordConfirm"
          label="Confirm New Password"
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        >
          <Input
            register={register}
            name="newPasswordConfirm"
            showPassword={showConfirmPassword}
            options={{
              required: "confirm password is reqiured",
              minLength: { value: 8, message: "min value 8 charcters" },
              validate: (value) =>
                getValues("newPassword") === value || "password do not match",
            }}
            props={{
              type: "password",
              id: "newPasswordConfirm",
              placeholder: "•••••••••",
            }}
            icon={faLock}
          />
        </InputField>
        <Button className="w-full">Update Password</Button>
      </form>
    </AuthLayout>
  );
}

export default SetNewPassword;
