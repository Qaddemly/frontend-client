import { useApplication } from "../../context/ApplicationContext";
import ApplicationPersonal from "./ApplicationPersonal";
import ApplicationEducation from "./ApplicationEducation";
import ApplicationExperience from "./ApplicationExperience";
import ApplicationSkills from "./ApplicationSkills";
import ApplicationResume from "./ApplicationResume";
import ApplicationQuestions from "./ApplicationQuestions";
import SliderControllers from "./SliderControllers";
import { useNavigate } from "react-router-dom";

function CustomApplicationForm() {
  const { currentStep, nextStep, prevStep, applicationData, resume } =
    useApplication();

  const hasQuestions = false; // Temporary - should be replaced with API check

  const totalSteps = hasQuestions ? 6 : 5;
  const isLastStep = currentStep === totalSteps;

  const navigate = useNavigate();
  const handleSubmit = () => {
    // Here you would submit the entire application
    console.log("Submitting application:", { applicationData, resume });
    // In a real app, you would call your API here
    alert("Application submitted successfully!");
    // TODO : replace with a small application and navigate to find job page
    navigate("/findJob");
  };

  return (
    <div className="relative">
      {currentStep === 1 && <ApplicationPersonal nextStep={nextStep} />}
      {currentStep === 2 && (
        <ApplicationEducation nextStep={nextStep} prevStep={prevStep} />
      )}
      {currentStep === 3 && (
        <ApplicationExperience nextStep={nextStep} prevStep={prevStep} />
      )}
      {currentStep === 4 && (
        <ApplicationSkills nextStep={nextStep} prevStep={prevStep} />
      )}
      {currentStep === 5 && (
        <ApplicationResume nextStep={nextStep} prevStep={prevStep} />
      )}
      {hasQuestions && currentStep === 6 && (
        <ApplicationQuestions prevStep={prevStep} />
      )}

      <SliderControllers
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={nextStep}
        onPrev={prevStep}
        onSubmit={handleSubmit}
        isLastStep={isLastStep}
      />
    </div>
  );
}

export default CustomApplicationForm;
