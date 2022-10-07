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
import MenuItem from '@mui/material/MenuItem';
import { fetchedBooksState } from '../../atoms';
import { styled, alpha } from '@mui/material/styles';
import theme from '../../style/MuiTheme';
import { useRecoilValue } from 'recoil';


const Searchbar = () => {
	const [searchFilter, setSearchFilter] = useState("")
	const allBooks = useRecoilValue(fetchedBooksState)

	const testData = ["Hello", "This", "Is", "A", "Search", "Box"]

	const CategoryBox = () => {

		const handleChange = (e) => {
			setSearchFilter(e.target.value)
			console.log("Filter box changed")
			console.log("search filter:", searchFilter)
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
					<MenuItem value="">All Books</MenuItem>
					<MenuItem value={"Title"}>Title</MenuItem>
					<MenuItem value={"Category"}>Category</MenuItem>
					<MenuItem value={"Author"}>Author</MenuItem>
				</Select>
			</FormControl>
		)

	}


	//TODO: Sökbar ger förslag på sökningsord som matchar, när man trycker enter, gå till hela search sidan med resultat på det som matchar
	return (

		<Box width={"60vmin"} bgcolor={alpha(theme.palette.common.white, 0.15)} position="relative" display="flex" borderRadius="3px">
			<CategoryBox />
			<Autocomplete
				disablePortal
				id="book-search"
				options={testData} // Options innehåller den data som ska visas upp i search-lådan.

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