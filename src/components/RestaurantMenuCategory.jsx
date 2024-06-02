import { useState } from "react";
import RestaurantMenuItems from "./RestaurantMenuItems";
import {
  IconChevronDown,
  IconSquareChevronDownFilled,
} from "@tabler/icons-react";
const RestaurantMenuCategory = (data) => {
  const [showItems, setShowItems] = useState(false);

  const handleMenuShow = () => {
    //  setShowIndex()
    setShowItems(!showItems);
  };
  return (
    <div>
      <div className="m-auto mx-auto my-4 text-center md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
        <div
          className="flex cursor-pointer justify-between bg-[#050505]"
          onClick={handleMenuShow}
        >
          <span className="mb-3 pl-4 text-3xl font-bold">
            {" "}
            {data?.data?.title} ({data?.data?.itemCards.length})
          </span>
          <span className={` ${showItems ? "rotate-180" : ""} `}>
            <IconSquareChevronDownFilled size={36} color="gray" />
          </span>
        </div>
        {showItems && <RestaurantMenuItems items={data?.data?.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantMenuCategory;
