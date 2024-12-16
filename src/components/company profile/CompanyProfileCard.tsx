type CompanyProfileCardProps = {
  title: string;
  description: string | undefined;
};

function CompanyProfileCard({ title, description }: CompanyProfileCardProps) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
      <h3
        className={`text-left text-lg font-medium text-gray-700 ${description?.includes("Over") ? "font-normal" : ""}`}
        // (Over,More than)  ينفع اخلي الستايل علي الكلمة اللي عايزها بس؟
      >
        {description}
      </h3>
      <p className="text-left text-sm text-gray-400">{title}</p>
    </div>
  );
}

export default CompanyProfileCard;
