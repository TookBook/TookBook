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
import MuiLink from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import { fetchedBooksState, fetchedCategoriesState } from '../../atoms';
import { styled, alpha } from '@mui/material/styles';
import theme from '../../style/MuiTheme';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';


const Searchbar = () => {
	const navigate = useNavigate()
	const [selectBoxFilter, setSelectBoxFilter] = useState("")
	const [autocompleteData, setAutocompleteData] = useState([])

	const [autocompleteValue, setAutocompleteValue] = useState(null)
	const [selectedSearchItem, setSelectedSearchItem] = useState("")

	const [forwardSearchItem, setForwardSearchItem] = useState("")

	const allBooks = useRecoilValue(fetchedBooksState)
	const allCategories = useRecoilValue(fetchedCategoriesState)

	const bookTitles = allBooks.map((book) => book.title)
	const bookCategories = allCategories.map((category) => category.categoryName)
	//TODO: Better solution.. Separate authorobjects where there's more than one author. Stringify in same map?
	const bookAuthors = allBooks.map((book) => book.authors.map((author) => author.firstName + " " + author.lastName))
	const bookAuthorsStringified = bookAuthors.map(author => author.toString())
	const bookAuthorsUnique = Array.from(new Set(bookAuthorsStringified))
	const bookEverything = bookTitles.concat(bookCategories, bookAuthorsUnique)


	const testAutocompleteBooks = allBooks

	const CategoryBox = () => {

		const handleChange = (e) => {
			setAutocompleteValue(null)
			setSelectBoxFilter(e.target.value)
		}

		return (
			<FormControl sx={{ width: "200px" }} variant="outlined">
				{/* <InputLabel id="select-filter">Filter</InputLabel> */}
				<Select
					autoWidth
					labelId="select-filter"
					id="select-filter"
					value={selectBoxFilter}
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


	//TODO: "All categories" with everything doesn't show up when first loading page, user must select category and then select all categories.
	//TODO: Reset textfield when Category has been changed
	// TODO: Get value from autocomplete, store in state, use state + selected search filter to make a search when going to separate search page
	// TODO: Forward to navigate thingy, get in searchresult page
	useEffect(() => {
		if (selectBoxFilter === "") setAutocompleteData(bookEverything)
		if (selectBoxFilter === "Title") setAutocompleteData(bookTitles)
		if (selectBoxFilter === "Category") setAutocompleteData(bookCategories)
		if (selectBoxFilter === "Author") setAutocompleteData(bookAuthorsUnique)
		if (!autocompleteData) setAutocompleteData(bookEverything)
	}, [selectBoxFilter])



	const handleNavigate = () => {
		navigate("/searchresults", { state: { searchItem: autocompleteValue, searchCategory: selectBoxFilter } })
	}

	// useEffect(() => {

	// 	setSelectedSearchItem(autocompleteValue)
	// 	console.log("AutocompleteValue changed:", autocompleteValue)
	// }, [autocompleteValue])

	useEffect(() => {
		if (autocompleteValue == null) {

			console.log("autocomplete null, dont navigate")

		}
		else {
			console.log("trying to navigate", autocompleteValue)
			handleNavigate()
		}

		// handleNavigate();

	}, [autocompleteValue])

	// useEffect(() => {

	// 	console.log("Selected search item changed to: ", selectedSearchItem)
	// 	setForwardSearchItem(selectedSearchItem)
	// }, [selectedSearchItem])



	return (

		<Box width={"60vmin"} bgcolor={alpha(theme.palette.common.white, 0.15)} position="relative" display="flex" borderRadius="3px">
			<CategoryBox />
			<Autocomplete
				loading={true}
				disablePortal
				id="book-search"
				onBlur={() => { console.log("BLURRED") }}
				onClose={() => { console.log("CLOSED") }}
				clearOnEscape={true}
				clearOnBlur={true}
				value={autocompleteValue}
				options={autocompleteData} // Options innehåller den data som ska visas upp i search-lådan.
				onChange={(e, value) => setAutocompleteValue(value)}
				sx={{ width: "100%", backgroundColor: "white", borderRadius: "3px" }}
				renderOption={(props, option, { selected }) => (

					<Box component="li" {...props}>
						{/* <Link to="/searchresults" state={{ searchItem: autocompleteValue, searchCategory: selectBoxFilter }}> */}
						<MuiLink >
							<Typography key={option.key}>{option}</Typography>
						</MuiLink>
						{/* </Link> */}
					</Box>
				)}
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