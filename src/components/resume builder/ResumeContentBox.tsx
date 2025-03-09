import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useResumeBuilder } from "../../context/ResumeBuilderContext.tsx";

type ResumeConentBoxProps = {
  icon: IconDefinition;
  title: string;
  description: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};
function ResumeContentBox({
  icon,
  title,
  description,
  onClick,
}: ResumeConentBoxProps) {
  const { setShowAddContent } = useResumeBuilder();
  return (
    <div
      onClick={(e) => {
        setShowAddContent(false);
        onClick(e);
      }}
      className="w-[20rem] cursor-pointer rounded-lg bg-background p-5"
    >
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={icon} className="text-lg" />
        <p className="font-medium">{title}</p>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default ResumeContentBox;
