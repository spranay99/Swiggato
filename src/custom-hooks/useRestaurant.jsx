import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/helper";
import { useSelector } from "react-redux";
import { RESTAURANT_LIST } from "../utils/constants";

const useRestaurant = () => {
  const currentLocation = useSelector((store) => store.location.loc);
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);

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
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setCarouselImages(
        json?.data?.cards?.find(
          (x) => x?.card?.card?.id === "whats_on_your_mind"
        )?.card?.card?.gridElements?.infoWithStyle?.info
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return [restaurantsList, carouselImages];
};

export default useRestaurant;
