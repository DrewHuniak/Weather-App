import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import react from 'react';

function GetNavbar()
{
    return(
        <AppBar position='static' style={{backgroundColor: 'rgba(73, 81, 95, 1)'}}>
            <Toolbar>
                <Typography variant="h6" component='div' sx={{flexGrow: 1}}>
                    Weather
                </Typography>
                <Stack direction='row' spacing={2} >
                    <Button color='inherit'>Home</Button>

                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default GetNavbar;