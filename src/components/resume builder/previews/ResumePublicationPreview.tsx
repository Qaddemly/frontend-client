import { formatDateByYearAndMonth } from "../../../utils/helpers.ts";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumePublicationPreview() {
  const { resumeInfo } = useResumeBuilder();
  const publicationInfo = resumeInfo?.publications;
  if (!publicationInfo || publicationInfo.length === 0) {
    return null;
  }
  return (
    <div className="mt-5 text-sm">
      {publicationInfo?.length > 0 && (
        <>
          <p className="text-lg font-medium">Publication</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="flex flex-col gap-3">
        {publicationInfo?.map((publication) => (
          <div key={publication.id}>
            <div className="flex w-full justify-between">
              <p className="text-sm">
                <span className="font-semibold">{publication.title}</span>,{" "}
                {publication.publisher}
              </p>
              <p className="text-xs italic">
                <span className="text-xs italic">
                  {formatDateByYearAndMonth(publication.date || "")}
                </span>
              </p>
            </div>
            <div className="rich-text-editor flex justify-between">
              <p
                dangerouslySetInnerHTML={{ __html: publication.description }}
                className="w-[15rem] text-xs md:w-[30rem]"
              ></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumePublicationPreview;
