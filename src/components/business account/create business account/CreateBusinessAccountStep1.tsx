import { useFormContext } from "react-hook-form";
import { Country, LocationType } from "../../auth";
import Button from "../../common/Button";
import Input from "../../common/Input";
import InputField from "../../common/InputField";
import Select from "../../common/Select";
import toast from "react-hot-toast";

type CreateBusinessAccountStep1Props = {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateBusinessAccountStep1({
  setNext,
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
    } else setNext(true);
  };

  return (
    <div className="mt-10 flex flex-col gap-5">
      <InputField errors={errors} label="Company name" id="name" required>
        <Input
          register={register}
          name="name"
          options={{ required: "this field is required" }}
          props={{
            type: "text",
            id: "name",
            placeholder: "Enter company name",
          }}
        />
      </InputField>
      <InputField errors={errors} label="Company email" id="email">
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
        errors={errors}
        label="Company industry"
        id="industry"
        required
      >
        <Input
          register={register}
          name="industry"
          options={{ required: "this field is required" }}
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
          errors={errors}
          required
        >
          {locationValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </Select>
        <InputField label="City" id="address.city" required>
          <Input
            register={register}
            options={{ required: "this field is required" }}
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
        required
      >
        {locationTypeValues.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </Select>

      <div className="flex flex-col gap-2">
        <label htmlFor="companyDescription">
          Company Description <span className="text-danger-300">*</span>
        </label>
        <textarea
          {...register("description")}
          className="min-h-28 rounded-md p-5 outline-none"
          placeholder="Enter company description"
        />
      </div>
      <Button type="button" className="px-3" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
}

export default CreateBusinessAccountStep1;
