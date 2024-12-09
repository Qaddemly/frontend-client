// import Button from "./Button";
// import GoogleLogo from "./GoogleLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarFilled,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";

type profileProps = { name: string; rating: number; numberOfReviews: number };

function Profile({ name, rating, numberOfReviews }: profileProps) {
  // المفروض ازود الصورة في ال props
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-between bg-light-secondary">
      {/* Log, Info and Actions */}
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-evenly p-6 md:flex-row md:p-12">
        {/* Logo and Info Section */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
          <div className="h-20 w-20 md:h-40 md:w-40">
            {/* rounded-full bg-background */}
            <FontAwesomeIcon
              icon={faGoogle}
              className="text-[80px] text-main md:text-[160px]"
            />
            {/* <GoogleLogo/> */}
            {/* <img
            src="/path/to/logo.png" 
            alt="Company Logo"
            className="h-full w-full rounded-full object-cover"
          /> */}
          </div>

          <div className="text-center md:text-left">
            {/* need to align center in the y axis */}
            <h1 className="text-xl font-semibold text-gray-800 md:text-2xl">
              {name} {/* Google Inc. */}
            </h1>
            <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
              <span className="text-lg font-medium">{rating}</span>
              <span>
                <FontAwesomeIcon icon={faStarFilled} />
                <FontAwesomeIcon icon={faStarFilled} />
                <FontAwesomeIcon icon={faStarFilled} />
                <FontAwesomeIcon icon={faStarHalfStroke} />
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="text-gray-600">
                {numberOfReviews} {numberOfReviews <= 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>
        </div>
        {/* Actions Section */}
        {/* <Button children="Follow"/> */}
        {/* better use the Button component !? */}
        <div className="mt-6 flex items-center gap-4 md:mt-0">
          <button className="rounded-md bg-main px-4 py-2 text-white transition">
            Follow
          </button>
          <button className="rounded-md bg-main px-4 py-2 text-white transition">
            Message
          </button>
        </div>
      </div>
      {/* Navigation Section */}
      <div className="bor mb-0 flex w-full justify-center text-sm text-gray-600">
        <ul className="flex gap-10 border-b border-gray-600 sm:gap-20 md:gap-36">
          <li
            // href="#about-the-company" //في حاجة غلط مش عارفها
            className="cursor-pointer pb-2 hover:text-gray-800"
          >
            About Us
          </li>
          <li className="cursor-pointer pb-2 hover:text-gray-800">Jobs</li>
          <li className="cursor-pointer pb-2 hover:text-gray-800">Reviews</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
