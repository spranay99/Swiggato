import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CDN_URL, LOCATION_ICON, MENU_API } from "../utils/constants.js";
import RestaurantCategories from "./RestaurantCategories.jsx";
import MenuPageShimmer from "./MenuPageShimmer.jsx";
import StarIcon from "./StarIcon.jsx";
import { scrollToTop } from "../utils/helper.js";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [restaurantMenu, setRestaurantMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
    scrollToTop();
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
    <MenuPageShimmer />
  ) : (
    <>
      <div className="max-w-[900px] mx-auto p-[15px]">
        <div className="my-6">
          <p className="font-medium text-sm">
            <Link to={"/"}>Home</Link> / {city} / {name}
          </p>
        </div>
        <div className="p-3 my-5">
          <h1 className="font-bold text-3xl">{name}</h1>
        </div>
        <div className="menu-card">
          <div className="rounded-3xl bg-white border">
            <div className="flex items-center gap-2 px-4 py-1 mt-2 font-bold">
              <div>
                <StarIcon />
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
          {restaurantMenu.map((c, index) => {
            const accordion = c.card.card;

            if (accordion?.itemCards) {
              return <RestaurantCategories key={index} category={accordion} />;
            } else {
              return (
                <div key={index}>
                  <div className="font-bold text-lg px-4 my-4">
                    {accordion.title}
                  </div>
                  {accordion?.categories?.map((subAccordion, sindex) => {
                    return (
                      <RestaurantCategories
                        key={sindex}
                        category={subAccordion}
                        isSubAccordion={true}
                      />
                    );
                  })}
                </div>
              );
            }
          })}
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
                    src={LOCATION_ICON}
                    alt={category.card.card.name}
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

export default RestaurantMenu;
