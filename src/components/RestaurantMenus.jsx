/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Shimmer from "./Shimmer";
import { CARD_IMG } from "../utils/constants";
import useRestaurantMenus from "../utils/useRestaurantMenus";
import RestaurantMenuCategory from "./RestaurantMenuCategory";
import {
  IconChevronLeft,
  IconSearch,
  IconStarFilled,
} from "@tabler/icons-react";
import SearchContext from "../utils/SearchContext";

const RestaurantMenus = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [buttonText, setButtonText] = useState("ADD");
 
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
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    );

  return (
    <div className="min-h-dvh overflow-y-scroll bg-[#020202]">
      <div className="relative mx-auto w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
        <div className="fixed left-0 right-0 top-0 z-50 lg:w-3/4 xl:w-3/4 2xl:w-3/4 lg:left-1/2 lg:-translate-x-1/2 xl:left-1/2 xl:-translate-x-1/2 2xl:left-1/2 2xl:-translate-x-1/2 rounded-b-3xl border-b border-white/10 bg-black/70 py-2 filter backdrop-blur-lg">
          <div className="m-2 flex items-center rounded-full bg-[#202020] p-2.5">
           <NavLink to={"/home"} >
            <IconChevronLeft
              size={24}
              color="gray"
              className="mr-1 inline-block scale-150"
            /> 
            </NavLink> 
            <input
              type="text"
              className="inline-block w-full bg-transparent font-semibold placeholder:text-gray-500 text-gray-200 focus:outline-none"
              placeholder={`Search in ${name} in ${city}`}
            />
            
            <IconSearch
              size={24}
              color="gray"
              className="ml-auto inline-block cursor-pointer"
            />
          </div>
          <div className="flex w-full items-center gap-2 px-4">
            <div className="my-1.5 w-1/2 rounded-2xl bg-[#101010] py-2 text-center text-base font-bold text-gray-500">
              Rating 4.0+
            </div>
            <div className="my-1.5 w-1/2 rounded-2xl bg-[#101010] py-2 text-center text-base font-bold text-gray-500">
              Bestsellers
            </div>
          </div>
        </div>

        <div className="z-0 mt-40 flex flex-col items-center justify-center px-4">
          <div className="items-stretc flex w-full gap-4 overflow-hidden rounded-xl bg-[#101010] p-4">
            <div className="relative size-44 w-1/2 overflow-hidden rounded-xl">
              <img
                src={CARD_IMG + cloudinaryImageId}
                alt=""
                className="size-full object-cover object-center"
              />
            </div>
            <div className="place-items-left grid w-1/2">
              <div className="flex h-full flex-col text-left text-white">
                <h1 className="line-clamp-2 text-2xl font-bold text-orange-500">
                  {name}
                </h1>
                <p className="text-lg font-bold text-gray-500">
                  {cuisines.join(", ")}
                </p>
                <div className="flex flex-col">
                  <span className="inline-block text-lg font-bold text-gray-500">
                    {city}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1">
                    <IconStarFilled
                      size={18}
                      color="yellow"
                      className="opacity-80"
                    />
                    <p className="text-lg font-bold text-gray-500">
                      {avgRating}
                    </p>
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-500">
                  {costForTwoMessage}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-center gap-1"></div>
            </div>
          </div>
        </div>

        <div className="Menu-items  my-8 text-white">
          {category &&
            category.map((category) => (
              <RestaurantMenuCategory
                key={category?.card?.card.title}
                data={category?.card?.card}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default RestaurantMenus;
