import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CDN_URL, MENU_API } from "../utils/constants.js";
import RestaurantCategories from "./RestaurantCategories.jsx";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [restaurantMenu, setRestaurantMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const response = await fetch(MENU_API + resId);
    const json = await response.json();
    setRestaurantMenu(
      json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards
    );
    setRestaurantDetails(json.data.cards[2].card.card.info);
  };

  const {
    name,
    city,
    avgRating,
    totalRatingsString,
    cuisines,
    costForTwoMessage,
    locality,
  } = restaurantDetails;

  return restaurantDetails.length == 0 ? (
    <center>
      <h1>Loading</h1>
    </center>
  ) : (
    <>
      <div className="max-w-[900px] mx-auto">
        <div className="my-6">
          <p className="font-medium text-sm">
            Home / {city} / {name}
          </p>
        </div>
        <div className="p-3 my-5">
          <h1 className="font-bold text-3xl">{name}</h1>
        </div>
        <div className="menu-card">
          <div className="rounded-3xl bg-white border">
            <div className="flex items-center gap-2 px-4 py-1 mt-2 font-bold">
              <div>
                <StarSVGIcon />
              </div>
              <div>{avgRating}</div>
              <div>( {totalRatingsString})</div>
              <div>•</div>
              <div>{costForTwoMessage}</div>
            </div>
            <div className="px-4 py-1">
              <span className="text-[#fc8019] border-b-2 border-[#fc8019] cursor-pointer">
                {cuisines.slice(0, 2).join(", ")}
              </span>
            </div>
            <div className="px-4 py-1">
              <div className="flex gap-3">
                <div>•</div>
                <div>
                  <span className="font-bold"> Outlet</span>
                  {" " + locality}
                </div>
              </div>
              <div className="flex gap-3">
                <div>•</div>
                <div className="font-bold">
                  {restaurantDetails.sla.slaString}
                </div>
              </div>
            </div>
            <div className="border mx-4 my-2"> </div>
            <div className="px-4 pb-2">
              {restaurantDetails.feeDetails.message}
            </div>
          </div>
        </div>
        <div className="p-6 flex justify-center items-center gap-1">
          <div>~/~</div>
          <div className="tracking-widest">MENU</div>
          <div>~/~</div>
        </div>
        <hr />
        <div>
          {restaurantMenu
            .filter(
              (c) =>
                c.card.card?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
            )
            .map((category, index) => (
              <RestaurantCategories key={index} category={category.card.card} />
            ))}
        </div>
        <div className="bg-[#dfdfe7] p-4 pb-44 text-gray-400">
          {restaurantMenu
            .filter(
              (c) =>
                c.card.card?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo"
            )
            .map((category, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  className="w-24 h-12"
                  src={CDN_URL + category.card.card.imageId}
                  alt={category.card.card.type}
                />{" "}
                {category.card.card.text[0]}
              </div>
            ))}
          <div className="border border-gray-400 my-3" />
          {restaurantMenu
            .filter(
              (c) =>
                c.card.card?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
            )
            .map((category, index) => (
              <div key={index}>
                <div className="font-bold ">{category.card.card.name}</div>
                <div>(Outlet : {category.card.card.area})</div>
                <div className="flex text-xs">
                  {" "}
                  <img
                    className="w-5 h-5"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ei-location.svg/2048px-Ei-location.svg.png"
                  />
                  {category.card.card.completeAddress}
                </div>
              </div>
            ))}
          <div className="border border-gray-400 my-3" />
        </div>
      </div>
    </>
  );
};

const StarSVGIcon = () => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      role="img"
      aria-hidden="true"
      strokecolor="rgba(2, 6, 12, 0.92)"
      fillcolor="rgba(2, 6, 12, 0.92)"
    >
      <circle
        cx={10}
        cy={10}
        r={9}
        fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
      />
      <path
        d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="StoreRating20_svg__paint0_linear_32982_71567"
          x1={10}
          y1={1}
          x2={10}
          y2={19}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#21973B" />
          <stop offset={1} stopColor="#128540" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RestaurantMenu;
