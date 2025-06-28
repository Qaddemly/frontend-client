import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../common/Logo";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-main-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo and Contact Info */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-6">
              <Logo textColor="text-light-secondary-300" />
              <div className="space-y-2 text-gray-500">
                <p>
                  Call now:{" "}
                  <span className="text-light-secondary-300">
                    +20 123 456 789
                  </span>
                </p>
                <p>
                  Tanta University, Faculty of Engineering,
                  <br />
                  El-Geish Street, Tanta, Gharbia Governorate, Egypt
                </p>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-light-secondary-300">
              Quick Link
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/findJob"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Find Job
                </Link>
              </li>
              <li>
                <Link
                  to="/findCompany"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Find Company
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-light-secondary-300">
              Candidates
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link
                  to="/findJob"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/findCompany"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Browse Employers
                </Link>
              </li>
              <li>
                <Link
                  to="/userProfile"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/userSettings/saved-jobs"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Saved jobs
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-light-secondary-300">
              Employers
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link
                  to="/businessDashboard/companyJobs/:companyId/active/postJobEasyApply"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Post Job
                </Link>
              </li>
              <li>
                <Link
                  to="/businessDashboard/companyCandidates/:companyId"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link
                  to="/businessDashboard"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Employers Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/businessDashboard/companyJobs/:companyId/active"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Applications
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-light-secondary-300">
              Support
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-light-secondary-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex items-center justify-evenly border-t border-gray-800 py-6 text-gray-500">
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} Qaddemly, All Rights Reserved
          </p>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faFacebook} className="text-md" />
            <FontAwesomeIcon icon={faInstagram} className="text-md" />
            <FontAwesomeIcon icon={faXTwitter} className="text-md" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
