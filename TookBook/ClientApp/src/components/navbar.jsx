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

const Navbar = () => {
	//TODO: Breakpoints, responsiveness.

	const [openUserPortal, setOpenUserPortal] = useRecoilState(openUserPortalState)

	const handleOpenUserPortal = () => {
		setOpenUserPortal(!openUserPortal)
	}

	return (
		<>
			<AppBar>
				<Toolbar sx={{ justifyContent: "space-between" }}>

					<IconButton size='large' sx={{ color: "white", fontSize: "2rem" }}>
						<MenuIcon fontSize='5rem'></MenuIcon>
					</IconButton>

					<Box display="flex" alignItems="center" sx={{background: "gray", heigth: "1.5em", width: "4.5em"}}>
						<Typography variant='logoTook' sx={{color: "black"}}> Took</Typography>
						<Typography variant="logoBook"sx={{color: "white"}}>Book</Typography>
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