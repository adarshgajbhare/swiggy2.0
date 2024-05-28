import { CARD_IMG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { decreaseItemCart, increaseItemCart } from "../store/cartSlice";
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
    <div className="bg-[#050505] overflow-hidden max-h-screen  ">
      <div className=" flex w-3/4 my-28 mx-auto   max-h-[75vh] ">
        <div className="flex flex-col gap-10  pr-6 pt-4 overflow-y-scroll w-[80%]  max-h-[75vh]">
          {Array.isArray(CartItem) &&
            CartItem.map((menuItem) => (
              <div
                className="min-h-36 flex gap-4  items-stretch overflow-y-hidden  w-full"
                key={menuItem.card && menuItem.card.info.id}
              >
                <img
                  className="size-36 object-cover object-center rounded-2xl aspect-square"
                  src={CARD_IMG + menuItem.card.info.imageId}
                />
                <div className="flex grow flex-col    ">
                  <p className="text-lg text-white font-bold">
                    {menuItem.card.info.name}
                  </p>
                  <p className="font-bold text-sm w-4/5 line-clamp-3  text-gray-500">
                    {menuItem.card.info.description}
                  </p>
                  <div className="flex mt-auto items-center gap-2">
                    <p className="font-bold inline-block text-lg text-gray-500 ">
                      ₹
                      {menuItem.card.info.price
                        ? (menuItem.card.info.price / 100) * menuItem.count
                        : (menuItem.card.info.defaultPrice / 100) *
                          menuItem.count}
                    </p>
                    <p className=" inline-block text-white">
                      (
                      {menuItem.card.info.price?.toFixed(2) / 100 ||
                        menuItem.card.info.defaultPrice?.toFixed(2) / 100}
                      {" x "} {menuItem.count})
                    </p>
                  </div>
                </div>

                <div className=" flex self-end   items-center">
                  <button
                    disabled={menuItem.count <= 1}
                    className="bg-orange-500 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-bold p-2 rounded-md"
                    onClick={() => handleDecreaseItem(menuItem)}
                  >
                    <IconMinus size={20} color="white" strokeWidth={4} />
                  </button>
                  <p className="font-bold mx-2 inline-block  text-white p-2 ">
                    {menuItem.count}
                  </p>
                  <button
                    className="bg-orange-500 text-white font-bold p-2 rounded-md"
                    onClick={() => handleIncreaseItem(menuItem)}
                  >
                    <IconPlus size={20} color="white" strokeWidth={4} />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="w-3/5 shadow-md md:m-0 min-h-[70vh] px-6 py-4 flex flex-col">
          <h2 className="text-3xl text-white font-bold border-b border-white/15 pb-3">
            Order Summary
          </h2>
          <div className="grow mt-8 flex flex-col gap-4 font-bold text-white">
            <div className="price-item flex mb-6 justify-between items-baseline">
              <p className="text-gray-400 text-base font-bold">Price{" "}({CartItem.length} items)</p>
              <p className="font-bold text-white text-2xl">
                ₹ {totalPrice.toFixed(2)}{" "}
              </p>
            </div>
            <div className="discount text-gray-400 text-base font-bold flex mb-6 justify-between items-baseline">
              <p className="">Discount (10%) </p>
              <p className="font-bold text-white  text-2xl">
                - ₹ {discountPrice.toFixed(2)}
              </p>
            </div>
            <div className="delivery text-gray-400 text-base font-bold flex mb-6 justify-between items-baseline">
              <p> Delivery charges (2%) </p>
              <p className="font-bold text-white text-2xl">
                ₹ {deliveryFees.toFixed(2)}
              </p>
            </div>
            <div className=" border-b  border-white/15">
              <p className="mb-8 text-green-500 bg-green-100 rounded-full px-4 w-fit text-sm py-1 border border-green-500">
                You'll save ₹{discountPrice.toFixed(2)} on this order 🎉
              </p>
            </div>
          </div>
          <div className="mt-auto  flex text-white justify-between items-baseline my-4 text-base font-bold">
            <p className=" "> Total Amount </p>
            <p className="text-orange-500 text-2xl">₹{finalAmount.toFixed(2)}</p>
          </div>
          <div className=" ">
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
