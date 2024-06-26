/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link, useOutletContext } from "react-router-dom";
import Search from "./Search";
import useFetchData from "../utils/useFetchData";
import useFetchBanner from "../utils/useFetchBanner";
import { CARD_IMG } from "../utils/constants";
/* eslint-disable no-unused-vars */
import {} from "@tabler/icons-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BodyLayout = () => {
  const api = useOutletContext();
  const { data, loading } = useFetchData(api);
  const [filteredListOfRestaurant, setFilteredListOfRestaurant] = useState([]);
  const [showShimmer, setShowShimmer] = useState(true);

  const { dataBanner, loading1 } = useFetchBanner(api);

  const {
    name,
    cuisines,
    avgRating,
    sla,
    cloudinaryImageId,
    costForTwo,
    aggregatedDiscountInfoV3,
  } = data?.info || {};

  const cardStyle = {
    backgroundImage: `url(${
      cloudinaryImageId ? CARD_IMG + cloudinaryImageId : ""
    })`,
  };

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

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
  };

  return (
    <>
      <div className="overflow-auto bg-[#050505]">
        {/* <div className="fixed left-1/2 top-0 size-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/80 blur-[200px] filter"></div> */}
        <h1 className="relative mb-8 mt-4 flex w-full items-center px-2 text-2xl font-bold text-white lg:ml-28 lg:text-3xl md:xl:text-3xl xl:ml-28 xl:text-3xl 2xl:ml-28">
          <span className="inline-block">What's on your mind</span>
        </h1>

        <div className="relative mx-auto mt-4 flex cursor-pointer flex-nowrap  gap-4 overflow-x-scroll whitespace-nowrap rounded-xl  px-2 lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          {/* <Slider {...settings} slidesToShow={5}> */}
            {dataBanner &&
              dataBanner.map((banner) => (
                <div
                  key={banner?.id}
                  className="relative h-40 max-w-40 shrink-0 overflow-hidden rounded-3xl "
                >
                  <img
                    src={CARD_IMG + banner?.imageId}
                    className="aspect-square h-full w-full object-cover object-center"
                  />
                </div>
              ))}
          {/* </Slider> */}
        </div>
        <div className="relative mb-8 mt-16 flex w-full items-center px-2 text-2xl font-bold text-white lg:ml-28 lg:text-3xl md:xl:text-3xl xl:ml-28 xl:text-3xl 2xl:ml-28">
          <span className="inline-block">Top restaurants near you</span>
        </div>

        <div className="relative mx-auto mt-4 flex flex-nowrap gap-6 overflow-x-scroll whitespace-nowrap rounded-lg px-2 lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
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

        <div className="relative z-50 ml-6 flex">
          <Search
            filteredListOfRestaurant={filteredListOfRestaurant}
            resData={data}
            setFilteredListOfRestaurant={setFilteredListOfRestaurant}
          />
        </div>

        <h1 className="relative mb-8 flex w-full items-center px-2 text-2xl font-bold text-white md:text-3xl lg:ml-28 lg:text-3xl xl:ml-28 xl:text-3xl 2xl:ml-28">
          <span className="inline-block">
            Restaurants with online food delivery in Mumbai
          </span>
        </h1>

        <div className="lg:ml-28 relative mb-44 grid grid-cols-[repeat(2,_1fr)] gap-2 px-2 md:grid-cols-[repeat(3,_1fr)] lg:w-2/3 lg:grid-cols-[repeat(4,_1fr)] lg:gap-14 xl:ml-28 xl:w-2/3 xl:grid-cols-[repeat(4,_1fr)] xl:gap-8 2xl:ml-28 2xl:w-2/3 2xl:grid-cols-[repeat(4,_1fr)] 2xl:gap-14">
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
