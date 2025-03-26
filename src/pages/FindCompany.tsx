import { useEffect, useState } from "react";
import SearchBar from "../components/common/SearchBar";
import SidebarFilter from "../components/company profile/SidebarFilter";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import Button from "../components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Select from "../components/common/Select";
import Slider from "../components/common/Slider";
import { useLazyGetAllBusinessesQuery } from "../services/businessAccountApi";
import Loader from "../components/common/Loader";
import { Country, LocationType } from "../enums/index.enums";
import { useNavigate } from "react-router-dom";
import CompanyCard from "../components/common/CompanyCard";

function FindCompany() {
  const [isOpen, setIsOpen] = useState(false);
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.keys(Country);

  const [search, setSearch] = useState("");
  const [locationType, setLocationType] = useState("");
  const [location, setLocation] = useState("");

  const [industryType, setIndustryType] = useState("");
  const [rating, setRating] = useState(0);

  const [getAllBusinesses, { data, isLoading }] = useLazyGetAllBusinessesQuery(
    {},
  );

  const { businesses } = data || {};

  const navigate = useNavigate();
  function handleFilters() {
    getAllBusinesses({
      search,
      locationType,
      Country: location,
      Industry: industryType,
      AverageRating: rating,
    });
  }

  function handleReset() {
    setLocation("");
    setLocationType("");
    setIndustryType("");
  }

  useEffect(() => {
    getAllBusinesses({});
  }, [getAllBusinesses]);

  if (isLoading) return <Loader />;
  return (
    <>
      <Navbar />
      <div className="flex flex-col-reverse sm:flex-row">
        <div
          className={`min-h-screen w-full bg-background px-2 pb-10 text-center sm:px-5 lg:px-10 ${isOpen ? "lg:text-left" : "md:text-left"}`}
        >
          {/* Heading and search bar */}
          <div className="max-w-5xl py-10 pt-20 md:mx-4">
            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
              Find great place to work
            </h2>
            <p className="mt-2 text-gray-600">
              Get access to millions of companies
            </p>
            <div className="flex items-center gap-1 py-6 sm:gap-3 md:gap-5">
              <SearchBar
                placeholder="Company name"
                buttonName="Search"
                search={search}
                setSearch={setSearch}
                onClick={() => {
                  setSearch(search);
                  getAllBusinesses({ search });
                }}
              />
              {!isOpen && (
                <Button
                  className="flex items-center gap-2 border border-gray-100 bg-white p-1 text-lg text-main hover:bg-main hover:text-white md:p-2"
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
          <div className="md:mx-4">
            <h3 className="text-2xl font-medium text-gray-800 md:text-3xl">
              Popular companies
            </h3>
            <div
              className={`mt-8 grid grid-cols-1 place-items-center gap-6 ${isOpen ? "lg:grid-cols-2 lg:place-items-stretch xl:grid-cols-3 2xl:grid-cols-4" : "sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-3 2xl:grid-cols-4"}`}
            >
              {businesses?.data?.length === 0 ? (
                <p className="text-center text-2xl italic text-gray-300 md:text-3xl">
                  No companies found 😐
                </p>
              ) : (
                businesses?.data?.map((business) => (
                  <CompanyCard
                    key={business.id}
                    companyName={business.name}
                    companyImage={business.logo}
                    numberOfReviews={business.reviewsRatingsQuantity}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/companyprofile/${business.id}`);
                    }}
                  />
                ))
              )}
            </div>
          </div>
          {/* End of popular companies */}
        </div>

        {/* Sidebar filter */}
        <SidebarFilter
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          title="Company filter"
          handleResetAll={handleReset}
        >
          <Select
            isFilter={true}
            label="Location Type"
            id="locationType"
            onChange={(e) => setLocationType(e.target.value)}
            value={locationType}
          >
            <option value="">Select preferred type</option>
            {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
          <Select
            isFilter={true}
            label="Location"
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            <option value="">Select country</option>
            {countryValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
          <Select
            isFilter={true}
            label="Industry type"
            id="industryType"
            value={industryType}
            onChange={(e) => setIndustryType(e.target.value)}
          >
            <option value="">Select industy</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </Select>
          <Slider
            label="Rating"
            min={0}
            max={10}
            value={rating}
            setValue={setRating}
          />
          <Button
            className="my-5"
            onClick={() => {
              handleFilters();
              setIsOpen(false);
            }}
          >
            Filter Companies
          </Button>
        </SidebarFilter>
      </div>
      <Footer />
    </>
  );
}

export default FindCompany;
