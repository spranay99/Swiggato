import React from "react";
import { LOADING_GIF } from "../utils/constants";

const HomePageShimmer = () => {
  return (
    <div>
      <div className="w-full h-80 bg-gray-300 flex items-center justify-center flex-col gap-7">
        <div>
          <img
            className="md:w-28 md:h-28 h-20 w-20 rounded-full"
            src={LOADING_GIF}
            alt="Loading icon"
          />
        </div>
        <div className="font-semibold text-xl md:text-4xl text-blue-950">
          Looking for great food near you...
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto p-[15px] ">
        <div className="flex gap-8 my-5 flex-wrap animate-pulse">
          {Array(5)
            .fill("")
            .map((__, id) => {
              return (
                <div
                  key={id}
                  className="border py-2 px-3 shadow-sm rounded-[18px] bg-gradient-to-r from-gray-200 to-gray-500 w-28 h-12"
                ></div>
              );
            })}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-3 place-items-center mt-10 animate-pulse">
          {Array(8)
            .fill("")
            .map((__, id) => {
              return (
                <React.Fragment key={id}>
                  <div className="w-[273px] mb-3">
                    <div className="h-[182px] rounded-[15px] overflow-hidden ">
                      <div className="bg-gradient-to-r from-gray-200 to-gray-500  w-full h-full p-2"></div>
                    </div>
                    <div className="px-2 py-3">
                      <div className="h-8 w-full bg-gradient-to-r from-gray-200 to-gray-500 mb-4"></div>
                      <div className="h-4 w-36 bg-gradient-to-r from-gray-200 to-gray-500 mb-4"></div>
                      <div className="h-4 w-48 bg-gradient-to-r from-gray-200 to-gray-500 mb-4"></div>
                      <div className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-500 mb-4"></div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomePageShimmer;
