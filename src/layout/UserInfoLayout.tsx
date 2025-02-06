import { ReactNode } from "react";
import Logo from "../components/common/Logo";
import SliderIndicators from "../components/auth/user-info/SliderIndicators";
import { useUserInfo } from "../context/UserInfoContext";
import UserMenu from "../components/profile/UserMenu";
import Button from "../components/common/Button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function UserInfoLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { step, setStep } = useUserInfo();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <>
      <nav className="bg-white p-5">
        <div className="flex justify-between">
          <Logo fontSize="text-3xl" />
          <UserMenu type="NormalAccount">
            <div className="mt-2 flex flex-col gap-3">
              <div className="px-3 pb-2">
                <p className="font-medium">{user.email}</p>
              </div>
              <Link
                to="/profile/personal"
                className="rounded-md hover:bg-[#eee]"
              >
                <div className="flex items-center gap-5 px-3 py-2">
                  <FontAwesomeIcon icon={faUser} className="text-lg" />
                  <span className="text-lg font-medium">Profile</span>
                </div>
              </Link>
            </div>
          </UserMenu>
        </div>
      </nav>
      <div className="min-h-screen bg-background p-20">
        <div className="m-auto w-[40rem] rounded-xl bg-white p-12 text-center shadow-md">
          <p className="mb-5 text-xl font-medium">{title}</p>
          {children}
        </div>
        <div className="flex flex-col items-center gap-5 bg-background">
          <SliderIndicators step={step} setStep={setStep} />
          {step === 5 && <Button className="mt-5 px-20">Submit</Button>}
        </div>
      </div>
    </>
  );
}

export default UserInfoLayout;
