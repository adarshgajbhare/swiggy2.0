import { useState, useEffect } from "react";

const useFetchBanner = (api) => {
  const [dataBanner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const json = await response.json();

        if (json) {
          const processedData = checkJsonData(json);
          setBanner(processedData);
          setLoading(false);
        } else {
          throw new Error("API returned no data");
        }
      } catch (error) {
        console.error("Not able to fetch data from Swiggy:", error);
        console.log("fetching data from local file...");

        try {
          const localResponse = await fetch(
            "https://raw.githubusercontent.com/adarshgajbhare/Swiggy-Clone/fa7c8f3adbb478b9bce93bf7bb3cff7af0478145/src/utils/v5.json",
          );

          if (!localResponse.ok) {
            throw new Error("GitHub file request failed");
          }

          const localJson = await localResponse.json();

          if (localJson) {
            const processedLocalData = checkJsonData(localJson);
            setBanner(processedLocalData);
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
    const allbannerData = [];
    const imageGridCardsInfo =
      jsonData?.data.cards[0].card.card.imageGridCards.info;

    imageGridCardsInfo.forEach((bannerData, i) => {
      allbannerData.push(bannerData);
    });

    return allbannerData;
  };

  return { dataBanner, loading };
};

export default useFetchBanner;
