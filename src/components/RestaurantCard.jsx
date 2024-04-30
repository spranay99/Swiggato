import React from "react";
import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import StarIcon from "./StarIcon";

const RestaurantCard = ({ resList }) => {
  const {
    id,
    cloudinaryImageId,
    name,
    avgRating,
    sla,
    locality,
    cuisines,
    aggregatedDiscountInfoV3,
  } = resList.info;

  return (
    <Link to={"/restaurants/" + id}>
      <div className="w-[273px] mb-3 hover:scale-95 duration-150 cursor-pointer">
        <div className="h-[182px] rounded-[15px] overflow-hidden relative">
          <img
            className="duration-150 object-cover w-full h-full"
            src={CDN_URL + cloudinaryImageId}
            alt={name}
          />
          <div className="bg-gradient-to-b from-transparent to-black absolute w-full h-full top-0 flex items-end p-2 text-[25px] font-bold text-white tracking-tighter">
            {aggregatedDiscountInfoV3?.header}{" "}
            {aggregatedDiscountInfoV3?.subHeader}
          </div>
        </div>
        <div className="px-2 py-1">
          <div className="text-lg font-bold">
            {name.length > 26 ? `${name.substring(0, 25)}...` : name}
          </div>
          <div className="flex items-center gap-2">
            <StarIcon /> {avgRating}
            <span>{sla.slaString}</span>
          </div>
          <div className="text-slate-700">
            {cuisines.slice(0, 2).join(", ")}
            <br />
            {locality}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const withVegLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative ">
        <label className="bg-green-700 text-white px-4 py-1 z-10 rounded-lg absolute">
          Veg
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
