/* eslint-disable react/no-unescaped-entities */
import { CARD_IMG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemCart,
  increaseItemCart,
  removeItem,
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
    if (menuItem.count <= 1 && menuItem.count == 1) {
      dispatch(removeItem(menuItem));
    }
    dispatch(decreaseItemCart({ id: menuItem.card.info.id }));
  };

  const handleIncreaseItem = (menuItem) => {
    dispatch(increaseItemCart({ id: menuItem.card.info.id }));
  };

  if (CartItem.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col bg-[#E8E9EA]">
        <div className="flex items-center justify-center">
          <img
            className="mt-12 h-96 items-center"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt=""
          />
        </div>
        <div className="text-#535665] mt-4 flex items-center justify-center text-4xl font-bold text-[#535665c4]">
          {" "}
          Your cart is empty{" "}
        </div>
        <div className="mx-auto mt-4 flex w-2/3 items-center justify-center text-center text-xl font-bold text-[#7e808ca6]">
          You can go to home page to view more restaurants
        </div>
        <Link to="/home">
          {" "}
          <div className="text-bold ml-11 mt-14 inline-block w-4/5 cursor-pointer whitespace-nowrap rounded-xl bg-orange-500 p-4 text-center text-lg font-bold uppercase text-white hover:shadow-2xl lg:ml-[625px] lg:w-1/5">
            See restaurants near you
          </div>
        </Link>{" "}
      </div>
    );
  }
  return (
    <div className="max-h-screen overflow-hidden bg-[#050505]">
      <div className="mx-auto my-28 flex max-h-[75vh] w-3/4">
        <div className="flex max-h-[75vh] w-[80%] flex-col gap-10 overflow-y-scroll pr-6 pt-4">
          {Array.isArray(CartItem) &&
            CartItem.map((menuItem) => (
              <div
                className="flex min-h-36 w-full items-stretch gap-4 overflow-y-hidden"
                key={menuItem.card && menuItem.card.info.id}
              >
                <img
                  className="aspect-square size-36 rounded-2xl object-cover object-center"
                  src={CARD_IMG + menuItem.card.info.imageId}
                />
                <div className="flex grow flex-col">
                  <p className="text-lg font-bold text-white">
                    {menuItem.card.info.name}
                  </p>

                  <div className="mt-auto flex items-center gap-2">
                    <p className="inline-block text-lg font-bold text-gray-500">
                      ₹
                      {menuItem.card.info.price
                        ? (menuItem.card.info.price / 100) * menuItem.count
                        : (menuItem.card.info.defaultPrice / 100) *
                          menuItem.count}
                    </p>
                    <p className="inline-block text-white">
                      (
                      {menuItem.card.info.price?.toFixed(2) / 100 ||
                        menuItem.card.info.defaultPrice?.toFixed(2) / 100}
                      {" x "} {menuItem.count})
                    </p>
                  </div>
                </div>

                <div className="flex items-center self-end">
                  <button
                    className="rounded-md bg-orange-500 p-2 font-bold text-white disabled:cursor-not-allowed disabled:bg-orange-500/50"
                    onClick={() => handleDecreaseItem(menuItem)}
                  >
                    <IconMinus size={20} color="white" strokeWidth={4} />
                  </button>
                  <p className="mx-2 inline-block p-2 font-bold text-white">
                    {menuItem.count}
                  </p>
                  <button
                    className="rounded-md bg-orange-500 p-2 font-bold text-white"
                    onClick={() => handleIncreaseItem(menuItem)}
                  >
                    <IconPlus size={20} color="white" strokeWidth={4} />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex min-h-[70vh] w-3/5 flex-col px-6 py-4 shadow-md md:m-0">
          <h2 className="border-b border-white/15 pb-3 text-3xl font-bold text-white">
            Order Summary
          </h2>
          <div className="mt-8 flex grow flex-col gap-4 font-bold text-white">
            <div className="price-item mb-6 flex items-baseline justify-between">
              <p className="text-base font-bold text-gray-400">
                Price ({CartItem.length} items)
              </p>
              <p className="text-2xl font-bold text-white">
                ₹ {totalPrice.toFixed(2)}{" "}
              </p>
            </div>
            <div className="discount mb-6 flex items-baseline justify-between text-base font-bold text-gray-400">
              <p className="">Discount (10%) </p>
              <p className="text-2xl font-bold text-white">
                - ₹ {discountPrice.toFixed(2)}
              </p>
            </div>
            <div className="delivery mb-6 flex items-baseline justify-between text-base font-bold text-gray-400">
              <p> Delivery charges (2%) </p>
              <p className="text-2xl font-bold text-white">
                ₹ {deliveryFees.toFixed(2)}
              </p>
            </div>
            <div className="border-b border-white/15">
              <p className="mb-8 w-fit rounded-full border border-green-500 bg-green-100 px-4 py-1 text-sm text-green-500">
                You'll save ₹{discountPrice.toFixed(2)} on this order 🎉
              </p>
            </div>
          </div>
          <div className="my-4 mt-auto flex items-baseline justify-between text-base font-bold text-white">
            <p className=" "> Total Amount </p>
            <p className="text-2xl text-orange-500">
              ₹{finalAmount.toFixed(2)}
            </p>
          </div>
          <div className=" ">
            <button className="block w-full rounded-md border border-orange-500 bg-orange-600 p-4 text-center text-lg font-bold uppercase text-white hover:text-white">
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
