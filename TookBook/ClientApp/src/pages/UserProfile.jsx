import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import BooksHorizontalDisplay from '../components/homepage/BooksHorizontalDisplay';
import { redirect, useNavigate } from 'react-router-dom';
import { activeUserState, isUserLoggedInState } from "../atoms/index"
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'



const usernameErrorMessage = (username) => {
	const tooShort = username.length < 4 && username.length != 0

	if (tooShort) return `Username must be longer than four characters`

}
const passwordErrorMessage = (pass) => {
	const tooShort = pass.length < 4 && pass.length != 0
	if (tooShort) return `Password must be longer than four characters`
}


//TODO: Display data from current logged in user.
// "Edit Profile Information" section in a box with textfields.
const UserProfile = () => {
	const navigate = useNavigate()
	const userLoggedIn = useRecoilValue(isUserLoggedInState)
	const [currentUser, setCurrentUser] = useRecoilState(activeUserState)

	const [usernameField, setUsernameField] = useState("")
	const [passwordField, setPasswordField] = useState("")
	const [emailField, setEmailField] = useState("")
	const [infoMessage, setInfoMessage] = useState("")


	const handleUpdateUser = async (e) => {
		e.preventDefault();

		//TODO: Update user stuff

	}




	useEffect(() => {
		if (!userLoggedIn) navigate("/")
	}, [userLoggedIn])

	useEffect(() => {
		console.log(currentUser)
	}, [])
	return (
		<Container maxWidth={"lg"} sx={{ mt: "5rem" }}>

			<Box sx={{ marginInline: "auto", border: "1px solid black", borderRadius: "3px", maxWidth: "400px" }}>
				<Box sx={{ borderBottom: "1px solid black", padding: "5px" }} bgcolor="primary.main">
					<Typography color="white" fontWeight="bold" fontSize="1.5em" >Personal Data</Typography>

				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1rem", }}>
					<Typography variant='h5'>{currentUser.userName}</Typography>
					<Typography variant='h6'>{currentUser.mail}</Typography>
				</Box>

				<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1rem", gap: "1rem" }} >
					<Box component="form" onSubmit={handleUpdateUser} noValidate sx={{ mt: 1 }}>
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
							autoFocus
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							value={emailField}
							error={emailField !== "" && (!emailField.includes("@") || !emailField.includes("."))}
							autoComplete="new-password"
							onChange={(e) => setEmailField(e.target.value)}
							helperText={emailField !== "" && emailErrorMessage(emailField)}
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


					</Box>

					<Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px", gap: "3rem" }}>

						<Button
							type="submit"

							variant="contained"
							disabled={(passwordField.length < 4 || usernameField.length < 4)} // TODO: proper mini validation
						>
							Update
						</Button>
						<Button variant="contained" >
							Reset
						</Button>
					</Box>

				</Box>
			</Box>
		</Container >

	)
}


export default UserProfile