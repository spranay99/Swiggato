import React from "react";

const RestaurantCard = ({ resList }) => {
  console.log({ resList });

  return (
    <div className="w-[273px] mb-3 hover:scale-95 duration-150">
      <div className="h-[182px] rounded-[15px] overflow-hidden relative">
        <img
          className="duration-150 object-cover w-full h-full"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366/" +
            resList.info.cloudinaryImageId
          }
          alt={resList.info.name}
        />
        <div className="bg-gradient-to-b from-transparent to-black absolute w-full h-full top-0 flex items-end p-2 text-[25px] font-bold text-white tracking-tighter">
          {resList.info.aggregatedDiscountInfoV3.header}
        </div>
      </div>
      <div className="px-2 py-1">
        <div className="text-xl font-bold">{resList.info.name}</div>
        <div className="flex items-center gap-2">
          <StarSVGIcon /> {resList.info.avgRating}
          <span>{resList.info.sla.slaString}</span>
        </div>
        <div className="text-slate-700">
          {resList.info.cuisines[0]}
          <br />
          {resList.info.locality}
        </div>
      </div>
    </div>
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
