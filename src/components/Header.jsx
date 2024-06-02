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

const Header = ({ onAPIKeyChange }) => {
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
      <div
        className={`2xl:1/4 fixed left-0 top-0 z-[999] h-screen w-full bg-[#050505] text-[#0008] md:w-1/2 lg:w-1/4 xl:w-1/4 ${
          isLocationBarVisible ? "-translate-x-[100%]" : ""
        } rounded-r-lg transition-all duration-500 ease-in-out`}
      >
        <div
          className="absolute right-2 top-7 w-fit cursor-pointer rounded-full bg-[#202020] p-3"
          onClick={() => {
            setIsLocationBarVisible((prev) => !prev);
          }}
        >
          <IconX color="gray" size={26} strokeWidth={3} />
        </div>

        <div className="relative right-0 ml-6 mt-20 flex w-[80%] items-center overflow-hidden rounded-full border border-black/50 bg-[#212529] px-5 pb-2 pt-3">
          <input
            placeholder="Enter your city"
            className="w-full bg-transparent placeholder:text-xl placeholder:font-bold placeholder:text-gray-500 focus:outline-none"
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

        <ul className="text-2xl font-bold leading-loose">
          <Link to="home">
            <p
              onClick={() => {
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "1s";
                onAPIKeyChange(getCityAPI(18.516726, 73.856255));
                setLocationName("Pune");
                setIsLocationBarVisible((prev) => !prev);
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
                    document.querySelector("body").style.backgroundColor =
                      "white";
                    document.querySelector("body").style.transitionDuration =
                      "1s";
                    HandleShimmer();
                    onAPIKeyChange(getCityAPI(19.0759837, 72.8776559));
                    setLocationName("Mumbai");
                    setIsLocationBarVisible((prev) => !prev);
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
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "3s";
                onAPIKeyChange(getCityAPI(12.9715987, 77.5945627));
                setLocationName("Bangalore");
                setIsLocationBarVisible((prev) => !prev);
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
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "1s";
                onAPIKeyChange(getCityAPI(19.1485289, 77.3191471));
                setLocationName("Nanded");
                setIsLocationBarVisible((prev) => !prev);
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
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "1s";
                onAPIKeyChange(getCityAPI(28.7040592, 77.10249019999999));
                setLocationName("Delhi");
                setIsLocationBarVisible((prev) => !prev);
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
                document.querySelector("body").style.backgroundColor = "white";
                document.querySelector("body").style.transitionDuration = "1s";
                onAPIKeyChange(getCityAPI(17.385044, 78.486671));
                setLocationName("Hyderabad");
                setIsLocationBarVisible((prev) => !prev);
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
      <nav className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/15 bg-[#050505] px-2 py-3">
        <div className="mr-auto flex w-full items-center justify-between gap-6 md:justify-center lg:justify-center xl:justify-center 2xl:justify-center">
          <div
            onClick={() => {
              setIsLocationBarVisible(!isLocationBarVisible);
            }}
            className="relative flex size-fit scale-75 cursor-pointer items-center gap-1 rounded-full bg-[#252525] px-4 py-2"
          >
            <IconLocation color="gray" size={16} strokeWidth={3} />
            <p className="cursor-pointer text-lg font-bold text-gray-500 transition-all duration-300 ease-in-out">
              {locationName || cityName}
            </p>
          </div>
          <Link to="home" title="Home" aria-label="home" className="text mr-32">
            <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 bg-clip-text text-xl font-black tracking-tight text-transparent md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
              EatNow
            </span>
          </Link>
        </div>
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
            <form>
              <div className="flex items-center justify-between rounded-full bg-[#252525] px-4 py-3">
                <input
                  type="text"
                  placeholder="Search for restaurants"
                  className="bg-transparent text-xl font-semibold text-white outline-none placeholder:text-gray-500/70"
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
              className="text-white"
              onClick={handleOpenMenu}
            >
              <span className="my-3 text-4xl font-bold text-white"> Home</span>
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
        <IconMenu2
          size={28}
          strokeWidth={3}
          color="white"
          className="ml-auto md:hidden lg:hidden xl:hidden 2xl:hidden"
          onClick={handleOpenMenu}
        />

        <div className="hidden items-center gap-8 text-xl font-bold md:flex lg:flex xl:flex 2xl:flex">
          <form>
            <div className="flex items-center rounded-full bg-[#252525] px-4 py-2">
              <input
                type="text"
                placeholder="Search for restaurants"
                className="bg-transparent text-lg font-semibold text-white outline-none placeholder:text-gray-500/70"
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
          <Link to="/home" title="home" className="text-white">
            <span className="text-white"> Home</span>
          </Link>
          <Link to="/about" title="about" className="text-white">
            About
          </Link>
          <Link to="/contact" title="contact" className="text-white">
            Contact
          </Link>
          <p
            onClick={handleSort}
            className="relative flex cursor-pointer items-center gap-1"
          >
            <IconUserCircle
              size={26}
              strokeWidth={2}
              color="white"
              className="inline-block"
            />
            <span className="text-white"> {user?.displayName}</span>
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
          <Link to="/cart" title="cart" className="group text-white">
            <div>
              <span className="mr-2">Cart</span>
              <span className="rounded-full bg-[#252525] pb-[4px] pl-3 pr-[13px] pt-[1px]">
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
