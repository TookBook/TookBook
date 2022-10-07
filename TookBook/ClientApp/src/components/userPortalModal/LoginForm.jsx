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
import { activeUserState, adminModeState, isUserLoggedInState } from "../../atoms";
import { useRef } from "react";
import { getBottomNavigationUtilityClass } from "@mui/material";
import { useEffect } from "react";





const usernameErrorMessage = (username) => {
	const tooShort = username.length < 4 && username.length != 0

	if (tooShort) return `Username must be longer than four characters`

}
const passwordErrorMessage = (pass) => {
	const tooShort = pass.length < 4 && pass.length != 0
	if (tooShort) return `Password must be longer than four characters`
}




// TODO: API requests, get user etc. Add helpertext. Frontend validation of username/pass?
const LoginForm = () => {

	const [usernameField, setUsernameField] = useState("")
	const [passwordField, setPasswordField] = useState("")
	const [activeUser, setActiveUser] = useRecoilState(activeUserState)

	const [isAdmin, setIsAdmin] = useRecoilState(adminModeState)
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isUserLoggedInState)
	const [infoMessage, setInfoMessage] = useState("")

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		const loginData = new FormData(e.currentTarget);
		const userName = loginData.get("name");
		const password = loginData.get("password")

		const loginResponse = await fetch(`api/User/Login?username=${userName}&password=${password}`)
		if (loginResponse.status == 404) {
			setInfoMessage("User was not found")
		}
		if (loginResponse.status == 200) {
			let user = await loginResponse.json();
			setActiveUser(user)
			setIsLoggedIn(true);
			if (user.userType.isAdmin) setIsAdmin(true)
		}

	}


	const checkIfRegistered = () => {
		if (activeUser.userName?.length > 0) {
			setUsernameField(activeUser.userName)
			setPasswordField(activeUser.password)
		}
		console.log("checkifregisteredfired")
	}

	useEffect(() => {
		checkIfRegistered()
	}, [])

	return (
		<Box
			sx={{
				marginTop: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
				<PersonSharpIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Login
			</Typography>

			<Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					autoFocus
					margin="normal"
					required
					fullWidth
					id="name"
					label="Username"
					name="name"
					value={usernameField}
					error={usernameField !== "" && usernameField.length < 4}
					autoComplete="off"
					onChange={(e) => setUsernameField(e.target.value)}
					helperText={usernameErrorMessage(usernameField)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					// onFocus={}
					focused={false}
					value={passwordField}
					error={passwordField !== "" && passwordField.length < 4}
					autoComplete="new-password"
					onChange={(e) => setPasswordField(e.target.value)}
					helperText={passwordErrorMessage(passwordField)}
				/>

				<Typography color="error" textAlign="center">{infoMessage}</Typography>


				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={(passwordField.length < 4 || usernameField.length < 4)} // TODO: proper mini validation
				>
					Login
				</Button>

				<Box textAlign="center">
					<Link
						component="button"
						variant="body2"
					>
						{/* Forgotten your password? */}
					</Link>

				</Box>
			</Box>

		</Box>
	)
}

export default LoginForm