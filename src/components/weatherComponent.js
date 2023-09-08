import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Forecast from './Forecast';
import WeeklyForecast from './WeeklyForecast';
import AOS from 'aos';
import 'aos/dist/aos.css';

function GetWeather(props)
{
  const {lat, long} = props;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(()=>{

      const callApi = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/weather?lat=${lat}&lon=${long}`);
            setWeatherData(response.data);
          }
          catch(error){
              console.error(error);
          }
          AOS.init({duration: 2000});
      };
      callApi();
  }, [lat, long]);

  const gridStyle = {
    border: '2px', // Define the border properties here
    padding: '0.5px', // Optional: Add padding to space content from the border
    margin: '5px',
    borderRadius: '30px',
   // backgroundColor: '#49515f',
   backgroundColor: 'rgba(73, 81, 95, 0.75)',
    
    //#F8F8F8
  };

  return (
      <div>
        {weatherData ? (
          <div>

            <Container>
                <Grid container sx={{border: 1, borderRadius: '30px'}}>
                  <Grid  xs={6}>
                     <h1 style={{textAlign: 'left', paddingLeft: '30px'}}>{weatherData.location.name}</h1>
                     <h2 style={{textAlign: 'left', paddingLeft: '30px', color: '#49515f'}}>{weatherData.location.region}</h2>
                  </Grid>
                  <Grid xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <h1 style={{textAlign: 'left', paddingRight: 'auto', margin: 'auto 0', fontSize: '10vw'}}>{weatherData.current.temp_f}°</h1>
                  </Grid>
                </Grid>

                <Grid container style={gridStyle} data-aos="fade-up">
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

              <Grid container style={gridStyle} data-aos="zoom-in">
                  <Forecast weatherData={weatherData}/>
              </Grid>

              <Grid container style={gridStyle} data-aos="fade-down">
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