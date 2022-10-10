// import "../style/shoppingCart.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { itemsInCartState } from "../atoms/index";
import { useRecoilState, useRecoilValue} from 'recoil';
import BookInCart from '../components/shoppingCart/BookInCart';

const ShoppingCart = () => {

	const [itemsInCart, setItemsInCart] = useRecoilState(itemsInCartState);

	const handleRemoveFromCart = (book) => {
		const exists = itemsInCart.find((x) => x.id === book.id);
		console.log(exists)
		if(exists.amount === 1) {
			setItemsInCart(itemsInCart.filter((x) => x.id !== book.id));
		} else {
			setItemsInCart(itemsInCart.map((x) => x.id === book.id ? {...exists, amount: exists.amount - 1} : x));
		}
	};

	// const handleAddToCart = (book) => {
	// 	const exists = itemsInCart.find((item) => item.id === book.id);

	// 		if (exists) {
	// 			setItemsInCart(itemsInCart.map((item) =>
	// 				item.id === book.id
	// 					? { ...exists, amount: exists.amount + 1 }
	// 					: item
	// 			));
	// 		} else {
	// 			setItemsInCart([...itemsInCart, { ...book, amount: 1 }]);
	// 		}
	// };

	function handleAddToCart(id) {
		setItemsInCart(currItems => {
			if (currItems.find(item => item.id === id) == null) {
				return [...currItems, { id, quantity: 1 }]
			} else {
				return currItems.map(item => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 }
					} else {
						return item
					}
				})
			}
		})
		console.log("addede to cart eller inte")
		console.log(itemsInCart)
	}


	//remove from cart when amount is =<0, else update amount
	const reduceAmountInCart = (item) => {
		if (item.amount <= 0) {
			handleRemoveFromCart(item.id)
		} else {
			item.amount--;
		}
	}

	// const increaseAmountInCart = (item) => {
	// 	item.amount++;
	// }

	const removeFromCart = (itemToRemove) => {
		let itemsFiltered = itemsInCart.filter(item => item.id !== itemToRemove.id);
		setItemsInCart(itemsFiltered);
	}

	// const handleRemove = (item) => {
	// 	removeFromCart(item);
	// }
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		pt: 2,
		px: 4,
		pb: 3,
	};

	/* <Box marginTop={"3rem"} key={item.id}> */

	const dataToDisplay = () => {
		return itemsInCart.map((item) => <p key={item.id}>{item.title}</p>)
	}

	const addedToCart = useRecoilValue(itemsInCartState);

	return (
		<Container>
			<h2>Your Cart</h2>
			{itemsInCart.length === 0 ? <p>No items in cart.</p> : null}
			{itemsInCart.map((item) => (
				<BookInCart
					key={item.id}
					item={item}
					reduceAmountInCart={(item) => handleRemoveFromCart(item)}
					increaseAmountInCart={(item) => handleAddToCart(item.id)}
				/>
			))}
			<Button sx={{mt:4}} variant="contained">Proceed to pay</Button>
		</Container>
	)
}
export default ShoppingCart;

{/* <Container maxWidth="md">
			<Box sx={{height: 100}}>HEJEHJE
					<Typography>Item {dataToDisplay()}</Typography>
						<Button
							size="small"
							disableElevation
							variant="contained"
							onClick={() => console.log("take away from the cart")}>
							-
						</Button>
						<p>amount here</p>
						<Button
							size="small"
							disableElevation
							variant="contained"
							onClick={() => console.log("add to the cart")}>
							+
						</Button>
			</Box>
		</Container> */}
// return (
// 	<Container maxWidth="md">
// 		<Box sx={{height: 100}}>			
// 		{itemsInCart.map(item => (
			
// 			<div key={item._id}>
// 				<Typography>Item</Typography>
// 					<h2>Item:{item.title}</h2>

// 				<Box>
// 					<p>Price: {item.price} SEK</p>
// 					<p>Total: {(item.amount * item.price).toFixed(2)}</p>
// 				</Box>
// 				<div className="buttons">
// 					<Button
// 						size="small"
// 						disableElevation
// 						variant="contained"
// 						onClick={() => reduceAmountInCart(item.id)}
// 					>
// 						-
// 					</Button>
// 					<p>{item.amount}</p>
// 					<Button
// 						size="small"
// 						disableElevation
// 						variant="contained"
// 						onClick={() => increaseAmountInCart(item)}
// 					>
// 						+
// 					</Button>
// 					<img src={item.imgUrl} alt={item.title} />
// 				</div>
// 			</div>
			

// 		))}
		
// 		</Box>
// 	</Container>
// )
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


