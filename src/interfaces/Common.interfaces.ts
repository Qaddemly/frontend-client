export interface IError {
  status: string;
  name: string;
  message: string;
  details: string | IDetails;
}

export interface IDetails {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
export interface IResponse {
  success: boolean;
  message: string;
}

interface FormSettings {
  mode: "onBlur";
  reValidateMode: "onChange";
  criteriaMode: "all";
  shouldFocusError: boolean;
}

export const formSettings: FormSettings = {
  mode: "onBlur",
  reValidateMode: "onChange",
  criteriaMode: "all",
  shouldFocusError: true,
};
