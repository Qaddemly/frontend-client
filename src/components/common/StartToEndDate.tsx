import {
  FieldValues,
  Path,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import DatePicker from "./DatePicker";

type StartToEndDateProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  startDate: Path<T>;
  endDate: Path<T>;
  startDateDefaultValue?: string;
  endDateDefaultValue?: string;
};

function StartToEndDate<T extends FieldValues>({
  register,
  startDate,
  endDate,
  startDateDefaultValue,
  endDateDefaultValue,
}: StartToEndDateProps<T>) {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <label htmlFor="education" className="font-medium">
        Start & End Date
      </label>
      <div className="flex items-center justify-between gap-4">
        <DatePicker
          props={{ id: startDate, defaultValue: startDateDefaultValue }}
          register={register}
          name={startDate}
        />
        <span className="text-gray-300">to</span>
        <DatePicker
          props={{ id: endDate, defaultValue: endDateDefaultValue }}
          register={register}
          name={endDate}
        />
      </div>
      <p className="text-sm text-danger-300">
        {typeof errors.startEducationDate?.message === "string" &&
          errors.startEducationDate?.message}
      </p>
    </>
  );
}

export default StartToEndDate;
