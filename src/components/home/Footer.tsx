import Logo from "../common/Logo";

function Footer() {
  return (
    <footer className="">
      <div className="flex items-center gap-36 bg-main-dark px-10 py-20 text-gray-100">
        <div className="flex flex-col gap-10">
          <Logo textColor="text-light-secondary-300" />
          <div className="text-gray-500">
            <p>
              Cal now:{" "}
              <span className="text-light-secondary-300">(319) 555-0115</span>
            </p>
            <p>
              6391 Elgin St. Celina, Delaware 10299,
              <br /> New York, United States of America
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-gray-500">
          <p className="text-light-secondary-300">Quick Link</p>
          <a href="">About</a>
          <a href="">Blog</a>
        </div>

        <div className="flex flex-col gap-5 text-gray-500">
          <p className="text-light-secondary-300">Employers</p>
          <a href="">Post Job</a>
          <a href="">Applications</a>
        </div>
      </div>
      <div className="border-t border-t-gray-800 bg-main-dark py-5 text-sm text-gray-500">
        <p className="pl-20">&copy; 2025 Qaddemly, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
