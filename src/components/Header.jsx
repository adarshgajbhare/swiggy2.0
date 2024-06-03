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
   
    setIsLocationBarVisible((prev) => !prev)
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
      <div className="items-center gap-3 bg-black py-3 pt-5">
        <div className="flex items-center px-3">
          <div className="flex w-full items-center">
            <div
              className="inline-flex w-full cursor-pointer flex-col gap-2 "
              onClick={() => {
                handleLocationBar();
              }}
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
                className={`2xl:1/4 fixed left-0 top-0 z-[999] h-screen w-full bg-[#050505] text-[#0008] md:w-1/2 lg:w-1/4 xl:w-1/4 ${
                  isLocationBarVisible ? "" : "-translate-x-[100%]"
                } rounded-r-lg transition-all duration-500 ease-in-out`}
              >
                <div
                  className="absolute right-2 top-7 w-fit cursor-pointer rounded-full bg-[#202020] p-3 " >
                  <IconX color="gray" size={26} strokeWidth={3}
                  onClick={()=>{handleLocationBar}}  />
                </div>

                <div className="relative right-0 ml-6 mt-20 flex w-[80%] items-center overflow-hidden rounded-full
                 border border-black/50 bg-[#212529] px-5 pb-2 pt-3">
                  <input
                    placeholder="Enter your city"
                    className="w-full bg-transparent placeholder:text-xl placeholder:font-bold placeholder:text-gray-500 focus:outline-none"
                    type="text"
                    id="cityInput"
                    value={cityName}
                    
                    onChange={(e) => {setCityName(e.target.value),setIsLocationBarVisible(isLocationBarVisible)}
                      
                    }
                  />
                  <IconSearch
                    className="border bg-rose-700"
                    onClick={() => {
                       setIsLocationBarVisible(!isLocationBarVisible)
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

                <ul className="text-2xl font-bold leading-loose">
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
                        handleLocationBar;;
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
                        handleLocationBar;;
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
                        handleLocationBar;;
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
          <NavLink to={"/home"}>
            <IconUserCircle
              size={28}
              strokeWidth={2}
              color="white"
              className="mx-2 inline-block scale-150"
              onClick={handleOpenMenu}
            />
          </NavLink>
          <div
            className={`${
              menuOpen ? "translate-x-0" : "translate-x-[100%]"
            } fixed inset-0 z-[99999] size-full bg-[#050505] transition-all duration-500 ease-in-out`}
          >
            <IconX
              size={30}
              strokeWidth={3}
              color="white"
              className="absolute right-4 top-4"
              onClick={handleOpenMenu}
            />

            <div className="mt-16 flex flex-col gap-8 px-6 text-xl font-bold md:hidden lg:hidden xl:hidden 2xl:hidden">
              <Link
                to="/home"
                title="home"
                className="text-white"
                onClick={handleOpenMenu}
              >
                <span className="my-3 text-4xl font-bold text-white">
                  {" "}
                  Home
                </span>
              </Link>
              <Link
                to="/about"
                title="about"
                className="my-3 text-4xl font-bold text-white"
                onClick={handleOpenMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                title="contact"
                className="my-3 text-4xl font-bold text-white"
                onClick={handleOpenMenu}
              >
                Contact
              </Link>
              <p
                onClick={handleSort}
                className="relative flex cursor-pointer items-center gap-1"
              >
                <IconUserCircle
                  size={46}
                  strokeWidth={2}
                  color="white"
                  className="inline-block"
                />
                <span className="my-3 text-4xl font-bold text-white">
                  {" "}
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
              <Link
                to="/cart"
                title="cart"
                className="group my-3 text-4xl font-bold text-white"
                onClick={handleOpenMenu}
              >
                <div className="flex items-center">
                  <span className="mr-2">Cart</span>
                  <span className="inline-block grid size-11 place-items-center rounded-full bg-[#252525]">
                    <span className="text-3xl">{ItemCount.length}</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="m-3 flex items-center rounded-xl border border-white/20 bg-transparent px-4 py-3">
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
