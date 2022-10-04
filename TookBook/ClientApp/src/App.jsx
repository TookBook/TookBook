import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from "./components/Footer"
import ThemeWrapper from './style/ThemeWrapper'
import MainWrapper from './style/MainWrapper'
import {
  BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom";
import UserLoginContainer from "./components/userPortalModal/UserLoginContainer"
import { useRecoilValue, useRecoilState } from 'recoil'
import { fetchedBooksState, fetchedCategoriesState, fetchedUsersState, activeUserState } from "./atoms/index"
import Homepage from './pages/Homepage';
import AdminMenu from './pages/AdminMenu'




function App() {
  const [fetchedBooks, setFetchedBooks] = useRecoilState(fetchedBooksState)
  const [fetchedCategories, setFetchedCategories] = useRecoilState(fetchedCategoriesState)
  const [fetchedUsers, setFetchedUsers] = useRecoilState(fetchedUsersState)

  const fetchtest = async () => {
    let response = await fetch("/api/Book/AllBooks")
    let data = await response.json();
    setFetchedBooks(data)
  };


  useEffect(() => {
    fetchtest();
    console.log(fetchedBooks)
  }, [])


  /** ThemeWrapper är en komponent som ligger i style/Themewrapper, där hämtar den ett tema för hela material-ui från style/MuiTheme.
   *  I MuiTheme så kan man ändra alla färger, ex primary som används nedan. Använder man "primary.main" så får man den färgen man döpte till primary, använder man primary.light så får man automatiskt en ljusare variant av färgen. Likadant med primary.dark  */
  return (
    <ThemeWrapper>
      <Router>
        <MainWrapper>
          <Navbar />

          <Routes>
            <Route path='/' element={<Homepage />} />
            {/* <Route path='/' element={<AdminMenu />} /> //kommentera bort raden ovan och sätt dit denna för o se admin sidan. Tills vi har routing färdigt  */}
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
    </ThemeWrapper>
  )
}

export default App
