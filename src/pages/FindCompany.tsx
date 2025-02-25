import { useEffect, useState } from "react";
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
import { useLazyGetAllBusinessesQuery } from "../services/businessAccountApi";
import Loader from "../components/common/Loader";
import { Country, EmploymentType, LocationType } from "../enums/index.enums";
import MultiSelect from "../components/common/MultiSelect";

function FindCompany() {
  const [isOpen, setIsOpen] = useState(false);
  const [fetchCompanies, { isLoading }] = useLazyGetAllBusinessesQuery({});
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.keys(Country);
  const employmentTypeValues = Object.keys(EmploymentType);

  const [search, setSearch] = useState("");
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<
    string[]
  >([]);
  const [locationType, setLocationType] = useState("");
  const [location, setLocation] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [salary, setSalary] = useState(0);
  const [query, setQuery] = useState("");

  function handleFilters() {
    setQuery(search);
    // fetchCompanies({ locationType, employmentType, salary });
  }

  function handleReset() {
    setLocation("");
    setLocationType("");
    setSelectedEmploymentTypes([]);
    setIndustryType("");
  }

  useEffect(() => {
    fetchCompanies({});
  }, [fetchCompanies]);

  if (isLoading) return <Loader />;
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
              {/*data?.businesses.length === 0 ? (
                <p>No companies found 😐</p>
              ) : (
                data?.map((business: any) => (
                  <CompanyCard
                    key={business.id}
                    companyName={business.name}
                    // companyImage={business.logo}
                    numberOfReviews={business.reviewsRatingsQuantity}
                  />
                ))
              )*/}
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
          <Select isFilter={true} label="Location Type" id="locationType">
            <option value="" disabled>
              Select preferred type
            </option>
            {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
          <Select isFilter={true} label="Location" id="location">
            <option value="" disabled>
              Select country
            </option>
            {countryValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
          {/* <Select isFilter={true} label="Employment type" id="employmentType">
            <option value="" disabled>
              Select type
            </option>
            {employmentTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select> */}
          <MultiSelect
            label="Employment type"
            types={employmentTypeValues}
            selectedTypes={selectedEmploymentTypes}
            onSelect={setSelectedEmploymentTypes}
          />

          <Select isFilter={true} label="Industry type" id="industryType">
            <option value="" disabled>
              Select industy
            </option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
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
