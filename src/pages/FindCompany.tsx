import { useState } from "react";
import CompanyCard from "../components/common/CompanyCard";
import SearchBar from "../components/common/SearchBar";
import SidebarFilter from "../components/company profile/SidebarFilter";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import Button from "../components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

function FindCompany() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar />
      <SidebarFilter setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="w-full bg-background pb-10">
        {/* Heading and search bar */}
        <div className="mx-6 max-w-5xl px-7 py-10 md:mx-4">
          <h2 className="text-4xl text-gray-800 md:text-3xl">
            Find great place to work
          </h2>
          <p className="mt-2 text-gray-600">
            Get access to millions of companies
          </p>
          <div className="flex items-center gap-10 py-6">
            <SearchBar placeholder="Company name" buttonName="Find companies" />
            <Button
              className="hover:none flex items-center gap-2 bg-white px-5 text-lg text-main"
              onClick={() => setIsOpen((s) => !s)}
            >
              Filters
              <FontAwesomeIcon
                icon={faSliders}
                className="rounded-md bg-main p-3 text-xl text-white"
              />
            </Button>
          </div>
        </div>
        {/*End of heading and search bar */}

        {/* Popular companies */}
        <div className="mx-6 mt-5 px-7 md:mx-4">
          <h3 className="text-2xl text-gray-800 md:text-3xl">
            Popular companies
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/*في مشكلة في ال ريسبونسيف من 1000 ل 1200 تقريبا */}
            <CompanyCard
              companyName="Google"
              // companyImage="../assets/google-logo.svg"
              numberOfReviews={5}
            />
            <CompanyCard
              companyName="Google"
              // companyImage="../assets/google-logo.svg"
              numberOfReviews={45}
            />
            <CompanyCard
              companyName="Google"
              // companyImage="../assets/google-logo.svg"
              numberOfReviews={5}
            />
            <CompanyCard
              companyName="Google"
              // companyImage="../assets/google-logo.svg"
              numberOfReviews={5}
            />
            <CompanyCard
              companyName="Google"
              // companyImage="../assets/google-logo.svg"
              numberOfReviews={5}
            />
            <CompanyCard
              companyName="Google"
              // companyImage="../assets/google-logo.svg"
              numberOfReviews={5}
            />
            <CompanyCard
              companyName="Google"
              // companyImage="../assets/google-logo.svg"
              numberOfReviews={5}
            />
            <CompanyCard
              companyName="Google"
              // companyImage="../assets/google-logo.svg"
              numberOfReviews={5}
            />
          </div>
        </div>
        {/* End of popular companies */}
      </div>
      <Footer />
    </>
  );
}

export default FindCompany;
