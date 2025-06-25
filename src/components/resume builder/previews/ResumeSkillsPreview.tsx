import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";

function ResumeSkillsPreview() {
  const { resumeInfo } = useResumeBuilder();
  const skillInfo = resumeInfo?.skills;
  if (!skillInfo || skillInfo.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 text-sm">
      {resumeInfo?.skills?.length > 0 && (
        <>
          <p className="text-lg font-medium">Skills</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="grid grid-cols-2 gap-5">
        {skillInfo?.map((skill) => (
          <div key={skill.id}>
            <p className="text-sm">
              <span className="font-semibold">{skill.name}</span> -{" "}
              {skill.level}
            </p>
            <p
              className="rich-text-editor"
              dangerouslySetInnerHTML={{ __html: skill.information }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeSkillsPreview;
