import CompanyCard from "../components/common/CompanyCard";
import SearchBar from "../components/common/SearchBar";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";

function FindCompany() {
  return (
    <>
      <Navbar />
      <div className="w-full bg-background pb-10">
        {/* Heading and search bar */}
        <div className="mx-6 max-w-5xl px-7 py-10 md:mx-4">
          <h2 className="text-4xl text-gray-800 md:text-3xl">
            Find great place to work
          </h2>
          <p className="mt-2 text-gray-600">
            Get access to millions of companies
          </p>
          <div className="w-full items-center py-6">
            <SearchBar placeholder="Company name" buttonName="Find companies" />
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
