import Button from "../../common/Button";

export default function PostJobExternalLink() {
  return (
    <>
      <div className="mx-auto mt-10 w-1/2 space-y-3 text-center">
        <input
          className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
          placeholder="Enter your external link"
        />
        {/* TODO: handle submit with external link */}
        <Button className="w-full">Submit</Button>
      </div>
    </>
  );
}
