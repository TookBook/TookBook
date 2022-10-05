import "../style/shoppingCart.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
  };

const ShoppingCart = () => {
	return (
		<Container maxWidth="md" >
			<Box style={{backgroundcolor: '#ab2b06'}} display={"flex"} justifyContent={"center"} 
				sx={{
					width: 400,
					height: 300,
					backgroundColor: '#f2f2f2',
					borderRadius: 1,
				}}
			/>
			<Typography align='center'>Shopping Cart</Typography>
			<Box marginTop={"3rem"}>
				
			</Box>
			
		</Container>
	)
}
// 	  return (
// 	<div className="main-container">
// 		<h1>Your shopping cart</h1>
// 		<div className="book-info">
// 			<p>book title here</p>
// 			<p>authors name here</p>
// 			<p>-</p>
// 			<p>2</p>
// 			<p>+</p>
// 			</div>

// 		<div className="book-price">
// 			<p>xx SEK</p>
// 			</div>
	  
// 	</div>
//   );

export default ShoppingCart;
