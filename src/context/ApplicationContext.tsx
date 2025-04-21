import React, { createContext, useContext, useState } from "react";
import {
  IApplicationData,
  ICustomExperience,
} from "../interfaces/CustomApplication.interfaces";

interface ApplicationContextType {
  applicationType: "easy" | "custom" | null;
  setApplicationType: (type: "easy" | "custom" | null) => void;
  jobId: string | null;
  setJobId: (id: string) => void;
  resume: File | null;
  setResume: (file: File | null) => void;
  answers: Record<string, string>;
  setAnswers: (answers: Record<string, string>) => void;
  applicationData: IApplicationData;
  setApplicationData: React.Dispatch<React.SetStateAction<IApplicationData>>;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  submitApplication: () => Promise<void>;
  experience: ICustomExperience[];
  setExperience: React.Dispatch<React.SetStateAction<ICustomExperience[]>>;
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
  const [jobId, setJobId] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [applicationData, setApplicationData] = useState<IApplicationData>({});
  const [currentStep, setCurrentStep] = useState(1);

  const [experience, setExperience] = useState<ICustomExperience[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // TODO : finish the submiting function to API
  const submitApplication = async () => {
    try {
      // API call
      console.log("Submitting application:", {
        jobId,
        applicationData,
        resume,
        answers,
      });
      // Reset form after successful submission
      setApplicationData({});
      setResume(null);
      setAnswers({});
      setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        applicationType,
        setApplicationType,
        jobId,
        setJobId,
        resume,
        setResume,
        answers,
        setAnswers,
        applicationData,
        setApplicationData,
        currentStep,
        nextStep,
        prevStep,
        submitApplication,
        setExperience,
        experience,
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
