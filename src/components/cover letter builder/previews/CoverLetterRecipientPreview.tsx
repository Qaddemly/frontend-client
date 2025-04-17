import { useCoverLetter } from "../../../context/CoverLetterContext.tsx";

function CoverLetterRecipientPreview() {
  const { coverLetterInfo } = useCoverLetter();
  const personalInfo = coverLetterInfo?.personal;
  return (
    <div className="mb-20">
      <p className="text-lg font-bold">{personalInfo?.nameOfRecipient}</p>
      <p className="text-sm font-medium">{personalInfo?.companyName}</p>
      <p className="text-sm font-medium">{personalInfo?.recipientAddress}</p>
    </div>
  );
}

export default CoverLetterRecipientPreview;
