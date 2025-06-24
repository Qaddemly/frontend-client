import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { formatDateByYearAndMonth } from "../../../utils/helpers.ts";

function ResumeCustomPreview() {
  const { resumeInfo } = useResumeBuilder();
  const customInfo = resumeInfo?.custom;
  if (!customInfo || customInfo.length === 0) {
    return null;
  }
  return (
    <div className="mt-5 text-sm">
      <div className="flex flex-col gap-3">
        {customInfo?.map((custom) => (
          <div key={custom.id}>
            <>
              <p className="text-lg font-medium">{custom.section_name}</p>
              <hr className="mb-2 border-[1.5px]" />
            </>
            <div className="flex w-full justify-between">
              <p className="text-sm">
                <span className="font-semibold">{custom.title}</span>,{" "}
                {custom.subtitle}
              </p>
              <p className="text-xs italic">
                <span className="text-xs italic">
                  {formatDateByYearAndMonth(custom.start_date || "")} -{" "}
                  {formatDateByYearAndMonth(custom.end_date || "")}
                </span>
              </p>
            </div>
            <div className="rich-text-editor flex justify-between">
              <p
                dangerouslySetInnerHTML={{ __html: custom.description }}
                className="w-[15rem] break-words text-xs md:w-[30rem]"
              ></p>
              <p className="italic">
                {custom.city}, {custom.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeCustomPreview;
