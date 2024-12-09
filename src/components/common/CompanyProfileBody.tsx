import CompanyCard from "./CompanyCard";
import CompanyProfileCard from "./CompanyProfileCard";

function CompanyProfileBody() {
  return (
    <>
      {/* About Us section  */}
      <div className="mx-auto max-w-[1000px] px-6 py-12 md:px-12">
        {/* Section Title */}
        <h2
          id="about-the-company"
          className="mb-8 text-center text-2xl font-semibold text-gray-800 md:text-3xl"
        >
          About the company
        </h2>
        {/* Cards Section */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          <CompanyProfileCard title="CEO" description="Sundar Pichai" />
          <CompanyProfileCard title="Founded" description="1998" />
          <CompanyProfileCard title="Revenue" description="Over $280B" />
          <CompanyProfileCard
            title="Company Size"
            description="More than 190,000"
          />
          <CompanyProfileCard
            title="Founder"
            description="Larry Page & Sergey Brin"
          />
          <CompanyProfileCard title="Website" description="Google " />
          <CompanyProfileCard
            title="Headquarters"
            description="Mountain View, CA"
          />
          <CompanyProfileCard title="Industry" description="Technology" />
        </div>
        {/* Description Section */}
        <div className="text-left text-gray-500">
          <p className="mb-4 text-sm leading-relaxed md:text-base">
            There's work, and then there's your life's work. The kind of work
            that gets you up in the morning. Work that's not just a job, but a
            calling. At Google you can find that calling and live your purpose
            every day. With our scale and reach, your personal impact becomes
            part of a collective force for global progress. Because impact
            matters.
            {/* Should come from Back-end */}
          </p>
          <a href="#" className="text-main hover:underline">
            Learn more
          </a>
        </div>
      </div>

      {/* Valid jobs section  */}
      <div className="mx-auto max-w-[1000px] px-6 py-12 md:px-12">
        {/* Section Title */}
        <h2
          id="valid-jobs-in-company"
          className="mb-8 text-center text-2xl font-semibold text-gray-800 md:text-3xl"
        >
          Valid jobs
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <CompanyCard
            companyName="Google"
            // companyImage="../assets/google-logo.svg"
            numberOfReviews={5}
          />
        </div>
      </div>
    </>
  );
}

export default CompanyProfileBody;
