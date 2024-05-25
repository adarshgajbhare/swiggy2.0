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
    <div className="">
      {items &&
        items.map((menuItem) => {
          // Calculate the price value
          const priceValue =
            menuItem.card.info.price / 100 ||
            menuItem.card.info.defaultPrice / 100;
            
          return (
            <div
              key={menuItem.card && menuItem.card.info.id}
              className="p-2 m-2 border-b-2   border-gray-400  text-left flex justify-between"
            >
              <div className="w-1/2 ">
                <div className="p-2">
                  <span className="font-bold">{menuItem.card.info.name}</span>
                  <p className="font-bold mt-1 text-black opacity-70">
                    ₹ {priceValue}
                  </p>
                  <p className="text-base mt-2 text-black opacity-70 w-80">
                    {menuItem.card.info.description}
                  </p>
                </div>
              </div>
              <div className="container-ib p-4 w-3/12 relative">
                <img
                  className="container-i w-full relative h-32 rounded-lg"
                  src={CARD_IMG + menuItem.card.info.imageId}
                />
                <div className="container-btn">
                  <button
                    className="w-20 h-8 absolute bottom-1 ml-2 left-24 transform -translate-x-1/2 bg-green-500 text-white border-none cursor-pointer m-0 p-1rem outline-none rounded-md font-bold text-xs shadow-md transition duration-200 ease-out hover:shadow-lg hover:text-green-500 hover:bg-white"
                  onClick={()  => handleAddItem(menuItem )}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
    </div>
  );
};

export default RestaurantMenuItems;


