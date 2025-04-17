import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { formatDateByYearAndMonth } from "../../../utils/helpers.ts";

function ResumeOrganizationPreview() {
  const { resumeInfo } = useResumeBuilder();
  const organizationInfo = resumeInfo?.volunteering;
  return (
    <div className="mt-5">
      {organizationInfo?.length > 0 && (
        <>
          <p className="text-lg font-medium">Organization</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="grid grid-cols-3">
        {organizationInfo?.map((org) => (
          <div key={org.id}>
            <div className="flex w-full flex-col justify-between">
              <a href={org.position} target="_blank" className="space-x-2">
                <span className="font-semibold">{org.organization}</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
              <p className="text-xs italic">
                <span className="text-xs italic">
                  {formatDateByYearAndMonth(org.start_date || "")} -{" "}
                  {formatDateByYearAndMonth(org.end_date || "")}
                </span>
                <p className="italic">
                  {org.city}, {org.country}
                </p>
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: org.description ?? "",
                }}
                className="rich-text-editor text-xs"
              ></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeOrganizationPreview;
