import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import BooksHorizontalDisplay from '../components/homepage/BooksHorizontalDisplay';
import { redirect, useNavigate } from 'react-router-dom';
import { activeUserState, isUserLoggedInState } from "../atoms/index"
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import TextField from '@mui/material/TextField'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon';
import ListAltIcon from '@mui/icons-material/ListAlt';


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


//TODO: Display data from current logged in user.
// "Edit Profile Information" section in a box with textfields.
const UserProfile = () => {
	const navigate = useNavigate()
	const userLoggedIn = useRecoilValue(isUserLoggedInState)
	const [currentUser, setCurrentUser] = useRecoilState(activeUserState)

	const [usernameField, setUsernameField] = useState("")
	const [passwordField, setPasswordField] = useState("")
	const [newPasswordField, setNewPasswordField] = useState("")
	const [confirmNewPassField, setConfirmNewPassField] = useState("")
	const [emailField, setEmailField] = useState("")

	const [infoMessage, setInfoMessage] = useState("")


	const handleUpdateUser = async (e) => {
		e.preventDefault();

		const updatedUserData = new FormData(e.currentTarget);
		const updatedUsername = updatedUserData.get("name");
		const updatedEmail = updatedUserData.get("email");

		const oldPassword = updatedUserData.get("password")
		let newPassword = updatedUserData.get("new-password")
		if (newPassword === "") newPassword = oldPassword;
		console.log(oldPassword, newPassword)

		const req = { method: "POST" }
		const updateUserResponse = await fetch(`api/User/EditProfile?id=${currentUser.userId}&username=${updatedUsername}&email=${updatedEmail}&oldPassword=${oldPassword}&newPassword=${newPassword}`, req)
		if (updateUserResponse.status == "200") {
			const updatedUser = await updateUserResponse.json()
			setInfoMessage("Account details succesfully updated!")
			console.log("returned user: ", updatedUser)
			setCurrentUser(updatedUser)

		}
		console.log(updateUserResponse)
		console.log(currentUser)

		console.log("submitted")
		//TODO: Update user stuff

	}

	const handleReset = () => {
		setUsernameField(currentUser.userName)
		setEmailField(currentUser.mail)
		setPasswordField(currentUser.password)
		setNewPasswordField("")
		setConfirmNewPassField("")
	}

	useEffect(() => {
		setUsernameField(currentUser.userName)
		setEmailField(currentUser.mail)
		setPasswordField(currentUser.password)
	}, [])

	useEffect(() => {
		if (!userLoggedIn) navigate("/")
	}, [userLoggedIn])

	useEffect(() => {
		newPasswordField !== confirmNewPassField ? setInfoMessage("New password does not match") : setInfoMessage("")
	}, [confirmNewPassField])
	return (
		<Container maxWidth={"lg"} sx={{ mt: "5rem" }}>

			<Box sx={{ display: "flex", justifyContent: "center", gap: "5rem", flexDirection: { md: "row", xs: "column" } }}>

				<Box sx={{ border: "1px solid black", borderRadius: "3px", maxWidth: "400px" }}>
					<Box sx={{ borderBottom: "1px solid black", padding: "5px" }} bgcolor="primary.main">
						<Typography color="white" fontWeight="bold" fontSize="1.5em" >Account Details</Typography>

					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1rem", }}>
						<Icon color='primary' sx={{ fontSize: "3rem" }}><ManageAccountsOutlinedIcon sx={{ fontSize: "3rem" }} /></Icon>
						<Typography variant='h6'>{currentUser.userName}</Typography>

					</Box>

					<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1rem", paddingTop: "0", gap: "1rem" }} >
						<Box component="form" onSubmit={handleUpdateUser} noValidate sx={{ mt: 1 }}>

							<Box sx={{ minWidth: "100%", padding: "5px", borderRadius: "3px" }} bgcolor="primary.main">
								<Typography color="white" fontWeight="bold" fontSize="1em" >User</Typography>
							</Box>

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
								// error={emailField !== "" && (!emailField.includes("@") || !emailField.includes("."))}
								autoComplete="new-password"
								onChange={(e) => setEmailField(e.target.value)}
								helperText={emailField !== "" && emailErrorMessage(emailField)}
							/>
							<Box sx={{ mt: "2rem" }}>

								<Box sx={{ minWidth: "100%", padding: "5px", borderRadius: "3px" }} bgcolor="primary.main">
									<Typography color="white" fontWeight="bold" fontSize="1em" >Password</Typography>

								</Box>
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

								<TextField
									margin="normal"
									required
									fullWidth
									name="new-password"
									label="New Password"
									type="new-password"
									id="new-password"
									// onFocus={}
									focused={false}
									value={newPasswordField}
									error={newPasswordField !== "" && newPasswordField.length < 4}
									autoComplete="new-password"
									onChange={(e) => setNewPasswordField(e.target.value)}
									helperText={passwordErrorMessage(newPasswordField)}
								/>

								<TextField
									sx={{ marginTop: "0" }}
									margin="normal"
									required
									fullWidth
									name="confirmnew-password"
									label="Confirm New Password"
									type="confirm-new-password"
									id="confirm-new-password"
									// onFocus={}
									focused={false}
									value={confirmNewPassField}
									error={confirmNewPassField !== "" && confirmNewPassField !== newPasswordField}
									autoComplete="new-password"
									onChange={(e) => setConfirmNewPassField(e.target.value)}
									helperText={passwordErrorMessage(confirmNewPassField)}
								/>
							</Box>
							<Typography color="error" textAlign="center" sx={{}}>{infoMessage}</Typography>

							<Box sx={{
								display: "flex", justifyContent: "space-between", padding: "10px", paddingTop: "2rem"
							}}>

								< Button
									type="submit"

									variant="contained"
									disabled={(passwordField.length < 4 || usernameField.length < 4)
									} // TODO: proper mini validation
								>
									Update
								</Button>
								<Button variant="contained" onClick={() => handleReset()}>
									Reset
								</Button>
							</Box>
						</Box>


					</Box>
				</Box >










				<Box sx={{ border: "1px solid black", borderRadius: "3px", maxWidth: "400px", minWidth: "300px" }}>
					<Box sx={{ borderBottom: "1px solid black", padding: "5px" }} bgcolor="primary.main">
						<Typography color="white" fontWeight="bold" fontSize="1.5em" >Orders</Typography>

					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1rem", }}>
						<Icon color='primary' sx={{ fontSize: "3rem" }}><ManageAccountsOutlinedIcon sx={{ fontSize: "3rem" }} /></Icon>
						<Typography variant='h6'>{currentUser.userName}</Typography>

					</Box>
				</Box >

			</Box>
		</Container >

	)
}


export default UserProfile