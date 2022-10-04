import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Searchbar from './Searchbar';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useRecoilState } from 'recoil';
import openUserPortalState from '../atoms/openUserPortalState';
import { Link } from 'react-router-dom';

import DropDownMenu from './DropDownMenu';
const Navbar = () => {
	//TODO: Breakpoints, responsiveness.

	const [openUserPortal, setOpenUserPortal] = useRecoilState(openUserPortalState)

	const handleOpenUserPortal = () => {
		console.log("click");
		setOpenUserPortal(!openUserPortal)
		// <Link to="userportal" />
	}

	return (
		<>
			<AppBar>
				<Toolbar sx={{ justifyContent: "space-between" }}>

					<DropDownMenu/>

					{/* TODO: Make clickable and working */}
					<Box display="flex" alignItems="center" sx={{ cursor: "pointer", heigth: "1.5em", width: "5.2em", marginTop: ".5em", transform: "scale(1.6)" }}>
						<Typography sx={{ fontFamily: "Raleway", color: "black", textDecoration: "underline overline", textDecorationStyle: "double", userSelect: "none" }}>Took</Typography>
						<Typography sx={{ fontFamily: "Raleway", color: "white", textDecoration: "underline overline", textDecorationStyle: "double", userSelect: "none" }}>Book</Typography>
					</Box>

					<Searchbar />

					{/**TODO: Proper icon, onlclick etc */}

					<IconButton sx={{ color: "white", display: "flex", flexDirection: "column" }} onClick={handleOpenUserPortal}>
						<PersonSharpIcon fontSize='large' />
						<Typography>Login</Typography>
					</IconButton>

					{/**TODO: Proper icon, onlclick etc, basket dropdown thingy */}

					<IconButton sx={{ color: "white", display: "flex", flexDirection: "column", }}>
						{/* <i class="fa-solid fa-basket-shopping"></i> */}
						<ShoppingBasketIcon fontSize='large' />
						<Typography>Basket</Typography>
					</IconButton>

				</Toolbar>


			</AppBar>
			<Toolbar sx={{ marginBottom: "15px" }} />
		</>
	)
}

export default Navbar;