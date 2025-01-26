import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IUserInfo } from "../../../interfaces/Auth.interfaces";
import { useUserInfo } from "../../../context/UserInfoContext";
import SliderControllres from "./SliderControllres";
import UserInfoPersonal from "./UserInfoPersonal";
import UserInfoEducation from "./UserInfoEducation";
import UserInfoExperience from "./UserInfoExperience";
import UserInfoSoftSkills from "./UserInfoSoftSkills";
import UserInfoResume from "./UserInfoResume";
import {
  Country,
  EmploymentType,
  LocationType,
} from "../../../enums/index.enums";
import { createFormData } from "../../../utils/helpers";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserInfoMutation } from "../../../services/authApi";
import { formSettings, IError } from "../../../interfaces/Common.interfaces";

function UserInfoForm() {
  const [userInfo, { isLoading }] = useUserInfoMutation();
  const navigate = useNavigate();
  const methods = useForm<IUserInfo>({
    ...formSettings,
    defaultValues: {
      experience: {
        job_title: "",
        employment_type: EmploymentType.FullTime,
        company_name: "",
        location: Country.USA,
        location_type: LocationType.OnSite,
        still_working: false,
        start_date: "",
        end_date: "",
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
    if (data.phone.number.toString() === "") {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "phone"),
      );
    }
    if (data.experience.job_title.length) {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "jobTitle"),
      );
      const newExperience = [
        ...experience,
        {
          id: experience.length + 1,
          job_title: data.experience.job_title,
          employment_type: data.experience.employment_type,
          company_name: data.experience.company_name,
          location: data.experience.location,
          location_type: data.experience.location_type,
          still_working: data.experience.still_working,
          start_date: data.experience.start_date,
          end_date: data.experience.end_date,
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
        toast.error(error.message);
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
