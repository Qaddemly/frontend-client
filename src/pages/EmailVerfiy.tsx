import AuthLink from "../components/auth/AuthLink";
import ActivationInputs from "../components/auth/signup/ActivationInputs";
import Logo from "../components/common/Logo";
import AuthLayout from "../layout/AuthLayout";

function EmailVerfiy() {
  function handleSubmit(code: string) {
    console.log(code);
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
