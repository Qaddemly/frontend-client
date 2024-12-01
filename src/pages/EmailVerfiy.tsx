import toast from "react-hot-toast";
import { useActivateEmailMutation } from "../components/auth/api/authApi";
import AuthLink from "../components/auth/AuthLink";
import ActivationInputs from "../components/auth/signup/ActivationInputs";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import { IError } from "../interfaces/Auth.interfaces";

function EmailVerfiy() {
  const [activateEmail] = useActivateEmailMutation();
  const navigate = useNavigate();

  async function handleSubmit(code: string) {
    const activationToken = localStorage.getItem("activationToken");
    if (!activationToken) {
      toast.error("Activation token is missing");
      return;
    }
    try {
      const res = await activateEmail({ code, activationToken }).unwrap();
      toast.success(res.message);
      navigate("/login");
    } catch (err) {
      const error = err as IError;
      toast.error(error.data.message);
    }
  }

  return (
    <AuthLayout>
      <Logo />
      <p className="mt-5 text-2xl font-medium">Please check your email</p>
      <p>
        <span className="text-gray-300">We've sent a code to</span> UserEmail
      </p>

      <div className="my-5 flex justify-center gap-3">
        <ActivationInputs length={6} onComplete={handleSubmit} />
      </div>

      <AuthLink
        msg="Didn't recieive an email ?"
        text="Resend email"
        onClick={() => {}}
      />
    </AuthLayout>
  );
}

export default EmailVerfiy;
