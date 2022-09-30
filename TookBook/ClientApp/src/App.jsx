import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from "./components/Footer"
import ThemeWrapper from './style/ThemeWrapper'
import MainWrapper from './style/MainWrapper'
import {
  BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom";
import UserLoginContainer from "./components/userPortalModal/UserLoginContainer"
import { RecoilRoot, useRecoilValue } from 'recoil'
import Homepage from './pages/Homepage';




function App() {




  /** ThemeWrapper är en komponent som ligger i style/Themewrapper, där hämtar den ett tema för hela material-ui från style/MuiTheme.
   *  I MuiTheme så kan man ändra alla färger, ex primary som används nedan. Använder man "primary.main" så får man den färgen man döpte till primary, använder man primary.light så får man automatiskt en ljusare variant av färgen. Likadant med primary.dark  */
  return (
    <ThemeWrapper>
      <RecoilRoot>
        <Router>
          <MainWrapper>
            <Navbar />

            <Routes>
              <Route path='/' element={<Homepage />} />
              {/* <Route
              path='userportal'
              element={(
                <UserLoginContainer />
              )}/> */}
            </Routes>

            <UserLoginContainer />
          </MainWrapper>

          <Footer />
        </Router>
      </RecoilRoot>
    </ThemeWrapper>
  )
}

export default App
