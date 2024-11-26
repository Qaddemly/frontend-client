import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import DatePicker from "./DatePicker";

function AuthStartToEndDate<T extends FieldValues>({
  register,
}: {
  register: UseFormRegister<T>;
}) {
  return (
    <>
      <label htmlFor="education">Start & End Date</label>
      <div className="flex items-center gap-4">
        <DatePicker
          register={register}
          name={"startEducationDate" as Path<T>}
        />
        <span className="text-gray-300">to</span>
        <DatePicker register={register} name={"endEducationDate" as Path<T>} />
      </div>
    </>
  );
}

export default AuthStartToEndDate;
