import { ReactNode } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type AuthSelectProps<T extends FieldValues> = {
  label: string;
  id: string;
  children: ReactNode;
  className?: string;
  value?: string | number | string[];
  onChange?: (props: React.ChangeEvent<HTMLSelectElement>) => void;
  register?: UseFormRegister<T>;
  options?: RegisterOptions<T>;
  name?: Path<T>;
};

function AuthSelect<T extends FieldValues>({
  label,
  id,
  children,
  className,
  value,
  onChange,
  register,
  options,
  name,
}: AuthSelectProps<T>) {
  return (
    <div className="text-left">
      <label htmlFor={id} className="mb-2 block font-medium">
        {label}
      </label>
      <select
        {...(register && name ? register(name, options) : {})}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border-2 border-gray-100 px-2 py-2 text-gray-300 outline-none focus:border-secondary ${className} location-input`}
      >
        {children}
      </select>
    </div>
  );
}

export default AuthSelect;
