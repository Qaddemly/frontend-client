import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "./GoogleLogo";
import {
  faBookmark,
  faStar as faStarFilled,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

type CompanyCardProps = {
  companyName: string;
  // companyImage: string;
  numberOfReviews: number;
};

function CompanyCard({
  companyName,
  // companyImage,
  numberOfReviews,
}: CompanyCardProps) {
  return (
    <div className="m-2 h-[135px] w-96 rounded-lg border-none bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <div className="w-fit rounded-md bg-[#eee] p-2">
            <GoogleLogo />
            {/* <img src={companyImage} alt={companyName} /> */}
            {/* المفروض نظبط الصورة اللي هتتحط مع الباك */}
          </div>
          <div className="felx flex-col">
            <p className="font-medium">{companyName}</p>
            <div className="flex items-center gap-2 text-gray-300">
              {/* المفروض يتحط مكانهم النجوم*/}
              <FontAwesomeIcon icon={faStarFilled} />
              <FontAwesomeIcon icon={faStarFilled} />
              <FontAwesomeIcon icon={faStarFilled} />
              <FontAwesomeIcon icon={faStarHalfStroke} />
              <FontAwesomeIcon icon={faStar} />
              <p className="text-light-main">
                {numberOfReviews} {numberOfReviews <= 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>
        <FontAwesomeIcon icon={faBookmark} className="text-2xl text-gray-300" />
      </div>

      <div className="mt-2 flex">
        <button
          className="mr-2 rounded px-2 py-1 text-gray-600 hover:text-gray-800"
          // onClick={}
        >
          Salaries
        </button>
        <button
          className="mr-2 rounded px-2 py-1 text-gray-600 hover:text-gray-800"
          // onClick={}
        >
          Open Jobs
        </button>
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
