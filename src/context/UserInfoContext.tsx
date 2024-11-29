import { createContext, useState, useContext, ReactNode } from "react";
import { Languages } from "../components/auth";

interface UserInfoContextProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  languages: Languages[];
  setLanguages: React.Dispatch<React.SetStateAction<Languages[]>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
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

  return (
    <UserInfoContext.Provider
      value={{ step, languages, skills, setLanguages, setSkills, setStep }}
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
