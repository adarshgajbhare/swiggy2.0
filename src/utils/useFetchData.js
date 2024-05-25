// useFetchData.js
import { useState, useEffect } from "react";

const useFetchData = (api) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const json = await response.json();

        if (json) {
          const processedData = checkJsonData(json);
          setData(processedData);
          setLoading(false);
        
        } else {
          throw new Error("API returned no data");
        }
      } catch (error) {
        console.error("Not able to fetch data from siwggy :", error);
        console.log("fetching data from local file...")
        try {
          const localResponse = await fetch('https://raw.githubusercontent.com/adarshgajbhare/Swiggy-Clone/fa7c8f3adbb478b9bce93bf7bb3cff7af0478145/src/utils/v5.json');
          if (!localResponse.ok) {
            throw new Error("GitHub file request failed");
          }
          const localJson = await localResponse.json();
          if (localJson) {
            const processedLocalData = checkJsonData(localJson);
            setData(processedLocalData);
          } else {
            throw new Error("GitHub file returned no data");
          }
        } catch (localError) {
          console.error("Error fetching data from GitHub file:", localError);
        }
      } finally {
        setLoading(false);
      
      }
    };

    fetchData();
  }, [api]);

  const checkJsonData = (jsonData) => {
    const allRestaurantsData = [];

    for (let i = 0; i < jsonData?.data?.cards.length; i++) {
      const restaurantsData =
        jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      if (restaurantsData !== undefined) {
        restaurantsData.forEach((restaurant) => {
          const id = restaurant?.info?.id;

          if (id && !allRestaurantsData.some((item) => item.info.id === id)) {
            allRestaurantsData.push(restaurant);
          }
        });
      }
    }

    return allRestaurantsData.flat();
  };

  return { data, loading };
};

export default useFetchData;
