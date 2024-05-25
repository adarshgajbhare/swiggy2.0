import React, { useState, useEffect, useContext } from "react";
//import locationContext from "./locationContext";

const MyLocation = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  const { MyLongitude, MyLatitude, setMyLocation } =
    //useContext(locationContext);

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
      setMyLocation({
        MyLatitude: position.latitude,
        MyLongitude: position.longitude,
      });
    }
  }, [cityName, setMyLocation]);

  return (
    <div>
      <input
        placeholder="Enter City Name"
        className="rounded-lg"
        type="text"
        id="cityInput"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {position.latitude && position.longitude ? (
            <p>
              Latitude: {position.latitude}, Longitude: {position.longitude}
            </p>
          ) : (
            <p>Empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyLocation;
