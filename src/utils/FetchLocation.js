

const FetchLocation = () =>{
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [cityName, setCityName] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      if (cityName) {
        setLoading(true);
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            cityName
          )}&key=3b5dfc8119d5483b8f277c1ec4aff30d`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.results && data.results.length > 0) {
              const firstResult = data.results[0].geometry;
              setPosition({
                latitude: firstResult.lat,
                longitude: firstResult.lng,
              });
            } else {
              console.log("No results found for the provided city.");
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [cityName]);
    
    return (

 <div></div>

    )

}