// import "../style/shoppingCart.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import shoppingCartContentsState from '../atoms/shoppingCartContents';
import { useRecoilState, useRecoilValue} from 'recoil';
import BookInCart from '../components/shoppingCart/BookInCart';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {

	const [itemsInCart, setItemsInCart] = useRecoilState(shoppingCartContentsState);
	

	const handleRemoveFromCart = (book) => {
		const exists = itemsInCart.find((x) => x.id === book.id);
		console.log(exists)
		if(exists.amount === 1) {
			setItemsInCart(itemsInCart.filter((x) => x.id !== book.id));
		} else {
			setItemsInCart(itemsInCart.map((x) => x.id === book.id ? {...exists, amount: exists.amount - 1} : x));
		}
	};


	// function handleAddToCart(id) {
	// 	let exists = itemsInCart.find(item => item.id === id);
		
	// 	setItemsInCart(currItems => {
	// 		if (exists == null) {
	// 			return [...currItems, { id, amount: 1 }]
	// 		} else {
	// 			return currItems.map(item => {
	// 				if (item.id === id) {
	// 					return { ...item, amount: item.amount + 1 }
	// 				} else {
	// 					return item
	// 				}
	// 			})
	// 		}
	// 	})
	// 	console.log("added to cart")
		
	// }

	const handleAddToCartTwo = (book) => {
		

		setItemsInCart([...itemsInCart, book])
		console.log("Items in cart:", itemsInCart)
	}

	//remove from cart when amount is =<0, else update amount

	const removeFromCart = (itemToRemove) => {
		let itemsFiltered = itemsInCart.filter(item => item.id !== itemToRemove.id);
		setItemsInCart(itemsFiltered);
	}

	// const handleRemove = (item) => {
	// 	removeFromCart(item);
	// }

	// const addedToCart = useRecoilValue(itemsInCartState);

	return (
		<Container>
			{itemsInCart.length === 0 ? <p>No items in cart.</p> : null}
			{itemsInCart.map((book) => (
				<BookInCart
					key={book.bookId}
					book={book}
					reduceAmountInCart={(book) => handleRemoveFromCart(book)}
					increaseAmountInCart={(book) => handleAddToCartTwo(book)}
				/>
			))}
			<Link to="/checkout">
			<Button sx={{mt:4}} variant="contained">Proceed to pay</Button>
			</Link>
		</Container>
	)
}
export default ShoppingCart;

