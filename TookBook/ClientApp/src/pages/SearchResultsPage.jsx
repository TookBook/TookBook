import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import theme from "../style/MuiTheme";
import BookPreview from '../components/BookPreview';
import { useRecoilValue } from 'recoil';
import { fetchedBooksState, fetchedCategoriesState } from '../atoms';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';


// Use pagination for search results?
const SearchResultsPage = () => {
	const location = useLocation();
	const searchTerm = location.state.searchItem;
	const searchCategory = location.state.searchCategory
	const splitSearchTerm = searchTerm.split(" ")
	const allBooks = useRecoilValue(fetchedBooksState)

	const booksByTitle = allBooks.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
	const booksByCategory = allBooks.filter(book => book.categories.some(category => category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())))
	// TODO: Better solution?.. 
	const booksByAuthor = allBooks.filter(book => book.authors.some(author => {
		const splitSearchTerm = searchTerm.split(" ")
		for (let i = 0; i < splitSearchTerm.length; i++) {
			if (author.firstName.toLowerCase().includes(splitSearchTerm[i].toLowerCase()) || author.lastName.toLowerCase().includes(splitSearchTerm[i].toLowerCase()))
				return author
		}
	}))
	const booksByDescription = allBooks.filter(book => book.bookInfo.toLowerCase().includes(searchTerm.toLowerCase()))


	const getSearchBarSearch = () => {

		// Concats the most relevant array to show the results higher in the searchresults. 
		//TODO: Better way to do a weighted search..
		// TODO: Some searches persist when having searched and then switching category and doing another search
		if (searchCategory === "Title")
			return booksByTitle
		if (searchCategory === "Category")
			return booksByCategory
		if (searchCategory === "Author")
			return booksByAuthor
		if (searchCategory === "Everything") {
			return Array.from(new Set(booksByTitle.concat(booksByAuthor, booksByCategory, booksByDescription))) // "Set" to filter duplicates
		}
	}

	const searchesToDisplay = getSearchBarSearch();


	// useEffect(() => {

	// }, [location.state])

	return (

		<Container sx={{ mt: "6rem" }}>

			<Box sx={{ border: "1px solid black", padding: "1rem" }}>

				<Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", gap: "1rem", paddingTop: "3rem" }}>
					<Typography variant='h6' sx={{ color: "primary.dark" }}> You searched for: </Typography>
					<Typography variant='h5' sx={{ color: "primary.dark" }} fontWeight="bold"> {searchTerm} </Typography>
				</Box>

				<Box sx={{ display: "flex", justifyContent: "space-between", mt: "2rem" }}>
					<Typography sx={{}}>
						Search results: {searchesToDisplay.length}
					</Typography>
					<Box>
						<Typography sx={{ color: "primary.dark" }} paddingRight="2px" fontWeight="bold" variant='body3'>Sort by:</Typography>
						<Button onClick={() => console.log(searchesToDisplay)} variant="text"> AZ </Button>
						<Button variant="text"> In stock </Button>
					</Box>
				</Box>

			</Box>

			<Box sx={{ border: "1px solid black", borderTop: "none", paddingTop: "1rem" }}>
				{searchesToDisplay.sort().map((book, id) => <BookPreview key={book.bookId} book={book}></BookPreview>)}
			</Box>

		</Container>

	)
}


export default SearchResultsPage