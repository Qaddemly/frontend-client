export type CoverLetterStatus =
  | "addCoverLetter"
  | "start"
  | "normal"
  | "add"
  | "edit"
  | "personal";

export interface ICoverLetterInfo {
  personal: ICoverLetterPersonalInputs;
}

///////////////////////////////////////////// Cover Letter Template //////////////////////////////////////////////
export interface ICoverLetterTemplate {
  id: number;
  name: string;
}
///////////////////////////////////////////// Personal //////////////////////////////////////////////
export interface ICoverLetterPersonalInputs {
  id: number;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
}
