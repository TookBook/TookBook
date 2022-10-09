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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import theme from "../style/MuiTheme";
import { Form } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { fetchedBooksState, fetchedCategoriesState } from '../atoms';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';



//TODO: Get results from useLocation navigation thingy
// Display search results based on useLocation selectBoxFilter-thingy and the search term.
// If both are empty, display list of all books.
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
		console.log(splitSearchTerm)
		for (let i = 0; i < splitSearchTerm.length; i++) {
			if (author.firstName.toLowerCase().includes(splitSearchTerm[i].toLowerCase()) || author.lastName.toLowerCase().includes(splitSearchTerm[i].toLowerCase()))
				return author
		}
	}))
	const booksByDescription = allBooks.filter(book => book.bookInfo.toLowerCase().includes(searchTerm.toLowerCase()))


	const getSearchBarSearch = () => {

		//Concat the most relevant array to show the results higher in the searchresults. 
		//TODO: Better way to do a weighted search..
		if (searchCategory === "Title")
			return booksByTitle
		if (searchCategory === "Category")
			return booksByCategory
		if (searchCategory === "Author")
			return booksByAuthor
		if (searchCategory === "Everything") {
			const conBooks = booksByTitle.concat(booksByAuthor, booksByCategory, booksByDescription)
			const conBooksUniqueValues = conBooks.filter((book, i) => { return conBooks.indexOf(book) !== i }) // removes too many books lul. Only remove same name instead of all index?
			return conBooks
		}
	}

	const searchesToDisplay = getSearchBarSearch();

	useEffect(() => {
		console.log(location.state)
	}, [location.state])

	useEffect(() => {
		console.log("searched for:", searchTerm)
		console.log("searchbarsearch:", searchesToDisplay)

	}, [location.state])

	return (

		<Container sx={{ mt: "6rem" }}>
			<div>Hi, I'm a search results page. You searched for: {searchTerm} in category: {searchCategory}</div>
			<Box sx={{ border: "1px solid black", padding: "1rem" }}>
				<Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", gap: "1rem", paddingTop: "3rem" }}>
					<Typography variant='h6'> You searched for: </Typography>
					<Typography variant='h5' fontWeight="bold"> {searchTerm} </Typography>
				</Box>

				<Box sx={{ display: "flex", justifyContent: "space-between", mt: "2rem" }}>

					<Typography sx={{}}>
						Search results: {searchesToDisplay.length}
					</Typography>
					<Box>
						lalala display optionsbox here lalal
					</Box>
				</Box>

			</Box>
			{searchesToDisplay.map((book) => <div>{book.title}</div>)}
		</Container>

	)
}


export default SearchResultsPage