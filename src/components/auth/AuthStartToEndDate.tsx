import {
  FieldValues,
  Path,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import DatePicker from "./DatePicker";
import { validateStartToEndDate } from "../../utils/helpers";

function AuthStartToEndDate<T extends FieldValues>({
  register,
  startDate,
  endDate,
}: {
  register: UseFormRegister<T>;
  startDate: Path<T>;
  endDate: Path<T>;
}) {
  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <label htmlFor="education">Start & End Date</label>
      <div className="flex items-center gap-4">
        <DatePicker
          register={register}
          name={startDate}
          options={{
            validate: (value) =>
              validateStartToEndDate(value, getValues(endDate)),
          }}
        />
        <span className="text-gray-300">to</span>
        <DatePicker register={register} name={endDate} />
      </div>
      <p className="text-sm text-danger">
        {typeof errors.startEducationDate?.message === "string" &&
          errors.startEducationDate?.message}
      </p>
    </>
  );
}

export default AuthStartToEndDate;
