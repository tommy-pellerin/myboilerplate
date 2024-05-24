import { useEffect, useState } from "react"

const useLatLon = (cityName) => {
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  useEffect(()=>{getLatLon()},[cityName]);

  const getLatLon = async () => {
    const googleMapKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${googleMapKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.results[0]) {
      const location = data.results[0].geometry.location;
      setLatitude(location.lat);
      setLongitude(location.lng);
      console.log(location.lat,location.lng);

    } else {
      console.error('No results found');
    }

  }

  return {latitude,longitude}
}

export default useLatLon