import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link, useOutletContext } from "react-router-dom";
import Search from "./Search";
import Shimmer from "./Shimmer";
import useFetchData from "../utils/useFetchData";
import MyLocation from "../utils/MyLocation";

const BodyLayout = () => {
  const api = useOutletContext();
  const { data, loading } = useFetchData(api);
  const [filteredListOfRestaurant, setFilteredListOfRestaurant] = useState([]);
  const [showShimmer, setShowShimmer] = useState(true);

  useEffect(() => {
    setFilteredListOfRestaurant(data);
    setShowShimmer(true); // Show shimmer when API changes
  }, [api, data]);

  useEffect(() => {
    // Hide shimmer after 2 seconds
    const shimmerTimeout = setTimeout(() => {
      setShowShimmer(false);
    }, 2000);

    return () => clearTimeout(shimmerTimeout);
  }, [api]);

  return (
    <>
      {showShimmer && <Shimmer />}
      <div className="body">
        <div className="flex">
          <p className="text-2xl font-bold opacity-70 text-black ml-9 flex-none relative top-2">
            Top restaurants near you
          </p>
          <Search
            filteredListOfRestaurant={filteredListOfRestaurant}
            resData={data}
            setFilteredListOfRestaurant={setFilteredListOfRestaurant}
          />
        </div>
        <div className="body">
          <div className="res-container">
            {filteredListOfRestaurant &&
              filteredListOfRestaurant.map((restaurant) => (
                <Link key={restaurant?.info?.id} to={`/menu/${restaurant?.info?.id}`}>
                  <RestaurantCard resData={restaurant?.info} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyLayout;
