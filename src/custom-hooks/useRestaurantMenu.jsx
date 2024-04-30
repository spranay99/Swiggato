import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/helper";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
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
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    );
    setRestaurantDetails(json?.data?.cards[2]?.card?.card?.info);
  };

  return [restaurantMenu, restaurantDetails];
};

export default useRestaurantMenu;
