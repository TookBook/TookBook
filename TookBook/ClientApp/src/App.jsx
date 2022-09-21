import { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles"
import Navbar from './components/Navbar'
import CssBaseline from '@mui/material/CssBaseline'
import Theme from "./style/MuiTheme"
import ThemeWrapper from './style/ThemeWrapper'
import { Box, Typography } from '@mui/material'
import Logo from './assets/Logo.svg'

function App() {
  // const [count, setCount] = useState(0)


  // const getWeather = async () => {
    // const resp = await fetch("/api/weatherforecast")
    // const json = await resp.json()
    // console.log(json)
    // setWeather(json);
  // }

  /** ThemeWrapper är en komponent som ligger i style/Themewrapper, där hämtar den ett tema för hela material-ui från style/MuiTheme.
   *  I MuiTheme så kan man ändra alla färger, ex primary som används nedan. Använder man "primary.main" så får man den färgen man döpte till primary, använder man primary.light så får man automatiskt en ljusare variant av färgen. Likadant med primary.dark  */
  return (
    <ThemeWrapper>
      <Navbar />


      {/** Exempel på MaterialUI :  */}
      {/**<>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Typography> Hello World </Typography>
      </Box>

      <Box sx={{ bgcolor: "primary.dark" }}>
        <Typography> Hello World </Typography>
      </Box>

      <Box sx={{ bgcolor: "primary.light" }}>
        <Typography> Hello World </Typography>
      </Box>
      </>*/}

      {/** Precis samma som nedan, men <Typography> har inte default margin/padding som <p> :  */}
      {/**<>
      <div style={{ backgroundColor: "lightblue" }}>
        <p>Hello World </p>
      </div>
      <div style={{ backgroundColor: "lightcyan" }}>
        <p>Hello World </p>
      </div>

      </> */}

    </ThemeWrapper>
  )
}

export default App
