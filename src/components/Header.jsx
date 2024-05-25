import {} from "../utils/constants";
import React, { useContext, useState, useEffect } from "react";
import "../CSS/style.css";
import { Link } from "react-router-dom";
import UserName from "./UserName";
import { useSelector } from "react-redux";
import { getCityAPI } from "../utils/constants";
import {
  IconLocation,
  IconSearch,
  IconUser,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";

const Header = ({ onAPIKeyChange, latitude, longitude }) => {
  const [locationName, setLocationName] = useState("Pune");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLocationBarVisible, setIsLocationBarVisible] = useState(true);
  const [showShimmer, setShowShimmer] = useState(false);
  const { loggedUser } = useContext(UserName);

  const ItemCount = useSelector((store) => store.cart.items);

  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleShimmer = () => {
    setShowShimmer(true);

    setTimeout(() => {
      setShowShimmer(false);
    }, 2000);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            cityName
          )}&key=3b5dfc8119d5483b8f277c1ec4aff30d`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const firstResult = data.results[0].geometry;
          setPosition({
            latitude: firstResult.lat,
            longitude: firstResult.lng,
          });
        } else {
          console.log("No results found for the provided city.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchData();
    }
  }, [cityName]);

  return (
    <>
        <div
            className={`fixed text-[#0008] z-[999] h-screen w-1/4 left-0 top-0  bg-black  ${
              isLocationBarVisible ? " md:translate-x-[-700px]" : ""
            }    rounded-r-lg `}
          >
            <div
              className="bg-[#202020] w-fit p-2 absolute cursor-pointer top-3 right-5 rounded-full"
              onClick={() => {
                {
                  document.querySelector("body").style.backgroundColor =
                    "white";
                  document.querySelector("body").style.transitionDuration =
                    "1s";
                }
                setIsLocationBarVisible((prev) => !prev);
              }}
            >
              <IconX color="gray" size={20} strokeWidth={3} />
            </div>
            <div className=" px-5 bg-[#212529] mt-16 border pb-3 pt-4 border-black/50 rounded-full flex items-center overflow-hidden w-[92%] mx-auto  ">
              <input
                placeholder="Enter your city"
                className="focus:outline-none placeholder:text-gray-500 bg-transparent  placeholder:text-xl placeholder:font-bold w-full    "
                type="text"
                id="cityInput"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              <IconSearch
                className=""
                onClick={() => {
                  setIsLocationBarVisible(!isLocationBarVisible);
                  setLocationName(cityName);
                  onAPIKeyChange(
                    getCityAPI(position.latitude, position.longitude)
                  );
                }}
                color="gray"
                size={26}
                strokeWidth={3}
              />
            </div>
            <ul className="font-bold text-2xl leading-loose   ">
              <Link to="home">
                <p
                  onClick={() => {
                    {
                      document.querySelector("body").style.backgroundColor =
                        "white";
                      document.querySelector("body").style.transitionDuration =
                        "1s";
                    }
                    onAPIKeyChange(getCityAPI(18.516726, 73.856255));
                    setLocationName("Pune");
                    setIsLocationBarVisible((prev) => !prev);
                  }}
                  className="text-white pl-6 hover:bg-[#202020] border-b border-white/5 py-2 transition-all duration-300 ease-in-out  mt-6"
                >
                  Pune
                </p>
              </Link>
              <li className=" text-white  hover:bg-[#202020] border-b border-white/5">
                <div className="">
                  <Link to="home">
                    <p
                      onClick={() => {
                        {
                          document.querySelector("body").style.backgroundColor =
                            "white";
                          document.querySelector(
                            "body"
                          ).style.transitionDuration = "1s";
                        }
                        HandleShimmer;
                        onAPIKeyChange(getCityAPI(19.0759837, 72.8776559));
                        setLocationName("Mumbai");
                        setIsLocationBarVisible((prev) => !prev);
                      }}
                      className="text-white pl-6 hover:bg-[#202020] border-b border-white/5 py-2 transition-all duration-300 ease-in-out"
                    >
                      Mumbai
                    </p>
                  </Link>
                </div>
              </li>
              <li className=" text-white  hover:bg-[#202020] border-b border-white/5">
                <div
                  className=""
                  onClick={() => {
                    {
                      document.querySelector("body").style.backgroundColor =
                        "white";
                      document.querySelector("body").style.transitionDuration =
                        "3s";
                    }
                    onAPIKeyChange(getCityAPI(12.9715987, 77.5945627));
                    setLocationName("Bangalore");
                    setIsLocationBarVisible((prev) => !prev);
                  }}
                >
                  <Link to="home">
                    <p className="text-white pl-6 hover:bg-[#202020] border-b border-white/5 py-2 transition-all duration-300 ease-in-out">
                      Bangalore
                    </p>
                  </Link>
                </div>
              </li>
              <li className=" text-white  hover:bg-[#202020] border-b border-white/5">
                <div
                  className=""
                  onClick={() => {
                    {
                      document.querySelector("body").style.backgroundColor =
                        "white";
                      document.querySelector("body").style.transitionDuration =
                        "1s";
                    }
                    onAPIKeyChange(getCityAPI((lat = 19.1485289), 77.3191471));
                    setLocationName("Nanded");
                    setIsLocationBarVisible((prev) => !prev);
                  }}
                >
                  <Link to="home">
                    <p className="text-white pl-6 hover:bg-[#202020] border-b border-white/5 py-2 transition-all duration-300 ease-in-out">
                      Nanded
                    </p>
                  </Link>
                </div>
              </li>
              <li className=" text-white  hover:bg-[#202020] border-b border-white/5">
                <div
                  className=""
                  onClick={() => {
                    {
                      document.querySelector("body").style.backgroundColor =
                        "white";
                      document.querySelector("body").style.transitionDuration =
                        "1s";
                    }
                    onAPIKeyChange(getCityAPI(28.7040592, 77.10249019999999));
                    setLocationName("Delhi");
                    setIsLocationBarVisible((prev) => !prev);
                  }}
                >
                  <Link to="home">
                    <p className="text-white pl-6 hover:bg-[#202020] border-b border-white/5 py-2 transition-all duration-300 ease-in-out">
                      Delhi
                    </p>
                  </Link>
                </div>
              </li>
              <li className=" text-white  hover:bg-[#202020] border-b border-white/5">
                <div
                  className=""
                  onClick={() => {
                    {
                      document.querySelector("body").style.backgroundColor =
                        "white";
                      document.querySelector("body").style.transitionDuration =
                        "1s";
                    }
                    onAPIKeyChange(getCityAPI(17.385044, 78.486671));
                    setLocationName("Hyderabad");
                    setIsLocationBarVisible((prev) => !prev);
                  }}
                >
                  <Link to="home">
                    <p className="text-white pl-6 hover:bg-[#202020] border-b border-white/5 py-2 transition-all duration-300 ease-in-out">
                      Hyderabad
                    </p>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
    <nav className=" px-6 fixed py-3 right-0 left-0 top-0 w-full bg-black z-50 justify-between  flex  items-center">
      <div className="flex items-center gap-6 ">
        <Link to="home" title="Home" aria-label="home" className="text">
          <span className="font-black">Swiggify</span>
        </Link>

        <div
          onClick={() => {
            setIsLocationBarVisible(!isLocationBarVisible);
          }}
          className="relative cursor-pointer bg-[#252525]  px-4 py-1 rounded-full size-fit gap-2 flex items-center"
        >
          <IconLocation color="white" size={20} strokeWidth={2} />
          <p className=" text-xl font-bold cursor-pointer  text-white transition-all duration-300 ease-in-out">
            {locationName || cityName}
          </p>
      
        </div>
      </div>

      <div className="flex items-center gap-8 text-xl font-bold">
        <Link to="/home" title="home" className="   text-white">
          <span className="  text-white"> Home</span>
        </Link>
        <Link to="/about" title="about" className="    text-white">
          About
        </Link>
        <Link to="/contact" title="contact" className="  text-white">
          Contact
        </Link>
        <p className="   cursor-pointer">
          <IconUserCircle
            size={26}
            strokeWidth={2}
            color="white"
            className="inline-block"
          />
          <span className="text-white"> {loggedUser}</span>
        </p>
        <Link to="/cart" title="cart" className=" group   text-white">
          <div>
            <span className="mr-2">Cart</span>
            <span className="bg-[#252525] px-3 pt-[1px] pb-[3px] rounded-full ">
              <span className="text-sm">{ItemCount.length}</span>
            </span>
          </div>
        </Link>
      </div>
    </nav>
    </>
  );
};

export default Header;
