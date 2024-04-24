import React, { useEffect, useState } from "react";
import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import { RESTAURANT_LIST } from "../utils/constants";
import HomePageShimmer from "./HomePageShimmer";
import Categories from "./Categories";
import { scrollToTop } from "../utils/helper";
import { useSelector } from "react-redux";

const Restaurants = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const currentLocation = useSelector((store) => store.location.loc);

  const VegRestaurantCard = withVegLabel(RestaurantCard);

  useEffect(() => {
    fetchRestaurants();
    scrollToTop();
  }, [currentLocation]);

  const fetchRestaurants = async () => {
    try {
      const data = await fetch(
        currentLocation !== null
          ? `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${currentLocation.latitude}&lng=${currentLocation.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
          : RESTAURANT_LIST
      );
      const json = await data.json();
      setRestaurantsList(
        json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return restaurantsList.length == 0 ? (
    <HomePageShimmer />
  ) : (
    <>
      <Categories />
      <div className="max-w-[1200px] mx-auto mb-10">
        <div className="text-[25px] font-extrabold">
          Restaurants with online food delivery in {currentLocation.city}
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
              {restaurant.info.veg ? (
                <VegRestaurantCard resList={restaurant} />
              ) : (
                <RestaurantCard resList={restaurant} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
