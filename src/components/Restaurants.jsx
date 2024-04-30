import React, { useEffect, useState } from "react";
import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import HomePageShimmer from "../shimmer/HomePageShimmer";
import Categories from "./Categories";
import { useSelector } from "react-redux";
import useRestaurant from "../custom-hooks/useRestaurant";

const Restaurants = () => {
  const currentLocation = useSelector((store) => store.location.loc);

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchRestaurants, setSearchRestaurants] = useState("");

  const [restaurantsList, carouselImages] = useRestaurant();

  const VegRestaurantCard = withVegLabel(RestaurantCard);

  const [activeButton, setActiveButton] = useState("Clear");

  useEffect(() => {
    setFilteredRestaurants(restaurantsList);
  }, [restaurantsList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchRestaurants();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchRestaurants]);

  const filters = [
    {
      name: "Clear",
      filterFunc: () => {
        setFilteredRestaurants(restaurantsList);
      },
    },
    {
      name: "Fast Delivery",
      filterFunc: () => {
        const fastDelivery = restaurantsList.filter(
          (rest) => rest.info.sla.deliveryTime < 30
        );
        setFilteredRestaurants(fastDelivery);
      },
    },
    {
      name: "Top Rated",
      filterFunc: () => {
        const topRated = restaurantsList.filter(
          (rest) => rest.info.avgRating > 4
        );
        setFilteredRestaurants(topRated);
      },
    },
    {
      name: "Pure Veg",
      filterFunc: () => {
        const onlyVeg = restaurantsList.filter((rest) => rest.info.veg == true);
        setFilteredRestaurants(onlyVeg);
      },
    },
    {
      name: "Less than 300",
      filterFunc: () => {
        const lessThan300 = restaurantsList.filter(
          (rest) => rest.info.costForTwo.match(/\d+/)[0] < 300 == true
        );
        setFilteredRestaurants(lessThan300);
      },
    },
    {
      name: "Between 300 and 600",
      filterFunc: () => {
        const between300and600 = restaurantsList.filter(
          (rest) =>
            rest.info.costForTwo.match(/\d+/)[0] >= 300 &&
            rest.info.costForTwo.match(/\d+/)[0] < 600
        );
        setFilteredRestaurants(between300and600);
      },
    },
  ];

  const handleSearchRestaurants = () => {
    const searchedRestaurants = restaurantsList.filter((rest) =>
      rest?.info?.name.toLowerCase().includes(searchRestaurants.toLowerCase())
    );
    setFilteredRestaurants(searchedRestaurants);
    setActiveButton("Clear");
  };

  const handleClick = (filter) => {
    setActiveButton(filter.name);
  };

  return restaurantsList.length == 0 ? (
    <HomePageShimmer />
  ) : (
    <>
      <Categories carouselImages={carouselImages} />
      <div className="max-w-[1200px] mx-auto mb-10 p-[15px]">
        <div className="text-[25px] font-extrabold">
          Restaurants with online food delivery in {currentLocation.city}
        </div>
        <div className="flex-wrap md:flex gap-8 my-5">
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`border py-2 px-3 mx-1 shadow-sm rounded-[18px] ${
                activeButton === filter.name &&
                "border-4 font-bold text-[#fc8019]"
              }`}
              onClick={() => {
                filter.filterFunc();
                handleClick(filter);
              }}
            >
              {filter.name}
            </button>
          ))}
          <input
            className="border p-2 mx-1 shadow-sm rounded-2xl"
            type="text"
            placeholder="Search Restaurants..."
            value={searchRestaurants}
            onChange={(e) => setSearchRestaurants(e.target.value)}
          ></input>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-3 place-items-center px-[15px]">
          {filteredRestaurants.map((restaurant) => (
            <React.Fragment key={restaurant?.info?.id}>
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
