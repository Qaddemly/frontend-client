import { useApplication } from "../../context/ApplicationContext";
import Button from "../common/Button";

interface SliderControllersProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
  isSubmitting?: boolean;
}

function SliderControllers({
  currentStep,
  onNext,
  onPrev,
  onSubmit,
  isLastStep,
  isSubmitting = false,
}: SliderControllersProps) {
  const { applicationData, setApplicationData } = useApplication();
  const handleNext = () => {
    console.log("Current application data:", applicationData);
    if (currentStep === 1) {
      setApplicationData((prev) => ({ ...prev, personal: data.personal }));
    } else if (currentStep === 2) {
      setApplicationData((prev) => ({ ...prev, education: data.education }));
    } else if (currentStep === 3) {
      setApplicationData((prev) => ({ ...prev, experience: data.experience }));
    } else if (currentStep === 4) {
      setApplicationData((prev) => ({ ...prev, skills: data.skills }));
      setApplicationData((prev) => ({ ...prev, languages: data.languages }));
    }
    console.log("Current application data:", applicationData);
    if (!isLastStep) {
      onNext();
    } else {
      onSubmit();
    }
  };

  return (
    <div className="mt-6 flex justify-between gap-2 sm:gap-4 md:gap-6">
      {currentStep > 1 && (
        <Button onClick={onPrev} type="button" className="w-full">
          Previous
        </Button>
      )}

      <Button
        onClick={handleNext}
        type="button"
        className={`w-full ${isLastStep ? "bg-green-100 hover:bg-green-200" : ""} `}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Submitting..."
          : isLastStep
            ? "Submit Application"
            : "Next"}
      </Button>
    </div>
  );
}

export default SliderControllers;
