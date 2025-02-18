import Logo from "../common/Logo";

function Footer() {
  return (
    <footer className="w-full overflow-x-hidden bg-main-dark text-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <Logo textColor="text-light-secondary-300" />
            <div className="text-gray-500">
              <p>
                Call now:{" "}
                <span className="text-light-secondary-300">(319) 555-0115</span>
              </p>
              <p>
                6391 Elgin St. Celina, Delaware 10299,
                <br /> New York, United States of America
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 text-center md:flex md:gap-20 md:text-left">
          <div className="flex flex-col gap-3 text-gray-400">
            <p className="font-semibold text-light-secondary-300">
              Quick Links
            </p>
            <a href="" className="hover:text-white">
              About
            </a>
            <a href="" className="hover:text-white">
              Blog
            </a>
          </div>

          <div className="flex flex-col gap-3 text-gray-400">
            <p className="font-semibold text-light-secondary-300">Employers</p>
            <a href="#" className="hover:text-white">
              Post Job
            </a>
            <a href="#" className="hover:text-white">
              Applications
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-t-gray-800 bg-main-dark py-5 text-sm text-gray-500">
        <p className="pl-20">&copy; 2025 Qaddemly, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
