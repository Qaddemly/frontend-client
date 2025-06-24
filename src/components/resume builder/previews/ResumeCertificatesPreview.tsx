import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function ResumeCertificatesPreview() {
  const { resumeInfo } = useResumeBuilder();
  const certificatesInfo = resumeInfo?.certificates;
  if (!certificatesInfo || certificatesInfo.length === 0) {
    return null;
  }
  return (
    <div className="mt-5">
      {certificatesInfo?.length > 0 && (
        <>
          <p className="text-lg font-medium">Certificates</p>
          <hr className="mb-2 border-[1.5px]" />
        </>
      )}
      <div className="grid grid-cols-3">
        {certificatesInfo?.map((certificate) => (
          <div key={certificate.id}>
            <div className="flex w-full flex-col justify-between">
              <a
                href={certificate.certificate_url}
                target="_blank"
                className="space-x-2"
              >
                <span className="font-semibold">{certificate.certificate}</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
              <p
                dangerouslySetInnerHTML={{
                  __html: certificate.additional_information ?? "",
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

export default ResumeCertificatesPreview;
