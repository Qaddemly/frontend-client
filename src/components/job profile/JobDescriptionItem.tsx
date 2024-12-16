import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

type JobDescriptionItemProps = {
  title: string;
  content: string | ReactNode;
};

function JobDescriptionItem({ title, content }: JobDescriptionItemProps) {
  return (
    <div className="mb-4 text-center md:text-left">
      <h3 className="mb-2 text-3xl font-medium">{title}</h3>
      <p className="pb-5 pl-1 text-xl text-gray-700">
        {title === "Location" ? (
          <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
        ) : (
          ""
        )}
        {content}
      </p>
      <hr className="border-gray-200 pb-2" />
    </div>
  );
}

export default JobDescriptionItem;
