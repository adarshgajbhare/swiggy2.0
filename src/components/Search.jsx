import { IconChevronDown } from "@tabler/icons-react";
import  { useState } from "react";

const Search = ({ resData, setFilteredListOfRestaurant }) => {
 

  const [openSort, setOpenSort] = useState(false);

  const handleSort = () => {
    setOpenSort((prev) => !prev);
  };



  const topRated = () => {
    const topRatedList = resData.filter((restaurant) => {
      return restaurant.info.avgRating >= 4.5;
    });
   

    setFilteredListOfRestaurant(topRatedList);
  };

  const allRated = () => {
    setFilteredListOfRestaurant(resData);
  };


  const lowRated = () => {
    const lowRatedList = resData.filter((restaurant) => {
      return restaurant.info.avgRating < 4;
    });
   
    setFilteredListOfRestaurant(lowRatedList);
  };
  
  const sortingOptions = [
    { id: 1, label: "Popular", value: "Popular", func: allRated },
    { id: 2, label: "Top Rated", value: "Top Rated", func: topRated },
    { id: 3, label: "Low Rated", value: "Low Rated", func: lowRated },
  ];

  return (
<div className=" flex justify-between items-center mr-12 mt-24">
<button
          onClick={handleSort}
          className="fixed  right-3 top-20 z-40 mb-4 mr-0 inline-flex items-center rounded-3xl border border-white/20 filter back bg-[#252525]/10 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="font-bold text-lg text-gray-50">Sort by</span>
          <IconChevronDown
            size={22}
            strokeWidth={3}
            color="gray"
            className="ml-1"
          />
          <div
            className={`${
              openSort ? "block" : "hidden"
            } absolute top-12 right-2 rounded-md border border-black/10 bg-[#101010]/50 filter backdrop-blur-md shadow-2xl`}
          >
            {sortingOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.func}
                className="font-sfb block w-full min-w-fit whitespace-nowrap border-b border-black/10 px-4 py-2 text-left text-lg/none text-gray-50"
              >
                {option.label}
              </button>
            ))}
          </div>
        </button>

 

</div>


  );
};

export default Search;
