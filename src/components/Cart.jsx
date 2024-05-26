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
import { IconMinus, IconPlus } from "@tabler/icons-react";
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
    <div className="bg-black  h-screen overflow-auto    ">
      <div className=" flex w-4/5 mt-28 mx-auto items-center  h-3/4 overflow-hidden">
        <div className=" overflow-y-scroll  overflow-x-hidden  w-2/3 ">
          {Array.isArray(CartItem) &&
            CartItem.map((menuItem) => (
              <div
                className=" flex items-center gap-10  mb-4"
                key={menuItem.card && menuItem.card.info.id}
              >
                <img
                  className="size-40   object-cover object-center rounded-2xl aspect-square"
                  src={CARD_IMG + menuItem.card.info.imageId}
                />
                <div className="flex flex-col">
                  <span className="text-lg text-white font-bold">
                    {menuItem.card.info.name}
                  </span>
                  <p className="w-4/5 font-bold text-base text-gray-500">{menuItem.card.info.description}</p>
                  <p className="font-bold text-lg text-gray-500 inline-block ">
                    ₹
                    {menuItem.card.info.price
                      ? (menuItem.card.info.price / 100) * menuItem.count
                      : (menuItem.card.info.defaultPrice / 100) *
                        menuItem.count}
                  </p>
                  <p className=" inline-block">
                    (
                    {menuItem.card.info.price?.toFixed(2) / 100 ||
                      menuItem.card.info.defaultPrice?.toFixed(2) / 100}
                    {" x "} {menuItem.count})
                  </p>
                </div>
             
                  <div className=" flex items-center">
                    <button
                      disabled={menuItem.count <= 1}
                      className="bg-orange-500 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-bold p-2 rounded-md"
                      onClick={() => handleDecreaseItem(menuItem)}
                    >
                      <IconMinus size={20} color="white" strokeWidth={4}/>
                    </button>
                    <p className="font-bold mx-2 inline-block  text-white p-2 ">
                      {menuItem.count}
                    </p>
                    <button
                      className="bg-orange-500 text-white font-bold p-2 rounded-md"
                      onClick={() => handleIncreaseItem(menuItem)}
                    >
                     <IconPlus size={20} color="white" strokeWidth={4}/>
                    </button>
                  </div>
               
          
              </div>
            ))}
        </div>
        <div className="w-1/3 shadow-md md:m-0   p-4">
          <h2 className="text-xl text-white font-bold text-white border-b pb-4 mb-6">Order Summary</h2>
          <div className=" leading-10 font-bold text-white">
            <div className="price-item flex mb-6 justify-between">
              <p className="text-gray-600">Price ( {CartItem.length} items)</p>
              <p className="font-bold text-white text-lg">₹ {totalPrice.toFixed(2)} </p>
            </div>
            <div className="discount text-gray-600 flex mb-6 justify-between">
              <p className="">Discount (10%) </p>
              <p className="font-bold text-white text-black text-lg">
                - ₹ {discountPrice.toFixed(2)}
              </p>
            </div>
            <div className="delivery text-gray-600 flex mb-6 justify-between">
              <p> Delivery charges (2%) </p>
              <p className="font-bold text-white text-lg">
                ₹ {deliveryFees.toFixed(2)}
              </p>
            </div>
            <div className="reward border-b">
              <p className="mb-6 text-white">
                You'll save ₹{discountPrice.toFixed(2)} on this order 🎉
              </p>
            </div>
          </div>
          <div className="total-amt flex text-2xl font-bold text-white mt-8 justify-between mb-4 ">
            <p className=" "> Total Amount </p>
            <p className="text-orange-500 ">₹{finalAmount.toFixed(2)}</p>
          </div>
          <div className="place-order ">
            <button
              className="w-full block border uppercase font-bold text-white border-orange-500 text-lg
                text-center p-4 rounded-md
                hover:text-white   bg-orange-600   "
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

// onClick={() => {
//   dispatch(removeItem(menuItem));
// }}