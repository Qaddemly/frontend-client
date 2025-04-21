import { useState } from "react";
import { useApplication } from "../../context/ApplicationContext";
import ApplicationPersonal from "./ApplicationPersonal";
import ApplicationEducation from "./ApplicationEducation";
import ApplicationExperience from "./ApplicationExperience";
import ApplicationSkills from "./ApplicationSkills";
import ApplicationResume from "./ApplicationResume";
import ApplicationQuestions from "./ApplicationQuestions";
import SliderControllers from "./SliderControllers";

function CustomApplicationForm() {
  const {
    currentStep,
    nextStep,
    prevStep,
    submitApplication,
    applicationData,
  } = useApplication();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasQuestions = false; // API will tell us if business has questions

  const totalSteps = hasQuestions ? 6 : 5;
  const isLastStep = currentStep === totalSteps;

  const handleNext = () => {
    // Log current data before proceeding
    console.log("Current step data:", applicationData);
    nextStep();
  };

  const handleSubmit = async () => {
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
    <div className="relative p-6">
      {currentStep === 1 && <ApplicationPersonal />}
      {currentStep === 2 && <ApplicationEducation />}
      {currentStep === 3 && <ApplicationExperience />}
      {currentStep === 4 && <ApplicationSkills />}
      {currentStep === 5 && <ApplicationResume />}
      {hasQuestions && currentStep === 6 && <ApplicationQuestions />}

      <SliderControllers
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={nextStep}
        onPrev={prevStep}
        onSubmit={handleSubmit}
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default CustomApplicationForm;
