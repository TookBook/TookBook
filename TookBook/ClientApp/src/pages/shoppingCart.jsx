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
		console.log("addede to cart")
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


	// const dataToDisplay = () => {
	// 	return itemsInCart.map((item) => <p key={item.id}>{item.title}</p>)
	// }

	// const addedToCart = useRecoilValue(itemsInCartState);

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
			<Link to="/checkout">
			<Button sx={{mt:4}} variant="contained">Proceed to pay</Button></Link>
		</Container>
	)
}
export default ShoppingCart;

