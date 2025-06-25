import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumeInterestPreview() {
  const { resumeInfo } = useResumeBuilder();
  const interestInfo = resumeInfo?.hobbies;
  if (!interestInfo || interestInfo.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 text-sm">
      {resumeInfo?.hobbies?.length > 0 && (
        <>
          <p className="text-lg font-medium">Interests</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="grid grid-cols-2 gap-5">
        {interestInfo?.map((inter) => (
          <div className="">
            <p className="text-sm">
              <span className="font-semibold">{inter.interest}</span>
            </p>
            <p
              className="rich-text-editor"
              dangerouslySetInnerHTML={{ __html: inter.description }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeInterestPreview;
