import ResumeBuilderLayout from "../../layout/ResumeBuilderLayout.tsx";
import FormPreview from "./FormPreview.tsx";
import ResumePreview from "./ResumePreview.tsx";
import { useResumeBuilder } from "../../context/ResumeBuilderContext.tsx";
import AddResumeContent from "./AddResumeContent.tsx";

function EditResume() {
  const { showAddContent } = useResumeBuilder();

  return (
    <ResumeBuilderLayout>
      <div className="flex justify-center gap-[10rem]">
        {showAddContent ? (
          <div className="min-h-screen min-w-[60rem]">
            <AddResumeContent />
          </div>
        ) : (
          <>
            <FormPreview />
            <ResumePreview />
          </>
        )}
      </div>
    </ResumeBuilderLayout>
  );
}

export default EditResume;
