import { useState } from "react";
import RestaurantMenuItems from "./RestaurantMenuItems";
import { IconChevronDown, IconSquareChevronDownFilled } from "@tabler/icons-react";
const RestaurantMenuCategory = (data ) => {

const [showItems, setShowItems] = useState(false);

  const handleMenuShow = () => {
  //  setShowIndex()
     setShowItems(!showItems)
  };
  return (
    <div>
      <div className="lg:w-1/2 md:w-1/2 xl:w-1/2 2xl:w-1/2  m-auto mx-auto my-4  text-center ">
        <div className=" flex bg-black justify-between cursor-pointer"onClick={handleMenuShow} >
          <span className="font-bold pl-4 text-3xl mb-3">
            {" "}
            {data?.data?.title} ({data?.data?.itemCards.length})
          </span> 
          <span className={` ${showItems ? 'rotate-180' : ''} `}>
          <IconSquareChevronDownFilled size={36} color="gray"/>
          </span>
        </div>
        {showItems && <RestaurantMenuItems items={data?.data?.itemCards} />}
      
      </div>
    </div>
  );
};

export default RestaurantMenuCategory;


