import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/common/Button";
import SearchBar from "../components/common/SearchBar";
import Select from "../components/common/Select";
import Slider from "../components/common/Slider";
import SidebarFilter from "../components/company profile/SidebarFilter";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import JobCard from "../components/common/JobCard";
import { Country, EmploymentType, LocationType } from "../enums/index.enums";
import { useLazyGetAllJobsQuery } from "../services/jobApi";
import Loader from "../components/common/Loader";
import MultiSelect from "../components/common/MultiSelect";
import Pagination from "../components/common/Pagination";

function FindJob() {
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.keys(Country);
  const employmentTypeValues = Object.keys(EmploymentType);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [locationType, setLocationType] = useState("");
  const [location, setLocation] = useState("");
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<
    string[]
  >([]);
  // const [industryType, setIndustryType] = useState("");
  const [salary, setSalary] = useState(0);

  const [fetchJobs, { data, isLoading }] = useLazyGetAllJobsQuery();
  const meta = data?.jobs.meta;
  const [currentPage, setCurrentPage] = useState(meta?.currentPage);

  function handleFilters() {
    fetchJobs({
      page: 1,
      limit: 9,
      locationType,
      employmentType: selectedEmploymentTypes,
      salary,
    });
  }

  function handleReset() {
    setLocation("");
    setLocationType("");
    setSelectedEmploymentTypes([]);
    setSalary(0);
  }

  useEffect(() => {
    fetchJobs({
      page: 1,
      limit: 9,
      locationType,
      employmentType: selectedEmploymentTypes,
      salary,
    });
  }, [fetchJobs]);

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
              Find your dream job
            </h2>
            <p className="mt-2 text-gray-600">Get access to millions of jobs</p>
            <div className="flex items-center gap-1 py-6 sm:gap-3 md:gap-5">
              <SearchBar
                placeholder="Find your job"
                buttonName="Find jobs"
                search={search}
                setSearch={setSearch}
                onClick={() => {
                  fetchJobs({ page: 1, limit: 9, search });
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

          {/* Popular jobs */}
          <div className="md:mx-4">
            <div
              className={`mt-8 grid grid-cols-1 place-items-center gap-6 ${isOpen ? "lg:grid-cols-2 lg:place-items-stretch xl:grid-cols-3 2xl:grid-cols-4" : "sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-3 2xl:grid-cols-4"}`}
            >
              {data?.jobs.data.length === 0 && (
                <p className="italic text-gray-300">No jobs founded</p>
              )}
              {data?.jobs?.data.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
          <Pagination
            currentPage={currentPage || 1}
            totalPages={meta?.totalPages || 1}
            onPageChange={(page) => {
              fetchJobs({
                page,
                limit: 9,
                search,
                locationType,
                employmentType: selectedEmploymentTypes,
                salary,
              });
              setCurrentPage(page);
            }}
          />
          {/* End of popular jobs */}
        </div>

        {/* Sidebar filter */}
        <SidebarFilter
          handleResetAll={handleReset}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          title="Job filter"
        >
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            isFilter={true}
            label="Location"
            defaultValue=""
            id="location"
          >
            <option value="" disabled>
              Select a location
            </option>
            {countryValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
          <Select
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            isFilter={true}
            label="Location Type"
            id="locationType"
            defaultValue=""
          >
            <option value="" disabled>
              Select a location type
            </option>
            {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>

          <MultiSelect
            label="Employment type"
            types={employmentTypeValues}
            selectedTypes={selectedEmploymentTypes}
            onSelect={setSelectedEmploymentTypes}
          />
          {/* <Select isFilter={true} label="Industry type" id="industryType">
            {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
              ))}
            <option value="">Select industy</option>
          </Select> */}
          <Slider
            value={salary}
            setValue={setSalary}
            label="Salary Greater than"
            min={0}
            max={10000}
          />

          {/* complete the filter with backend */}
          <Button onClick={handleFilters} className="my-5">
            Filter Jobs
          </Button>
        </SidebarFilter>
      </div>
      <Footer />
    </>
  );
}

export default FindJob;
