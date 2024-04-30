import React from "react";

const MenuPageShimmer = () => {
  return (
    <div className="max-w-[900px] mx-auto animate-pulse p-[15px]">
      <div className="my-6">
        <div className="h-3 w-40 bg-gradient-to-r from-gray-200 to-gray-500 mb-4"></div>
      </div>
      <div className="p-3 my-5">
        <div className="h-9 w-60 bg-gradient-to-r from-gray-200 to-gray-500 mb-4"></div>
      </div>
      <div className="menu-card">
        <div className="rounded-3xl bg-white border">
          <div className="mx-4 my-2 h-3 w-40 bg-gradient-to-r from-gray-200 to-gray-500"></div>
          <div className="mx-4 my-2 h-3 w-40 bg-gradient-to-r from-gray-200 to-gray-500"></div>
          <div className="mx-4 my-2 h-3 w-40 bg-gradient-to-r from-gray-200 to-gray-500"></div>
          <div className="mx-4 my-2 h-3 w-40 bg-gradient-to-r from-gray-200 to-gray-500"></div>
          <div className="mx-4 my-2">
            <div className=" h-3 w-full bg-gradient-to-r from-gray-200 to-gray-500"></div>
          </div>
        </div>
      </div>
      <div className=" p-6 flex justify-center items-center">
        <div className="h-8 w-28 bg-gradient-to-r from-gray-200 to-gray-500 mb-4"></div>
      </div>
      <hr />
      <div className="px-4 my-4">
        <div className="h-6 w-full bg-gradient-to-r from-gray-200 to-gray-500 mb-4"></div>
      </div>
      {Array(4)
        .fill("")
        .map((__, ind) => {
          return (
            <React.Fragment key={ind}>
              <div className="px-6 pt-1 flex flex-col-reverse md:flex-row md:justify-between gap-10">
                <div>
                  <div className="w-6 h-6 bg-gradient-to-r from-gray-200 to-gray-500 mb-2"></div>
                  <div className="w-48 h-6 bg-gradient-to-r from-gray-200 to-gray-500 mb-2"></div>
                  <div className="w-16 h-6 bg-gradient-to-r from-gray-200 to-gray-500 mb-2"></div>
                  <div className="w-full md:w-[600px] h-6 bg-gradient-to-r from-gray-200 to-gray-500 mb-2"></div>
                </div>
                <div className="w-40 h-32 bg-gradient-to-r from-gray-200 to-gray-500 mb-4"></div>
              </div>
              <div className="border px-10 my-6" />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default MenuPageShimmer;
