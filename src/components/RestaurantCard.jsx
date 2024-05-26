/* eslint-disable no-unused-vars */
import {
  IconPointFilled,
  IconStarFilled,
} from "@tabler/icons-react";
import { CARD_IMG } from "../utils/constants";
import AddToCartButton from "./AddToCartButton";
const RestaurantCard = ({ resData }) => {
  const { name, cuisines, avgRating, sla, cloudinaryImageId, costForTwo, aggregatedDiscountInfoV3 } =
    resData || {};

   

  const cardStyle = {
    backgroundImage: `url(${
      cloudinaryImageId ? CARD_IMG + cloudinaryImageId : ""
    })`,
  };

  return (
    <div className="h-72 w-60 flex flex-col gap-3 relative rounded-3xl overflow-hidden">
      <div className="imgb relative h-44  rounded-3xl overflow-hidden " style={cardStyle}>

      <div className="absolute flex inset-0 size-full bg-gradient-to-t from-black/75 from-5%">
       <p className="absolute bottom-2 left-4 w-full text-white font-black text-xl">{aggregatedDiscountInfoV3?.header} {aggregatedDiscountInfoV3?.subHeader ? aggregatedDiscountInfoV3?.subHeader : "10% OFF UPTO ₹40"} </p>
       </div>
 
      </div>
      
      <div className=" px-2 ">
          <p className="text-xl  line-clamp-1 font-bold tracking-tight text-white">
            {name}
          </p>
          <p className="text-sm/none  w-fit font-bold flex items-center text-gray-300">
            <span className="bg-green-600 -ml-1.5 p-1.5 relative bottom-[1px] scale-[0.6] rounded-full">
              <IconStarFilled
                className="inline-block  "
                size={16}
                strokeWidth={2}
                color="white"
              />
            </span>
            <span className="text-sm/none flex items-center font-bold text-gray-300">
              {avgRating}
              <IconPointFilled size={10} color="gray" className="mx-[2px]" />{" "}
            {sla?.slaString.split(" ")[0]} mins
            </span>
          </p>

          <p className="text-base/none  inline-block relative bottom-1  rounded-full font-bold tracking-tighter w-fit  text-orange-400">
            {cuisines && cuisines.length > 0
              ? cuisines.join(", ").toLowerCase().split(",")[0]
              : "N/A"}
          </p>
          <p className="text-lg font-bold mb-[1px] relative bottom-1 text-gray-300">
            {costForTwo.split(" ")[0]}{" "}
            <span className="text-xs/none italic text-gray-500/75">for two</span>{" "}
          </p>

     
          <p className="text-base/none w-fit   flex   font-bold text-gray-500/60 items-center ">
          

          </p>
        </div>
      
      <AddToCartButton />
    </div>
  );
};

export default RestaurantCard;
