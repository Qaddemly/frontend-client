import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { formatDateByYearAndMonth } from "../../../utils/helpers.ts";

function ResumeProjectsPreview() {
  const { resumeInfo } = useResumeBuilder();
  const ProjectsInfo = resumeInfo?.projects;
  if (!ProjectsInfo || ProjectsInfo.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 text-sm">
      {ProjectsInfo?.length > 0 && (
        <>
          <p className="text-lg font-medium">Projects</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="flex flex-col gap-3">
        {ProjectsInfo?.map((project) => (
          <div key={project.id}>
            <div className="flex w-full justify-between">
              <p className="text-sm">
                <span className="font-semibold">{project.title}</span>,{" "}
                {project.subtitle}
              </p>
              <p className="text-xs italic">
                <span className="text-xs italic">
                  {formatDateByYearAndMonth(project.start_date || "")} -{" "}
                  {formatDateByYearAndMonth(project.end_date || "")}
                </span>
              </p>
            </div>
            <div className="rich-text-editor w-full break-words">
              <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeProjectsPreview;
