import { useRecoilState } from "recoil"
import { useState, forwardRef } from "react";
import Slide from '@mui/material/Slide';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from "@mui/material/Paper"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from "@mui/material/Link";
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import Avatar from '@mui/material/Avatar';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { activeUserState, adminModeState, isUserLoggedInState } from "../../atoms";





const UserDisplay = () => {

	const [activeUser, setActiveUser] = useRecoilState(activeUserState)
	const [logout, setLogout] = useRecoilState(isUserLoggedInState)

	const handleLogout = (e) => {
		e.preventDefault();
		setLogout(false)
		setActiveUser({})
	}

	const handleGoToProfile = () => {
		<Link href="/"></Link>
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
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{}}
					onClick={() => handleGoToProfile()}
				>
					Go to profile
				</Button>

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