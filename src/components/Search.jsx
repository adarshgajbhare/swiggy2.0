import React, { useState } from "react";

const Search = ({ resData, setFilteredListOfRestaurant }) => {
  const [searchText, setSearchText] = useState("");

  const searchFilter = () => {
    const searchFilterList = resData.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );

    //console.log(searchFilterList);
    if (searchFilter.length === 0) {
    }
    setFilteredListOfRestaurant(searchFilterList);
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

  return (
<div className=" flex justify-between items-center mr-12">
  <div className="flex text-white">
{/* mr-4 inline-block outline-none cursor-pointer   h-10 px-6 py-1 
 text-sm font-semibold  border rounded-lg text-white bg-[#fc8019] 
 border-[#fc8019] shadow-sm transition duration-200 ease-in-out 
 hover:bg-[#fc8019] hover:border-[#fc8019] focus:outline-none 
 focus:border-[#fc8019] focus:ring ring-[#fc8019] */}
  <button onClick={allRated} className="btn-search  mr-4 bg-[#fc8019] text-white font-bold">
  Popular
      </button>
  <button onClick={topRated} className="btn-search  mr-4 bg-[#fc8019] text-white font-bold">
  Top Rated
      </button>
  <button onClick={lowRated} className=" btn-search  mr-4  bg-[#fc8019] text-white font-bold">
  Low Rated
      </button>

  </div>

  <form >
    <div className="ml-96 flex justify-center items-center   px-2 py-1   rounded-lg  shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]">
      <input
        type="text"
        placeholder="Search your favorite food..."
        className="outline-0  placeholder-[#3d4152b5] p-1  py-1 rounded-md "
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <svg
        onClick={searchFilter}
        className=" cursor-pointer relative right-4"
        viewBox="5 -1 12 25"
        height="20"
        width="20"
        fill="#686b78"
      >
        <path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path>
      </svg>
    </div>
  </form>

</div>


  );
};

export default Search;
