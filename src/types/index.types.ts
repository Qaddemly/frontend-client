export type UserInfoStep = {
  setStep: (step: number | ((step: number) => number)) => void;
};
