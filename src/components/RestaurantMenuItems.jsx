/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CARD_IMG } from "../utils/constants";
import { addItem, removeItem } from "../store/cartSlice";
import "react-toastify/dist/ReactToastify.css";
import {
  IconChevronRight,
  IconMinus,
  IconPlus,
  IconPointFilled,
  IconStarFilled,
  IconX,
} from "@tabler/icons-react";
const RestaurantMenuItems = ({ items }) => {
  const [cardView, setCardView] = useState(false);
  const dispatch = useDispatch();

  const handleAddItem = (menuItem) => {
    try {
      dispatch(addItem(menuItem));
    } catch (error) {
      console.error("Error in handleAddItem:", error);
    }
  };

  const handleCardView = () => {
    setCardView((prev) => !prev);
  };
const  handleDecreaseItem = (menuItem) => {
  try {
    dispatch(removeItem(menuItem));
  } catch (error) {
    console.error("Error in handleDecreaseItem:", error);
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
              className="mx-3 my-6 flex items-center justify-between rounded-xl bg-[#101010] py-6 text-left"
            >
              <div
                className={`${cardView ? "translate-y-0" : "translate-y-[100%]"} fixed bottom-0 left-0 right-0 overflow-hidden rounded-t-3xl border-t border-white/50 bg-black/50 filter backdrop-blur-3xl transition-all duration-500 ease-in-out`}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    className="size-full rounded-md object-cover object-center"
                    src={CARD_IMG + menuItem.card.info.imageId}
                  />
                  <div
                    onClick={handleCardView}
                    className="absolute right-2 top-2 grid size-10 cursor-pointer place-items-center rounded-full bg-white"
                  >
                    <IconX
                      size={28}
                      color="gray"
                      className=""
                      strokeWidth={3}
                    />
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-3xl font-bold text-gray-50">
                    {menuItem.card.info.name}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="mt-2 text-3xl font-bold text-gray-500">
                      ₹{priceValue}
                    </p>
                    <p className="flex items-baseline gap-1 text-xl text-gray-400 md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-2/3">
                      <IconStarFilled
                        size={20}
                        color="#2d6a4f"
                        className="relative top-[2px]"
                      />
                      <span className="text-xl font-bold text-green-600">
                        3.8
                      </span>
                      <span className="text-base">(178)</span>
                    </p>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-500">
                    {menuItem.card.info.description}
                  </p>
                  <button
                    className="my-3 w-full rounded-xl bg-green-600 py-3 text-xl font-bold"
                    onClick={() => handleAddItem(menuItem)}
                  >
                    ADD
                  </button>
                </div>
              </div>

              <div className="w-2/3 px-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="relative bottom-[1px] grid scale-90 place-items-center rounded-md border border-[#386641]">
                      <IconPointFilled
                        size={20}
                        strokeWidth={1}
                        color="#386641"
                        className="inline-block"
                      />
                    </span>
                    <span className="text-lg font-bold text-gray-50">
                      {menuItem.card.info.name}
                    </span>
                  </div>
                  <p className="ml-7 text-lg font-bold text-gray-50">
                    ₹{priceValue}
                  </p>
                  <p className="ml-7 flex items-baseline gap-1 text-base text-gray-400 md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-2/3">
                    {/* {menuItem.card.info.description} */}
                    <IconStarFilled
                      size={15}
                      color="#2d6a4f"
                      className="relative top-[2px]"
                    />
                    <span className="font-bold text-green-600">3.8</span>
                    <span className="text-xs">(178)</span>
                  </p>
                  <p
                    onClick={handleCardView}
                    className="ml-6 mt-2 flex w-fit cursor-pointer items-center rounded-full border border-white/20 pb-[1px] pl-2 pr-[1px] pt-[3px] text-xs text-gray-400"
                  >
                    More Details <IconChevronRight size={16} color="gray" />
                  </p>
                </div>
              </div>

              <div className="overflow-hdden relative mr-4 aspect-square h-28 w-auto rounded-lg md:h-52 lg:h-52 xl:h-52 2xl:h-52">
                <img
                  className="size-full rounded-md object-cover object-center"
                  src={CARD_IMG + menuItem.card.info.imageId}
                />
                <div className="absolute -bottom-4 left-3 flex w-4/5 items-center justify-between rounded-lg bg-[#202020] px-1.5 py-1 lg:left-6 lg:px-3 lg:py-3 xl:left-6 xl:px-3 xl:py-3 2xl:left-6 2xl:px-3 2xl:py-2">
                  <button
                    className="rounded-md bg-transparent font-bold text-white disabled:cursor-not-allowed disabled:bg-orange-500/50"
                     onClick={() => handleDecreaseItem(menuItem)}
                  >
                    <IconMinus
                      size={16}
                      color="#2d6a4f"
                      strokeWidth={3}
                      className="scale-125"
                    />
                  </button>
                  <p className="mx-1 inline-block text-base font-bold text-green-500">
                    2
                  </p>
                  <button
                    className="rounded-md bg-transparent font-bold text-white"
                   //  onClick={() => handleIncreaseItem(menuItem)}
                  >
                    <IconPlus
                      size={16}
                      color="#2d6a4f"
                      strokeWidth={3}
                      className="scale-125"
                      onClick={() => handleAddItem(menuItem)}
                    />
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
