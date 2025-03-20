import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumeLanguagePreview() {
  const { resumeInfo } = useResumeBuilder();
  const languageInfo = resumeInfo?.languages;

  return (
    <div className="mt-5 text-sm">
      {resumeInfo?.languages && (
        <>
          <p className="text-lg font-medium">Language</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="grid grid-cols-2 gap-5">
        {languageInfo?.map((lang) => (
          <div className="">
            <p className="text-sm">
              <span className="font-semibold">{lang.language}</span> -{" "}
              {lang.level}
            </p>
            <p
              className="rich-text-editor"
              dangerouslySetInnerHTML={{ __html: lang.additional_info }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeLanguagePreview;
