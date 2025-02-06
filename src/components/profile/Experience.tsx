import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import InputField from "../common/InputField";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import Select from "../common/Select";
import { Country, EmploymentType, LocationType } from "../../enums/index.enums";
import { IUpdateExperienceInputs } from "../../interfaces/Profile.interfaces";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateExperienceMutation,
} from "../../services/profileApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

function Experience() {
  const experiences = useSelector(
    (state: RootState) => state.user.user.experiences,
  );
  const { expId } = useParams();
  const navigate = useNavigate();
  const currentExperience = experiences?.find(
    (exp) => exp.id.toString() === expId,
  );
  const [updateExperience, { isLoading }] = useUpdateExperienceMutation();
  const { refetch } = useGetUserQuery();

  const employmentTypeValues = Object.values(EmploymentType);
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);

  const methods = useForm<IUpdateExperienceInputs>();
  const { register, handleSubmit } = methods;

  const submitForm: SubmitHandler<IUpdateExperienceInputs> = async (data) => {
    try {
      await updateExperience({ data, id: expId || "" }).unwrap();
      toast.success("Profile updated successfully");
      navigate("/profile/experience");
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <FormProvider {...methods}>
      <form
        className="mt-10 flex w-[35rem] flex-col px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="mb-5 flex justify-between">
          <InputField id="Job title" label="Job title">
            <Input
              register={register}
              name="jobTitle"
              props={{
                placeholder: "Ex. Retail Sales Manager",
                type: "text",
                id: "Job title",
                defaultValue: currentExperience?.job_title,
              }}
            />
          </InputField>

          <Select
            register={register}
            name="employmentType"
            label="Employment type"
            id="employmentType"
            props={{
              id: "employmentType",
              defaultValue: currentExperience?.employment_type,
            }}
          >
            <option
              value={currentExperience?.employment_type}
              key="defualtValue"
            >
              {currentExperience?.employment_type}
            </option>
            {employmentTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>

        <InputField id="Company name" label="Company name">
          <Input
            register={register}
            name="companyName"
            props={{
              placeholder: "Ex. Microsoft",
              type: "text",
              id: "Company name",
              defaultValue: currentExperience?.company_name,
            }}
          />
        </InputField>

        <div className="my-5 flex justify-between">
          <Select
            register={register}
            name="location"
            label="Location"
            id="location"
            props={{
              id: "location",
              defaultValue: currentExperience?.location,
            }}
          >
            <option value={currentExperience?.location} key="defualtValue">
              {currentExperience?.location}
            </option>
            {countryValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>

          <Select
            name="locationType"
            register={register}
            label="Location type"
            id="locationType"
            props={{
              id: "locationType",
              defaultValue: currentExperience?.location_type,
            }}
          >
            <option value={currentExperience?.location_type} key="defualtValue">
              {currentExperience?.location_type}
            </option>
            {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>

        <StartToEndDate
          startDate="startDate"
          endDate="endDate"
          register={register}
          startDateDefaultValue={currentExperience?.start_date || ""}
          endDateDefaultValue={currentExperience?.end_date || ""}
        />

        <div className="my-5 flex items-center">
          <input
            {...register("stillWorking")}
            type="checkbox"
            id="stillWorking"
            className="text-green-600 focus:ring-green-500 h-4 w-4 rounded border-gray-300"
          />

          <label htmlFor="stillWorking" className="ms-2 font-medium">
            I am currently working in this role
          </label>
        </div>
        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Save Changes</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Experience;
