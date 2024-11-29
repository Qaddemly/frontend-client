import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IUserInfo } from "../../../interfaces/Auth.interfaces";
import { useUserInfo } from "../../../context/UserInfoContext";
import SliderControllres from "./SliderControllres";
import UserInfoPersonal from "./UserInfoPersonal";
import UserInfoEducation from "./UserInfoEducation";
import UserInfoExperience from "./UserInfoExperience";
import UserInfoSoftSkills from "./UserInfoSoftSkills";
import UserInfoResume from "./UserInfoResume";
import { formSettings } from "..";

function UserInfoForm() {
  const methods = useForm<IUserInfo>(formSettings);
  const { setStep, step, languages, skills } = useUserInfo();

  const onSubmit: SubmitHandler<IUserInfo> = async (data) => {
    const isValid = await methods.trigger();
    if (!isValid) {
      console.log("Validation failed");
      return;
    }

    let filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined &&
          value.length !== 0,
      ),
    );
    if (data.city === "") {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "country"),
      );
    }
    if (data.phone === "") {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "prefix"),
      );
      if (data.jobTitle === "") {
        filteredData = Object.fromEntries(
          Object.entries(filteredData).filter(
            ([key]) =>
              key !== "location" &&
              key !== "locationType" &&
              key !== "currentlyWork" &&
              key !== "employmentType",
          ),
        );
      }
    }
    if (languages.length) filteredData = { ...filteredData, languages };
    if (skills.length) filteredData = { ...filteredData, softSkills: skills };
    console.log(filteredData);
  };

  return (
    <FormProvider {...methods}>
      <form className="relative" onSubmit={methods.handleSubmit(onSubmit)}>
        {step == 1 && <UserInfoPersonal />}
        {step == 2 && <UserInfoEducation />}
        {step == 3 && <UserInfoExperience />}
        {step == 4 && <UserInfoSoftSkills />}
        {step == 5 && <UserInfoResume />}
        <SliderControllres step={step} setStep={setStep} />
      </form>
    </FormProvider>
  );
}

export default UserInfoForm;
