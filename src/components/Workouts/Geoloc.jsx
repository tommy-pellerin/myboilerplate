const Geoloc = () => {
  
  function findPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("my position :", lat, lon);
      })
    } else {
      // Geolocation is not supported by this browser
      console.log("Geolocation is not supported by this browser.");
    }
  }

  return (
    <button onClick={findPosition}>Find me</button>
  )
}

export default Geoloc