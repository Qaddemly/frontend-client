import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { RegisterOptions, UseFormRegister, Path } from "react-hook-form";
import { FieldValues } from "react-hook-form";

interface IAuthInput<T extends FieldValues> {
  props: React.InputHTMLAttributes<HTMLInputElement> & { id: string };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  register?: UseFormRegister<T>;
  options?: RegisterOptions<T>;
  name?: Path<T>;
  icon?: IconDefinition;
  showPassword?: boolean;
  value?: string | number | string[];
}

function Input<T extends FieldValues>({
  register,
  options,
  props,
  onChange,
  name,
  icon,
  showPassword,
  value,
}: IAuthInput<T>) {
  return (
    <input
      {...(register && name ? register(name, options) : {})}
      {...props}
      type={showPassword ? "text" : props.type}
      className={`${props.className?.split("-")[0] == "w" ? props.className : "w-full"} ${props.className} rounded-md border-2 border-gray-100 ${icon ? "px-9" : "px-3"} py-[7px]`}
      onChange={onChange}
      value={value}
    />
  );
}

export default Input;
