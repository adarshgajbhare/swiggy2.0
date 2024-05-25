import { useEffect, useState } from "react";
import { RES_MENU_API } from "../utils/constants";

const useRestaurantMenus = (resId) => {
  const [resMenu, setResMenu] = useState(null);

  useEffect(() => {
    fetchResMenu();
  }, []);

  const fetchResMenu = async () => {
    try {
    const data = await fetch(`${RES_MENU_API}/${resId}`);
    const json = await data.json();

    if(json) {
    setResMenu(json.data);
  }else {
    throw new Error("API returned no data");
  }
} catch (error){
  console.error("Not able to fetch data from siwggy :", error);
  console.log("fetching data from local file...")

  const localResponse = await fetch('https://raw.githubusercontent.com/adarshgajbhare/Swiggy-Clone/main/src/utils/pl.json');


  const localJson = await localResponse.json();
  if(localJson)
     {
    setResMenu(localJson.data);
  }
  else {
    throw new Error("Local file returned no data");
  }
  
}

  }
  return resMenu;
};

export default useRestaurantMenus;
