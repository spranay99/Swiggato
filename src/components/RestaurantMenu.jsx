import { Link, useParams } from "react-router-dom";
import { CDN_URL, LOCATION_ICON } from "../utils/constants.js";
import RestaurantCategories from "./RestaurantCategories.jsx";
import MenuPageShimmer from "../shimmer/MenuPageShimmer.jsx";
import StarIcon from "./StarIcon.jsx";
import useRestaurantMenu from "../custom-hooks/useRestaurantMenu.jsx";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const [restaurantMenu, restaurantDetails] = useRestaurantMenu(resId);

  const {
    name,
    city,
    avgRating,
    totalRatingsString,
    cuisines,
    costForTwoMessage,
    locality,
  } = restaurantDetails;

  return restaurantDetails.length == 0 ? (
    <MenuPageShimmer />
  ) : (
    <>
      <div className="max-w-[900px] mx-auto p-[15px]">
        <p className="my-6 font-medium text-sm">
          <Link to={"/"}>Home</Link> / {city} / {name}
        </p>

        <h1 className="p-3 my-5 font-bold text-3xl">{name}</h1>
        <div className="menu-card">
          <div className="rounded-3xl bg-white border">
            <div className="flex items-center gap-2 px-4 py-1 mt-2 font-bold">
              <div>
                <StarIcon />
              </div>
              <p>{avgRating}</p>
              <p>( {totalRatingsString})</p>
              <p>•</p>
              <p>{costForTwoMessage}</p>
            </div>
            <div className="px-4 py-1">
              <span className="text-[#fc8019] border-b-2 border-[#fc8019] cursor-pointer">
                {cuisines.join(", ")}
              </span>
            </div>
            <div className="px-4 py-1">
              <div className="flex gap-3">
                <p>•</p>
                <p>
                  <span className="font-bold"> Outlet</span>
                  {" " + locality}
                </p>
              </div>
              <div className="flex gap-3">
                <p>•</p>
                <p className="font-bold">{restaurantDetails?.sla?.slaString}</p>
              </div>
            </div>
            <div className="border mx-4 my-2"> </div>
            <div
              className="px-4 pb-2"
              dangerouslySetInnerHTML={{
                __html: restaurantDetails?.feeDetails?.message,
              }}
            ></div>
          </div>
        </div>
        <div className="p-6 flex justify-center items-center gap-1">
          <div>~/~</div>
          <div className="tracking-widest">MENU</div>
          <div>~/~</div>
        </div>
        <hr />
        <div>
          {restaurantMenu.map((c, index) => {
            const accordion = c.card.card;

            if (accordion?.itemCards) {
              return <RestaurantCategories key={index} category={accordion} />;
            } else {
              return (
                <div key={index}>
                  <p className="font-bold text-lg px-4 my-4">
                    {accordion.title}
                  </p>
                  {accordion?.categories?.map((subAccordion, sindex) => {
                    return (
                      <RestaurantCategories
                        key={sindex}
                        category={subAccordion}
                        isSubAccordion={true}
                      />
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
        <div className="bg-[#dfdfe7] p-4 pb-44 text-gray-400">
          {restaurantMenu
            .filter(
              (c) =>
                c.card.card?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo"
            )
            .map((category, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  className="w-24 h-12"
                  src={CDN_URL + category?.card?.card?.imageId}
                  alt={category?.card?.card?.type}
                />{" "}
                {category?.card?.card?.text[0]}
              </div>
            ))}
          <div className="border border-gray-400 my-3" />
          {restaurantMenu
            .filter(
              (c) =>
                c?.card?.card?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
            )
            .map((category, index) => (
              <div key={index}>
                <p className="font-bold ">{category?.card?.card?.name}</p>
                <p>(Outlet : {category?.card?.card?.area})</p>
                <div className="flex text-xs">
                  {" "}
                  <img
                    className="w-5 h-5"
                    src={LOCATION_ICON}
                    alt={category?.card?.card?.name}
                  />
                  {category?.card?.card?.completeAddress}
                </div>
              </div>
            ))}
          <div className="border border-gray-400 my-3" />
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
