import {


} from "../utils/constants";
import React, { useContext, useState, useEffect } from "react";
import "../CSS/style.css";
import { Link } from "react-router-dom";
import UserName from "./UserName";
import { useSelector } from "react-redux";
import { getCityAPI } from "../utils/constants";


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
    <header>
      
      <nav className=" shadow-md mb-8 flex  ">
        <div className="flex relative top-1">
          <span className=" relative top-2">
            <Link to="home" title="Home" aria-label="home" className="logo">
              <svg
                className=" justify-end text-[#3d4152a5] mr-2"
                viewBox="0 0 559 825"
                height="42"
                width="35"
                fill="#fc8019"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M542.92 388.542C546.805 366.526 542.355 349.598 530.881 340.76C513.621 327.466 487.698 320.236 425.954 320.236C380.271 320.236 331.225 320.286 310.268 320.275C308.322 319.894 301.285 317.604 301.02 309.112L300.734 174.289C300.727 165.779 307.531 158.857 315.943 158.839C324.369 158.825 331.204 165.723 331.211 174.226C331.211 174.226 331.421 247.414 331.441 273.424C331.441 275.936 332.892 281.8 338.549 283.328C375.43 293.267 561.865 285.999 558.967 251.804C543.147 109.96 424.476 0 280.394 0C235.021 0 192.065 10.9162 154.026 30.2754C62.9934 77.5955 -1.65904 173.107 0.0324268 283.43C1.23215 361.622 52.2203 500.605 83.434 521.234C97.8202 530.749 116.765 527.228 201.484 527.228C239.903 527.228 275.679 527.355 293.26 527.436C295.087 527.782 304.671 530.001 304.671 538.907L304.894 641.393C304.915 649.907 298.104 656.826 289.678 656.829C281.266 656.843 274.434 649.953 274.42 641.446C274.42 641.446 275.17 600.322 275.17 584.985C275.17 581.435 275.424 575.339 265.178 570.727C231.432 555.553 121.849 564.712 115.701 581.457C113.347 587.899 125.599 612.801 144.459 644.731C170.102 685.624 211.889 747.245 245.601 792.625C261.047 813.417 268.77 823.813 280.467 824.101C292.165 824.389 300.514 814.236 317.213 793.928C383.012 713.909 516.552 537.663 542.92 388.542Z"
                  fill="url(#paint0_linear_19447_66107)"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_19447_66107"
                    x1="445.629"
                    y1="63.8626"
                    x2="160.773"
                    y2="537.598"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF993A"></stop>
                    <stop offset="1" stopColor="#F15700"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          </span>

          <div className="ml-36 flex   relative top-4">
            <span className="relative ">
              <div className="flex items-center group">
                <svg
                  onClick={() => {
                    { 
                      document.querySelector('body').style.backgroundColor=' rgba(0, 0, 0, 0.632)';
                      document.querySelector('body').style.transitionDuration='0.5s';
                     //  document.querySelector('body').style.transition='ease-in';
                   }
                    setIsLocationBarVisible((prev) => !prev);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className=" cursor-pointer hover:text-[#fc8019] group-hover:fill-[#fc8019] "
                >
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>
                <button>
                  <p
                    onClick={() => {
                    { 
                       document.querySelector('body').style.backgroundColor=' rgba(0, 0, 0, 0.632)';
                       document.querySelector('body').style.transitionDuration='0.5s';
                      //  document.querySelector('body').style.transition='ease-in';
                    }
                      setIsLocationBarVisible(!isLocationBarVisible);
                    }
                  }

                    className=" overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[15ch]  mr-8 hover:text-[#fc8019] group-hover:fill-[#fc8019] text-[#3d4152a5] font-bold text-2xl "
                  >
                    {locationName || cityName}
                  </p>
                </button>
                <div
                  className={`absolute text-[#0008] z-50 h-screen p-20 pb-24  -left-60 -top-1/2 mr-10  ${
                    isLocationBarVisible
                      ? "translate-x-[800rem] md:translate-x-[-700px]"
                      : ""
                  }   backdrop-filter backdrop-blur-3xl saturate-100 bg-opacity-13 border border-gray-300 rounded-lg `}
                >
                  <svg
                    onClick={() => {
                      { 
                        document.querySelector('body').style.backgroundColor='white';
                        document.querySelector('body').style.transitionDuration='1s';
                     }
                      setIsLocationBarVisible((prev) => !prev);
                    }}
                    className="  absolute hover:text-[#fc8019] fill-[#fc8019] top-2 right-0 w-14 cursor-pointer"
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-8.991 6.932 2.717-2.718c.146-.146.338-.219.53-.219.405 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.718 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.531-.219l-2.728-2.728-2.728 2.728c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z"
                      fillRule="nonzero"
                    />
                  </svg>
                  <ul className="list-none  font-bold text-2xl leading-loose  pl-14 py-10  ">
                    <li>
                      <div className=" flex "> 
                      <input 
                        placeholder="Enter City Name"
                        className="outline-0  placeholder-[#3d4152b5] p-1   ml-96 flex justify-center items-center   px-2 py-0   rounded-lg  shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] "
                        type="text"
                        id="cityInput"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        
                      />
                      
                      <button
                        className="btn-search ml-2"
                        onClick={() => {
                          { 
                            document.querySelector('body').style.backgroundColor='white';
                            document.querySelector('body').style.transitionDuration='1s';
                         }
                         setIsLocationBarVisible(!isLocationBarVisible);
                          setLocationName(cityName);
                          onAPIKeyChange(
                            getCityAPI(position.latitude, position.longitude)
                          );
                        }}
                      >
                        search
                      </button></div>
                    </li>
                    <li className="hover:text-[#fc8019]  hover:scale-125  transition duration-200">
                      <div className="">
                        <Link to="home">
                          <p
                            onClick={() => {
                              { 
                                document.querySelector('body').style.backgroundColor='white';
                                document.querySelector('body').style.transitionDuration='1s';
                             }
                              onAPIKeyChange(
                                getCityAPI(18.516726, 73.856255)
                              );
                              setLocationName("Pune");
                              setIsLocationBarVisible((prev) => !prev);
                            }}
                          >
                            Pune
                          </p>
                        </Link>
                      </div>
                    </li>

                    <hr className="border-black border-1 border-dashed my-2" />
                    <li className="hover:text-[#fc8019]  hover:scale-125  transition duration-200">
                      <div className="">
                        <Link to="home">
                          <p
                            onClick={() => {
                              { 
                                document.querySelector('body').style.backgroundColor='white';
                                document.querySelector('body').style.transitionDuration='1s';
                             }
                              HandleShimmer
                              onAPIKeyChange(
                                getCityAPI(19.0759837 , 72.8776559)
                              );
                              setLocationName("Mumbai");
                              setIsLocationBarVisible((prev) => !prev);
                            }}
                          >
                            Mumbai
                          </p>
                        </Link>
                      </div>
                    </li>
                    <hr className="border-black border-1 border-dashed my-2" />
                    <li className="hover:text-[#fc8019]  hover:scale-125  transition duration-200">
                      <div
                        className=""
                        onClick={() => {
                          { 
                            document.querySelector('body').style.backgroundColor='white';
                            document.querySelector('body').style.transitionDuration='3s';
                         }
                          onAPIKeyChange(getCityAPI(12.9715987 , 77.5945627));
                          setLocationName("Bangalore");
                          setIsLocationBarVisible((prev) => !prev);
                        }}
                      >
                        <Link to="home">
                          <p>Bangalore</p>
                        </Link>
                      </div>
                    </li>
                    <hr className="border-black border-1 border-dashed my-2" />
                    <li className="hover:text-[#fc8019]  hover:scale-125  transition duration-200">
                      <div
                        className=""
                        onClick={() => {
                          { 
                            document.querySelector('body').style.backgroundColor='white';
                            document.querySelector('body').style.transitionDuration='1s';
                         }
                          onAPIKeyChange(getCityAPI(lat=19.1485289 , 77.3191471));
                          setLocationName("Nanded");
                          setIsLocationBarVisible((prev) => !prev);
                        }}
                      >
                        <Link to="home">
                          <p>Nanded</p>
                        </Link>
                      </div>
                    </li>
                    <hr className="border-black border-1 border-dashed my-2" />
                    <li className="hover:text-[#fc8019]  hover:scale-125  transition duration-200">
                      <div
                        className=""
                        onClick={() => {
                          { 
                            document.querySelector('body').style.backgroundColor='white';
                            document.querySelector('body').style.transitionDuration='1s';
                         }
                          onAPIKeyChange(getCityAPI(28.7040592 , 77.10249019999999));
                          setLocationName("Delhi");
                          setIsLocationBarVisible((prev) => !prev);
                        }}
                      >
                        <Link to="home">
                          <p>Delhi</p>
                        </Link>
                      </div>
                    </li>
                    <hr className="border-black border-1 border-dashed my-2" />
                    <li className="hover:text-[#fc8019]  hover:scale-125  transition duration-200">
                      <div
                        className=""
                        onClick={() => {
                          { 
                            document.querySelector('body').style.backgroundColor='white';
                            document.querySelector('body').style.transitionDuration='1s';
                         }
                          onAPIKeyChange(getCityAPI(17.385044 , 78.486671));
                          setLocationName("Hyderabad");
                          setIsLocationBarVisible((prev) => !prev);
                        }}
                      >
                        <Link to="home">
                          <p>Hyderabad</p>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </span>
          </div>
        </div>

        <ul className="flex mt-4 font-bold text-xl text-[#3d4152a5] mb-4 py-1">
          <li className="mr-8 ml-auto group hover:text-[#fc8019] flex">
            <svg
              className="mr-2 relative mt-1 group-hover:text-[#fc8019] group-hover:fill-[#fc8019]  text-[#3d4152a5]"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              color="#3d4152a5"
            >
              <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
            </svg>
            <Link to="/home" title="home" className="  hover:text-[#fc8019]">
              <span className=" hover:text-[#fc8019]"> Home</span>
            </Link>
          </li>
          {/* <li className="group mr-8 flex">
            <svg
              className="mr-2 relative top-1 group-hover:text-[#fc8019] group-hover:fill-[#fc8019] "
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M22 22h-20c-1.104 0-2-.896-2-2v-12c0-1.104.896-2 2-2h1.626l.078.283c.194.631.518 1.221.95 1.717h-2.154c-.276 0-.5.224-.5.5v5.5h20v-5.5c0-.276-.224-.5-.5-.5h-2.154c.497-.569.853-1.264 1.029-2h1.625c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2zm-20-5v2.5c0 .276.224.5.5.5h19c.276 0 .5-.224.5-.5v-2.5h-20zm8.911-5h-2.911c.584-1.357 1.295-2.832 2-4-.647-.001-1.572.007-2 0-2.101-.035-2.987-1.806-3-3-.016-1.534 1.205-3.007 3-3 1.499.006 2.814.872 4 2.313 1.186-1.441 2.501-2.307 4-2.313 1.796-.007 3.016 1.466 3 3-.013 1.194-.899 2.965-3 3-.428.007-1.353-.001-2 0 .739 1.198 1.491 2.772 2 4h-2.911c-.241-1.238-.7-2.652-1.089-3.384-.388.732-.902 2.393-1.089 3.384zm-2.553-7.998c-1.131 0-1.507 1.918.12 1.998.237.012 2.235 0 2.235 0-1.037-1.44-1.52-1.998-2.355-1.998zm7.271 0c1.131 0 1.507 1.918-.12 1.998-.237.012-2.222 0-2.222 0 1.037-1.44 1.507-1.998 2.342-1.998z" />
            </svg>
            <Link
              to="/offers"
              title="offers"
              className=" hover:text-[#fc8019] group-hover:text-[#fc8019]"
            >
              Offers
            </Link>
          </li> */}
          <li className="group flex">
            <svg
              className=" mr-2 relative top-1 group-hover:text-[#fc8019] group-hover:fill-[#fc8019] "
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M7 16.488l1.526-.723c1.792-.81 2.851-.344 4.349.232 1.716.661 2.365.883 3.077 1.164 1.278.506.688 2.177-.592 1.838-.778-.206-2.812-.795-3.38-.931-.64-.154-.93.602-.323.818 1.106.393 2.663.79 3.494 1.007.831.218 1.295-.145 1.881-.611.906-.72 2.968-2.909 2.968-2.909.842-.799 1.991-.135 1.991.72 0 .23-.083.474-.276.707-2.328 2.793-3.06 3.642-4.568 5.226-.623.655-1.342.974-2.204.974-.442 0-.922-.084-1.443-.25-1.825-.581-4.172-1.313-6.5-1.6v-5.662zm-1 6.538h-4v-8h4v8zm1-7.869v-1.714c-.006-1.557.062-2.447 1.854-2.861 1.963-.453 4.315-.859 3.384-2.577-2.761-5.092-.787-7.979 2.177-7.979 2.907 0 4.93 2.78 2.177 7.979-.904 1.708 1.378 2.114 3.384 2.577 1.799.415 1.859 1.311 1.853 2.879 0 .13-.011 1.171 0 1.665-.483-.309-1.442-.552-2.187.106-.535.472-.568.504-1.783 1.629-1.75-.831-4.456-1.883-6.214-2.478-.896-.304-2.04-.308-2.962.075l-1.683.699z" />
            </svg>
            <Link
              to="/about"
              title="about"
              className=" mr-8 hover:text-[#fc8019] group-hover:text-[#fc8019]"
            >
              About
            </Link>
          </li>

          <li className=" group mr-8 flex">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="relative top-1 mr-2 group-hover:text-[#fc8019] group-hover:fill-[#fc8019]"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18.8c-4.853 0-8.8 3.947-8.8 8.8s3.947 8.8 8.8 8.8 8.8-3.947 8.8-8.8-3.947-8.8-8.8-8.8zm0 15.05c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.432-3.468.572-.544 1.024-.975.962-1.821-.058-.805-.73-1.226-1.364-1.226-.709 0-1.538.527-1.538 2.013h-2.011c0-2.4 1.41-3.95 3.59-3.95 1.036 0 1.942.339 2.551.955.57.578.865 1.372.854 2.298-.018 1.383-.859 2.291-1.536 3.021z" />
            </svg> */}
            <svg
              className=" cursor-pointer relative top-1 mr-2 group-hover:text-[#fc8019] group-hover:fill-[#fc8019]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 24"
              width="20"
              height="20"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              ></path>
            </svg>
            <Link
              to="/contact"
              title="contact"
              className="hover:text-[#fc8019] group-hover:text-[#fc8019]"
            >
              Contact
            </Link>
          </li>

          <li className="flex group">
            <p className="">
              <svg
                className="relative top-1 mr-2 group-hover:text-[#fc8019] group-hover:fill-[#fc8019] "
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
              </svg>
            </p>
            <p className=" mr-2  group group-hover:text-[#fc8019] group-hover:fill-[#fc8019] font-bold cursor-pointer">
              Hello, {loggedUser}
            </p>

            {isDropdownOpen && (
              <div
                className="absolute z-10 top-full left-0 mt-2"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <ul className="bg-white border rounded shadow-md">
                  <li className="p-2 cursor-pointer">User</li>
                  <li className="p-2 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </li>
          <li className="mr-96 group flex">
            <svg
              className="relative mt-1 mr-2 ml-4 group group-hover:text-[#fc8019] group-hover:fill-[#fc8019]"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.702-4.702c-.198-.198-.459-.298-.72-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm7.441 2v2h-.642c-.534 0-1.022.305-1.257.786l-4.101 10.214h-12l-4.101-10.216c-.234-.48-.722-.784-1.256-.784h-.643v-2h24zm-15 4c0-.552-.448-1-1-1s-1 .448-1 1v5c0 .552.448 1 1 1s1-.448 1-1v-5zm4 0c0-.552-.448-1-1-1s-1 .448-1 1v5c0 .552.448 1 1 1s1-.448 1-1v-5zm4 0c0-.552-.447-1-1-1s-1 .448-1 1v5c0 .552.447 1 1 1s1-.448 1-1v-5z" />
            </svg>
            <Link
              to="/cart"
              title="cart"
              className=" group  hover:text-[#fc8019]"
            >
              <div>
                <span className="">Cart</span>
                <p className="relative -top-9  left-4  bg-orange-500 text-white flex justify-center items-center w-5 h-5 text-xs rounded-full">
                  {ItemCount.length}
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
