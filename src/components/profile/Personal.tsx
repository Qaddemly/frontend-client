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
import { Country, Prefixes } from "../auth";
import DatePicker from "../common/DatePicker";
import FileUpload from "../common/FileUpload";
import { useUpdateProfileMutation } from "../../services/profileApi";
import Loader from "../common/Loader";
import { createFormData } from "../../utils/helpers";
import toast from "react-hot-toast";
import { IError } from "../../interfaces/Auth.interfaces";

function Personal() {
  const countryKeys = Object.keys(Country).filter(
    (key) => typeof Country[key as keyof typeof Country] === "string",
  );
  const prefixValues = Object.values(Prefixes).filter(
    (value) => typeof value == "string",
  );
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  type TPersonal = {
    firstName: string;
    lastName: string;
    phone: { number: string; countryCode: Prefixes };
    address: { country: Country; city: string };
    profilePicture: string;
    dateOfBirth: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TPersonal>();

  const submitForm: SubmitHandler<TPersonal> = async (data) => {
    let filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== ""),
    );
    if (!data.address.city.length) {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "address"),
      );
    }
    if (!data.phone.number.length) {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "phone"),
      );
    }
    if (!data.profilePicture.length) {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(
          ([key]) => key !== "profilePicture",
        ),
      );
    }

    const formData = createFormData(filteredData);
    if (Object.entries(filteredData).length)
      try {
        const res = await updateProfile(formData).unwrap();
        console.log(res);
        toast.success("Profile Updated");
        reset();
      } catch (err) {
        const error = err as IError;
        toast.error(error.data.message);
      }
  };

  return (
    <div className="mt-5">
      {isLoading && <Loader />}
      <form className="mt-10 px-10" onSubmit={handleSubmit(submitForm)}>
        <div className="mt-10 flex space-x-5">
          <InputField id="firstName" icon={faCircleUser} label="FirstName">
            <Input
              register={register}
              name="firstName"
              icon={faCircleUser}
              props={{
                placeholder: "John",
                type: "text",
                id: "firstName",
              }}
            />
          </InputField>

          <InputField id="lastName" icon={faCircleUser} label="LastName">
            <Input
              register={register}
              name="lastName"
              icon={faCircleUser}
              props={{
                placeholder: "Tom",
                type: "text",
                id: "lastName",
              }}
            />
          </InputField>
        </div>

        <div className="mt-10 flex items-end gap-3">
          <Select
            register={register}
            name="phone.countryCode"
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
          <label htmlFor="dateOfBirth" className="font-medium">
            Date of Birth
          </label>
          <DatePicker name={"dateOfBirth"} register={register} />

          {errors.dateOfBirth &&
            typeof errors.dateOfBirth?.message === "string" && (
              <p className="text-sm text-danger">
                {errors.dateOfBirth.message}
              </p>
            )}
        </div>
        <div className="mt-5 flex flex-col items-start pr-[30rem]">
          <span className="font-medium"> Profile Photo</span>

          <FileUpload
            register={register}
            name={"profilePicture"}
            icon={faImage}
          />
        </div>
        <Button className="ml-[650px] px-2 py-2">Save Changes</Button>
      </form>
    </div>
  );
}
export default Personal;
