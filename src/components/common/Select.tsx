import { ReactNode } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type AuthSelectProps<T extends FieldValues> = {
  label?: string;
  id: string;
  children: ReactNode;
  className?: string;
  value?: string | number | string[];
  options?: RegisterOptions<T>;
  name?: Path<T>;
  isFilter?: boolean;
  onChange?: (props: React.ChangeEvent<HTMLSelectElement>) => void;
  register?: UseFormRegister<T>;
};

function Select<T extends FieldValues>({
  label,
  id,
  children,
  className,
  value,
  options,
  name,
  isFilter = false,
  onChange,
  register,
}: AuthSelectProps<T>) {
  return (
    <div className="text-left">
      <label
        htmlFor={id}
        className={`mb-2 block ${isFilter ? "text-light-secondary-200 font-semibold" : "font-medium"}`}
      >
        {label}
      </label>
      <select
        {...(register && name ? register(name, options) : {})}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border-2 border-gray-100 px-2 py-2 outline-none focus:border-secondary ${className} ${isFilter ? "text-light-secondary-200" : "text-gray-300"} location-input`}
      >
        {children}
      </select>
    </div>
  );
}

export default Select;
