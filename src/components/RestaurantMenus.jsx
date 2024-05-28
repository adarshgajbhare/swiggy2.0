/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { CARD_IMG } from "../utils/constants";
import useRestaurantMenus from "../utils/useRestaurantMenus";
import RestaurantMenuCategory from "./RestaurantMenuCategory";
import { IconStarFilled } from "@tabler/icons-react";
const RestaurantMenus = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [buttonText, setButtonText] = useState("ADD");

  //const [showIndex, setShowIndex] = useState(0);
  const btnChange = () => {
    setButtonText("DONE");
  };

  const { resId } = useParams();
  const resMenu = useRestaurantMenus(resId);
  console.log("res menu #######", resMenu);

  if (resMenu === null) return <Shimmer />;

  const {
    name,
    cuisines,
    avgRating,
    costForTwoMessage,
    city,
    totalRatingsString,
    cloudinaryImageId,
  } = resMenu?.cards?.[2]?.card?.card?.info;

  console.log(resMenu);

  const { itemCards } =
    resMenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card;

  const category =
    resMenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="bg-[#050505] overflow-y-scroll min-h-dvh">
      <div className="flex relative flex-col gap-1 bg-[#050505] border-b border-white/20 rounded-xl overflow-hidden  p-4 text-white  lg:w-1/2 xl:w-1/2 2xl:w-1/2 md:w-1/2 mx-auto mt-32 mb-10">
      <div className="absolute inset-0 z-[2] size-full overflow-hidden bg-[#050505]/50 filter backdrop-blur-lg">
        </div>      
        <div className="absolute inset-0 size-full overflow-hidden">
    <img src={CARD_IMG + cloudinaryImageId} alt="" className="size-full object-cover object-center" />
        </div>
        <p className="z-10  font-extrabold text-6xl   text-orange-500">{name}</p>
        <p className="z-10 pl-1  text-2xl font-bold text-gray-300">
          {cuisines.join(", ")}
        </p>
        <p className="z-10 pl-1  text-2xl font-bold text-gray-300">{city}</p>{" "}
        <p className="z-10 pl-1  text-2xl font-bold text-gray-300">
       {costForTwoMessage}
        </p>
        <p className="z-10 flex absolute bottom-3 text-gray-50 right-2 items-center border border-white/10 rounded-full px-4 py-1 gap-1 text-xl font-extrabold "> 
        <IconStarFilled size={18} color="yellow" className="inline-block " />
        {avgRating}</p>{" "}
      </div>

      <div className="Menu-items text-white ">
        {category &&
          category.map((category, index) => (
            <RestaurantMenuCategory
              key={category?.card?.card.title}
              data={category?.card?.card}
            />
          ))}
        
      </div>
    </div>
  );
};
export default RestaurantMenus;

