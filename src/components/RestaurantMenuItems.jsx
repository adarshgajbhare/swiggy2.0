import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { CARD_IMG } from "../utils/constants";
import { addItem } from "../store/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const RestaurantMenuItems = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (menuItem  ) =>
   {
  
    try {
     
      dispatch(addItem( menuItem ));
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
              className=" border-b  py-6   border-gray-50/10  text-left flex  items-center justify-between"
            >
              <div className="w-2/3 px-4">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-2xl text-gray-50 ">{menuItem.card.info.name}</span>
                  <p className="font-bold text-xl text-gray-50">
                    ₹{priceValue}
                  </p>
                  <p className="text-lg lg:w-2/3 xl:w-2/3 2xl:w-2/3  md:w-2/3  text-gray-400">
                    {menuItem.card.info.description}
                  </p>
                </div>
              </div>
              <div className="relative lg:h-52 xl:h-52 md:h-52 2xl:h-52 size-32 grow  rounded-lg w-1/3">
                <img
               
                  className="size-full object-cover object-center"
                  src={CARD_IMG + menuItem.card.info.imageId}
                />
                <button
                  onClick={()  => handleAddItem(menuItem )}
                className="absolute bg-green-600 px-6 py-1 text-lg font-bold rounded-full -bottom-2 z-10 lg:left-[100px] xl:left-[100px] md:left-[100px] left-8">
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


