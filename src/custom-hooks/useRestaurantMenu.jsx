import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/helper";
import { MENU_API } from "../utils/constants";
import { useSelector } from "react-redux";

const useRestaurantMenu = (resId) => {
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const currentLocation = useSelector((store) => store.location.loc);

  useEffect(() => {
    fetchMenu();
    scrollToTop();
  }, []);

  const fetchMenu = async () => {
    const response = await fetch(
      currentLocation !== null
        ? `https://swiggato-server.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=${currentLocation.latitude}&lng=${currentLocation.longitude}&submitAction=ENTER&restaurantId=` +
            resId
        : MENU_API + resId
    );
    const json = await response.json();
    setRestaurantMenu(
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    );
    setRestaurantDetails(json?.data?.cards[2]?.card?.card?.info);
  };

  return [restaurantMenu, restaurantDetails];
};

export default useRestaurantMenu;
