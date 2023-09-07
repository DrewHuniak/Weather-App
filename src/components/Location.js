import React, { useState, useEffect } from 'react';
import Weather from './weatherComponent.js';

function Location()
{
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
      if("geolocation" in navigator)
      {
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
              setLongitude(position.coords.longitude);
              setLatitude(position.coords.latitude);
              setIsLoading(false);
            },
            function(error) {
              console.error('Error getting geolocation:', error);
            }
        );
      }
    },[latitude, longitude])
    
    return (
      <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Weather lat={latitude} long={longitude}/>
          )}
      </div>
    )
}

export default Location;