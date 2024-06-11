1.  Remove food item from cart on count 1 -- done
2.  stop bypassing via url
3.  add logout -- done
4.  cors popup - done
5.  search func -- Done
6.  sort z-index stacking context issue -- done
7.  slider buttons --
8. back button to home in cart -- done
9. delivery and address in cart -- 
10. back and sorting and  in resMenu --
11. 


      <nav className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/15 bg-transparent px-2 py-3">
        <div className="mr-auto flex w-full items-center justify-between gap-6 md:justify-center lg:justify-center xl:justify-center 2xl:justify-center">
          <div
            onClick={() => {
              setIsLocationBarVisible(!isLocationBarVisible);
            }}
            className="relative flex size-fit  cursor-pointer items-center gap-1 "
          >
            <IconHomeFilled color="white" size={28} strokeWidth={2}/>
            <p className="cursor-pointer text-2xl font-bold text-gray-50 transition-all duration-300 ease-in-out">
              {locationName || cityName}
            </p>
          </div>
          <p className="ml-2 inline-block text-sm/4 w-[96%] text-balance font-medium text-gray-500">
                D - 33, 2nd Floor, Sector 6, Noida, Uttar Pradesh 201301
              </p>
        </div>
      
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
            </form> */}

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
