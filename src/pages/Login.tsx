import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Logo from "../components/common/Logo";
import GoogleButton from "../components/auth/GoogleButton";
import AuthLink from "../components/auth/AuthLink";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../components/common/Input";
import { useLoginMutation } from "../services/authApi";
import toast from "react-hot-toast";
import { ILoginInputs } from "../interfaces/Auth.interfaces";
import Loader from "../components/common/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../components/auth/UserSlice";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { handleApiError } from "../utils/helpers";
import { socket } from "../services/socket.ts";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state: RootState) => state.user);
  // const createAtMin = new Date(user.created_at)
  //   .toTimeString()
  //   .split(" ")[0]
  //   .split(":")[1];
  // const now = new Date();
  // const currentMin = now.getMinutes();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>();

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();

      toast.success(`Welcome ${res.user.first_name}`);
      dispatch(setUser(res.user));

      // Connect to socket (if not already connected)
      if (!socket.connected) {
        socket.connect();
      }

      // Emit "connect_user" once socket is connected
      socket.once("connect", () => {
        socket.emit("connect_user", res.user.id);
      });

      navigate("/");
    } catch (err) {
      handleApiError(err);
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
          <InputField
            errors={errors}
            label="Email Address"
            id="email"
            icon={faEnvelope}
          >
            <Input
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
          </InputField>

          <InputField
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            errors={errors}
            label="Password"
            id="password"
            icon={faLock}
          >
            <Input
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
          </InputField>
        </div>

        <Link to="/forgetPassword" className="font-medium text-main underline">
          Forget Password?
        </Link>

        <Button className="my-5 w-full">Login</Button>

        <AuthLink to="/signup" msg="Don't have an account ?" text="sign up" />
      </form>
    </AuthLayout>
  );
}

export default Login;
