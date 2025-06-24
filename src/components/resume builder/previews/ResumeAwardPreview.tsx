import { formatDateByYearAndMonth } from "../../../utils/helpers.ts";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumeAwardPreview() {
  const { resumeInfo } = useResumeBuilder();
  const awardInfo = resumeInfo?.awards;
  if (!awardInfo || awardInfo.length === 0) {
    return null;
  }
  return (
    <div className="mt-5 text-sm">
      {awardInfo?.length > 0 && (
        <>
          <p className="text-lg font-medium">Achievement / Award</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="flex flex-col gap-3">
        {awardInfo?.map((award) => (
          <div key={award.id}>
            <div className="flex w-full justify-between">
              <p className="text-sm">
                <span className="font-semibold">{award.award}</span>,{" "}
                {award.issuer}
              </p>
              <p className="text-xs italic">
                <span className="text-xs italic">
                  {formatDateByYearAndMonth(award.date || "")}
                </span>
              </p>
            </div>
            <div className="rich-text-editor flex justify-between">
              <p
                dangerouslySetInnerHTML={{ __html: award.description }}
                className="w-[15rem] text-xs md:w-[30rem]"
              ></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeAwardPreview;
