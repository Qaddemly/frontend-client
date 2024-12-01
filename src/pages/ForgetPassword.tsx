import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import AuthInputField from "../components/auth/AuthInputField";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSettings } from "../components/auth";
import { IError, IForgetMyPassword } from "../interfaces/Auth.interfaces";
import { useForgetMyPasswordMutation } from "../components/auth/api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

function ForgetPassword() {
  const [forgetMyPassword, { isLoading }] = useForgetMyPasswordMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetMyPassword>(formSettings);

  const onSubmit: SubmitHandler<IForgetMyPassword> = async (data) => {
    console.log(data);
    try {
      const res = await forgetMyPassword(data).unwrap();
      localStorage.setItem(
        "resetVerificationToken",
        res.resetVerificationToken,
      );
      toast.success("Check your email");
      navigate("/emailVerfiy");
    } catch (err) {
      const error = err as IError;
      toast.error(error.data.message);
    }
  };
  return (
    <AuthLayout>
      {isLoading && <Loader />}
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
