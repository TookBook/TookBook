import "../style/shoppingCart.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import shoppingCartContents from "../atoms/shoppingCartContents";
import { activeUserState } from "../atoms";


const CheckoutPage = () => {
	const navigate = useNavigate()

	const shoppingCart = useRecoilValue(shoppingCartContents)

	const [placeOrderText, setPlaceOrderText] = useState("")
	const [successfullOrder, setSuccessfullOrder] = useState(false)
	const loggedinUser = useRecoilValue(activeUserState)


	const updateUser = async (id) => {

		const getUserResponse = await fetch(`/api/User/${id}`)
		if (getUserResponse == 200) {
			const fetchedUser = await getUserResponse.json()

		}
		console.log(getUserResponse)
	}


	const handleClick = () => {
		setPlaceOrderText("Your order has been placed!")
		setSuccessfullOrder(true)
	}

	const testCartContents = [
		{
			title: "hello123",
			bookInfo: "weeee books r kewl",
		},
		{
			title: "hello123",
			bookInfo: "weeee books r kewl",
		},
		{
			title: "hello123",
			bookInfo: "weeee books r kewl",
		}
	]

	return (
		<Container maxWidth="md" >
			<Box style={{ backgroundcolor: '#ab2b06' }} display={"flex"} justifyContent={"center"}
				sx={{
					width: 400,
					height: 300,
					backgroundColor: '#f2f2f2',
					borderRadius: 1,
				}}
			>
				<Typography variant={"h6"} gutterBottom textAlign={""} >Checkout</Typography>

				<Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>Books here:

					{testCartContents.map((stuff) =>
						<Box>
							<Typography>{stuff.title}</Typography>
							<Typography>{stuff.bookInfo}</Typography>
						</Box>)}

				</Box>
			</Box>

			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
				flexDirection={"column"}

			>
				<div>
					<Typography sx={{ m: 3, ml: 1 }} variant={"h5"}>Delivery Address</Typography>
					<TextField
						id="firstname"
						label="First Name"
						defaultValue="Name"
					/>
					<TextField
						id="lastname"
						label="Last Name"
						defaultValue="Last Name"
					/>
					<TextField
						id="address"
						label="Address"
						defaultValue="ex. 1234 Main St"
					/>
					<TextField
						id="zip"
						label="Zip code"
						defaultValue="ex. 12345"
					/>
					<TextField
						id="city"
						label="City/Town"
						autoComplete="current-password"
					/>
				</div>
			</Box>
			<Box component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
				flexDirection={"column"}>

				<div className="checkout-container">
					<Typography sx={{ m: 3, ml: 1 }} variant={"h5"}>Credit card info</Typography>
					<TextField
						id="cardholders-name"
						label="Cardholder's name"
						defaultValue="name"
					/>
					<TextField
						id="card-number"
						label="Card Number"
						defaultValue="ex. 1234 5678 9012 3456"
					/>
					<TextField
						id="exp-date"
						label="Expiration Date"
						defaultValue="09/23"
					/>
					<TextField
						id="cvv"
						label="CVV"
						defaultValue="ex. 123"
					/>

				</div>
				<Button variant="contained" sx={{ width: "200px" }} disabled={successfullOrder} onClick={() => handleClick()} text="Place order">Place order</Button>
				<Typography fontWeight="bold" sx={{ color: successfullOrder ? "green" : "black" }} > {placeOrderText}</Typography>
				{successfullOrder && <Link sx={{ textdecoration: "none" }} to="/"> <Typography fontSize="1.2rem" fontWeight="bold">Return home</Typography></Link>}
			</Box>

		</Container >
	)
}

export default CheckoutPage;
