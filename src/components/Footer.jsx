import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../public/images/logo.png";
import { aboutCompany, contact, locations } from "../utils/constants";
import { locationObject } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="bg-[#02060c] text-white ">
      <div className="max-w-[1200px] mx-auto p-10">
        <div className="grid grid-cols-4">
          <ul className="flex flex-col ">
            <li className="flex items-center">
              <Link to="/">
                <img src={Logo} alt="logo" className="w-6 inline mr-3" />
              </Link>
              <span className="font-semibold text-2xl">Swiggato</span>
            </li>
            <li className="text-gray-400 my-2">
              &copy; 2024 PS Technologies <br /> Pvt. Ltd
            </li>
          </ul>
          <ul className="flex flex-col">
            <li className="font-semibold text-xl mb-1">Company</li>
            {aboutCompany.map((item, ind) => (
              <li
                key={ind}
                className="text-gray-400 hover:text-white cursor-pointer my-1"
              >
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col">
            <li className="font-semibold text-xl mb-1">Contact Us</li>
            {contact.map((item, ind) => (
              <li
                key={ind}
                className="text-gray-400 hover:text-white cursor-pointer my-1"
              >
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col ">
            <li className="font-semibold text-xl">We Deliver to:</li>

            {locationObject.map((loc, ind) => (
              <li
                key={ind}
                className="text-gray-400 hover:text-white cursor-pointer my-1"
              >
                {loc.city}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center p-5">
        Made with ❤️ by Pranay
      </div>
    </footer>
  );
};

export default Footer;
