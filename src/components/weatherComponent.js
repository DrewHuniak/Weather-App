import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

function GetWeather(props)
{
    const {lat, long} = props;
    const [weatherData, setWeatherData] = useState(null);
    const [currentHour, setCurrentHour] = useState(new Date().getHours());

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

        setInterval(() =>
        {
          setCurrentHour(new Date().getHours());
        }, 1000 * 60 * 60);

        callApi();  
    }, [lat,long]);

    function convertTime(date)
    {
      const currentDate = new Date(date);
      const hours = currentDate.getHours();
      const amOrPm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedTime = `${formattedHours}:00 ${amOrPm}`;

      return (
        formattedTime
      );
    }


    const gridStyle = {
      border: '2px', // Define the border properties here
      padding: '1px', // Optional: Add padding to space content from the border
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
              <Container style={gridStyle}>
                <Grid container spacing={2} style={gridStyle}>
                  <Grid xs={10}>
                    <h1 style={{textAlign: 'left', paddingLeft: '30px'}}>{weatherData.location.name}</h1>
                    <h2 style={{textAlign: 'left', paddingLeft: '30px', color: '#282c34'}}>{weatherData.location.region}</h2>
                  </Grid>
                  <Grid xs={4}>
                    <h1 style={{textAlign: 'left', paddingLeft: '30px'}}>{weatherData.current.temp_f}°</h1>
                  </Grid>
                </Grid>
              </Container>
              
              <Container style={gridStyle}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={gridStyle}>
                  <Grid xs={6} style={subGridStyle}>
                    <p1>Feels Like</p1>
                    <h3>{weatherData.current.feelslike_f}°</h3>
                  </Grid>
                  <Grid xs={6} style={subGridStyle}>
                    <p1>Wind</p1>
                    <h3>{weatherData.current.wind_mph} mph</h3>
                  </Grid>
                  <Grid xs={6} style={subGridStyle}>
                    <p1>UV</p1>
                    <h3>{weatherData.current.uv}</h3>
                  </Grid>
                  <Grid xs={6} style={subGridStyle}>
                    <p1>Chance of Rain</p1>
                    <h3>{weatherData.current.precip_in}</h3>
                  </Grid>
                </Grid>
              </Container>


              <Container style={gridStyle}>
              <p style={{textAlign: 'left', paddingLeft: '30px'}}>Todays Forecast</p>
                <Grid container spacing={2} style = {gridStyle}>
                  {Array.from( {length: 6}).map((_, index) => (
                    <Grid style={subGridStyle} xs={2} key={index}>
                      {(() =>{
                        const hourIndex = (currentHour + index + 1) % 24;
                        
                        return(
                          <>
                          <p1 style={{color: '#282c34'}} >{convertTime(weatherData.forecast.forecastday[0].hour[hourIndex].time)}</p1>
                          <h3><img src={weatherData.forecast.forecastday[0].hour[hourIndex].condition.icon} alt="Weather Icon"/></h3>
                          <h3>{weatherData.forecast.forecastday[0].hour[hourIndex].temp_f}°</h3>
                          </>
                        );
                      })()}
                      
{/* 
                      <p1 style={{color: '#282c34'}} >{convertTime(weatherData.forecast.forecastday[0].hour[hourIndex].time)}</p1>
                      <h3><img src={weatherData.forecast.forecastday[0].hour[hourIndex].condition.icon} alt="Weather Icon"/></h3>
                      <h3>{weatherData.forecast.forecastday[0].hour[hourIndex].temp_f}°</h3> */}
                    </Grid>
                  ))}
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