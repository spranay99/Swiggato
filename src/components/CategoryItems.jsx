import React from "react";
import { CDN_URL, NON_VEG_ICON, VEG_ICON } from "../utils/constants";

const CategoryItems = ({ items }) => {
  return (
    <>
      {items.map((item, i) => (
        <>
          <div className="px-6 pt-1 flex justify-between gap-10" key={i}>
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
            <div className="relative">
              <div className="w-40 h-32">
                <img
                  src={CDN_URL + item.card.info.imageId}
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-12 top-[105px]">
                <button className="bg-white text-[#1ba672] font-bold shadow-lg px-4 py-2 rounded-lg">
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
