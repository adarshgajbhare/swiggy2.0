/* eslint-disable no-unused-vars */
import { IconArrowRight, IconPointFilled, IconStarFilled } from "@tabler/icons-react";
import { CARD_IMG } from "../utils/constants";
import AddToCartButton from "./AddToCartButton";
const RestaurantCard = ({ resData }) => {
  const {
    name,
    cuisines,
    avgRating,
    sla,
    cloudinaryImageId,
    costForTwo,
    aggregatedDiscountInfoV3,
  } = resData || {};

  const cardStyle = {
    backgroundImage: `url(${
      cloudinaryImageId ? CARD_IMG + cloudinaryImageId : ""
    })`,
  };

  return (
    <div className="relative bg-white/10  filter backdrop-blur-3xl p-3 flex flex-col gap-3 overflow-hidden rounded-lg lg:w-72 xl:w-72 2xl:w-72">
      <div
        className="imgb relative h-44 overflow-hidden rounded"
        style={cardStyle}
      >
        <div className="absolute inset-0 flex size-full bg-gradient-to-t from-black/75 from-5%">
          <p className="absolute bottom-2 left-4 w-full text-xl font-black text-white">
            {aggregatedDiscountInfoV3?.header}{" "}
            {aggregatedDiscountInfoV3?.subHeader
              ? aggregatedDiscountInfoV3?.subHeader
              : "10% OFF UPTO ₹40"}{" "}
          </p>
        </div>
      </div>

      <div className="absolute hidden lg:grid xl:grid 2xl:grid md:grid size-10  place-items-center bg-green-600 rounded-md bottom-3 right-3">
<IconArrowRight size={24} color="white"strokeWidth={3} />
      </div>

      <div className="">
        <p className="line-clamp-1 text-xl font-bold tracking-tight text-white">
          {name}
        </p>
        <p className="flex w-fit items-center text-sm/none font-bold text-gray-300">
          <span className="relative bottom-[1px] -ml-1.5 scale-[0.6] rounded-full bg-green-600 p-1.5">
            <IconStarFilled
              className="inline-block"
              size={16}
              strokeWidth={2}
              color="white"
            />
          </span>
          <span className="flex items-center text-base/none font-bold text-gray-300">
            {avgRating}
            <IconPointFilled size={10} color="gray" className="mx-[2px]" />{" "}
            {sla?.slaString.split(" ")[0]} mins
          </span>
        </p>

        <p className="relative bottom-1 inline-block w-fit rounded-full text-base/none font-bold tracking-tighter text-orange-400">
          {cuisines && cuisines.length > 0
            ? cuisines.join(", ").toLowerCase().split(",")[0]
            : "N/A"}
        </p>
        <p className="relative bottom-1  mb-[1px] text-lg font-bold text-gray-300">
          {costForTwo.split(" ")[0]}{" "}
          <span className="text-xs/none italic text-gray-500/75">for two</span>{" "}
        </p>

        <p className="flex w-fit items-center text-base/none font-bold text-gray-500/60"></p>
      </div>
    </div>
  );
};

export default RestaurantCard;
