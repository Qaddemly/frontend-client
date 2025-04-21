import React, { createContext, useContext, useState } from "react";

interface ApplicationData {
  personal?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
  };
  education?: {
    university: string;
    fieldOfStudy: string;
    gpa: string;
    startDate: string;
    endDate?: string;
    // currentlyStudying: boolean;
  };
  experience?: Array<{
    jobTitle: string;
    companyName: string;
    location: string;
    city: string;
    locationType: string;
    startDate: string;
    endDate?: string;
    // currentlyWorking: boolean;
  }>;
  skills?: string[];
  languages?: string[];
}

interface ApplicationContextType {
  applicationType: "easy" | "custom" | null;
  setApplicationType: (type: "easy" | "custom" | null) => void;
  jobId: string | null;
  setJobId: (id: string) => void;
  resume: File | null;
  setResume: (file: File | null) => void;
  answers: Record<string, string>;
  setAnswers: (answers: Record<string, string>) => void;
  applicationData: ApplicationData;
  setApplicationData: React.Dispatch<React.SetStateAction<ApplicationData>>;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  submitApplication: () => Promise<void>;
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
  const [applicationData, setApplicationData] = useState<ApplicationData>({});
  const [currentStep, setCurrentStep] = useState(1);

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
