import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { FieldErrors } from "react-hook-form";

import { FieldValues } from "react-hook-form";

type AuthInputProps<T extends FieldValues> = {
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  icon?: IconDefinition;
  label?: string;
  id: string;
  children: ReactNode;
  showPassword?: boolean;
  errors?: FieldErrors<T>;
  required?: boolean;
  setShowPassword?: (s: boolean) => void;
};

function InputField<T extends FieldValues>({
  props,
  label,
  id,
  icon,
  children,
  showPassword,
  errors,
  required,
  setShowPassword,
}: AuthInputProps<T>) {
  console.log(errors);
  return (
    <div className={`${props?.className ? props?.className : ""}`}>
      <label htmlFor={id} className="font-medium">
        {label} <span className="text-danger-300">{required ? "*" : ""}</span>
      </label>
      <div className="relative mt-2 flex items-center">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="absolute top-3 ml-2 h-[22px] w-[22px] text-gray-300"
          />
        )}
        {(id == "password" ||
          id == "confirmPassword" ||
          id == "newPassword" ||
          id == "confirmNewPassword") && (
          <button
            type="button"
            className="absolute right-3 top-3 ml-2 h-[22px] w-[22px] cursor-pointer text-gray-300"
            onClick={() => setShowPassword && setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} fontSize={20} />
            ) : (
              <FontAwesomeIcon icon={faEye} fontSize={20} />
            )}
          </button>
        )}
        <div className="flex w-full flex-col gap-1">
          {children}

          {errors && errors[id as keyof T] && (
            <span className="text-sm font-medium text-danger-300">
              {String(errors[id as keyof T]?.message)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputField;
