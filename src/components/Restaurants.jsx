import React from "react";
import RestaurantCard from "./RestaurantCard";

const Restaurants = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="text-[25px] font-extrabold">
        Restaurants with online food delivery in Mumbai
      </div>
      <div className="flex gap-8 my-5">
        <button className="border p-2 shadow-sm rounded-2xl">
          Fast Delivery
        </button>
        <button className="border p-2 shadow-sm rounded-2xl">
          New on Swiggy
        </button>
        <button className="border p-2 shadow-sm rounded-2xl">
          Ratings 4.0+
        </button>
        <button className="border p-2 shadow-sm rounded-2xl">Pure Veg</button>
        <button className="border p-2 shadow-sm rounded-2xl">
          Less than Rs. 300
        </button>
        <button className="border p-2 shadow-sm rounded-2xl">
          Rs. 300 - Rs. 600
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div>
    </div>
  );
};

export default Restaurants;
