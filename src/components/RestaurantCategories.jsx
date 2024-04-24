import React from "react";
import { useState } from "react";
import { RxCaretUp, RxCaretDown } from "react-icons/rx";
import CategoryItems from "./CategoryItems";

const RestaurantCategories = ({ category, isSubAccordion }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div
        className="flex justify-between px-4 my-4 cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <div
          className={
            isSubAccordion ? "font-medium text-md" : "font-bold text-lg"
          }
        >
          {category.title} ({category.itemCards.length})
        </div>
        <div>
          {toggle ? <RxCaretUp fontSize={30} /> : <RxCaretDown fontSize={30} />}
        </div>
      </div>
      {toggle && <CategoryItems items={category.itemCards} />}
      <div className="p-2 bg-[#dfdfe7]"></div>
    </div>
  );
};

export default RestaurantCategories;
