import React from "react";
import { CDN_URL, NON_VEG_ICON, VEG_ICON } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { toast } from "react-toastify";

const CategoryItems = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <>
      {items.map((item) => (
        <>
          <div
            className="px-6 pt-1 flex flex-col-reverse md:flex-row md:justify-between gap-10 "
            key={item.card.info.id}
          >
            <div>
              <div className="w-6 h-6">
                <img
                  src={
                    item.card.info.itemAttribute.vegClassifier == "VEG"
                      ? VEG_ICON
                      : NON_VEG_ICON
                  }
                  className="w-full h-full"
                />
              </div>
              <div>{item.card.info.name}</div>
              <div>
                ₹{" "}
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </div>
              <div>{item.card.info.description}</div>
            </div>
            <div className="relative mx-auto">
              <div className="w-40 h-32">
                <img
                  src={
                    item.card.info.imageId
                      ? CDN_URL + item.card.info.imageId
                      : "https://www.facoelche.com/images/placeholder-noimage.jpg"
                  }
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-12 top-[105px]">
                <button
                  className="bg-white text-[#1ba672] font-bold shadow-lg px-4 py-2 rounded-lg"
                  onClick={() => {
                    dispatch(addItem(item));
                    toast.success(item.card.info.name + " added to cart", {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
          <div className="border px-10 my-6" />
        </>
      ))}
    </>
  );
};

export default CategoryItems;
