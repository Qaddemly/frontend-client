import Button from "../../common/Button";

export default function PostJobExternalLink({
  externalLink,
  setExternalLink,
  onSubmit,
  onBack,
}: {
  externalLink: string;
  setExternalLink: (link: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto mt-10 w-1/2 space-y-3 text-center">
      <input
        className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
        placeholder="Enter your external link"
        value={externalLink}
        onChange={(e) => setExternalLink(e.target.value)}
      />
      <div className="flex gap-4">
        <Button type="button" className="w-full" onClick={onBack}>
          Back
        </Button>
        <Button type="button" className="w-full" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
