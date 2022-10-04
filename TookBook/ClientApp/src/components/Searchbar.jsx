import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled, alpha } from '@mui/material/styles';
import theme from '../style/muitheme';


const Searchbar = () => {


	const testData = ["Hello", "This", "Is", "A", "Search", "Box"]

	return (

		<Box bgcolor={alpha(theme.palette.common.white, 0.15)} position="relative" display="flex" borderRadius="3px">

			<Autocomplete
				disablePortal
				id="book-search"
				options={testData} // Options innehåller den data som ska visas upp i search-lådan.

				sx={{ width: 600, backgroundColor: "white", borderRadius: "3px" }}
				renderInput={(params) =>
					<TextField {...params} label="Search.."
						sx={{backgroundColor: alpha(theme.palette.common.white, 0.15), '&:hover': 
						{ backgroundColor: alpha(theme.palette.common.white, 0.3) }}}
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