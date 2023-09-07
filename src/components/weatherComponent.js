import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Forecast from './Forecast';
import WeeklyForecast from './WeeklyForecast';

function GetWeather(props)
{
  const {lat, long} = props;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(()=>{

      const callApi = async () => {
          try {
            const response = await axios.get(`https://weatherapp-backend-production-11ff.up.railway.app/api/weather?lat=${lat}&lon=${long}`);
            setWeatherData(response.data);
          }
          catch(error){
              console.error(error);
          }
      };
      callApi();
  }, [lat, long]);

  const gridStyle = {
    border: '2px', // Define the border properties here
    padding: '0.5px', // Optional: Add padding to space content from the border
    margin: '5px',
    borderRadius: '30px',
    backgroundColor: '#49515f',
    //#F8F8F8
  };
  const subGridStyle = {
    textAlign: 'center',
    borderRight: '1px solid #282c34', // Add a border on the right
    '&:lastChild': {
      borderRight: 'none',
    },
  };

  

  return (
      <div>
        {weatherData ? (
          <div>

            <Container>
                <Grid container style={gridStyle}>
                  <Grid  xs={6}>
                     <h1 style={{textAlign: 'left', paddingLeft: '30px'}}>{weatherData.location.name}</h1>
                  </Grid>
                  <Grid  xs={6}>
                    <h2 style={{textAlign: 'left', paddingLeft: '30px', color: '#282c34'}}>{weatherData.location.region}</h2>
                  </Grid>
                    <h1 style={{textAlign: 'left', paddingLeft: '30px'}}>{weatherData.current.temp_f}°</h1>
                </Grid>

                <Grid container style={gridStyle}>
                    <Grid  xs={3}>
                      <p>Feels Like</p>
                      <h3>{weatherData.current.feelslike_f}°</h3>
                    </Grid>
                    <Grid  xs={3}>
                    <p>Wind</p>
                      <h3>{weatherData.current.wind_mph} mph</h3>
                    </Grid>
                    <Grid  xs={3}>
                    <p>UV</p>
                      <h3>{weatherData.current.uv}</h3> 
                    </Grid>
                    <Grid  xs={3}>
                    <p>Chance of Rain</p>
                      <h3>{weatherData.current.precip_in}%</h3>
                    </Grid>
                </Grid>

              <Grid container style={gridStyle}>
                  <Forecast weatherData={weatherData}/>
              </Grid>

              <Grid container style={gridStyle}>
                  <WeeklyForecast weatherData = {weatherData}/>
              </Grid>

            </Container>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
}

export default GetWeather;