import { useForm, SubmitHandler } from "react-hook-form";
import {
  faCircleUser,
  faImage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../common/Input";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Select from "../common/Select";
import { Country, Prefixes } from "../../enums/index.enums";
import DatePicker from "../common/DatePicker";
import FileUpload from "../common/FileUpload";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IUser } from "../../interfaces/Auth.interfaces";
import { useEffect } from "react";
import {
  useGetUserQuery,
  useUpdatePersonalMutation,
} from "../../services/profileApi";
import { createFormData, handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

function Personal() {
  const user = useSelector((state: RootState) => state.user.user);
  const [updatePersonal, { isLoading }] = useUpdatePersonalMutation();
  const { refetch } = useGetUserQuery();

  const countryKeys = Object.keys(Country).filter(
    (key) => typeof Country[key as keyof typeof Country] === "string",
  );
  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value == "string",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>();

  const submitForm: SubmitHandler<IUser> = async (data) => {
    const formData = createFormData(data as unknown as Record<string, unknown>);

    try {
      const res = await updatePersonal({ data: formData }).unwrap();
      console.log(res);
      toast.success("Profile updated successfully");
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    reset({
      first_name: user?.first_name,
      last_name: user?.last_name,
      phone: {
        country_code: user?.phone?.country_code,
        number: user?.phone?.number,
      },
      address: {
        country: user?.address?.country,
        city: user?.address?.city,
      },
      date_of_birth: user?.date_of_birth,
    });
  }, [reset, user]);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-5">
      <form
        className="mt-10 w-[40rem] px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="mt-10 flex space-x-5">
          <InputField id="first_name" icon={faCircleUser} label="First name">
            <Input
              register={register}
              name="first_name"
              icon={faCircleUser}
              props={{
                placeholder: "John",
                type: "text",
                id: "first_name",
              }}
            />
          </InputField>

          <InputField id="last_name" icon={faCircleUser} label="Last name">
            <Input
              register={register}
              name="last_name"
              icon={faCircleUser}
              props={{
                placeholder: "Tom",
                type: "text",
                id: "last_name",
              }}
            />
          </InputField>
        </div>

        <div className="mt-10 flex items-end gap-3">
          <Select
            register={register}
            name="phone.country_code"
            label="Phone"
            id="phone"
            className="w-fit"
          >
            {prefixValues.map((value) => (
              <option
                key={value}
                value={Prefixes[value as keyof typeof Prefixes]}
              >
                {value} +({Prefixes[value as keyof typeof Prefixes]})
              </option>
            ))}
          </Select>

          <InputField icon={faPhone} id="phone">
            <Input
              register={register}
              name={"phone.number"}
              icon={faPhone}
              props={{
                placeholder: "123-456-789",
                id: "phone",
                type: "number",
              }}
            />
          </InputField>
        </div>
        <div className="mt-10 flex items-end gap-3 text-left">
          <Select
            register={register}
            name={"address.country"}
            label="Address"
            id="country"
            className="w-fit"
          >
            <option value="" disabled>
              Select a country
            </option>
            {countryKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Select>

          <InputField id="city">
            <Input
              register={register}
              name="address.city"
              props={{
                placeholder: "City",
                type: "text",
                id: "city",
                className: "w-[9rem]",
              }}
            />
          </InputField>
        </div>
        <div className="mt-10 flex flex-col gap-2 text-left">
          <label htmlFor="date_of_birth" className="font-medium">
            Date of Birth
          </label>
          <DatePicker name={"date_of_birth"} register={register} />

          {errors.date_of_birth &&
            typeof errors.date_of_birth?.message === "string" && (
              <p className="text-danger text-sm">
                {errors.date_of_birth.message}
              </p>
            )}
        </div>
        <div className="mt-5 flex flex-col items-start">
          <span className="font-medium"> Profile Photo</span>

          <FileUpload
            register={register}
            name={"profile_picture"}
            icon={faImage}
          />
        </div>

        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
export default Personal;
