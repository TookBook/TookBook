import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import BooksHorizontalDisplay from '../components/homepage/BooksHorizontalDisplay';
import { redirect, useNavigate } from 'react-router-dom';
import { activeUserState, isUserLoggedInState } from "../atoms/index"
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';




const UserProfile = () => {
	const navigate = useNavigate()
	const userLoggedIn = useRecoilValue(isUserLoggedInState)




	useEffect(() => {
		if (!userLoggedIn) navigate("/")
		console.log("user has changed")
		console.log(activeUserState)
	}, [userLoggedIn])

	return (
		<Container maxWidth={"lg"} sx={{ mt: "5rem" }}>
			<div>Hi, I'm a user profile</div>
		</Container>

	)
}


export default UserProfile