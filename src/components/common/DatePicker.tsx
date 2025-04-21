import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type DatePickerProps<T extends FieldValues> = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  register?: UseFormRegister<T>;
  props?: React.InputHTMLAttributes<HTMLInputElement> & { id: string };
  options?: RegisterOptions<T>;
  name?: Path<T>;
};

function DatePicker<T extends FieldValues>({
  onChange,
  register,
  props,
  options,
  name,
}: DatePickerProps<T>) {
  return (
    <div className={`relative w-fit ${props?.className}`}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
        <svg
          className="h-4 w-4 text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </div>
      <input
        {...(register && name ? register(name, options) : {})}
        onChange={onChange}
        {...props}
        type="date"
        className={`block rounded-md border-2 border-gray-100 p-2.5 ps-10 text-sm ${props?.className}`}
      />
      {/* w-[13rem] doesn't have effect in createCompany or updateCompany   */}
    </div>
  );
}

export default DatePicker;
