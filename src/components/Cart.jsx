import { CARD_IMG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  decreaseItemCart,
  increaseItemCart,
  clearCart,
  selectItemsInCart,
} from "../store/cartSlice";
import { Link } from "react-router-dom";
const Cart = () => {
  const CartItem = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const totalPrice = useSelector((store) => store.cart.totalPrice);
  const discountPrice = useSelector((store) => store.cart.discountPrice);
  const deliveryFees = useSelector((store) => store.cart.deliveryFees);
  const finalAmount = totalPrice + deliveryFees - discountPrice;

  const handleDecreaseItem = (menuItem) => {
    dispatch(decreaseItemCart({ id: menuItem.card.info.id }));
  };

  const handleIncreaseItem = (menuItem) => {
    dispatch(increaseItemCart({ id: menuItem.card.info.id }));
  };

  if (CartItem.length === 0) {
    return (
      <div className="">
        <div className=" justify-center items-center flex ">
          <img
            className=" w-80 h-60 items-center"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt=""
          />
        </div>
        <div className="justify-center items-center flex mt-[24] font-bold text-2xl text-[#5356655b]  text-#535665]">
          {" "}
          Your cart is empty{" "}
        </div>
        <div className="mt-2 flex text-[#7e808c5f] items-center justify-center">
          You can go to home page to view more restaurants
        </div>
        <Link to="/home">
          {" "}
          <div className="  mt-8  p-4 text-bold  inline-block  ml-[43%]  uppercase bg-orange-500 text-white font-semibold cursor-pointer text-sm text-center hover:shadow-2xl">
            See restaurants near you
          </div>
        </Link>{" "}
      </div>
    );
  }
  return (
    <div className="  ">
   
      {/* <div className="flex justify-between">
        <h1 className="text-2xl font-bold uppercase text-black">CART</h1>

        <div className="">
          {" "}
          <button
            className=" mt-10   uppercase font-bold text-lg bg-orange-600  text-center rounded-lg  p-2 text-white m-2
          hover:text-orange-600 hover:bg-white hover:border-orange-500 border-1
          "
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            CLEAR CART
          </button>
        </div>
      </div> */}

      <div className="outer  grid grid-cols-2 gap-4 h-[70vh] w-[70vw] mx-auto">
        <div className="menu-item   overflow-x-scroll  ">
          {Array.isArray(CartItem) &&
            CartItem.map((menuItem) => (
              <div
                className="flex gap-10 justify-start mb-4"
                key={menuItem.card && menuItem.card.info.id}
              >
                <div className="image  inline-block ">
                  <img
                    className="w-[164px] h-[164px]  object-cover block rounded-md aspect-square"
                    src={CARD_IMG + menuItem.card.info.imageId}
                  />
                </div>

                <div className=" w-[80%]  ">
                  <span className="text-lg font-semibold">
                    {menuItem.card.info.name}
                  </span>
                  <p className="line-clamp-1">
                    {menuItem.card.info.description}
                  </p>
                  <p className="font-bold mt-1 text-black inline-block opacity-70">
                    ₹
                    {menuItem.card.info.price
                      ? (menuItem.card.info.price / 100) * menuItem.count
                      : (menuItem.card.info.defaultPrice / 100) *
                        menuItem.count}{" "}
                  </p>

                  <p className=" inline-block ml-2">
                    (
                    {
                      (
                        menuItem.card.info.price?.toFixed(2) / 100 ||
                        menuItem.card.info.defaultPrice?.toFixed(2) / 100)
                    }
                    {" X "} {menuItem.count})
                  </p>

                  <div className="buttons flex justify-between  mt-9 ">
                    <div className=" justify-start">
                      <button
                        disabled={menuItem.count <= 1}
                        className="bg-orange-500 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-bold w-8 h-8 rounded-md"
                        onClick={() => handleDecreaseItem(menuItem)}
                      >
                        -
                      </button>

                      <p className="font-bold inline-block  text-black w-8 h-8 ml-6">
                        {menuItem.count}
                      </p>
                      <button
                        className="bg-orange-500 text-white font-bold w-8 h-8 rounded-md"
                        onClick={() => handleIncreaseItem(menuItem)}
                      >
                        +
                      </button>
                    </div>
                    <div className="">
                      <button
                        className="border ml-20 border-orange-500  text-xs font-bold text-white  bg-orange-500 p-2 px-4 rounded-md
                          hover:text-orange-500  hover:bg-white hover:border-orange-500  "
                        onClick={() => {
                          dispatch(removeItem(menuItem));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="order-page shadow-md md:m-0   p-4">
          <h2 className="text-xl font-bold border-b pb-4 mb-6">
            Order Summary
          </h2>
          <div className=" leading-10 font-bold">
            <div className="price-item flex mb-6 justify-between">
              <p className="text-gray-600">Price ( {CartItem.length} items)</p>
              <p className="font-bold text-lg">₹ {totalPrice.toFixed(2)} </p>
            </div>
            <div className="discount text-gray-600 flex mb-6 justify-between">
              <p className="">Discount (10%) </p>
              <p className="font-bold text-black text-lg">
                - ₹ {discountPrice.toFixed(2)}
              </p>
            </div>
            <div className="delivery text-gray-600 flex mb-6 justify-between">
              <p> Delivery charges (2%) </p>
              <p className="font-bold  text-black text-lg">
                ₹ {deliveryFees.toFixed(2)}
              </p>
            </div>
            <div className="reward border-b">
              <p className="mb-6 text-black">
                You'll save ₹{discountPrice.toFixed(2)} on this order 🎉
              </p>
            </div>
          </div>

          <div className="total-amt flex text-2xl font-bold mt-8 justify-between mb-4 ">
            <p className=" "> Total Amount </p>
            <p className="text-orange-500 ">₹{finalAmount.toFixed(2)}</p>
          </div>
          <div className="place-order ">
            <button
              className="w-full block border uppercase font-bold border-orange-500 text-lg
              text-center p-4 rounded-md 
              hover:text-white   text-orange-500  hover:bg-orange-600  bg-white   "
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
