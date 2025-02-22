import { useState } from "react";
import CompanyCard from "../components/common/CompanyCard";
import SearchBar from "../components/common/SearchBar";
import SidebarFilter from "../components/company profile/SidebarFilter";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import Button from "../components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Select from "../components/common/Select";
import Slider from "../components/common/Slider";

function FindCompany() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-full bg-background pb-10">
          {/* Heading and search bar */}
          <div className="max-w-5xl p-20 md:mx-4">
            <h2 className="text-4xl font-semibold text-gray-800 md:text-3xl">
              Find great place to work
            </h2>
            <p className="mt-2 text-gray-600">
              Get access to millions of companies
            </p>
            <div className="flex items-center gap-5 py-6">
              <SearchBar
                placeholder="Company name"
                buttonName="Find companies"
              />
              {!isOpen && (
                <Button
                  className="flex items-center gap-2 border border-gray-100 bg-white p-2 text-lg text-main hover:bg-main hover:text-white"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSliders}
                    className="rounded-md bg-main p-3 text-xl text-white hover:bg-background hover:text-main"
                  />
                </Button>
              )}
            </div>
          </div>
          {/*End of heading and search bar */}

          {/* Popular companies */}
          <div className="px-20 md:mx-4">
            <h3 className="text-2xl text-gray-800 md:text-3xl">
              Popular companies
            </h3>
            <div
              className={`mt-8 grid gap-6 ${isOpen ? "grid-cols-1 sm:grid-cols-2" : "sm:grid-cols-3"}`}
            >
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
              <CompanyCard
                companyName="Google"
                // companyImage="../assets/google-logo.svg"
                numberOfReviews={5}
              />
            </div>
          </div>
          {/* End of popular companies */}
        </div>

        {/* Sidebar filter */}
        <SidebarFilter
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          title="Company filter"
        >
          <Select isFilter={true} label="Industry type" id="industryType">
            {/* {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))} */}
            <option value="">Select industy</option>
          </Select>
          <Slider label="Rating" min={0} max={10} />
          <Button className="my-5">Filter Companies</Button>
        </SidebarFilter>
      </div>
      <Footer />
    </>
  );
}

export default FindCompany;
