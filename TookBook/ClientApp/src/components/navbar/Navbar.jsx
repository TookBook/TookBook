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
import ConstructionIcon from '@mui/icons-material/Construction';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useRecoilState, useRecoilValue } from 'recoil';
import openUserPortalState from '../../atoms/openUserPortalState';
import shoppingCartState from '../../atoms/shoppingCartState';
import { activeUserState, adminModeState } from '../../atoms';
import { Link, useAsyncValue } from 'react-router-dom';
import Logo from "../../assets/images/logo.png"
import DropDownMenu from './DropDownMenu';
import { useEffect, use } from 'react';
import { useState } from 'react';



const Navbar = () => {
	//TODO: Breakpoints, responsiveness.

	const [openUserPortal, setOpenUserPortal] = useRecoilState(openUserPortalState)
	const [openShoppingCart, setOpenShoppingCart] = useRecoilState(shoppingCartState)
	const isAdmin = useRecoilState(adminModeState)
	const activeUser = useRecoilValue(activeUserState)


	const handleOpenUserPortal = () => {
		setOpenUserPortal(!openUserPortal)
		// <Link to="userportal" />
		console.log(activeUser.userName)
	}

	const handleOpenAdmin = () => {
		<Link to={"/adminmenu"}></Link>
		// <Link to="userportal" />
		console.log(activeUser.userName)
	}

	const handleOpenShoppingCart = () => {
		setOpenShoppingCart(!openShoppingCart)
		console.log(shoppingCartState)
		// <Link to="userportal" />
	}



	return (
		<>
			<AppBar>
				<Toolbar sx={{ justifyContent: "space-between" }}>

					<DropDownMenu />

					<Box display="flex" alignItems="center" sx={{ cursor: "pointer", }}>
						<Link style={{ textDecoration: 'none' }} to={"/"}>

							<Box sx={{ display: "flex", alignItems: "center", gap: "4em" }}>
								<img src={Logo} style={{ maxHeight: "60px" }}></img>
								<Box display="flex" alignItems="center" sx={{ cursor: "pointer", marginTop: ".5em", transform: "scale(2.2)" }}>
									<Typography sx={{ fontFamily: "Raleway", color: "black", textDecoration: "underline overline", textDecorationStyle: "double", userSelect: "none" }}>Took</Typography>
									<Typography sx={{ fontFamily: "Raleway", color: "white", textDecoration: "underline overline", textDecorationStyle: "double", userSelect: "none" }}>Book</Typography>
								</Box>
							</Box>

						</Link>
					</Box>

					<Searchbar />

					{/**TODO: Change to admin menu when user is admin */}

					<IconButton sx={{ color: "white", display: "flex", flexDirection: "column" }} onClick={handleOpenUserPortal}>
						<PersonSharpIcon fontSize='large' />
						<Typography>{activeUser.isActive ? "User" : "Login"}</Typography>
					</IconButton>
					{activeUser?.userType?.isAdmin &&
						<Link style={{ textDecoration: 'none' }} to={"/adminmenu"}>
							<IconButton sx={{ color: "white", display: "flex", flexDirection: "column" }} >

								<ConstructionIcon fontSize='large' />
								<Typography>Admin Dashboard</Typography>
							</IconButton>
						</Link>
					}


					{/**TODO: Proper icon, onlclick etc, basket dropdown thingy */}

					<IconButton sx={{ color: "white", display: "flex", flexDirection: "column", }} onClick={handleOpenShoppingCart}>
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