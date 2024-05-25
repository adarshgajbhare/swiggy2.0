import { IconStarFilled } from "@tabler/icons-react";
import { CARD_IMG } from "../utils/constants";
import AddToCartButton from "./AddToCartButton";
const RestaurantCard = ({ resData }) => {
  const { name, cuisines, avgRating, sla, cloudinaryImageId, costForTwo } =
    resData || {};

  const cardStyle = {
    backgroundImage: `url(${
      cloudinaryImageId ? CARD_IMG + cloudinaryImageId : ""
    })`,
  };

  return (
    <div className="h-96 relative rounded-md overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,1)]">
      <div className="absolute flex inset-0 size-full bg-gradient-to-t from-black via-black/25 to-black/0">
  <div className=" px-3 pb-3 mt-auto w-full">
      
        <p className="text-3xl/none font-bold tracking-tight text-white">{name}</p>
        <p className="text-[0.75rem]/none my-1 inline-block bg-[#e9ecef] rounded-full border-[1px] border-gray-600/50 px-2 pt-1 pb-[1px] w-fit font-semibold text-gray-500">
          {cuisines && cuisines.length > 0
            ? cuisines.join(", ").split(",")[0]
            : "N/A"}
        </p>
        <p className="text-xl font-bold mb-[1px] text-gray-300">
          {costForTwo.split(" ")[0]} <span className="text-xs italic text-gray-400">for two</span>{" "}
        </p>
        <p className="text-base/none absolute border border-green-500 top-3 right-3 bg-[#b7e4c7] rounded-lg w-fit px-2 py-1 font-bold flex items-center text-gray-400">
        <IconStarFilled className="inline-block mr-1 "  size={14} strokeWidth={2} color="#2b9348"/>
          <span className="text-base/none font-bold text-green-500">{avgRating}</span>
        </p>
      
        <p className="text-sm font-medium text-gray-500">
          {sla?.lastMileTravelString}, {sla?.slaString.split(" ")[0]} mins
          delivery time{" "}
        </p>
      </div>
      </div>
      <div className="imgb" style={cardStyle}></div>
      <AddToCartButton />
    
    </div>
  );
};

export default RestaurantCard;
