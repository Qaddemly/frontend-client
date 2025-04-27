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
import { useParams } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

function CustomApplicationForm() {
  const {
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

  const { jobId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasQuestions = true; // API will tell us if business has questions
  const totalSteps = hasQuestions ? 6 : 5;
  const isLastStep = currentStep === totalSteps;
  const methods = useForm<IApplicationData>({
    mode: "onChange",
  });

  const { watch } = methods;
  const watchedValues = watch();
  console.log("watchedValues", watchedValues);
  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1: // Personal Info
        return Boolean(
          watchedValues.personal?.firstName &&
            watchedValues.personal?.lastName &&
            watchedValues.personal?.email &&
            watchedValues.personal?.phone?.number &&
            watchedValues.personal?.dob,
        );

      case 2: // Education
        return true;
      // !errors.education?.university &&
      // !errors.education?.fieldOfStudy &&
      // !errors.education?.gpa &&
      // !errors.education?.startDate &&
      // !errors.education?.endDate

      case 3: // Experience
        return experience.length > 0; // At least one experience added

      case 4: // Skills & Languages
        return skills.length > 0 && languages.length > 0; // At least one skill and language

      case 5: // Resume
        return !!resume; // Resume must be uploaded

      // case 6: // Questions
      //   return answers.length === questions.length && !answers.includes(""); // All questions must be answered

      default:
        return false;
    }
  };

  const onSubmit: SubmitHandler<IApplicationData> = (data) => {
    setIsSubmitting(true);
    const appData = { ...data, skills, languages, experience };
    const appAnswers = hasQuestions ? answers : null;

    console.log("Submitting application:", {
      jobId,
      appData,
      resume,
      appAnswers,
    });

    setCurrentStep(1);
    setIsSubmitting(false);
  };

  return (
    <MainLayout>
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
                isStepValid={validateStep()}
              />
            </form>
          </div>
        </div>
      </FormProvider>
    </MainLayout>
  );
}

export default CustomApplicationForm;
