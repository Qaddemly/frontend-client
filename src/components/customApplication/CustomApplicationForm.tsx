import { useState } from "react";
import { useApplication } from "../../context/ApplicationContext";
import ApplicationPersonal from "./ApplicationPersonal";
import ApplicationEducation from "./ApplicationEducation";
import ApplicationExperience from "./ApplicationExperience";
import ApplicationSkills from "./ApplicationSkills";
import ApplicationResume from "./ApplicationResume";
import ApplicationQuestions from "./ApplicationQuestions";
import SliderControllers from "./SliderControllers";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IApplicationData } from "../../interfaces/CustomApplication.interfaces";

function CustomApplicationForm() {
  const {
    currentStep,
    nextStep,
    prevStep,
    submitApplication,
    applicationData,
    setApplicationData,
  } = useApplication();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasQuestions = false; // API will tell us if business has questions

  const totalSteps = hasQuestions ? 6 : 5;
  const isLastStep = currentStep === totalSteps;

  const methods = useForm<IApplicationData>();

  const handleNext = () => {
    // Log current data before proceeding
    console.log("Current step data:", applicationData);
    nextStep();
  };

  const handleSubmit: SubmitHandler<IApplicationData> = async (data) => {
    setIsSubmitting(true);
    try {
      await submitApplication();
      // Handle successful submission (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="relative p-6">
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-3xl font-bold">
            {currentStep === 1 && "Personal Info"}
            {currentStep === 2 && "Education"}
            {currentStep === 3 && "Experiences"}
            {currentStep === 4 && "Skills & Languages"}
            {currentStep === 5 && "Upload Your Resume"}
            {hasQuestions && currentStep === 6 && "Application Questions"}
          </h2>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            {currentStep === 1 && <ApplicationPersonal />}
            {currentStep === 2 && <ApplicationEducation />}
            {currentStep === 3 && <ApplicationExperience />}
            {currentStep === 4 && <ApplicationSkills />}
            {currentStep === 5 && <ApplicationResume />}
            {hasQuestions && currentStep === 6 && <ApplicationQuestions />}

            <SliderControllers
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={handleNext} // nextStep
              onPrev={prevStep}
              onSubmit={handleSubmit}
              isLastStep={isLastStep}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
      </div>
    </FormProvider>
  );
}

export default CustomApplicationForm;
