import { useState } from "react";
import RestaurantMenuItems from "./RestaurantMenuItems";
import {
  IconChevronDown,
  IconPointFilled,
  IconSquareChevronDownFilled,
} from "@tabler/icons-react";
const RestaurantMenuCategory = (data) => {
  const [showItems, setShowItems] = useState(false);

  const handleMenuShow = () => {
    //  setShowIndex()
    setShowItems(!showItems);
  };
  return (
    
      <div className="mx-auto  my-4 w-full text-center">
        <div
          className="mx-3 flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-[#151515] px-3 py-4 text-white"
          onClick={handleMenuShow}
        >
          <div className="text-xl flex items-center w-full  justify-between font-bold ">
            {" "}
            <span className="inline-block">{data?.data?.title}</span>
            <IconPointFilled size={18} strokeWidth={1} color="gray" className="opacity-0" />
             <span className="inline-block">{data?.data?.itemCards.length}</span>
          </div>
          <span className={` ${showItems ? "rotate-180" : ""} `}>
            <IconSquareChevronDownFilled size={28} color="#2d6a4f" />
          </span>
        </div>
        {showItems && <RestaurantMenuItems items={data?.data?.itemCards} />}
      </div>
 
  );
};

export default RestaurantMenuCategory;
