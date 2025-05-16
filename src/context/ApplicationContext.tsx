import { createContext, useContext, useState } from "react";
import {
  IEducation,
  IExperience,
  ILanguages,
  ISkills,
} from "../interfaces/Auth.interfaces";
import { IAnswer } from "../interfaces/Job.interfaces";

interface ApplicationContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  experience: IExperience[];
  setExperience: (data: IExperience[]) => void;
  education: IEducation[];
  setEducation: (data: IEducation[]) => void;
  skills: ISkills[];
  setSkills: (data: ISkills[]) => void;
  languages: ILanguages[];
  setLanguages: (data: ILanguages[]) => void;
  resume: File | null;
  setResume: (file: File | null) => void;
  answers: IAnswer[];
  setAnswers: (data: IAnswer[]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [experience, setExperience] = useState<IExperience[]>([]);
  const [education, setEducation] = useState<IEducation[]>([]);
  const [skills, setSkills] = useState<ISkills[]>([]);
  const [languages, setLanguages] = useState<ILanguages[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <ApplicationContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        experience,
        setExperience,
        education,
        setEducation,
        skills,
        setSkills,
        languages,
        setLanguages,
        resume,
        setResume,
        answers,
        setAnswers,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context)
    throw new Error("useApplication must be used within ApplicationProvider");
  return context;
};
