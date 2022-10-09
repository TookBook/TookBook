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
import { createFilterOptions } from '@mui/material/Autocomplete';
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

	const [selectBoxFilter, setSelectBoxFilter] = useState("Everything")
	const [autocompleteData, setAutocompleteData] = useState([])
	const [autocompleteValue, setAutocompleteValue] = useState(null)

	const allBooks = useRecoilValue(fetchedBooksState)
	const allCategories = useRecoilValue(fetchedCategoriesState)

	const bookTitles = allBooks.map((book) => book.title)
	const bookCategories = allCategories.map((category) => category.categoryName)
	//TODO: Better solution.. Separate authorobjects where there's more than one author. Stringify in same map?
	const bookAuthors = allBooks.map((book) => book.authors.map((author) => author.firstName + " " + author.lastName))
	const bookAuthorsStringified = bookAuthors.map(author => author.toString())
	const bookAuthorsUnique = Array.from(new Set(bookAuthorsStringified))
	const bookEverything = bookTitles.concat(bookCategories, bookAuthorsUnique)

	const CategoryBox = () => {

		const handleChange = (e) => {
			setAutocompleteValue(null)
			setSelectBoxFilter(e.target.value)
		}

		return (
			<FormControl sx={{ maxWidth: "200px" }} variant="outlined">
				{/* <InputLabel id="select-filter">Filter</InputLabel> */}
				<Select
					autoWidth={true}
					labelId="select-filter"
					id="select-filter"
					value={selectBoxFilter}
					label="search"
					defaultValue='Everything'
					onChange={handleChange}
					sx={{
						'.MuiOutlinedInput-notchedOutline': { border: 0 },
						color: "white",
						'& legend': { display: 'none' },
						'& fieldset': { top: 0 },
					}}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem value={"Everything"}>All Categories</MenuItem>
					<MenuItem value={"Title"}>Book Title</MenuItem>
					<MenuItem value={"Category"}>Book Category</MenuItem>
					<MenuItem value={"Author"}>Book Author</MenuItem>
				</Select>
			</FormControl>
		)

	}



	const navigateToPage = () => {
		navigate("/searchresults", { state: { searchItem: autocompleteValue, searchCategory: selectBoxFilter } })
	}


	// const limitResultsFilter = createFilterOptions({
	// 	limit: 5
	// });
	const autoCompleteFilter = createFilterOptions({
		limit: 10
	})


	useEffect(() => {
		if (selectBoxFilter === "") setAutocompleteData(bookEverything)
		if (selectBoxFilter === "Title") setAutocompleteData(bookTitles)
		if (selectBoxFilter === "Category") setAutocompleteData(bookCategories)
		if (selectBoxFilter === "Author") setAutocompleteData(bookAuthorsUnique)
		if (!autocompleteData) setAutocompleteData(bookEverything)
	}, [selectBoxFilter])

	// Navigates to the searchresults-page automatically when the autocomplete-value is selected and is not null. There's probably a better solution but I'm at my wits end.
	useEffect(() => {
		if (autocompleteValue == null) {
			console.log("autocomplete null, dont navigate")
		}
		else {
			console.log("trying to navigate", autocompleteValue)
			navigateToPage()
		}
	}, [autocompleteValue])

	useEffect(() => {
		console.log(selectBoxFilter)
	}, [])

	return (

		<Box width={"60vmin"} bgcolor={alpha(theme.palette.common.white, 0.15)} position="relative" display="flex" borderRadius="3px" border="1px solid" borderColor={alpha(theme.palette.primary.dark, 0.8)}>
			<Box sx={{}} >
				<CategoryBox />
			</Box>

			<Autocomplete
				disablePortal
				freeSolo
				filterOptions={(options, params) => {
					const filtered = autoCompleteFilter(options, params);
					filtered.limit = 10;
					if (params.inputValue != "") {
						filtered.push(
							`${params.inputValue}`
						);
					}
					return filtered;
				}}
				id="book-search"
				onBlur={() => { console.log("BLURRED") }}
				onClose={() => { console.log("CLOSED") }}
				clearOnEscape={true}
				clearOnBlur={true}
				value={autocompleteValue}

				options={selectBoxFilter == "Everything" ? bookEverything : autocompleteData} // Options innehåller den data som ska visas upp i search-lådan.
				onChange={(e, value) => setAutocompleteValue(value)}
				sx={{ width: "100%", backgroundColor: "white", borderRadius: "3px" }}
				renderOption={(props, option, { selected }) => (

					<Box component="li" {...props} sx={{ bgColor: "black" }}  >
						{/* <Link to="/searchresults" state={{ searchItem: autocompleteValue, searchCategory: selectBoxFilter }}> */}
						<MuiLink underline='none' sx={{ bgColor: "black" }} >
							<Typography sx={{ fontWeight: "600" }} key={option.key}>{option}</Typography>
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