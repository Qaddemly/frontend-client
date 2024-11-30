import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IUserInfo } from "../../../interfaces/Auth.interfaces";
import { useUserInfo } from "../../../context/UserInfoContext";
import SliderControllres from "./SliderControllres";
import UserInfoPersonal from "./UserInfoPersonal";
import UserInfoEducation from "./UserInfoEducation";
import UserInfoExperience from "./UserInfoExperience";
import UserInfoSoftSkills from "./UserInfoSoftSkills";
import UserInfoResume from "./UserInfoResume";
import { Country, EmploymentType, formSettings, LocationType } from "..";

function UserInfoForm() {
  const methods = useForm<IUserInfo>({
    ...formSettings,
    defaultValues: {
      experience: {
        jobTitle: "",
        employmentType: EmploymentType.FullTime,
        companyName: "",
        location: Country.USA,
        locationType: LocationType.OnSite,
        stillWorking: false,
        startJobDate: "",
        endJobDate: "",
      },
    },
  });
  const { setStep, step, languages, skills, experience, setExperience } =
    useUserInfo();

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
    if (data.address.city === "") {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "address"),
      );
    }
    if (data.phone.number === "") {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "phone"),
      );
    }
    if (data.experience.jobTitle.length) {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "jobTitle"),
      );
      const newExperience = [
        ...experience,
        {
          jobTitle: data.experience.jobTitle,
          employmentType: data.experience.employmentType,
          companyName: data.experience.companyName,
          location: data.experience.location,
          locationType: data.experience.locationType,
          stillWorking: data.experience.stillWorking,
          startJobDate: data.experience.startJobDate,
          endJobDate: data.experience.endJobDate,
        },
      ];
      setExperience(newExperience);
      filteredData = { ...filteredData, experience: newExperience };
    } else {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "experience"),
      );
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
