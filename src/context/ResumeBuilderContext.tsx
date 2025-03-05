import { createContext, ReactNode, useContext, useState } from "react";
import { IResumeInfo } from "../interfaces/ResumeBuilder.interfaces.ts";
import { dummyData } from "../data/dummy.ts";

export interface ResumeBuilderContextProps {
  resumeInfo: IResumeInfo;
  setResumeInfo: React.Dispatch<React.SetStateAction<IResumeInfo>>;
  showAddContent: boolean;
  setShowAddContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumeBuilderContext = createContext<
  ResumeBuilderContextProps | undefined
>(undefined);

export const ResumeBuilderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo>(dummyData);
  const [showAddContent, setShowAddContent] = useState(false);

  return (
    <ResumeBuilderContext.Provider
      value={{ showAddContent, setShowAddContent, resumeInfo, setResumeInfo }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
};

export const useResumeBuilder = (): ResumeBuilderContextProps => {
  const context = useContext(ResumeBuilderContext);
  if (context === undefined) {
    throw new Error("useResumeBuilder must be used within a UserInfoProvider");
  }
  return context;
};
