import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "./GoogleLogo";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

type CompanyCardProps = {
  companyName: string;
  companyImage: string;
  numberOfReviews: number;

  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function CompanyCard({
  companyName,
  companyImage,
  numberOfReviews,
  onClick,
}: CompanyCardProps) {
  return (
    <div
      className="m-2 h-[135px] w-[20rem] cursor-pointer rounded-lg border-none bg-white p-4 hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <div className="w-fit rounded-md bg-[#eee] p-2">
            {!companyImage ? (
              <GoogleLogo />
            ) : (
              <img
                src={companyImage}
                alt={companyName}
                className="h-8 w-8 rounded-lg object-cover"
              />
            )}
          </div>
          <div className="felx flex-col">
            <p className="font-medium">{companyName}</p>
            <div className="flex items-center gap-2 text-gray-300">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  className="text-main"
                  key={i}
                  icon={i < Number(numberOfReviews) ? faStarFilled : faStar}
                />
              ))}
              <p className="text-light-main">
                {numberOfReviews} {numberOfReviews <= 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>
        {/* <FontAwesomeIcon icon={faBookmark} className="text-2xl text-gray-300" /> */}
      </div>

      <div className="mt-2 flex">
        <button
          className="mr-2 rounded px-2 py-1 text-gray-600 hover:text-gray-800"
          // onClick={}
        >
          Message
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
