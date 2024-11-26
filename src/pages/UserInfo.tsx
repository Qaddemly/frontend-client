import { useState } from "react";
import UserInfoPersonal from "../components/auth/user-info/UserInfoPersonal";
import UserInfoEducation from "../components/auth/user-info/UserInfoEducation";
import UserInfoExperience from "../components/auth/user-info/UserInfoExperience";
import UserInfoSoftSkills from "../components/auth/user-info/UserInfoSoftSkills";
import UserInfoResume from "../components/auth/user-info/UserInfoResume";

function UserInfo() {
  const [step, setStep] = useState(1);
  return (
    <>
      {step == 1 && <UserInfoPersonal setStep={setStep} />}
      {step == 2 && <UserInfoEducation setStep={setStep} />}
      {step == 3 && <UserInfoExperience setStep={setStep} />}
      {step == 4 && <UserInfoSoftSkills setStep={setStep} />}
      {step == 5 && <UserInfoResume setStep={setStep} />}
    </>
  );
}

export default UserInfo;
