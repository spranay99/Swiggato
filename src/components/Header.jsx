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
import { currentLocation } from "../redux/locationSlice";
import { clearCart } from "../redux/cartSlice";

import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [navToggle, setNavToggle] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  const currentLoc = useSelector((store) => store.location.loc);

  const dispatch = useDispatch();

  const setSideToggle = () => {
    setToggle(!toggle);
  };

  const setNavbarToggle = () => {
    setNavToggle(!navToggle);
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
          zIndex: 99,
        }}
        onClick={setSideToggle}
      >
        <div
          className="w-[375px] md:w-[450px] md:p-6 h-full bg-white duration-[400ms] absolute flex items-center p-2 overflow-y-scroll flex-col"
          style={{
            left: toggle ? "0%" : "-100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" w-2/3">
            <div className="pl-2 py-2 md:hidden">
              <GrClose onClick={setSideToggle} />
            </div>
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
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/">
            <div className="md:w-[40px] w-[25px] mx-8">
              <img className="w-full" src={Logo} alt="logo" />
            </div>
          </Link>
          <div className="cursor-pointer group sm:" onClick={setSideToggle}>
            <span className="sm:text-[15px] text-xs font-bold border-b-[3px] border-black group-hover:text-[#fc8019] group-hover:border-[#fc8019]">
              Other
            </span>{" "}
            <span className="group-hover:opacity-90 sm:text-[15px] text-xs">
              {currentLoc.city}
              {", "} {currentLoc.state}
            </span>
            <RxCaretDown fontSize={25} className="inline text-[#fc8019]" />
          </div>
          <ul className="lg:flex hidden list-none gap-12 ml-auto font-semibold ">
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
                <FiShoppingCart />
                <span>[{cartItems.length}]</span>
                <span>Cart</span>
              </li>
            </Link>
          </ul>
          <ul className="lg:hidden block">
            {navToggle ? (
              <GrClose fontSize={25} onClick={setNavbarToggle} />
            ) : (
              <GiHamburgerMenu fontSize={25} onClick={setNavbarToggle} />
            )}
          </ul>
        </div>
      </header>
      <div
        className="background-overlay w-full h-full fixed duration-500"
        style={{
          opacity: navToggle ? 1 : 0,
          visibility: navToggle ? "visible" : "hidden",
          zIndex: 99,
        }}
        onClick={setNavbarToggle}
      >
        <div
          className="w-full md:p-6 bg-white duration-[700ms] absolute flex items-center p-2 flex-col"
          style={{
            right: toggle ? "100%" : "0%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-2/3">
            {links.map((link, index) => (
              <li
                key={index}
                className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#fc8019] my-2"
              >
                {link.icon}
                {link.name}
              </li>
            ))}
            <Link to="/cart">
              <li className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#fc8019]">
                <FiShoppingCart />
                <span>[{cartItems.length}]</span>
                <span>Cart</span>
              </li>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
