import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCityAPI } from "../utils/constants";
import {
  IconLocation,
  IconMenu,
  IconMenu2,
  IconSearch,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";
import UserContext from "../utils/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firbase/firbase";
import SearchContext from "../utils/SearchContext";

const Header = ({ onAPIKeyChange, resData, setFilteredListOfRestaurant }) => {
  const naviator = useNavigate();
  const { setSearch } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const [openSort, setOpenSort] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationName, setLocationName] = useState("Pune");
  const [isLocationBarVisible, setIsLocationBarVisible] = useState(true);
  const [, setShowShimmer] = useState(false);
  const [searchText, setSearchText] = useState("");

  const ItemCount = useSelector((store) => store.cart.items);

  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const [cityName, setCityName] = useState("");
  const [, setLoading] = useState(false);

  const handleSort = () => {
    setOpenSort((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("User logged out");

    signOut(auth)
      .then(() => {
        console.log("user logged out successfully!!");
        naviator("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const sortingOptions = [
    { id: 1, label: "Profile", value: "profile" },
    { id: 2, label: "Order", value: "order" },
    { id: 3, label: "Logout", value: "logout", func: handleLogout },
    { id: 4, label: "Favourite", value: "fav" },
  ];

  const HandleShimmer = () => {
    setShowShimmer(true);

    setTimeout(() => {
      setShowShimmer(false);
    }, 2000);
  };

  const handleOpenMenu = () => {
    setMenuOpen((prev) => !prev);
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
        className={`fixed text-[#0008]  h-screen lg:w-1/4 z-[999] xl:w-1/4 2xl:1/4 md:w-1/2 w-full left-0 top-0  bg-[#050505]  ${isLocationBarVisible ? " -translate-x-[100%] " : ""
          } transition-all duration-500 ease-in-out   rounded-r-lg`}>
        <div
          className="bg-[#202020] w-fit p-3 absolute cursor-pointer top-7 right-2 rounded-full"
          onClick={() => {
            setIsLocationBarVisible((prev) => !prev);
          }}>
          <IconX color="gray" size={26} strokeWidth={3} />
        </div>

        <div className=" px-5 bg-[#212529] mt-20 border pb-2 pt-3 border-black/50 rounded-full flex items-center overflow-hidden w-[80%] relative right-0   ml-6 ">
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
              onAPIKeyChange(getCityAPI(position.latitude, position.longitude));
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
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "1s";
                onAPIKeyChange(getCityAPI(18.516726, 73.856255));
                setLocationName("Pune");
                setIsLocationBarVisible((prev) => !prev);
              }}
              className="text-white pl-6 hover:bg-[#202020] border-b border-white/5 py-2 transition-all duration-300 ease-in-out  mt-6">
              Pune
            </p>
          </Link>
          <li className=" text-white  hover:bg-[#202020] border-b border-white/5">
            <div className="">
              <Link to="home">
                <p
                  onClick={() => {
                    document.querySelector("body").style.backgroundColor =
                      "white";
                    document.querySelector("body").style.transitionDuration =
                      "1s";
                    HandleShimmer();
                    onAPIKeyChange(getCityAPI(19.0759837, 72.8776559));
                    setLocationName("Mumbai");
                    setIsLocationBarVisible((prev) => !prev);
                  }}
                  className="text-white pl-6 hover:bg-[#202020] border-b border-white/5 py-2 transition-all duration-300 ease-in-out">
                  Mumbai
                </p>
              </Link>
            </div>
          </li>
          <li className=" text-white  hover:bg-[#202020] border-b border-white/5">
            <div
              className=""
              onClick={() => {
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "3s";
                onAPIKeyChange(getCityAPI(12.9715987, 77.5945627));
                setLocationName("Bangalore");
                setIsLocationBarVisible((prev) => !prev);
              }}>
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
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "1s";
                onAPIKeyChange(getCityAPI(19.1485289, 77.3191471));
                setLocationName("Nanded");
                setIsLocationBarVisible((prev) => !prev);
              }}>
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
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "1s";
                onAPIKeyChange(getCityAPI(28.7040592, 77.10249019999999));
                setLocationName("Delhi");
                setIsLocationBarVisible((prev) => !prev);
              }}>
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
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "1s";
                onAPIKeyChange(getCityAPI(17.385044, 78.486671));
                setLocationName("Hyderabad");
                setIsLocationBarVisible((prev) => !prev);
              }}>
              <Link to="home">
                <p className="text-white pl-6 hover:bg-[#202020] border-b border-white/5 py-2 transition-all duration-300 ease-in-out">
                  Hyderabad
                </p>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <nav className="border-b border-white/15 px-2 fixed py-3 right-0 left-0 top-0 w-full bg-[#050505] z-50 justify-between  flex  items-center">
        <div className="flex items-center gap-6 w-full justify-between lg:justify-center  md:justify-center   xl:justify-center  2xl:justify-center mr-auto ">
          <div
            onClick={() => {
              setIsLocationBarVisible(!isLocationBarVisible);
            }}
            className="relative cursor-pointer bg-[#252525]  px-4 py-2 rounded-full size-fit gap-1 flex items-center scale-75">
            <IconLocation color="gray" size={16} strokeWidth={3} />
            <p className=" text-lg font-bold cursor-pointer  text-gray-500 transition-all duration-300 ease-in-out">
              {locationName || cityName}
            </p>
          </div>
          <Link
            to="home"
            title="Home"
            aria-label="home"
            className="text  mr-32">
            <span className="font-black text-xl  md:text-2xl xl:text-2xl lg:text-2xl 2xl:text-2xl bg-gradient-to-r from-orange-300 via-orange-500 tracking-tight to-orange-600 bg-clip-text text-transparent">
              EatNow
            </span>
          </Link>
        </div>
        <div
          className={`${menuOpen ? "translate-x-0 " : "translate-x-[100%]"
            } fixed inset-0  transition-all duration-500 ease-in-out size-full bg-[#050505] z-[99999]`}>
          <IconX
            size={30}
            strokeWidth={3}
            color="white"
            className="absolute right-4 top-4  "
            onClick={handleOpenMenu}
          />

          <div className=" lg:hidden xl:hidden 2xl:hidden md:hidden flex-col flex px-6 gap-8 text-xl font-bold mt-16">
            <form>
              <div className=" flex items-center justify-between rounded-full py-3 px-4  bg-[#252525]">
                <input
                  type="text"
                  placeholder="Search for restaurants"
                  className="outline-none bg-transparent text-white  placeholder:text-gray-500/70 font-semibold text-xl"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setSearch(e.target.value);
                  }}
                />
                <IconSearch
                  className="cursor-pointer"
                  color="gray"
                  size={28}
                  strokeWidth={3}
                  onClick={handleOpenMenu}
                />
              </div>
            </form>
            <Link
              to="/home"
              title="home"
              className="   text-white"
              onClick={handleOpenMenu}>
              <span className="  text-white text-4xl font-bold my-3 ">
                {" "}
                Home
              </span>
            </Link>
            <Link
              to="/about"
              title="about"
              className="    text-white text-4xl font-bold my-3 "
              onClick={handleOpenMenu}>
              About
            </Link>
            <Link
              to="/contact"
              title="contact"
              className="  text-white text-4xl font-bold my-3 "
              onClick={handleOpenMenu}>
              Contact
            </Link>
            <p
              onClick={handleSort}
              className="relative flex items-center gap-1   cursor-pointer">
              <IconUserCircle
                size={46}
                strokeWidth={2}
                color="white"
                className="inline-block"
              />
              <span className="text-white text-4xl font-bold my-3 ">
                {" "}
                {user?.displayName}
              </span>
              <div
                className={`${openSort ? "block" : "hidden"
                  } absolute top-10 right-2 z-[999] rounded-md border border-black/10 bg-white shadow-2xl`}>
                {sortingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={option.func}
                    className="font-sfb block  w-full min-w-fit whitespace-nowrap border-b border-black/10 px-4 py-2 text-left text-sm/none text-gray-500 hover:bg-gray-200">
                    {option.label}
                  </button>
                ))}
              </div>
            </p>
            <Link
              to="/cart"
              title="cart"
              className=" group   text-white text-4xl font-bold my-3  "
              onClick={handleOpenMenu}>
              <div className="flex  items-center">
                <span className="mr-2">Cart</span>
                <span className="bg-[#252525] inline-block size-11 grid place-items-center rounded-full ">
                  <span className="text-3xl">{ItemCount.length}</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
        <IconMenu2
          size={28}
          strokeWidth={3}
          color="white"
          className="lg:hidden  xl:hidden 2xl:hidden md:hidden ml-auto"
          onClick={handleOpenMenu}
        />

        <div className=" lg:flex xl:flex 2xl:flex md:flex hidden items-center gap-8 text-xl font-bold">
          <form>
            <div className=" flex items-center rounded-full py-2 px-4  bg-[#252525]">
              <input
                type="text"
                placeholder="Search for restaurants"
                className="outline-none bg-transparent text-white  placeholder:text-gray-500/70 font-semibold text-lg"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setSearch(e.target.value);
                }}
              />
              <IconSearch
                className="cursor-pointer"
                color="gray"
                size={20}
                strokeWidth={3}
              />
            </div>
          </form>
          <Link to="/home" title="home" className="   text-white">
            <span className="  text-white"> Home</span>
          </Link>
          <Link to="/about" title="about" className="    text-white">
            About
          </Link>
          <Link to="/contact" title="contact" className="  text-white">
            Contact
          </Link>
          <p
            onClick={handleSort}
            className="relative flex items-center gap-1   cursor-pointer">
            <IconUserCircle
              size={26}
              strokeWidth={2}
              color="white"
              className="inline-block"
            />
            <span className="text-white"> {user?.displayName}</span>
            <div
              className={`${openSort ? "block" : "hidden"
                } absolute top-10 right-2 z-[999] rounded-md border border-black/10 bg-white shadow-2xl`}>
              {sortingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={option.func}
                  className="font-sfb block  w-full min-w-fit whitespace-nowrap border-b border-black/10 px-4 py-2 text-left text-sm/none text-gray-500 hover:bg-gray-200">
                  {option.label}
                </button>
              ))}
            </div>
          </p>
          <Link to="/cart" title="cart" className=" group   text-white">
            <div>
              <span className="mr-2">Cart</span>
              <span className="bg-[#252525]  pl-3 pr-[13px] pt-[1px] pb-[4px] rounded-full ">
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
