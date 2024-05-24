import { useEffect, useState } from "react"

const useLatLon = (initialData = "") => {
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [dataToFetch, setDataToFetch] = useState(initialData);

  useEffect(()=>{fetchLatLon()},[dataToFetch]);

  const fetchLatLon = async () => {
    if (!dataToFetch) {
      console.log('No data to fetch');
      return;
    }
    console.log("data to fetch :", dataToFetch);
    const googleMapKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${dataToFetch}&key=${googleMapKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.results[0]) {
      const location = data.results[0].geometry.location;
      setLatitude(location.lat);
      setLongitude(location.lng);
      // console.log(location.lat,location.lng);

    } else {
      console.error('No results found');
    }

  }

  const setLatLon = (cityName) => {
    console.log("jexecute");
    setDataToFetch(cityName);
  }

  return {latitude,longitude,setLatLon}
}

export default useLatLon