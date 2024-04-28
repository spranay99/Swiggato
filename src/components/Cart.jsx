import React, { useEffect, useState } from "react";
import { CDN_URL, NON_VEG_ICON, VEG_ICON } from "../utils/constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../utils/cartSlice";
import { toast } from "react-toastify";
import { scrollToTop } from "../utils/helper";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    calculateTotal();
    scrollToTop();
  }, [cartItems]);

  const calculateTotal = () => {
    let total = 0;
    if (cartItems.length === 0) {
      setTotalCost(0);
    } else {
      cartItems.map((item) => {
        let ItemValue = item.card.info.price
          ? item.card.info.price / 100
          : item.card.info.defaultPrice / 100;
        total += ItemValue;
        setTotalCost(Math.floor(total));
      });
    }
  };

  return cartItems.length == 0 ? (
    <div className="flex items-center justify-center cart-height w-full">
      <div>
        <img src={CDN_URL + "2xempty_cart_yfxml0"} />
        <div className="text-center my-3 font-bold text-xl">
          Your cart is empty!
        </div>
        <Link to="/">
          <div className="text-center p-2 bg-[#fc8019] mx-8 text-white font-semibold cursor-pointer">
            SEE RESTAURANTS NEAR YOU
          </div>
        </Link>
      </div>
    </div>
  ) : (
    <div className="max-w-[900px] mx-auto p-[15px]">
      <div className="flex justify-between">
        <div className="text-[25px] font-extrabold m-5">Cart Items</div>
        <div
          className="bg-[#fc8019] my-5 text-white rounded-lg cursor-pointer font-bold shadow-lg px-4 py-2"
          onClick={() => {
            dispatch(clearCart());
            toast.success("All Items removed from cart", {
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
          Clear cart
        </div>
      </div>

      {cartItems.map((item) => (
        <>
          <div
            className="px-6 pt-1 flex md:flex-row md:justify-between flex-col-reverse gap-10"
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
                  src={CDN_URL + item.card.info.imageId}
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-9 top-[105px]">
                <button
                  className="bg-white text-[#fc8019] font-bold shadow-lg px-4 py-2 rounded-lg"
                  onClick={() => {
                    dispatch(removeItem(item.card.info));
                    toast.warning(item.card.info.name + " removed from cart", {
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
                  DELETE
                </button>
              </div>
            </div>
          </div>
          <div className="border px-10 my-6" />
        </>
      ))}
      <div className="shadow-lg p-4 h-44 font-bold text-black">
        <div className="text-xl">Bill Details</div>
        <div className="flex justify-between">
          <div>Item Total : </div>
          <div>₹ {totalCost}</div>
        </div>
        <div className="border-2 px-10 my-2" />
        <div className="flex justify-between">
          <div>To Pay: </div>
          <div> ₹ {totalCost}</div>
        </div>
        <div className="w-72 mx-auto text-center p-2 bg-[#fc8019] my-2 text-white font-semibold cursor-pointer">
          Proceed to Pay
        </div>
      </div>
    </div>
  );
};

export default Cart;
