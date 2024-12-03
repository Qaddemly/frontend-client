import toast from "react-hot-toast";

import AuthLink from "../components/auth/AuthLink";
import ActivationInputs from "../components/auth/signup/ActivationInputs";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import { IError } from "../interfaces/Auth.interfaces";
import Loader from "../components/common/Loader";
import {
  useActivateEmailMutation,
  useResendActivateCodeMutation,
  useResendForgetPasswordCodeMutation,
  useVerifyForgetPasswordMutation,
} from "../services/authApi";

function EmailVerfiy() {
  const [activateEmail, { isLoading: isLoading1 }] = useActivateEmailMutation();
  const [verifyForgetPassword, { isLoading: isLoading2 }] =
    useVerifyForgetPasswordMutation();
  const [resendActivateCode, { isLoading: isLoading3 }] =
    useResendActivateCodeMutation();
  const [resendForgetPasswordCode, { isLoading: isLoading4 }] =
    useResendForgetPasswordCodeMutation();
  const navigate = useNavigate();
  const activationToken = localStorage.getItem("activationToken");
  const resetVerificationToken = localStorage.getItem("resetVerificationToken");

  async function handleSubmit(code: string) {
    if (activationToken?.length) {
      try {
        const res = await activateEmail({ code, activationToken }).unwrap();
        toast.success(res.message);
        navigate("/login");
        localStorage.removeItem("activationToken");
      } catch (err) {
        const error = err as IError;
        toast.error(error.data.message);
      }
    } else if (resetVerificationToken?.length) {
      try {
        const res = await verifyForgetPassword({
          code,
          resetVerificationToken,
        }).unwrap();
        toast.success(res.message);
        navigate("/setNewPassword");
        localStorage.removeItem("resetVerificationToken");
        localStorage.setItem("passwordResetToken", res.passwordResetToken);
      } catch (err) {
        const error = err as IError;
        toast.error(error.data.message);
      }
    }
  }

  async function handleResendCode() {
    if (activationToken?.length) {
      try {
        const res = await resendActivateCode({ activationToken }).unwrap();
        toast.success(res.message);
      } catch (err) {
        const error = err as IError;
        toast.error(error.data.message);
      }
    } else if (resetVerificationToken?.length) {
      try {
        const res = await resendForgetPasswordCode({
          resetVerificationToken,
        }).unwrap();
        toast.success(res.message);
      } catch (err) {
        const error = err as IError;
        toast.error(error.data.message);
      }
    }
  }

  return (
    <AuthLayout>
      <Logo />
      {(isLoading1 || isLoading2 || isLoading3 || isLoading4) && <Loader />}
      <p className="mt-5 text-2xl font-medium">Please check your email</p>
      <p>
        <span className="text-gray-300">We've sent a code to</span> UserEmail
      </p>

      <div className="my-5 flex justify-center gap-3">
        <ActivationInputs length={6} onComplete={handleSubmit} />
      </div>

      <AuthLink
        msg="Didn't recieive an email ?"
        text="Resend Code"
        onClick={handleResendCode}
      />
    </AuthLayout>
  );
}

export default EmailVerfiy;
