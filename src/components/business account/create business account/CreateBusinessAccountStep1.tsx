import { useFormContext } from "react-hook-form";
import { Country, LocationType } from "../../../enums/index.enums";
import Button from "../../common/Button";
import Input from "../../common/Input";
import InputField from "../../common/InputField";
import Select from "../../common/Select";
import toast from "react-hot-toast";

type CreateBusinessAccountStep1Props = {
  setStep?: React.Dispatch<React.SetStateAction<string>>;
  updateAccount: boolean;
};

function CreateBusinessAccountStep1({
  setStep,
  updateAccount,
}: CreateBusinessAccountStep1Props) {
  const locationValues = Object.values(Country);
  const locationTypeValues = Object.values(LocationType);
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger();

    if (!isValid) {
      toast.error("Threr are fields required");
      return;
    } else if (setStep) setStep("2");
  };

  return (
    <div
      className={`mt-10 flex flex-col gap-5 ${updateAccount ? "border-r border-gray-100 pr-5" : ""}`}
    >
      <InputField
        errors={!updateAccount ? errors : {}}
        label="Company name"
        id="name"
        required={!updateAccount}
      >
        <Input
          register={register}
          name="name"
          options={!updateAccount ? { required: "this field is required" } : {}}
          props={{
            type: "text",
            id: "name",
            placeholder: "Enter company name",
          }}
          // value={}
        />
      </InputField>
      <InputField
        errors={!updateAccount ? errors : {}}
        label="Company email"
        id="email"
      >
        <Input
          register={register}
          name="email"
          props={{
            type: "email",
            id: "email",
            placeholder: "Enter company email",
          }}
        />
      </InputField>

      {/* will be enum sync with backend */}
      <InputField
        errors={!updateAccount ? errors : {}}
        label="Company industry"
        id="industry"
        required={!updateAccount}
      >
        <Input
          register={register}
          name="industry"
          options={!updateAccount ? { required: "this field is required" } : {}}
          props={{
            type: "text",
            id: "industry",
            placeholder: "Enter company industry",
          }}
        />
      </InputField>

      <div className="flex gap-5">
        <Select
          register={register}
          name="address.country"
          label="Country"
          id="address.country"
          errors={!updateAccount ? errors : {}}
          required={!updateAccount}
        >
          {locationValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </Select>
        <InputField label="City" id="address.city" required={!updateAccount}>
          <Input
            register={register}
            options={
              !updateAccount ? { required: "this field is required" } : {}
            }
            name="address.city"
            props={{ type: "text", id: "address.city", placeholder: "City" }}
          />
        </InputField>
      </div>

      <Select
        register={register}
        name="location_type"
        label="Location type"
        id="locationType"
        required={!updateAccount}
      >
        {locationTypeValues.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </Select>

      <div className="flex flex-col gap-2">
        <label htmlFor="companyDescription">
          Company Description
          {!updateAccount && <span className="text-danger-300">*</span>}
        </label>

        <textarea
          {...register("description")}
          className={`min-h-[20rem] rounded-md ${updateAccount ? "bg-[#eee]" : "bg-white"} p-5 outline-none`}
          placeholder="Enter company description"
        />
      </div>
      {!updateAccount && (
        <Button type="button" className="px-3" onClick={handleNext}>
          Next
        </Button>
      )}
    </div>
  );
}

export default CreateBusinessAccountStep1;
