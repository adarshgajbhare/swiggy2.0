import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link, useOutletContext } from "react-router-dom";
import Search from "./Search";
import Shimmer from "./Shimmer";
import useFetchData from "../utils/useFetchData";
import MyLocation from "../utils/MyLocation";
import useFetchBanner from "../utils/useFetchBanner";

const BodyLayout = () => {
  const api = useOutletContext();
  const { data, loading } = useFetchData(api);
  const [filteredListOfRestaurant, setFilteredListOfRestaurant] = useState([]);
  const [showShimmer, setShowShimmer] = useState(true);

  const { dataBanner, loading1 } = useFetchBanner(api);
  console.log(dataBanner, " 0000000000000");


  useEffect(() => {
    setFilteredListOfRestaurant(data);
    setShowShimmer(true); // Show shimmer when API changes
  }, [api, data]);

  // console.log(data, "data");

  useEffect(() => {
    // Hide shimmer after 2 seconds
    const shimmerTimeout = setTimeout(() => {
      setShowShimmer(false);
    }, 2000);

    return () => clearTimeout(shimmerTimeout);
  }, [api]);

  return (
    <>
      {/* {showShimmer && <Shimmer />} */}
      <div className="bg-[#101010] ">
        <div className="flex mt-10 ml-6">
       
          <Search
            filteredListOfRestaurant={filteredListOfRestaurant}
            resData={data}
            setFilteredListOfRestaurant={setFilteredListOfRestaurant}
          />
        </div>

        <div className=" w-2/3 ml-40 grid lg:grid-cols-[repeat(4,_1fr)] grid-cols-[repeat(1,_1fr)] gap-14">
          {filteredListOfRestaurant &&
            filteredListOfRestaurant.map((restaurant) => (
              <Link
                key={restaurant?.info?.id}
                to={`/menu/${restaurant?.info?.id}`}
              >
                <RestaurantCard resData={restaurant?.info} />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default BodyLayout;
