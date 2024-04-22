import React from "react";
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryItems from "./CategoryItems";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

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
    <div className="max-w-[900px] mx-auto">
      <div className="flex justify-between">
        <div className="my-5 font-bold">Cart Items</div>
        <div
          className="bg-[#fc8019] my-5 px-2 text-white rounded-lg cursor-pointer"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </div>
      </div>
      <CategoryItems items={cartItems} />
    </div>
  );
};

export default Cart;
