import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import DatePicker from "./DatePicker";

type StartToEndDateProps<T extends FieldValues> = {
  register?: UseFormRegister<T>;
  startDate: Path<T>;
  endDate: Path<T>;
  startDateDefaultValue?: string;
  endDateDefaultValue?: string;
  onChangeStartDate?: React.ChangeEventHandler<HTMLInputElement>;
  onChangeEndDate?: React.ChangeEventHandler<HTMLInputElement>;
};

function StartToEndDate<T extends FieldValues>({
  register,
  startDate,
  endDate,
  startDateDefaultValue,
  endDateDefaultValue,
  onChangeStartDate,
  onChangeEndDate,
}: StartToEndDateProps<T>) {
  // const {
  //   formState: { errors },
  // } = useFormContext();
  return (
    <>
      <label
        htmlFor="education"
        className="text-center font-medium sm:text-left"
      >
        Start & End Date
      </label>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <DatePicker
          onChange={onChangeStartDate}
          props={{
            id: startDate,
            defaultValue: startDateDefaultValue,
            className: "w-full",
          }}
          register={register}
          name={startDate}
        />
        <span className="text-gray-300">to</span>
        <DatePicker
          onChange={onChangeEndDate}
          props={{
            id: endDate,
            defaultValue: endDateDefaultValue,
            className: "w-full",
          }}
          register={register}
          name={endDate}
        />
      </div>
      {/*<p className="text-sm text-danger-300">*/}
      {/*  {typeof errors?.startEducationDate?.message === "string" &&*/}
      {/*    errors?.startEducationDate?.message}*/}
      {/*</p>*/}
    </>
  );
}

export default StartToEndDate;
