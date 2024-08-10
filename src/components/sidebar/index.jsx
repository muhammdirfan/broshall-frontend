/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import routes from "routes.js";
import { Link } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[20px] flex items-center`}>
        <Link to="/admin/default">
          <div className="ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            Broshall
          </div>
        </Link>
      </div>
      <div class="mt-[48px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto">
        <Links routes={routes} onClose={onClose} />
      </ul>

      <p className="w-full px-3 text-center text-[15px]">
        {" "}
        ©2023 All rights reserved by Broshall Pvt. <br /> Ltd. Proudly managed
        by techpri.me
      </p>
      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;