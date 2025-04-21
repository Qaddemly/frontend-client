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
  const { applicationData } = useApplication();
  const handleNext = () => {
    console.log("Current application data:", applicationData);

    if (!isLastStep) {
      onNext();
    } else {
      onSubmit();
    }
  };

  return (
    <div className="mt-6 flex justify-between gap-2 sm:gap-4 md:gap-6">
      {currentStep > 1 ? (
        <Button onClick={onPrev} type="button" className="w-full">
          Previous
        </Button>
      ) : (
        <div></div> // Empty div to maintain space
      )}

      <Button
        onClick={handleNext}
        type="button"
        className={`w-full ${isLastStep ? "bg-green-100 hover:bg-green-200" : ""} `}
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
