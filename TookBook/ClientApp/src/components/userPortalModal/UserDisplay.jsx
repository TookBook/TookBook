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
import { activeUserState, adminModeState } from "../../atoms";





const UserDisplay = () => {

	const [activeUser, setActiveUser] = useRecoilState(activeUserState)

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
			<Typography component="h1" variant="h5">
				{activeUser.userName}
			</Typography>







			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}

			>
				View User Profile
			</Button>

			<Button
				type=""

				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2, position: "absolute", maxWidth: 175, bottom: "3rem", }}
			>
				Logout
			</Button>


		</Box>
	)
}

export default UserDisplay