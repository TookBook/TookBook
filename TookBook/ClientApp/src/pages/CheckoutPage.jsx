import "../style/shoppingCart.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 400,
// 	height: 600,
// 	bgcolor: 'background.paper',
// 	border: '2px solid #000',
// 	boxShadow: 24,
// 	pt: 2,
// 	px: 4,
// 	pb: 3,
//   };

const  CheckoutPage = () => {
	return (
		<Container maxWidth="md" >
			
			<Box style={{backgroundcolor: '#ab2b06'}} display={"flex"} justifyContent={"center"} 
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
			<Button>Submit</Button>
			
		</Container>
	)
}

export default CheckoutPage;
