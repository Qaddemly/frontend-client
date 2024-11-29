import { ReactNode } from "react";
import Logo from "../components/common/Logo";
import AuthButton from "../components/auth/AuthButton";
import SliderIndicators from "../components/auth/user-info/SliderIndicators";
import { useUserInfo } from "../context/UserInfoContext";

function UserInfoLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { step, setStep } = useUserInfo();
  return (
    <>
      <nav className="bg-white p-5">
        <Logo />
      </nav>
      <div className="min-h-screen bg-background p-20">
        <div className="m-auto w-[40rem] rounded-xl bg-white p-12 text-center shadow-md">
          <p className="mb-5 text-xl font-medium">{title}</p>
          {children}
        </div>
        <div className="flex flex-col items-center gap-5 bg-background">
          <SliderIndicators step={step} setStep={setStep} />
          {step === 5 && <AuthButton className="mt-5 px-20">Submit</AuthButton>}
        </div>
      </div>
    </>
  );
}

export default UserInfoLayout;
