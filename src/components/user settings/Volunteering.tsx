import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import InputField from "../common/InputField";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import { IVolunteeringInputs } from "../../interfaces/Profile.interfaces";
import { useNavigate } from "react-router-dom";
import { useAddNewVolunteeringMutation } from "../../services/profileApi";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import { handleApiError } from "../../utils/helpers";
// import {  useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import { updateUserExperience } from "../auth/UserSlice";

function Volunteering() {
  // const { volunteeringId } = useParams();
  // const volunteerings = useSelector(
  //   (state: RootState) => state.user.user.experiences,
  // );
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const currentVolunteering = volunteerings?.find(
  //   (exp) => exp.id.toString() === expId,
  // );
  const [addNewVolunteering, { isLoading }] = useAddNewVolunteeringMutation();

  const methods = useForm<IVolunteeringInputs>();
  const { register, handleSubmit } = methods;

  const submitForm: SubmitHandler<IVolunteeringInputs> = async (data) => {
    console.log(data);
    if (
      data.description &&
      data.organization &&
      data.role &&
      data.start_date &&
      data.end_date
    ) {
      try {
        // const res =
        await addNewVolunteering({
          data,
        }).unwrap();
        toast.success("Profile updated successfully");
        navigate("/userSettings/profile/volunteering");
        // dispatch(updateUserVolunteering(res.volunteering));
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <FormProvider {...methods}>
      <form
        className="mt-10 flex w-[35rem] flex-col gap-4 px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <InputField id="organization" label="Organization">
          <Input
            register={register}
            name="organization"
            props={{
              placeholder: "Ex: Google Developer Student Club",
              type: "text",
              id: "organization",
              // defaultValue: currentVolunteering?.organization,
            }}
          />
        </InputField>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            {...register("description")}
            className={`min-h-28 rounded-md border-2 border-gray-200 p-5 outline-none`}
            placeholder="Ex: I raised funds for our annul charity 5K."
          />
        </div>
        {/* <InputField id="description" label="Description">
          <Input
            register={register}
            name="description"
            props={{
              placeholder: "Ex: I raised funds for our annul charity 5K.",
              type: "text",
              id: "description",
              className: "h-28",
              // defaultValue: currentVolunteering?.description,
            }}
          />
        </InputField> */}

        <InputField id="role" label="Role">
          <Input
            register={register}
            name="role"
            props={{
              placeholder: "Ex: Fundraising Volunteer",
              type: "text",
              id: "role",
              // defaultValue: currentVolunteering?.role,
            }}
          />
        </InputField>

        <StartToEndDate
          startDate="start_date"
          endDate="end_date"
          register={register}
          // startDateDefaultValue={currentVolunteering?.start_date || ""}
          // endDateDefaultValue={currentVolunteering?.end_date || ""}
        />

        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Save Changes</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Volunteering;
