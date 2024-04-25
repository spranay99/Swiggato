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

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  //state for making active button
  const [activeButton, setActiveButton] = useState("button1");

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
        json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      );
      setFilteredRestaurants(
        json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClearFilter = () => {
    setFilteredRestaurants(restaurantsList);
  };

  const handleFastDelivery = () => {
    const fastDelivery = restaurantsList.filter(
      (rest) => rest.info.sla.deliveryTime < 30
    );
    setFilteredRestaurants(fastDelivery);
  };

  const handleTopRating = () => {
    const topRated = restaurantsList.filter((rest) => rest.info.avgRating > 4);
    setFilteredRestaurants(topRated);
  };

  const handleOnlyVeg = () => {
    const onlyVeg = restaurantsList.filter((rest) => rest.info.veg == true);
    setFilteredRestaurants(onlyVeg);
  };

  const handleLessThan300 = () => {
    const lessThan300 = restaurantsList.filter(
      (rest) => rest.info.costForTwo.match(/\d+/)[0] < 300 == true
    );
    setFilteredRestaurants(lessThan300);
  };

  const handleBetween300and600 = () => {
    const between300and600 = restaurantsList.filter(
      (rest) =>
        rest.info.costForTwo.match(/\d+/)[0] >= 300 &&
        rest.info.costForTwo.match(/\d+/)[0] < 600
    );
    setFilteredRestaurants(between300and600);
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
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
          <button
            className={`border py-2 px-3 shadow-sm rounded-[18px] ${
              activeButton === "button1"
                ? "border-4 font-bold text-[#fc8019]"
                : ""
            }`}
            onClick={() => {
              handleClearFilter();
              handleClick("button1");
            }}
          >
            Clear Filter
          </button>
          <button
            className={`border p-2 shadow-sm rounded-2xl ${
              activeButton === "button2"
                ? "border-4 font-bold text-[#fc8019]"
                : ""
            }`}
            onClick={() => {
              handleFastDelivery();
              handleClick("button2");
            }}
          >
            Fast Delivery
          </button>
          <button
            className={`border p-2 shadow-sm rounded-2xl ${
              activeButton === "button3"
                ? "border-4 font-bold text-[#fc8019]"
                : ""
            }`}
            onClick={() => {
              handleTopRating();
              handleClick("button3");
            }}
          >
            Ratings 4.0+
          </button>
          <button
            className={`border p-2 shadow-sm rounded-2xl ${
              activeButton === "button4"
                ? "border-4 font-bold text-[#fc8019]"
                : ""
            }`}
            onClick={() => {
              handleOnlyVeg();
              handleClick("button4");
            }}
          >
            Pure Veg
          </button>
          <button
            className={`border p-2 shadow-sm rounded-2xl ${
              activeButton === "button5"
                ? "border-4 font-bold text-[#fc8019]"
                : ""
            }`}
            onClick={() => {
              handleLessThan300();
              handleClick("button5");
            }}
          >
            Less than Rs. 300
          </button>
          <button
            className={`border p-2 shadow-sm rounded-2xl ${
              activeButton === "button6"
                ? "border-4 font-bold text-[#fc8019]"
                : ""
            }`}
            onClick={() => {
              handleBetween300and600();
              handleClick("button6");
            }}
          >
            Rs. 300 - Rs. 600
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {filteredRestaurants.map((restaurant) => (
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
