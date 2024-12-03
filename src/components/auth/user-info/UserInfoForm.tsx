import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IError, IUserInfo } from "../../../interfaces/Auth.interfaces";
import { useUserInfo } from "../../../context/UserInfoContext";
import SliderControllres from "./SliderControllres";
import UserInfoPersonal from "./UserInfoPersonal";
import UserInfoEducation from "./UserInfoEducation";
import UserInfoExperience from "./UserInfoExperience";
import UserInfoSoftSkills from "./UserInfoSoftSkills";
import UserInfoResume from "./UserInfoResume";
import { Country, EmploymentType, formSettings, LocationType } from "..";
import { createFormData } from "../../../utils/helpers";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserInfoMutation } from "../../../services/authApi";

function UserInfoForm() {
  const [userInfo, { isLoading }] = useUserInfoMutation();
  const navigate = useNavigate();
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
        startDate: "",
        endDate: "",
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
          startDate: data.experience.startDate,
          endDate: data.experience.endDate,
        },
      ];
      setExperience(newExperience);
      filteredData = { ...filteredData, experience: newExperience };
    } else {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "experience"),
      );
    }
    if (data.education?.university?.length === 0)
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "education"),
      );
    if (languages.length) filteredData = { ...filteredData, languages };
    if (skills.length) filteredData = { ...filteredData, softSkills: skills };
    console.log(filteredData);
    const formData = createFormData(filteredData);

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
    if (Object.entries(filteredData).length)
      try {
        const res = await userInfo(formData).unwrap();
        toast.success(res.message);
        navigate("/");
      } catch (err) {
        const error = err as IError;
        toast.error(error.data.message);
      }
  };

  return (
    <FormProvider {...methods}>
      {isLoading && <Loader />}
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
