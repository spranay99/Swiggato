import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../public/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { GrHistory } from "react-icons/gr";

import { locationObject } from "../utils/constants";
import { currentLocation } from "../utils/locationSlice";
import { clearCart } from "../utils/cartSlice";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  const currentLoc = useSelector((store) => store.location.loc);

  const dispatch = useDispatch();

  const setSideToggle = () => {
    setToggle(!toggle);
  };

  const links = [
    {
      icon: <IoIosSearch />,
      name: "Search",
    },
    {
      icon: <RiDiscountPercentLine />,
      name: "Offers",
    },
    {
      icon: <IoHelpBuoyOutline />,
      name: "Help",
    },
    {
      icon: <FaRegUser />,
      name: "Sign In",
    },
  ];

  return (
    <>
      <div
        className="background-overlay w-full h-full fixed duration-500"
        style={{
          opacity: toggle ? 1 : 0,
          visibility: toggle ? "visible" : "hidden",
          zIndex: 999999,
        }}
        onClick={setSideToggle}
      >
        <div
          className="w-[500px] h-full bg-white duration-[400ms] absolute flex items-center p-10 overflow-y-scroll flex-col"
          style={{
            left: toggle ? "0%" : "-100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" w-2/3">
            {locationObject.map((loc) => (
              <div
                key={loc.lid}
                className="flex items-center gap-4 pl-8 py-2 border-b-2 group cursor-pointer w-full"
                onClick={() => {
                  dispatch(currentLocation(loc));
                  dispatch(clearCart());
                  setSideToggle(!toggle);
                  navigate("/");
                }}
              >
                <div>
                  <GrHistory />
                </div>
                <div className="px-5 py-2 my-3 cursor-pointer">
                  <div className="group-hover:text-[#fc8019] font-semibold">
                    {loc.city}
                  </div>
                  <div>{loc.state}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <header className="p-[15px] shadow-xl text-[#686b78] sticky top-0 bg-white z-20">
        <div className="max-w-[1200px] mx-auto  flex items-center">
          <Link to="/">
            <div className="w-[40px] mx-8">
              <img className="w-full" src={Logo} alt="logo" />
            </div>
          </Link>
          <div className="cursor-pointer group" onClick={setSideToggle}>
            <span className="font-bold border-b-[3px] border-black group-hover:text-[#fc8019] group-hover:border-[#fc8019]">
              Other
            </span>{" "}
            <span className="group-hover:opacity-90">
              {currentLoc.city}
              {", "} {currentLoc.state}
            </span>
            <RxCaretDown fontSize={25} className="inline text-[#fc8019]" />
          </div>
          <ul className="flex list-none gap-12 ml-auto font-semibold text-[18px]">
            {links.map((link, index) => (
              <li
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:text-[#fc8019]"
              >
                {link.icon}
                {link.name}
              </li>
            ))}
            <Link to="/cart">
              <li className="flex items-center gap-2 cursor-pointer hover:text-[#fc8019]">
                {/* <FiShoppingCart /> */}
                <span>[{cartItems.length}]</span>
                <span>Cart</span>
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
