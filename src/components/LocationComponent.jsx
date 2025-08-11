// import React, { useState } from "react";

// export default function LocationComponent() {
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [error, setError] = useState(null);

//   const getLocation = () => {
//     // Check if Geolocation API is available in the browser
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     // Request the user's location
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         // Success callback
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//         setError(null);
//       },
//       (err) => {
//         // Error callback
//         setError(err.message);
//       }
//     );
//   };

//   return (
//     <div>
//       <h2>Get My Current Location</h2>
//       <button onClick={getLocation}>Get Location</button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {location.latitude && location.longitude && (
//         <p>
//           Latitude: {location.latitude}, Longitude: {location.longitude}
//         </p>
//       )}
//     </div>
//   );
// }
