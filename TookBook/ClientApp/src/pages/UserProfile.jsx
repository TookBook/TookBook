import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import BooksHorizontalDisplay from '../components/homepage/BooksHorizontalDisplay';
import { redirect, useNavigate } from 'react-router-dom';
import { activeUserState, isUserLoggedInState } from "../atoms/index"
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'



//TODO: Display data from current logged in user.
// "Edit Profile Information" section in a box with textfields.
const UserProfile = () => {
	const navigate = useNavigate()
	const userLoggedIn = useRecoilValue(isUserLoggedInState)
	const [currentUser, setCurrentUser] = useRecoilState(activeUserState)




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
					<TextField
						fullWidth
						id=""
						label=""
					/>
					<TextField
						fullWidth
						id=""
						label=""
					/>
					<TextField
						fullWidth
						id=""
						label=""
					/>
					<TextField
						fullWidth
						id=""
						label=""
					/>
					<TextField
						fullWidth
						id=""
						label=""
					/>
				</Box>

				<Box sx={{ display: "flex", justifyContent: "space-evenly", padding: "10px" }}>
					<Button variant="contained" >
						Tra
					</Button>
					<Button variant="contained" >
						lala
					</Button>
				</Box>

			</Box>
		</Container >

	)
}


export default UserProfile