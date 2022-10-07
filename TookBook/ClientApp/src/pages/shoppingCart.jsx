// import "../style/shoppingCart.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ShoppingCart = (addToCart, item, removeFromCart) => {
	return (
		<Container>
			<div>
				<h3>{item.title}</h3>
				<div className="information">
					<p>Price: {item.price} SEK</p>
					<p>Total: {(item.amount * item.price).toFixed(2)}</p>
				</div>
				<div className="buttons">
					<Button
						size="small"
						disableElevation
						variant="contained"
						onClick={() => removeFromCart(item._id)}
					>
						-
					</Button>
					<p>{item.amount}</p>
					<Button
						size="small"
						disableElevation
						variant="contained"
						onClick={() => addToCart(item)}
					>
						+
					</Button>
				</div>
			</div>
			<img src={item.imgUrl} alt={item.title} />
		</Container>
	)
}
export default ShoppingCart;

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

// const ShoppingCart = () => {
// 	return (
// 		<Box position={"relative"} sx={{ padding: "2rem" }}>
// 			<Box sx={{
// 				maxHeight: "400px", borderRadius: "0.5rem",
// 				"&:hover": { transition: "all .2s ease-in-out", transform: "scale(1.1)", boxShadow: "5px 20px 10px black", }
// 			}}>
// 			</Box>
// 		</Box>
// 	)
// }

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


