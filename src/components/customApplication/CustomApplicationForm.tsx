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
    jobId,
    resume,
    answers,
    currentStep,
    nextStep,
    prevStep,
    skills,
    languages,
    setCurrentStep,
    experience,
  } = useApplication();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasQuestions = true; // API will tell us if business has questions
  const totalSteps = hasQuestions ? 6 : 5;
  const isLastStep = currentStep === totalSteps;

  const methods = useForm<IApplicationData>();

  const onSubmit: SubmitHandler<IApplicationData> = (data) => {
    setIsSubmitting(true);
    console.log("input data: ", data);
    // API call
    const appData = { ...data, skills, languages, experience };
    const appAnswers = hasQuestions ? answers : null;
    console.log("sendind data: ", appData);

    console.log("Submitting application:", {
      jobId,
      appData,
      resume,
      appAnswers,
    });

    // Reset form after successful submission
    // setResume(null);
    // setAnswers({});
    // set skills, languages, experience => empty array
    // reset values from react hook form
    setCurrentStep(1);
    setIsSubmitting(false);
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
            onSubmit={methods.handleSubmit(onSubmit)}
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
              onNext={nextStep}
              onPrev={prevStep}
              onSubmit={methods.handleSubmit(onSubmit)}
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

// const submitApplication = async () => {
//   try {
//     // API call
//     console.log("Submitting application:", {
//       jobId,
//       applicationData,
//       resume,
//       answers,
//     });
//     // Reset form after successful submission
//     // setApplicationData({});
//     // setResume(null);
//     // setAnswers({});
//     // setCurrentStep(1);
//   } catch (error) {
//     console.error("Error submitting application:", error);
//   }
// };
