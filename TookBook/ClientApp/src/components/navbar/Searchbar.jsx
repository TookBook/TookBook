import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import { fetchedBooksState, fetchedCategoriesState } from '../../atoms';
import { styled, alpha } from '@mui/material/styles';
import theme from '../../style/MuiTheme';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';


const Searchbar = () => {
	const navigate = useNavigate()
	const [searchFilter, setSearchFilter] = useState("")
	const allBooks = useRecoilValue(fetchedBooksState)
	const allCategories = useRecoilValue(fetchedCategoriesState)
	const [autoCompleteData, setAutoCompleteData] = useState([])


	const bookTitles = allBooks.map((book) => book.title)
	const bookCategories = allCategories.map((category) => category.categoryName)
	//TODO: Better solution.. Separate authorobjects where there's more than one author. Stringify in same map?
	const bookAuthors = allBooks.map((book) => book.authors.map((author) => author.firstName + " " + author.lastName))
	const bookAuthorsStringified = bookAuthors.map(author => author.toString())
	const bookAuthorsUnique = Array.from(new Set(bookAuthorsStringified))
	const bookEverything = bookTitles.concat(bookCategories, bookAuthorsUnique)



	const CategoryBox = () => {

		const handleChange = (e) => {
			setSearchFilter(e.target.value)
		}

		return (
			<FormControl sx={{ width: "200px" }} variant="outlined">
				{/* <InputLabel id="select-filter">Filter</InputLabel> */}
				<Select
					autoWidth
					labelId="select-filter"
					id="select-filter"
					value={searchFilter}
					label="search"
					onChange={handleChange}
					sx={{
						color: "white",

						'& legend': { display: 'none' },
						'& fieldset': { top: 0 },
					}}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem value="">All Categories</MenuItem>
					<MenuItem value={"Title"}>Book Title</MenuItem>
					<MenuItem value={"Category"}>Book Category</MenuItem>
					<MenuItem value={"Author"}>Book Author</MenuItem>
				</Select>
			</FormControl>
		)

	}

	const handleRedirect = () => {

		console.log("AYAYAY")
	}

	//TODO: "All categories" with everything doesn't show up when first loading page, user must select category and then select all categories.
	useEffect(() => {
		if (searchFilter === "") setAutoCompleteData(bookEverything)
		if (searchFilter === "Title") setAutoCompleteData(bookTitles)
		if (searchFilter === "Category") setAutoCompleteData(bookCategories)
		if (searchFilter === "Author") setAutoCompleteData(bookAuthorsUnique)

	}, [searchFilter])

	useEffect(() => {
		setSearchFilter("")
	}, [])

	return (

		<Box width={"60vmin"} bgcolor={alpha(theme.palette.common.white, 0.15)} position="relative" display="flex" borderRadius="3px">
			<CategoryBox />
			<Autocomplete
				loading={true}
				disablePortal
				id="book-search"
				options={autoCompleteData} // Options innehåller den data som ska visas upp i search-lådan.
				onChange={handleRedirect}
				sx={{ width: "100%", backgroundColor: "white", borderRadius: "3px" }}
				renderInput={(params) =>
					<TextField {...params} label="Search.."
						sx={{
							backgroundColor: alpha(theme.palette.common.white, 0.15), '&:hover':
								{ backgroundColor: alpha(theme.palette.common.white, 0.3) }
						}}
						variant="filled"

					/>


				}>

			</Autocomplete>

			<Box sx={{
				paddingInline: "15px",
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<SearchIcon />
			</Box>

		</Box>
	)
}

export default Searchbar