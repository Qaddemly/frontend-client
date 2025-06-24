import {
  faBirthdayCake,
  faCircleUser,
  faEnvelope,
  faLock,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import GoogleButton from "../components/auth/GoogleButton";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";
import AuthLink from "../components/auth/AuthLink";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Input from "../components/common/Input";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "../services/authApi";
import {
  ISignupInputs,
  ISignupInputsStep1,
  ISignupInputsStep2,
} from "../interfaces/Auth.interfaces";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { formSettings } from "../interfaces/Common.interfaces";
import { handleApiError } from "../utils/helpers";
import Select from "../components/common/Select";
import { Country, Prefixes } from "../enums/index.enums";

function Signup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();

  const countryValues = Object.values(Country);
  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value == "string",
  );

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

  const onSubmit: SubmitHandler<ISignupInputsStep2> = async (data) => {
    const fullData: ISignupInputs = { ...data, email: getValues1("email") };
    try {
      const res = await signUp(fullData).unwrap();
      navigate("/emailVerfiy");
      toast.success(res.message);
      localStorage.setItem("activationToken", res.activationToken);
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <AuthLayout>
      <Logo />
      {isLoading && <Loader />}
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
            <InputField
              errors={errors1}
              id="email"
              icon={faEnvelope}
              label="Email Address"
            >
              <Input
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
            </InputField>

            <Button className="mb-8 mt-5 w-full">Continue</Button>
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
              <InputField
                id="firstName"
                label="First Name"
                icon={faCircleUser}
                errors={errors2}
              >
                <Input
                  register={register2}
                  options={{ required: "first name is required" }}
                  name="firstName"
                  props={{ id: "firstName", placeholder: "John", type: "text" }}
                  icon={faCircleUser}
                />
              </InputField>

              <InputField
                id="lastName"
                label="Last Name"
                icon={faCircleUser}
                errors={errors2}
              >
                <Input
                  register={register2}
                  options={{ required: "last name is required" }}
                  name="lastName"
                  props={{ id: "lastName", placeholder: "Doe", type: "text" }}
                  icon={faCircleUser}
                />
              </InputField>
            </div>
            <InputField
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              errors={errors2}
              id="password"
              icon={faLock}
              label="Password"
            >
              <Input
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
            </InputField>

            <InputField
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              id="confirmPassword"
              label="Confirm Password"
              errors={errors2}
              icon={faLock}
            >
              <Input
                showPassword={showConfirmPassword}
                register={register2}
                options={{
                  required: "confirm password is required",
                  minLength: { value: 8, message: "min value 8 charcters" },
                  validate: (value) =>
                    getValues2("password") === value || "password do not match",
                }}
                name="confirmPassword"
                props={{
                  id: "confirmPassword",
                  placeholder: "•••••••••",
                  type: "password",
                }}
                icon={faLock}
              />
            </InputField>

            <InputField
              id="dateOfBirth"
              label="Date of Birth"
              icon={faBirthdayCake}
            >
              <Input
                register={register2}
                // options={{ required: "birthday is required" }}
                props={{ id: "dateOfBirth", type: "date" }}
                icon={faBirthdayCake}
                name="date_of_birth"
              />
            </InputField>

            <InputField id="country" label="Country" icon={faMapMarkerAlt}>
              <Select register={register2} name="address.country">
                {countryValues.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </InputField>
            <InputField id="address.city" label="City" icon={faMapMarkerAlt}>
              <Input
                register={register2}
                name="address.city"
                props={{
                  id: "address.city",
                  placeholder: "City",
                  type: "text",
                }}
                icon={faBirthdayCake}
              />
            </InputField>

            <div className="mt-10 flex items-end justify-between gap-3">
              <Select
                register={register2}
                name="phone.country_code"
                label="Phone"
                id="phone"
              >
                {prefixValues.map((value) => (
                  <option
                    key={value}
                    value={Prefixes[value as keyof typeof Prefixes]}
                  >
                    {value} +{Prefixes[value as keyof typeof Prefixes]}
                  </option>
                ))}
              </Select>

              <InputField icon={faPhone} id="phone">
                <Input
                  register={register2}
                  name={"phone.number"}
                  icon={faPhone}
                  props={{
                    placeholder: "123-456-789",
                    id: "phone",
                    type: "number",
                  }}
                />
              </InputField>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                className="w-full"
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </Button>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </form>
        </>
      )}
      <AuthLink to="/login" msg="Already have an account ?" text="Login" />
    </AuthLayout>
  );
}

export default Signup;
