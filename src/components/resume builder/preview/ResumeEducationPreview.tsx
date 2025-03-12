import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { formatDateByYearAndMonth } from "../../../utils/helpers.ts";

function ResumeEducationPreview() {
  const { resumeInfo } = useResumeBuilder();
  const educationInfo = resumeInfo?.education;
  return (
    <div className="mt-5 text-sm">
      {resumeInfo?.education && (
        <>
          <p className="text-lg font-medium">Edcuation</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="flex flex-col gap-3">
        {educationInfo?.map((edu) => (
          <div>
            <div className="flex w-full justify-between">
              <p className="text-sm">
                <span className="font-semibold">{edu.degree}</span>,{" "}
                {edu.school}
              </p>
              <p className="text-xs italic">
                <p className="text-xs italic">
                  {formatDateByYearAndMonth(edu.start_date || "")} -{" "}
                  {formatDateByYearAndMonth(edu.end_date || "")}
                </p>
              </p>
            </div>
            <div className="rich-text-editor flex justify-between">
              <p
                dangerouslySetInnerHTML={{ __html: edu.description }}
                className="w-[30rem]"
              ></p>
              <p className="italic">
                {edu.city}, {edu.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeEducationPreview;
