import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Logo from "../components/common/Logo";
import GoogleButton from "../components/auth/GoogleButton";
import AuthButton from "../components/auth/AuthButton";
import AuthLink from "../components/auth/AuthLink";
import AuthInput from "../components/auth/AuthInput";

function Login() {
  return (
    <AuthLayout>
      <Logo />
      <p className="text-secondary">Welcome Back</p>

      <GoogleButton text="Login with Google" />

      <div className="mt-6 flex items-center gap-2">
        <div className="w-[184px] border border-gray-100"></div>
        <p className="text-gray-100">or</p>
        <div className="w-[184px] border border-gray-100"></div>
      </div>

      <div className="my-8 text-left">
        <div className="mb-8 space-y-5">
          <AuthInput
            icon={faEnvelope}
            label="Email Address"
            props={{
              id: "email",
              placeholder: "test@example.com",
              type: "email",
            }}
          />

          <AuthInput
            icon={faLock}
            label="Password"
            props={{
              id: "password",
              placeholder: "password",
              type: "password",
            }}
          />
        </div>

        <Link to="/" className="font-medium text-main underline">
          Forget Password?
        </Link>

        <AuthButton className="my-5 w-full">Login</AuthButton>

        <AuthLink to="/signup" msg="Don't have an account ?" text="sign up" />
      </div>
    </AuthLayout>
  );
}

export default Login;
