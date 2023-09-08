import { Grid } from "@mui/material";

function getWeeklyForecast(props)
{
    const {weatherData} = props;
    function getDayName(dateStr)
    {
        var date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'long' });        
    }

    const gridStyle = {
        border: '2px',
        padding: '0.5px',
        margin: '5px',
        borderRadius: '30px',
      };
  
      const subGridStyle = {
        textAlign: 'center',
        borderRight: '1px solid #282c34',
        '&:lastChild': {
          borderRight: 'none',
        },
      };

    return(
        <>
        <p style={{textAlign: 'left', paddingLeft: '30px'}}>Next Few Days</p>
            <Grid container style={gridStyle}>
                {Array.from({length: 3}).map((_, index) =>(
                <Grid style={{...subGridStyle, borderRight: index < 2 ? '1px solid #282c34' : 'none'}} item xs={4} key={index}>
                    <p>{getDayName(weatherData.forecast.forecastday[index].date)}</p>
                    <p style={{color: '#282c34'}}>High: {weatherData.forecast.forecastday[index].day.maxtemp_f}°</p>
                    <p style={{color: '#282c34'}}>Low: {weatherData.forecast.forecastday[index].day.mintemp_f}°</p>
                    <img src={weatherData.forecast.forecastday[index].day.condition.icon} alt='Weather Icon'/>
                </Grid>
                ))}
            </Grid>
        </>
    );
}

export default getWeeklyForecast;