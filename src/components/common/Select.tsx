import { ReactNode } from "react";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type AuthSelectProps<T extends FieldValues> = {
  label?: string;
  id?: string;
  children: ReactNode;
  className?: string;
  value?: string | number | string[];
  options?: RegisterOptions<T>;
  name?: Path<T>;
  isFilter?: boolean;
  required?: boolean;
  errors?: FieldErrors<T>;
  props?: React.SelectHTMLAttributes<HTMLSelectElement> & { id: string };
  defaultValue?: string;
  onChange?: (props: React.ChangeEvent<HTMLSelectElement>) => void;
  register?: UseFormRegister<T>;
};

function Select<T extends FieldValues>({
  label,
  id,
  children,
  className,
  options,
  value,
  name,
  isFilter = false,
  required,
  errors,
  props,
  defaultValue,
  onChange,
  register,
}: AuthSelectProps<T>) {
  return (
    <div className="text-left">
      <label
        htmlFor={id}
        className={`mb-2 block ${isFilter ? "font-semibold text-light-secondary-200" : "font-medium"}`}
      >
        {label} <span className="text-danger-300">{required ? "*" : ""}</span>
      </label>
      <select
        {...(register && name ? register(name, options) : {})}
        id={id}
        {...props}
        defaultValue={defaultValue}
        value={value === "" ? defaultValue : value}
        onChange={onChange}
        className={`w-full rounded-md border-2 border-gray-100 px-2 py-2 outline-none focus:border-secondary ${className} ${isFilter ? "text-light-secondary-200" : "text-gray-300"} location-input`}
      >
        {children}
      </select>
      {errors &&
        id &&
        id
          .split(".")
          .reduce(
            (acc, part) => (acc && acc[part] ? acc[part] : {}),
            (errors as FieldErrors<T>) || ({} as FieldErrors<T>),
          ) && (
          <span className="text-sm font-medium text-danger-300">
            {String(
              (
                id
                  .split(".")
                  .reduce(
                    (acc, part) => (acc && acc[part] ? acc[part] : {}),
                    errors as FieldErrors<T>,
                  ) as FieldError
              )?.message || "",
            )}
          </span>
        )}
    </div>
  );
}

export default Select;
