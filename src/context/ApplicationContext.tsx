import React, { createContext, useContext, useState } from "react";
import {
  IApplicationData,
  ICustomEducation,
  ICustomExperience,
} from "../interfaces/CustomApplication.interfaces";
import { IAnswer } from "../interfaces/Job.interfaces.ts";

interface ApplicationContextType {
  applicationType: "easy" | "custom" | null;
  setApplicationType: (type: "easy" | "custom" | null) => void;
  resume: File | null;
  setResume: (file: File | null) => void;
  answers: IAnswer[];
  setAnswers: React.Dispatch<IAnswer[]>;
  educations: ICustomEducation[];
  setEducations: React.Dispatch<React.SetStateAction<ICustomEducation[]>>;
  applicationData: IApplicationData;
  setApplicationData: React.Dispatch<React.SetStateAction<IApplicationData>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  experiences: ICustomExperience[];
  setExperiences: React.Dispatch<React.SetStateAction<ICustomExperience[]>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  languages: string[];
  setLanguages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [applicationType, setApplicationType] = useState<
    "easy" | "custom" | null
  >(null);
  const [resume, setResume] = useState<File | null>(null);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [applicationData, setApplicationData] = useState<IApplicationData>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [educations, setEducations] = useState<ICustomEducation[]>([]);
  const [experiences, setExperiences] = useState<ICustomExperience[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // TODO : finish the submitting function to API

  return (
    <ApplicationContext.Provider
      value={{
        applicationType,
        setApplicationType,
        resume,
        setResume,
        answers,
        setAnswers,
        applicationData,
        setApplicationData,
        educations,
        setEducations,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        setExperiences,
        experiences,
        setSkills,
        skills,
        setLanguages,
        languages,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplication must be used within an ApplicationProvider",
    );
  }
  return context;
};
