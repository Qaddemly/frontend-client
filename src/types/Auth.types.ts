import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type UserInfoProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};
