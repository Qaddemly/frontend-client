import ResumeBuilderLayout from "../layout/ResumeBuilderLayout.tsx";
import AddCoverLetter from "../cover letter builder/AddCoverLetter.tsx";

function CoverLetterBuilder() {
  return (
    <ResumeBuilderLayout>
      <AddCoverLetter />
    </ResumeBuilderLayout>
  );
}

export default CoverLetterBuilder;
