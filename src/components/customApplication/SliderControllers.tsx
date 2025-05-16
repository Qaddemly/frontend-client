import Button from "../common/Button";
import { IApplicationData } from "../../interfaces/CustomApplication.interfaces";

interface SliderControllersProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: (data: IApplicationData) => void;
  isLastStep: boolean;
  isSubmitting?: boolean;
  validateStep: () => Promise<boolean>;
}

function SliderControllers({
  currentStep,
  onNext,
  onPrev,
  onSubmit,
  isLastStep,
  isSubmitting = false,
  validateStep,
}: SliderControllersProps) {
  const handleClick = async () => {
    const isValid = await validateStep();
    if (!isValid) {
      return;
    }
    if (isLastStep) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between gap-2 sm:gap-4 md:gap-6">
          {currentStep > 1 && (
            <Button onClick={onPrev} type="button" className="w-full">
              Previous
            </Button>
          )}

          <Button
            onClick={handleClick}
            type="button"
            className={`w-full ${isLastStep ? "bg-green-100 hover:bg-green-200" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : isLastStep
                ? "Submit Application"
                : "Next"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default SliderControllers;
