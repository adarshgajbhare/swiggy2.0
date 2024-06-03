/* eslint-disable react/no-unescaped-entities */
import { CARD_IMG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemCart,
  increaseItemCart,
  removeItem,
} from "../store/cartSlice";
import { Link, NavLink } from "react-router-dom";
import {
  IconArrowLeft,
  IconMinus,
  IconPlus,
  IconPointFilled,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";

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
    <>
      <div className="hidden max-h-screen overflow-hidden bg-[#020202] md:block ">
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
                    <p className="mx-3 inline-block p-2 font-bold text-white">
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

      <div className="min-h-dvh overflow-hidden bg-[#101010] lg:hidden xl:hidden 2xl:hidden">
        <div className="fixed left-0 right-0 top-0 flex flex-col items-center gap-3 rounded-b-3xl border-b border-white/20 bg-gradient-to-b from-transparent to-black filter backdrop-blur-xl z-50  pt-5">
          <div className="flex w-full items-center">
          <NavLink to={"/home"} > <IconArrowLeft
              size={30}
              strokeWidth={2}
              color="white"
              className="mx-2 inline-block scale-150"
            />
          </NavLink>
            <div className="inline-flex w-full gap-2 flex-col">
              <p className="ml-2  inline-block text-base/3 font-bold text-white">
                55-60 mins
              </p>
              <p className="ml-2 inline-block text-sm/4 w-[96%] text-balance font-medium text-gray-500">
                D - 33, 2nd Floor, Sector 6, Noida, Uttar Pradesh 201301
              </p>
            </div>
          </div>
          <p className="mx-3 flex w-full items-center gap-1 rounded-t rounded-b-2xl border border-[#29C7B4] bg-[#DDFBEF]/90 px-2 py-1 font-medium text-[#1BA672]">
            <IconRosetteDiscountCheckFilled
              size={32}
              strokeWidth={1}
              color="#1BA672"
              className="inline-block"
            />
            <span>
              Awesome! you'll save <strong>₹{discountPrice.toFixed(2)}</strong> on this
              order
            </span>
          </p>
        </div>

        <div className="mx-3 mt-[150px] flex flex-col overflow-y-scroll rounded-t-xl bg-[#151515] px-2.5">
          {Array.isArray(CartItem) &&
            CartItem.map((menuItem) => (
              <div
                className="my-4 flex w-full items-center justify-between gap-2 overflow-y-hidden"
                key={menuItem.card && menuItem.card.info.id}
              >
                <div className="flex w-[55%] items-center gap-2">
                  <span className="relative top-[2px] grid scale-75 place-items-center self-start rounded-md border border-[#386641]">
                    <IconPointFilled
                      size={20}
                      strokeWidth={1}
                      color="#386641"
                      className="inline-block"
                    />
                  </span>
                  <p className="line-clamp-2 max-w-[25ch] text-white">
                    {menuItem.card.info.name}
                  </p>
                </div>

                <div className="flex w-[45%] items-center justify-between">
                  <div className="flex items-center">
                    <button
                      className="scale-90 rounded-md bg-orange-500 p-2 font-bold text-white disabled:cursor-not-allowed disabled:bg-orange-500/50"
                      onClick={() => handleDecreaseItem(menuItem)}
                    >
                      <IconMinus size={12} color="white" strokeWidth={4} />
                    </button>
                    <p className="mx-1 inline-block p-2 font-bold text-white">
                      {menuItem.count}
                    </p>
                    <button
                      className="scale-90 rounded-md bg-orange-500 p-2 font-bold text-white"
                      onClick={() => handleIncreaseItem(menuItem)}
                    >
                      <IconPlus size={12} color="white" strokeWidth={4} />
                    </button>
                  </div>

                  <div className="flex flex-col items-center text-sm/none">
                    <p className="text-lg font-semibold text-gray-200">
                      ₹
                      {menuItem.card.info.price
                        ? (menuItem.card.info.price / 100) * menuItem.count
                        : (menuItem.card.info.defaultPrice / 100) *
                          menuItem.count}
                    </p>
                    <p className="text-xs/none text-gray-500">
                      (
                      {menuItem.card.info.price?.toFixed(2) / 100 ||
                        menuItem.card.info.defaultPrice?.toFixed(2) / 100}
                      {" x "} {menuItem.count})
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mx-3 rounded-b-2xl bg-[#151515]">
          <div className="flex items-center justify-between border-t border-dashed border-white/10 px-4 py-4 text-white">
            Add more items
            <span className="grid size-7 place-items-center rounded-full border">
             <NavLink to={"/home"} >
              <IconPlus
                size={14}
                strokeWidth={2}
                color="white"
                className="inline-block"
              />
              </NavLink>
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-dashed border-white/10 px-4 py-4 text-white">
            Cooking requests
            <span className="grid size-7 place-items-center rounded-full border">
              <IconPlus
                size={14}
                strokeWidth={2}
                color="white"
                className="inline-block"
              />
            </span>
          </div>
        </div>

        <div className="mx-3 my-4 flex flex-col rounded-xl bg-[#151515] p-4">
          <h2 className="text-xl font-bold text-white">Bill Details</h2>

          <div className="mt-8 flex grow flex-col gap-4 font-bold text-white">
            <div className="mb-2 flex items-baseline justify-between border-b border-dashed border-white/15 pb-5">
              <p className="font-medium text-gray-500">
                Price ({CartItem.length} items)
              </p>
              <p className="font-bold text-white">₹ {totalPrice.toFixed(2)} </p>
            </div>
            <div className="mb-2 flex items-baseline justify-between border-b border-dashed border-white/15 pb-5">
              <p className="font-medium text-gray-500">Discount (10%) </p>
              <p className="font-bold text-white">
                - ₹ {discountPrice.toFixed(2)}
              </p>
            </div>
            <div className="mb-2 flex items-baseline justify-between border-b border-dashed border-white/15 pb-5">
              <p className="font-medium text-gray-500">
                {" "}
                Delivery charges (2%){" "}
              </p>
              <p className="font-bold text-white">
                ₹ {deliveryFees.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="my-4 flex items-baseline justify-between text-base font-bold text-white">
            <p className=" ">To pay</p>
            <p className="text-orange-500">₹{finalAmount.toFixed(2)}</p>
          </div>

          <button className="my-2 block w-full rounded-lg bg-orange-600 py-3 text-center text-lg font-bold text-white hover:text-white">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
