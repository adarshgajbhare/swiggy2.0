import { useState } from "react";
import RestaurantMenuItems from "./RestaurantMenuItems";
const RestaurantMenuCategory = (data ) => {

const [showItems, setShowItems] = useState(false);

  const handleMenuShow = () => {
  //  setShowIndex()
     setShowItems(!showItems)
  };
  return (
    <div>
      <div className="w-6/12  m-auto mx-auto my-4 bg-white text-center   p-1 ">
        <div className=" flex justify-between cursor-pointer"onClick={handleMenuShow} >
          <span className="font-bold text-lg ">
            {" "}
            {data?.data?.title} ({data?.data?.itemCards.length})
          </span> 
          <span className={` ${showItems ? 'rotate-180' : ''} `}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-caret-down-square" viewBox="0 0 16 16"> <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z"/> <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"/> </svg>
          </span>
        </div>
        {showItems && <RestaurantMenuItems items={data?.data?.itemCards} />}
        <div className=" h-4 border-b-[16px] border-gray-300  pt-3"></div>
      </div>
    </div>
  );
};

export default RestaurantMenuCategory;


