import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

type AuthInputProps = {
  icon?: IconDefinition;
  label?: string;
  props: React.InputHTMLAttributes<HTMLInputElement>;
  register?: UseFormRegister<FieldValues>;
  options?: RegisterOptions;
  onChange?: (props: React.ChangeEvent<HTMLInputElement>) => void;
};

function AuthInput({
  label,
  props,
  icon,
  register,
  options,
  onChange,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label htmlFor={props.id} className="font-medium">
        {label}
      </label>
      <div className="relative mt-2 flex items-center">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="absolute ml-2 h-[22px] w-[22px] text-gray-300"
          />
        )}
        {props.type == "password" && (
          <button
            className="absolute right-3 ml-2 h-[22px] w-[22px] cursor-pointer text-gray-300"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} fontSize={20} />
            ) : (
              <FontAwesomeIcon icon={faEye} fontSize={20} />
            )}
          </button>
        )}

        <input
          {...(props.id && register ? register(props.id, options) : {})}
          {...props}
          type={showPassword ? "text" : props.type}
          className={`${props.className?.split("-")[0] == "w" ? props.className : "w-full"} rounded-md border-2 border-gray-100 ${icon ? "px-9" : "px-3"} py-[7px]`}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default AuthInput;
