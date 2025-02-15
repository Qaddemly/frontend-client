import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import { IEducation } from "../../interfaces/Auth.interfaces";
import InputField from "../common/InputField";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  useCreateEducationMutation,
  useUpdateEducationMutation,
} from "../../services/profileApi";
import Loader from "../common/Loader";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserEducation } from "../auth/UserSlice";

type EducationStatus = "update" | "create";

function Education() {
  const { eduId } = useParams();
  const educationsStatus: EducationStatus = eduId === "0" ? "create" : "update";

  const navigate = useNavigate();
  const educations = useSelector(
    (state: RootState) => state.user.user.educations,
  );
  const [updateEducation, { isLoading: isLoading1 }] =
    useUpdateEducationMutation();
  const [createEducation, { isLoading: isLoading2 }] =
    useCreateEducationMutation();

  const dispatch = useDispatch();
  const currentEducation = educations?.find(
    (edu) => edu.id.toString() === eduId,
  );
  const methods = useForm<IEducation>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitForm: SubmitHandler<IEducation> = async (data) => {
    if (educationsStatus === "update") {
      try {
        const res = await updateEducation({ data, id: eduId || "" }).unwrap();
        toast.success("Education updated successfully");
        navigate("/userSettings/profile/education");
        dispatch(updateUserEducation(res.education));
      } catch (error) {
        handleApiError(error);
      }
    } else {
      const res = await createEducation({ data }).unwrap();
      toast.success("Education created successfully");
      navigate("/userSettings/profile/education");
      dispatch(updateUserEducation(res.education));
    }
  };

  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <FormProvider {...methods}>
      <form
        className="mt-10 flex w-[40rem] flex-col gap-3 px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <InputField id="University" errors={errors} label="University">
          <Input
            register={register}
            name="university"
            props={{
              placeholder: "Ex. Tanta University",
              type: "text",
              id: "University",
              defaultValue: currentEducation?.university,
            }}
          />
        </InputField>

        <InputField id="Field of study" errors={errors} label="Field of study">
          <Input
            register={register}
            name="field_of_study"
            props={{
              placeholder: "Ex. Engineering",
              type: "text",
              id: "Field of study",
              defaultValue: currentEducation?.field_of_study,
            }}
          />
        </InputField>

        <InputField id="GPA" errors={errors} label="GPA">
          <Input
            register={register}
            name="gpa"
            options={{
              min: { value: 1, message: "min value 1" },
              max: { value: 4, message: "max value 4" },
            }}
            props={{
              placeholder: "Ex. 3.65",
              type: "number",
              step: "0.01",
              id: "GPA",
              defaultValue: currentEducation?.gpa,
            }}
          />
        </InputField>

        <div>
          <StartToEndDate
            startDate="start_date"
            endDate="end_date"
            register={register}
            startDateDefaultValue={currentEducation?.start_date}
            endDateDefaultValue={currentEducation?.end_date}
          />
        </div>

        <div className="self-end">
          <Button className="px-2 py-2">Save Changes</Button>
        </div>
      </form>
    </FormProvider>
  );
}
export default Education;
