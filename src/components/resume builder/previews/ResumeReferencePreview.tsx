import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumeReferencePreview() {
  const { resumeInfo } = useResumeBuilder();
  const referenceInfo = resumeInfo?.references;
  return (
    <div className="mt-5 text-sm">
      {referenceInfo?.length > 0 && (
        <>
          <p className="text-lg font-medium">Reference</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="flex flex-col gap-3">
        {referenceInfo?.map((ref) => (
          <div>
            <div className="flex w-full justify-between">
              <p className="text-sm">
                <span className="font-semibold">{ref.name}</span>,{" "}
                {ref.job_title}
              </p>
            </div>
            <div className="rich-text-editor flex justify-between">
              <p className="italic">
                {ref.email}, {ref.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeReferencePreview;
