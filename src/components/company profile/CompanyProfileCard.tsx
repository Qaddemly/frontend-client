type CompanyProfileCardProps = {
  title: string;
  description: string | undefined;
};

function CompanyProfileCard({ title, description }: CompanyProfileCardProps) {
  return (
    <div className="flex h-[7rem] flex-col items-center rounded-lg bg-white p-4 shadow-md">
      <h3
        className={`whitespace-normal break-words text-left text-lg font-medium text-gray-700 ${description?.includes("Over") ? "font-normal" : ""}`}
      >
        {title === "Website" ? (
          <p className="">
            <a href={description}>{description}</a>
          </p>
        ) : (
          description
        )}
      </h3>
      <p className="mt-5 text-left text-sm text-gray-400">{title}</p>
    </div>
  );
}

export default CompanyProfileCard;
