import { IRecipientDetails } from "../../../interfaces/CoverLetter.interfaces.ts";
import Button from "../../common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useCoverLetter } from "../../../context/CoverLetterContext.tsx";

function CoverLetterRecipientSection({
  recipientDetails,
}: {
  recipientDetails: IRecipientDetails;
}) {
  const { setStatus } = useCoverLetter();
  console.log(recipientDetails);
  return (
    <div className="flex flex-col items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
      <div className="flex w-full items-center justify-between pb-3">
        <p className="text-xl font-semibold">Recipient Details</p>
      </div>

      <div className="flex w-full items-center justify-between break-words border-t border-gray-200 py-3">
        {recipientDetails?.nameOfRecipient?.length ? (
          <div className="flex flex-col">
            <p className="w-[14rem] break-words text-lg font-medium text-gray-300">
              {recipientDetails?.nameOfRecipient}
            </p>
            <p className="w-[14rem] break-words text-lg font-medium text-gray-300">
              {recipientDetails?.companyName}
            </p>
            <p className="w-[14rem] break-words text-lg font-medium text-gray-300">
              {recipientDetails?.address}
            </p>
          </div>
        ) : (
          <p className="italic text-gray-400">Add details</p>
        )}

        <Button
          onClick={() => {
            if (recipientDetails?.nameOfRecipient?.length)
              setStatus(() => ["edit", "recipientDetails"]);
            else setStatus(() => ["add", "recipientDetails"]);
          }}
          className="flex items-center gap-2 bg-white text-gray-300 hover:bg-white"
        >
          <span>
            {recipientDetails?.nameOfRecipient?.length ? "Edit" : "Add"}
          </span>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="cursor-pointer text-xl text-gray-400"
          />
        </Button>
      </div>
    </div>
  );
}

export default CoverLetterRecipientSection;
