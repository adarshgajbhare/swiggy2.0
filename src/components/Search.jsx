import { IconChevronDown } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import SearchContext from "../utils/SearchContext";

const Search = ({ resData, setFilteredListOfRestaurant }) => {
  const { search } = useContext(SearchContext);

  const [openSort, setOpenSort] = useState(false);

  useEffect(() => {
    searchFilter();
  }, [search]);

  const handleSort = () => {
    setOpenSort((prev) => !prev);
  };

  const searchFilter = () => {
    const searchFilterList = resData.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (searchFilterList.length === 0) {
      console.log("nothing found");
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

  const sortingOptions = [
    { id: 1, label: "Popular", value: "Popular", func: allRated },
    { id: 2, label: "Top Rated", value: "Top Rated", func: topRated },
    { id: 3, label: "Low Rated", value: "Low Rated", func: lowRated },
  ];

  return (
    <div className="mr-12 mt-24 flex items-center justify-between">
      <button
        onClick={handleSort}
        className="back absolute -top-[685px] right-4 mb-4 mr-0 inline-flex items-center rounded-3xl border border-white/20 bg-[#252525]/10 px-4 py-1 filter backdrop-blur-md"
      >
        <span className="text-base/none font-medium text-gray-50">Sort by</span>
        <IconChevronDown
          size={22}
          strokeWidth={3}
          color="gray"
          className="ml-1"
        />
        <div
          className={`${
            openSort ? "block" : "hidden"
          } absolute right-2 top-12 rounded-md border border-black/10 bg-[#050505]/50 shadow-2xl filter backdrop-blur-md`}
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
