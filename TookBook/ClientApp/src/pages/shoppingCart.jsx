// import "../style/shoppingCart.css";
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

const ShoppingCart = () => {
	return (
		<Container>
		<Box sx={{
			maxHeight: "400px", borderRadius: "0.5rem",
			"&:hover": { transition: "all .2s ease-in-out", transform: "scale(1.1)", boxShadow: "5px 20px 10px black", }
		}}>
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
