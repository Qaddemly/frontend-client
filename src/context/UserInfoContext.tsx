import { createContext, useState, useContext, ReactNode } from "react";
import { Languages } from "../enums/index.enums";
import { IExperience } from "../interfaces/Auth.interfaces";

interface UserInfoContextProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  languages: Languages[];
  setLanguages: React.Dispatch<React.SetStateAction<Languages[]>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  experience: IExperience[];
  setExperience: React.Dispatch<React.SetStateAction<IExperience[]>>;
}

const UserInfoContext = createContext<UserInfoContextProps | undefined>(
  undefined,
);

export const UserInfoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(1);
  const [languages, setLanguages] = useState<Languages[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<IExperience[]>([]);

  return (
    <UserInfoContext.Provider
      value={{
        step,
        languages,
        experience,
        skills,
        setLanguages,
        setSkills,
        setStep,
        setExperience,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = (): UserInfoContextProps => {
  const context = useContext(UserInfoContext);
  if (context === undefined) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};
