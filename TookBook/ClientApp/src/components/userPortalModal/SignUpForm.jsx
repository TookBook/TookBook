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
import { activeUserState, isUserLoggedInState } from "../../atoms";
import openUserPortalState from "../../atoms/openUserPortalState";


const usernameErrorMessage = (username) => {
	const tooShort = username.length < 4 && username.length != 0

	if (tooShort) return `Username must be longer than four characters`

}
const passwordErrorMessage = (pass) => {
	const tooShort = pass.length < 4 && pass.length != 0
	if (tooShort) return `Password must be longer than four characters`
}

const emailErrorMessage = (email) => {
	const invalidMail = email.length < 6 && !email.includes("@") || !email.includes(".")
	if (invalidMail) return `The entered email is not valid`
}



const SignUpForm = ({ switchTab }) => {
	//TODO: Change register to "Send activation code."
	//TODO: When click on "send activationcode", create pop up with "check your email for your activation code."
	//TODO: Info; enter activation code to receive password. (temp password?)
	const [usernameField, setUsernameField] = useState("")
	const [passwordField, setPasswordField] = useState("")
	const [emailField, setEmailField] = useState("")
	const [loginUser, setLoginUser] = useRecoilState(activeUserState)
	const [userLoggedIn, setUserLoggedIn] = useRecoilState(isUserLoggedInState)
	const [userModal, setUserModal] = useRecoilState(openUserPortalState)
	const [infoMessage, setInfoMessage] = useState("")

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();

		const loginData = new FormData(e.currentTarget);
		const userName = loginData.get("username");
		const password = loginData.get("password")
		const email = loginData.get("email")

		const reqOptions = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}
		// TODO: log in automatically after successfully registering
		const registerResponse = await fetch(`api/User/CreateUser?name=${userName}&email=${email}&password=${password}`, reqOptions)
		if (registerResponse.status == 200) {
			let data = await registerResponse.json()
			console.log("SUCCESFULLY REGISTERED")
			setLoginUser(data)
			setUserLoggedIn(true)
			switchTab(1)

		}

		console.log("Name", userName)
		console.log("Password", password)
		console.log("Email", email)
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
			<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
				<PersonSharpIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Register
			</Typography>

			<Box component="form" onSubmit={handleRegisterSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					autoFocus
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username"
					name="username"
					// onFocus={}
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
					error={passwordField !== "" && passwordField.length < 4}
					autoComplete="new-password"
					onChange={(e) => setPasswordField(e.target.value)}
					helperText={passwordErrorMessage(passwordField)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="email"
					label="Email"
					type="email"
					id="email"
					// onFocus={}
					error={emailField !== "" && (!emailField.includes("@") || !emailField.includes("."))}
					autoComplete="new-password"
					onChange={(e) => setEmailField(e.target.value)}
					helperText={emailField !== "" && emailErrorMessage(emailField)}
				/>

				<Typography color="error.light" textAlign="center">{infoMessage}</Typography>


				<Button
					type="submit"
					fullWidth
					variant="contained"
					disabled={(passwordField.length < 4 || usernameField.length < 4)} // TODO: proper mini validation
					sx={{ mt: 3, mb: 2 }}
				>
					Register
				</Button>


			</Box>

		</Box>
	)
}

export default SignUpForm