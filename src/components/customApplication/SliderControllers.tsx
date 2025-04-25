import { useForm } from "react-hook-form";
import { IApplicationData } from "../../interfaces/CustomApplication.interfaces";
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
  const { handleSubmit } = useForm<IApplicationData>();

  return (
    <div className="mt-6 flex justify-between gap-2 sm:gap-4 md:gap-6">
      {currentStep > 1 && (
        <Button onClick={onPrev} type="button" className="w-full">
          Previous
        </Button>
      )}

      <Button
        onClick={handleSubmit(() => {
          if (!isLastStep) {
            onNext();
          } else {
            onSubmit();
          }
        })}
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
