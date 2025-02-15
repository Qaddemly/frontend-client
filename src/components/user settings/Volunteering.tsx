import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import InputField from "../common/InputField";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import { IVolunteeringInputs } from "../../interfaces/Profile.interfaces";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddNewVolunteeringMutation,
  useGetVolunteeringQuery,
} from "../../services/profileApi";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import { handleApiError } from "../../utils/helpers";
import { useEffect } from "react";

type VolunteeringStatus = "update" | "create";

function Volunteering() {
  const { volunteerId } = useParams();

  const volunteeringStatus: VolunteeringStatus =
    volunteerId === "0" ? "create" : "update";

  const navigate = useNavigate();
  const [addNewVolunteering, { isLoading: isLoading1 }] =
    useAddNewVolunteeringMutation();
  const { data, isLoading: isLoading2 } = useGetVolunteeringQuery(
    { id: volunteerId || "" },
    { skip: volunteeringStatus === "create" }, // skip the query if the status is create
  );

  const volunteering = data?.volunteering;

  const methods = useForm<IVolunteeringInputs>();
  const { register, handleSubmit, reset } = methods;

  const submitForm: SubmitHandler<IVolunteeringInputs> = async (data) => {
    if (
      data.description &&
      data.organization &&
      data.role &&
      data.start_date &&
      data.end_date
    ) {
      try {
        await addNewVolunteering({
          data,
        }).unwrap();
        toast.success("Profile updated successfully");
        navigate("/userSettings/profile/volunteering");
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  useEffect(() => {
    if (volunteeringStatus === "update")
      methods.reset({
        organization: volunteering?.organization || "",
        description: volunteering?.description || "",
        role: volunteering?.role || "",
        start_date: volunteering?.start_date || "",
        end_date: volunteering?.end_date || "",
      });
  }, [reset, volunteering, methods, volunteeringStatus]);

  if (isLoading1 || isLoading2) return <Loader />;

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
        <InputField id="role" label="Role">
          <Input
            register={register}
            name="role"
            props={{
              placeholder: "Ex: Fundraising Volunteer",
              type: "text",
              id: "role",
            }}
          />
        </InputField>

        <StartToEndDate
          startDate="start_date"
          endDate="end_date"
          register={register}
        />

        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Save Changes</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Volunteering;
