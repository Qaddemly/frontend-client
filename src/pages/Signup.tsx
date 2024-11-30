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
import { SubmitHandler } from "react-hook-form";
import AuthInputField from "../components/auth/AuthInputField";
import AuthInput from "../components/auth/AuthInput";
import { useForm } from "react-hook-form";
import { formSettings } from "../components/auth";

interface ISignupInputsStep1 {
  email: string;
}
interface ISignupInputsStep2 {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignupInputs extends ISignupInputsStep1, ISignupInputsStep2 {}

function Signup() {
  const [step, setStep] = useState(1);
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    getValues: getValues1,
  } = useForm<ISignupInputsStep1>(formSettings);

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    getValues: getValues2,
  } = useForm<ISignupInputsStep2>({
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<ISignupInputsStep2> = (data) => {
    const fullData: ISignupInputs = { ...data, email: getValues1("email") };
    console.log(fullData);
  };

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

          <form
            onSubmit={handleSubmit1(() => setStep((s) => s + 1))}
            className="mt-8 text-left"
          >
            <AuthInputField
              errors={errors1}
              id="email"
              icon={faEnvelope}
              label="Email Address"
            >
              <AuthInput
                register={register1}
                name="email"
                icon={faEnvelope}
                options={{ required: "email is required" }}
                props={{
                  id: "email",
                  placeholder: "test@example.com",
                  type: "email",
                }}
              />
            </AuthInputField>

            <AuthButton className="mb-8 mt-5 w-full">Continue</AuthButton>
          </form>
        </>
      )}

      {step == 2 && (
        <>
          <form
            onSubmit={handleSubmit2(onSubmit)}
            className="my-8 space-y-5 text-left"
          >
            <div className="flex gap-5">
              <AuthInputField
                id="firstName"
                label="First Name"
                icon={faCircleUser}
                errors={errors2}
              >
                <AuthInput
                  register={register2}
                  options={{ required: "first name is required" }}
                  name="firstName"
                  props={{ id: "firstName", placeholder: "John", type: "text" }}
                  icon={faCircleUser}
                />
              </AuthInputField>

              <AuthInputField
                id="lastName"
                label="Last Name"
                icon={faCircleUser}
                errors={errors2}
              >
                <AuthInput
                  register={register2}
                  options={{ required: "last name is required" }}
                  name="lastName"
                  props={{ id: "lastName", placeholder: "Doe", type: "text" }}
                  icon={faCircleUser}
                />
              </AuthInputField>
            </div>
            <AuthInputField
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              errors={errors2}
              id="password"
              icon={faLock}
              label="Password"
            >
              <AuthInput
                showPassword={showPassword}
                register={register2}
                options={{
                  required: "password is required",
                  minLength: { value: 8, message: "min value 8 charcters" },
                }}
                name="password"
                props={{
                  id: "password",
                  placeholder: "•••••••••",
                  type: "password",
                }}
                icon={faLock}
              />
            </AuthInputField>

            <AuthInputField
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              id="passwordConfirm"
              label="Confirm Password"
              errors={errors2}
              icon={faLock}
            >
              <AuthInput
                showPassword={showConfirmPassword}
                register={register2}
                options={{
                  required: "confirm password is required",
                  minLength: { value: 8, message: "min value 8 charcters" },
                  validate: (value) =>
                    getValues2("password") === value || "password do not match",
                }}
                name="passwordConfirm"
                props={{
                  id: "passwordConfirm",
                  placeholder: "•••••••••",
                  type: "password",
                }}
                icon={faLock}
              />
            </AuthInputField>

            <AuthButton className="w-full">Continue</AuthButton>
          </form>
        </>
      )}
      <AuthLink to="/login" msg="Already have an account ?" text="Login" />
    </AuthLayout>
  );
}

export default Signup;
