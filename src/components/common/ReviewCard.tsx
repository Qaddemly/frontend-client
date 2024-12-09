import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

type ReviewCardProps = {
  userName: string;
  date: string;
  text: string;
  index: number;
};

function ReviewCard({ userName, date, text, index }: ReviewCardProps) {
  return (
    <div
      key={index}
      className="flex w-[450px] flex-col gap-3 rounded-3xl bg-white p-12 shadow-md sm:w-[500px] md:w-[650px] lg:w-[800px]"
    >
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <FontAwesomeIcon
            icon={faGoogle}
            className="text-[50px] text-main md:text-[70px]"
          />
          {/* <img
              src={imgURL}
              alt={userName}
              className="h-10 w-10 rounded-full"
            /> */}
          <h3 className="text-lg font-medium">{userName}</h3>
        </div>
        <div className="text-2xl text-gray-800">
          <span>
            <FontAwesomeIcon icon={faStarFilled} />
            <FontAwesomeIcon icon={faStarFilled} />
            <FontAwesomeIcon icon={faStarFilled} />
            <FontAwesomeIcon icon={faStarFilled} />
            <FontAwesomeIcon icon={faStar} />
          </span>
        </div>
      </div>
      <div>
        <p className="text-lg font-bold text-gray-800">{text}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
