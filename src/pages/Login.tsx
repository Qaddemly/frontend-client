import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Logo from "../components/common/Logo";
import GoogleButton from "../components/auth/GoogleButton";
import AuthButton from "../components/auth/AuthButton";
import AuthLink from "../components/auth/AuthLink";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthInputField from "../components/auth/AuthInputField";
import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { useLoginMutation } from "../services/authApi";
import toast from "react-hot-toast";
import { IError, ILoginInputs } from "../interfaces/Auth.interfaces";
import Loader from "../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../components/auth/UserSlice";
import { RootState } from "../store/store";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const createAtMin = new Date(user.createdAt)
    .toTimeString()
    .split(" ")[0]
    .split(":")[1];
  const now = new Date();
  const currentMin = now.getMinutes();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>();

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();
      toast.success(`Welcome ${res.user.firstName}`);
      if (currentMin - Number(createAtMin) < 10) navigate("/userInfo");
      else navigate("/");
      dispatch(setUser(res.user));
    } catch (err) {
      const error = err as IError;
      toast.error(error.data.message);
    }
  };

  return (
    <AuthLayout>
      {isLoading && <Loader />}
      <Logo />
      <p className="text-secondary">Welcome Back</p>

      <GoogleButton text="Login with Google" />

      <div className="mt-6 flex items-center gap-2">
        <div className="w-[184px] border border-gray-100"></div>
        <p className="text-gray-100">or</p>
        <div className="w-[184px] border border-gray-100"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8 text-left">
        <div className="mb-8 space-y-3">
          <AuthInputField
            errors={errors}
            label="Email Address"
            id="email"
            icon={faEnvelope}
          >
            <AuthInput
              register={register}
              name="email"
              options={{ required: "email is required" }}
              icon={faEnvelope}
              props={{
                type: "email",
                id: "email",
                placeholder: "test@example.com",
                className: "w-full",
              }}
            />
          </AuthInputField>

          <AuthInputField
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            errors={errors}
            label="Password"
            id="password"
            icon={faLock}
          >
            <AuthInput
              register={register}
              name="password"
              showPassword={showPassword}
              options={{
                required: "password is required",
                minLength: { value: 8, message: "min value 8 charcters" },
              }}
              icon={faLock}
              props={{
                id: "password",
                placeholder: "•••••••••",
                type: "password",
              }}
            />
          </AuthInputField>
        </div>

        <Link to="/forgetPassword" className="font-medium text-main underline">
          Forget Password?
        </Link>

        <AuthButton className="my-5 w-full">Login</AuthButton>

        <AuthLink to="/signup" msg="Don't have an account ?" text="sign up" />
      </form>
    </AuthLayout>
  );
}

export default Login;
