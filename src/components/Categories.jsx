import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { CATEGORY_IMG_URL } from "../utils/constants";

const Categories = ({ carouselImages }) => {
  const handleScrollLeft = () => {
    const foodCategory = document.querySelector(".categories");
    foodCategory.scrollLeft = foodCategory.scrollLeft - 480;
  };

  const handleScrollRight = () => {
    const foodCategory = document.querySelector(".categories");
    foodCategory.scrollLeft = foodCategory.scrollLeft + 480;
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between my-3">
        <div className="text-[25px] font-extrabold p-[15px]">
          What's on your mind?
        </div>
        <div className="flex">
          <div
            className="flex justify-center items-center cursor-pointer w-[30px] h-[30px] mx-2 bg-[#e2e2e7] rounded-full"
            onClick={handleScrollLeft}
          >
            <FaArrowLeft />
          </div>
          <div
            className="flex justify-center items-center cursor-pointer w-[30px] h-[30px] mx-2 bg-[#e2e2e7] rounded-full"
            onClick={handleScrollRight}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className="categories flex overflow-x-scroll scroll-smooth no-scrollbar">
        {carouselImages.map((carouselImage) => (
          <div key={carouselImage?.id} className="w-[160px] shrink-0">
            <img
              src={CATEGORY_IMG_URL + carouselImage?.imageId}
              alt={carouselImage?.accessibility?.altText}
            />
          </div>
        ))}
      </div>
      <hr className="my-6 border" />
    </div>
  );
};

export default Categories;
