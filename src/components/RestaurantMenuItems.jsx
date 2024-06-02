import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { CARD_IMG } from "../utils/constants";
import { addItem } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RestaurantMenuItems = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (menuItem) => {
    try {
      dispatch(addItem(menuItem));
    } catch (error) {
      console.error("Error in handleAddItem:", error);
    }
  };
  return (
    <div className="bg-[#050505]">
      {items &&
        items.map((menuItem) => {
          // Calculate the price value
          const priceValue =
            menuItem.card.info.price / 100 ||
            menuItem.card.info.defaultPrice / 100;

          return (
            <div
              key={menuItem.card && menuItem.card.info.id}
              className="flex items-center justify-between border-b border-gray-50/10 py-6 text-left"
            >
              <div className="w-2/3 px-4">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-gray-50">
                    {menuItem.card.info.name}
                  </span>
                  <p className="text-xl font-bold text-gray-50">
                    ₹{priceValue}
                  </p>
                  <p className="text-lg text-gray-400 md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-2/3">
                    {menuItem.card.info.description}
                  </p>
                </div>
              </div>
              <div className="relative size-32 w-1/3 grow rounded-lg md:h-52 lg:h-52 xl:h-52 2xl:h-52">
                <img
                  className="size-full object-cover object-center"
                  src={CARD_IMG + menuItem.card.info.imageId}
                />
                <button
                  onClick={() => handleAddItem(menuItem)}
                  className="absolute -bottom-2 left-8 z-10 rounded-full bg-green-600 px-6 py-1 text-lg font-bold md:left-[100px] lg:left-[100px] xl:left-[100px]"
                >
                  ADD
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RestaurantMenuItems;
