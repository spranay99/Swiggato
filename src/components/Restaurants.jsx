import React, { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { RESTAURANT_LIST } from "../utils/constants";

const Restaurants = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);

  const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await fetch(RESTAURANT_LIST);
      const json = await data.json();
      setRestaurantsList(
        json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!restaurantsList) return "Loading Restaurants!";

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
        {restaurantsList.map((restaurant) => (
          <React.Fragment key={restaurant.info.id}>
            {restaurant.info.promoted ? (
              <PromotedRestaurantCard resList={restaurant} />
            ) : (
              <RestaurantCard resList={restaurant} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
