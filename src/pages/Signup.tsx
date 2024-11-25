import {
  faCircleUser,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import GoogleButton from "../components/auth/GoogleButton";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import AuthLink from "../components/auth/AuthLink";
import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Logo />
      <p className="text-secondary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
        laudantium cum amet
      </p>

      {step == 1 && (
        <>
          <GoogleButton text="Sign up with Google" />

          <div className="mt-6 flex items-center gap-2">
            <div className="w-[184px] border border-gray-100"></div>
            <p className="text-gray-100">or</p>
            <div className="w-[184px] border border-gray-100"></div>
          </div>

          <div className="mt-8 text-left">
            <AuthInput
              icon={faEnvelope}
              label="Email Address"
              props={{ id: "email", placeholder: "test@example.com" }}
            />

            <AuthButton
              className="mb-8 mt-5 w-full"
              onClick={() => setStep((s) => s + 1)}
            >
              Continue
            </AuthButton>
          </div>
        </>
      )}

      {step == 2 && (
        <>
          <div className="my-8 space-y-5 text-left">
            <div className="flex gap-5">
              <AuthInput
                label="First Name"
                props={{ id: "firstName", placeholder: "John", type: "text" }}
                icon={faCircleUser}
              />
              <AuthInput
                props={{ id: "lastName", placeholder: "Doe", type: "text" }}
                label="Last Name"
                icon={faCircleUser}
              />
            </div>
            <AuthInput
              label="Password"
              props={{
                id: "password",
                placeholder: "passowrd",
                type: "password",
              }}
              icon={faLock}
            />
            <AuthInput
              label="Confirm Password"
              props={{
                id: "confirmPassword",
                placeholder: "confirmPassword",
                type: "password",
              }}
              icon={faLock}
            />

            <AuthButton
              className="w-full"
              onClick={() => navigate("/emailVerfiy")}
            >
              Continue
            </AuthButton>
          </div>
        </>
      )}
      <AuthLink to="/login" msg="Already have an account ?" text="Login" />
    </AuthLayout>
  );
}

export default Signup;
