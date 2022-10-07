import { useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Footer from "./components/Footer"
import ThemeWrapper from './style/ThemeWrapper'
import MainWrapper from './style/MainWrapper'
import {
  BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom";
import UserLoginContainer from "./components/userPortalModal/UserLoginContainer"
import { useRecoilValue, useRecoilState } from 'recoil'
import { fetchedBooksState, fetchedCategoriesState, fetchedUsersState, activeUserState } from "./atoms/index"
import ShoppingCartDrawer from './components/shoppingCart/ShoppingCartDrawer'
import Homepage from './pages/Homepage';
import AdminMenu from './pages/AdminMenu'
import ShoppingCart from './pages/ShoppingCart';
import BookInfo from './pages/BookInfo';
import UserProfile from "./pages/UserProfile"
import SearchResultsPage from "./pages/SearchResultsPage"




function App() {
  const [fetchedBooks, setFetchedBooks] = useRecoilState(fetchedBooksState)
  const [fetchedCategories, setFetchedCategories] = useRecoilState(fetchedCategoriesState)
  const [fetchedUsers, setFetchedUsers] = useRecoilState(fetchedUsersState)

  const fetchBooks = async () => {
    let response = await fetch("/api/Book/AllBooks")
    let data = await response.json();
    setFetchedBooks(data)

  };

  const fetchCategories = async () => {
    let response = await fetch("/api/Category/AllCategories")
    let data = await response.json();
    setFetchedCategories(data)
  };

  const fetchUsers = async () => {
    let response = await fetch("/api/User/AllUsers")
    let data = await response.json();
    setFetchedUsers(data)
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchUsers();
    console.log(fetchedBooks)
    console.log(fetchedCategories)
    console.log(fetchedUsers)
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
            <Route path='ShoppingCart' element={<ShoppingCart />} />
            <Route path='bookInfo' element={<BookInfo />} />
            <Route path='/adminmenu' element={<AdminMenu />} />
            <Route path='/userprofile' element={<UserProfile />} /> {/**TODO: user.id stuff? */}
            <Route path='/searchresults' element={<SearchResultsPage />} />
            {/* <Route
              path='userportal'
              element={(
                <UserLoginContainer />
              )}/> */}
          </Routes>

          <UserLoginContainer />
          <ShoppingCartDrawer />
        </MainWrapper>

        <Footer />
      </Router>
    </ThemeWrapper>
  )
}

export default App
