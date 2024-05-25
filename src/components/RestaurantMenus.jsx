import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { CARD_IMG } from "../utils/constants";
import useRestaurantMenus from "../utils/useRestaurantMenus";
import RestaurantMenuCategory from "./RestaurantMenuCategory";
const RestaurantMenus = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [buttonText, setButtonText] = useState("ADD");

  //const [showIndex, setShowIndex] = useState(0);
  const btnChange = () => {
    setButtonText("DONE");
  };

  const { resId } = useParams();
  const resMenu = useRestaurantMenus(resId);
  console.log("res menu #######" ,resMenu);

  if (resMenu === null) return <Shimmer />;

  const {
    name,
    cuisines,
    avgRating,
    costForTwoMessage,
    city,
    totalRatingsString,
  } = resMenu?.cards?.[2]?.card?.card?.info;

  console.log(resMenu)

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
    <div className="bg-white">
      <div className="flex bg-black rounded-lg text-white justify-between p-10 w-1/2 mx-auto mt-2">
        <div className=" ">
          <p className=" font-bold text-4xl   text-orange-500"> {name}</p>
          <p className="">{cuisines.join(", ")}</p>
          <p className="">{city}</p>{" "}
        </div>

        <div className=" p-4 backdrop-filter backdrop-blur-3xl saturate-100 bg-opacity-13 border border-gray-300 rounded-lg">
          <div className="flex align-center">
            <span >
            <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" fill="white"></path> </svg>
            </span>
            <span className=" relative font-bold text-2xl bottom-1  ml-2"> {avgRating}</span>
          </div>
          <div>
            <p className="font-bold text-xl mt-4 ">
              {totalRatingsString || "1K+ ratings"}
            </p>
          </div>
        </div>
      </div>
     <hr className="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700 w-1/2 mx-auto " />
      <div className="w-1/2 mx-auto flex justify-start mt-4"> 
      
        <svg
          className="RestaurantTimeCost_icon__8UdT4"
          width="24"
          height="24"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle
            r="8.35"
            transform="matrix(-1 0 0 1 9 9)"
            stroke="#3E4152"
            strokeWidth="1.3"
          ></circle>
          <path
            d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z"
            fill="#3E4152"
          ></path>
        </svg>
        <p className="font-bold ml-2">25 MIN</p>
        <svg
          className="money"
          width="24"
          height="24"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle
            cx="9"
            cy="9"
            r="8.25"
            stroke="#3E4152"
            strokeWidth="1.5"
          ></circle>
          <path
            d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z"
            fill="#3E4152"
          ></path>
        </svg>
        <p className="font-bold  ml-2">{costForTwoMessage}</p>
      </div>
      <hr className="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700 w-1/2 mx-auto " />
      <div className="Menu-items">
        {category && category.map((category, index) => (
          <RestaurantMenuCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
          //  showItems={index === showIndex ? true : false}
           // setShowIndex={() => setShowIndex(index)}
          />
        ))}
        ;
      </div>
    </div>
  );
};
export default RestaurantMenus;
