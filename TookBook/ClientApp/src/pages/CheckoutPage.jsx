import "../style/shoppingCart.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const CheckoutPage = () => {

	const handleClick = () => {
		<p>You're order has been placed!</p>
	}

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
				<Box display={"flex"} justifyContent={"center"}>Books here</Box>
			</Box>

			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<div>
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
				<Box>
					<div className="checkout-container">
						<Typography variant={"h3"}>Credit card info</Typography>
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
						<Button onClick={handleClick()} text="Place order" />
					</div>
				
			</Box>
			<Button>Submit</Button>
			<Typography variant={"p"} gutterBottom textAlign={""} >Note that we currently only ship to Sweden</Typography>
		</Container >
	)
}

export default CheckoutPage;
