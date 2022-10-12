import { useRecoilState } from "recoil"
import { useState, forwardRef } from "react";
import Slide from '@mui/material/Slide';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import Avatar from '@mui/material/Avatar';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { activeUserState, adminModeState, isUserLoggedInState } from "../../atoms";
import openUserPortalState from "../../atoms/openUserPortalState";
import { Link } from "react-router-dom";





const UserDisplay = () => {

	const [activeUser, setActiveUser] = useRecoilState(activeUserState)
	const [adminMode, setAdminMode] = useRecoilState(adminModeState)
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isUserLoggedInState)
	const [openContainer, setOpenContainer] = useRecoilState(openUserPortalState)

	const handleLogout = (e) => {
		e.preventDefault();
		setIsLoggedIn(false)
		setActiveUser({})
		setAdminMode(false)
		// setOpenContainer(false)
	}

	const handleGoToProfile = () => {
		setOpenContainer(false)
	}

	return (
		<Box
			sx={{
				marginTop: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: 'primary.main', height: "55px", width: "55px" }}>
				<AccountCircleRoundedIcon sx={{ height: "50px", width: "50px" }} />
			</Avatar>
			<Typography>Welcome</Typography>
			<Typography component="p" variant="h4">
				{activeUser.userName}
			</Typography>
			<Typography component="p" variant="body2">
				{activeUser.mail}
			</Typography>

			<Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: "5rem" }}>
				<Link style={{ textDecoration: "none" }} to={"/userprofile"}>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{}}
						onClick={handleGoToProfile}
					>
						Go to profile
					</Button>
				</Link>
				<Button
					type=""
					onClick={(e) => handleLogout(e)}
					fullWidth
					variant="contained"
					sx={{}}
				>
					Logout
				</Button>
			</Box>

		</Box>
	)
}

export default UserDisplay