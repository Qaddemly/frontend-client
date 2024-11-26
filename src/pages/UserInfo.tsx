import UserInfoPersonal from "../components/auth/user-info/UserInfoPersonal";
import UserInfoEducation from "../components/auth/user-info/UserInfoEducation";
import UserInfoExperience from "../components/auth/user-info/UserInfoExperience";
import UserInfoSoftSkills from "../components/auth/user-info/UserInfoSoftSkills";
import UserInfoResume from "../components/auth/user-info/UserInfoResume";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSettings } from "../components/auth";
import { IUserInfo } from "../interfaces/Auth.interfaces";
import { useState } from "react";
import SliderControllres from "../components/auth/user-info/SliderControllres";
import SliderIndicators from "../components/auth/user-info/SliderIndicators";

function UserInfo() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>(formSettings);

  const onSubmit: SubmitHandler<IUserInfo> = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );
    console.log(filteredData);
  };
  return (
    <>
      <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <SliderControllres step={step} setStep={setStep} />
        {step == 1 && <UserInfoPersonal register={register} errors={errors} />}
        {step == 2 && <UserInfoEducation register={register} errors={errors} />}
        {step == 3 && (
          <UserInfoExperience register={register} errors={errors} />
        )}
        {step == 4 && (
          <UserInfoSoftSkills register={register} errors={errors} />
        )}
        {step == 5 && <UserInfoResume register={register} />}
        <SliderIndicators step={step} setStep={setStep} />
      </form>
    </>
  );
}

export default UserInfo;
