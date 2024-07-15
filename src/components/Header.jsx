import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  IconHomeFilled,
  IconMenu2,
  IconSearch,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";
import UserContext from "../utils/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firbase/firbase";
import SearchContext from "../utils/SearchContext";
import { getCityAPI } from "../utils/constants";
import { set } from "firebase/database";

const Header = ({ onAPIKeyChange }) => {
  const naviator = useNavigate();
  const { setSearch } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const [openSort, setOpenSort] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationName, setLocationName] = useState("Pune");
  const [isLocationBarVisible, setIsLocationBarVisible] = useState(false);
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

  const menuItems = [
    { to: "/home", title: "Home", text: "Home" },
    { to: "/about", title: "About", text: "About" },
    { to: "/contact", title: "Contact", text: "Contact" },
    { to: "/cart", title: "Cart", text: "Cart", isCart: true },
  ];

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

  const handleLocationBar = () => {
    setIsLocationBarVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            cityName,
          )}&key=3b5dfc8119d5483b8f277c1ec4aff30d`,
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
      <div className="bg-black py-3 pt-5">
        <div className="flex items-center justify-between border-b border-white/20 px-4 pb-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
          <div className="flex items-center gap-4">
            <div className="hidden bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 bg-clip-text text-2xl font-black tracking-tight text-transparent md:block lg:block xl:block 2xl:block">
              EatNow{" "}
            </div>
            <div
              className="inline-flex w-fit cursor-pointer flex-col gap-2 "
              onClick={() => setIsLocationBarVisible(!isLocationBarVisible)}
            >
              <p className="inline-block text-base/3 font-bold text-white">
                <IconHomeFilled
                  size={14}
                  strokeWidth={2}
                  color="white"
                  className="mx-2 inline-block scale-150"
                />
                Home
              </p>
              <p className="ml-2 line-clamp-1 inline-block max-w-[30ch] text-balance text-sm/4 font-medium text-gray-50">
                D - 33, 2nd Floor, Noida...
              </p>
              <div
                className={`2xl:1/4 fixed left-0 top-0 z-[999] ${isLocationBarVisible ? "translate-x-0" : "-translate-x-full"} h-screen w-full rounded-r-lg bg-[#050505] text-[#0008] transition-all duration-500 ease-in-out md:w-1/2 lg:w-1/4 xl:w-1/4`}
              >
                <div
                  onClick={() => setIsLocationBarVisible(!isLocationBarVisible)}
                  className="absolute right-2 top-7 grid size-8 w-fit cursor-pointer place-items-center rounded-full bg-[#202020] px-2"
                >
                  <IconX color="gray" size={20} strokeWidth={3} />
                </div>
                <div className="relative right-0 ml-6 mt-20 flex w-[80%] items-center overflow-hidden rounded-full border border-black/50 bg-[#212529] px-5 pb-2 pt-3">
                  <input
                    placeholder="Enter your city"
                    className="w-full bg-transparent text-white placeholder:text-xl placeholder:font-bold placeholder:text-gray-500 focus:outline-none"
                    type="text"
                    id="cityInput"
                    value={cityName}
                    onChange={(e) => {
                      setCityName(e.target.value);
                    }}
                  />
                  <IconSearch
                    className=""
                    onClick={() => {
                      handleLocationBar;
                      setLocationName(cityName);
                      onAPIKeyChange(
                        getCityAPI(position.latitude, position.longitude),
                      );
                    }}
                    color="gray"
                    size={26}
                    strokeWidth={3}
                  />
                </div>
                <ul className="text-3xl font-bold leading-loose">
                  <Link to="home">
                    <p
                      onClick={() => {
                        onAPIKeyChange(getCityAPI(18.516726, 73.856255));
                        setLocationName("Pune");
                        handleLocationBar;
                      }}
                      className="mt-6 border-b border-white/5 py-2 pl-6 text-white transition-all duration-300 ease-in-out hover:bg-[#202020]"
                    >
                      Pune
                    </p>
                  </Link>
                  <li className="border-b border-white/5 text-white hover:bg-[#202020]">
                    <div className="">
                      <Link to="home">
                        <p
                          onClick={() => {
                            HandleShimmer();
                            onAPIKeyChange(getCityAPI(19.0759837, 72.8776559));
                            setLocationName("Mumbai");
                            handleLocationBar;
                          }}
                          className="border-b border-white/5 py-2 pl-6 text-white transition-all duration-300 ease-in-out hover:bg-[#202020]"
                        >
                          Mumbai
                        </p>
                      </Link>
                    </div>
                  </li>
                  <li className="border-b border-white/5 text-white hover:bg-[#202020]">
                    <div
                      className=""
                      onClick={() => {
                        document.querySelector("body").style.backgroundColor =
                          "white";
                        document.querySelector(
                          "body",
                        ).style.transitionDuration = "3s";
                        onAPIKeyChange(getCityAPI(12.9715987, 77.5945627));
                        setLocationName("Bangalore");
                        handleLocationBar;
                      }}
                    >
                      <Link to="home">
                        <p className="border-b border-white/5 py-2 pl-6 text-white transition-all duration-300 ease-in-out hover:bg-[#202020]">
                          Bangalore
                        </p>
                      </Link>
                    </div>
                  </li>
                  <li className="border-b border-white/5 text-white hover:bg-[#202020]">
                    <div
                      className=""
                      onClick={() => {
                        document.querySelector("body").style.backgroundColor =
                          "white";
                        document.querySelector(
                          "body",
                        ).style.transitionDuration = "1s";
                        onAPIKeyChange(getCityAPI(19.1485289, 77.3191471));
                        setLocationName("Nanded");
                        handleLocationBar;
                      }}
                    >
                      <Link to="home">
                        <p className="border-b border-white/5 py-2 pl-6 text-white transition-all duration-300 ease-in-out hover:bg-[#202020]">
                          Nanded
                        </p>
                      </Link>
                    </div>
                  </li>
                  <li className="border-b border-white/5 text-white hover:bg-[#202020]">
                    <div
                      className=""
                      onClick={() => {
                        document.querySelector("body").style.backgroundColor =
                          "white";
                        document.querySelector(
                          "body",
                        ).style.transitionDuration = "1s";
                        onAPIKeyChange(
                          getCityAPI(28.7040592, 77.10249019999999),
                        );
                        setLocationName("Delhi");
                        handleLocationBar;
                      }}
                    >
                      <Link to="home">
                        <p className="border-b border-white/5 py-2 pl-6 text-white transition-all duration-300 ease-in-out hover:bg-[#202020]">
                          Delhi
                        </p>
                      </Link>
                    </div>
                  </li>
                  <li className="border-b border-white/5 text-white hover:bg-[#202020]">
                    <div
                      className=""
                      onClick={() => {
                        document.querySelector("body").style.backgroundColor =
                          "white";
                        document.querySelector(
                          "body",
                        ).style.transitionDuration = "1s";
                        onAPIKeyChange(getCityAPI(17.385044, 78.486671));
                        setLocationName("Hyderabad");
                        handleLocationBar;
                      }}
                    >
                      <Link to="home">
                        <p className="border-b border-white/5 py-2 pl-6 text-white transition-all duration-300 ease-in-out hover:bg-[#202020]">
                          Hyderabad
                        </p>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center rounded-full border border-white/25 bg-transparent px-4 py-1.5 md:flex lg:flex xl:flex 2xl:flex">
              <input
                type="text"
                className="inline-block w-full bg-transparent text-base/none text-gray-200 placeholder:text-gray-200 focus:outline-none"
                placeholder={`Search restaurants near you`}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setSearch(e.target.value);
                }}
              />
              <IconSearch
                size={24}
                color="white"
                className="ml-auto inline-block cursor-pointer"
              />
            </div>

            <div>
              <IconMenu2
                size={28}
                strokeWidth={2.5}
                color="white"
                className="inline-block cursor-pointer"
                onClick={handleOpenMenu}
              />
            </div>
          </div>

          <div
            className={`${
              menuOpen ? "translate-x-0" : "translate-x-[100%]"
            } fixed bottom-0 right-0 top-0 z-[99999] grid size-full w-full place-items-center rounded-l-3xl border border-white/30 bg-[#050505]/75 filter backdrop-blur-md transition-all duration-500 ease-in-out md:w-2/3 lg:w-1/4 xl:w-1/4 2xl:w-1/4`}
          >
            <div
              onClick={handleOpenMenu}
              className="absolute right-3 top-5 grid size-8 cursor-pointer place-items-center rounded-full bg-gray-700"
            >
              <IconX size={20} strokeWidth={3} color="white" className="" />
            </div>

            <div className="flex w-full flex-col gap-12 pl-10 font-bold">
              {menuItems.map((item) =>
                item.isCart ? (
                  <Link
                    key={item.to}
                    to={item.to}
                    title={item.title}
                    className="group border-b border-white/15 pb-3 text-3xl font-bold text-white"
                    onClick={handleOpenMenu}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{item.text}</span>
                      <span className="inline-block grid size-11 place-items-center rounded-full bg-[#252525]">
                        <span className="text-3xl">{ItemCount.length}</span>
                      </span>
                    </div>
                  </Link>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    title={item.title}
                    className="border-b border-white/15 pb-3 text-3xl font-bold text-white"
                    onClick={handleOpenMenu}
                  >
                    {item.text}
                  </Link>
                ),
              )}

              <p
                onClick={handleSort}
                className="relative flex cursor-pointer items-center gap-1"
              >
                <span className="flex w-full items-center gap-1 border-b border-white/15 pb-2 text-3xl font-bold text-white">
                  <IconUserCircle
                    size={28}
                    strokeWidth={2.5}
                    color="white"
                    className="relative top-1 inline-block"
                  />
                  {user?.displayName}
                </span>
                <div
                  className={`${
                    openSort ? "block" : "hidden"
                  } absolute right-2 top-10 z-[999] rounded-md border border-black/10 bg-white shadow-2xl`}
                >
                  {sortingOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={option.func}
                      className="font-sfb block w-full min-w-fit whitespace-nowrap border-b border-black/10 px-4 py-2 text-left text-sm/none text-gray-500 hover:bg-gray-200"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </p>
            </div>
          </div>
        </div>

        <div className="m-3 flex items-center rounded-xl border border-white bg-transparent px-4 py-3 md:hidden lg:hidden xl:hidden 2xl:hidden">
          <input
            type="text"
            className="inline-block w-full bg-transparent text-xl font-semibold text-gray-200 placeholder:text-gray-200 focus:outline-none"
            placeholder={`Search restaurants near you`}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setSearch(e.target.value);
            }}
          />
          <IconSearch
            size={24}
            color="white"
            className="ml-auto inline-block cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
