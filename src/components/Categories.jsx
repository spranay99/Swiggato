import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { MenuCategories } from "../utils/constants";
import { CATEGORY_IMG_URL } from "../utils/constants";

const Categories = () => {
  const [slide, setSlide] = useState(0);

  const API_URL =
    // "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=19.0759837&lng=72.8776559&carousel=true&third_party_vendor=1";

    // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.382913760714263&lng=77.0416135713458&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  useEffect(() => {
    // fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await fetch(API_URL);
    const json = await data.json();

    console.log(json);
  };

  const nextSlide = () => {
    if (MenuCategories.length - 8 === slide) return false;
    setSlide(slide + 4);
  };
  const prevSlide = () => {
    if (slide === 0) return false;
    setSlide(slide - 4);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between my-3">
        <div className="text-[25px] font-extrabold">What's on your mind?</div>
        <div className="flex">
          <div
            className="flex justify-center items-center cursor-pointer w-[30px] h-[30px] mx-2 bg-[#e2e2e7] rounded-full"
            onClick={prevSlide}
          >
            <FaArrowLeft />
          </div>
          <div
            className="flex justify-center items-center cursor-pointer w-[30px] h-[30px] mx-2 bg-[#e2e2e7] rounded-full"
            onClick={nextSlide}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden">
        {MenuCategories.map((category, index) => {
          return (
            <div
              key={index}
              style={{
                transform: `translateX(-${slide * 100}%)`,
              }}
              className="w-[150px] shrink-0 duration-700"
            >
              <img
                src={CATEGORY_IMG_URL + category.image}
                alt={category.name}
              />
            </div>
          );
        })}
      </div>
      <hr className="my-6 border" />
    </div>
  );
};

export default Categories;
