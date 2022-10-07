import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import CarouselSlides from '../components/homepage/CarouselSlides';
import Typography from '@mui/material/Typography';
import BooksHorizontalDisplay from '../components/homepage/BooksHorizontalDisplay';
import { fetchedBooksState, fetchedCategoriesState, fetchedUsersState, activeUserState } from "../atoms/index"
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Link  from "react-router-dom";


const Homepage = () => {

	//Tiias playground
	// const [itemsInCart, setItemsInCart] = useState([]);

	// const HandleAddToCart = (newItem) => {
	// 	let item = {...newItem, quantity: 1};
	// 	setItemsInCart([...itemsInCart, item]);
	// }

	// const HandleRemoveFromCart = (itemToRemove) => {
	// 	let itemsFiltered = itemsInCart.filter(item => item.id !== itemToRemove.id);
	// 	setItemsInCart(itemsFiltered);
	// }
	//TODO: TIIA : lägg till itemsincart som en state i recoil


	// TODO: import fetched books and sort them in various ways, then stuff them inside the horizontal displays
	const fetchedBooks = useRecoilValue(fetchedBooksState)
	const loggedInUser = useRecoilValue(activeUserState)

	//TODO: get 5 most popular books

	const getRandomItems = (array) => {
		let randomArray = [...array]
		return randomArray.sort(() => Math.random() - 0.5).splice(0, 5);
	}

	useEffect(() => {
		console.log(loggedInUser)
	}, [loggedInUser])

	return (
		<Container maxWidth={false}>
			<Typography align='center'>Homeplaceholder woo</Typography>
			<Box marginTop={"3rem"}>
				<CarouselSlides />
			</Box>

			<Box>
				<BooksHorizontalDisplay books={fetchedBooks.slice(0, 5)} displayTitle={"Top 5 books"} />
				<BooksHorizontalDisplay books={getRandomItems(fetchedBooks)} displayTitle={"Random new books"} />
				<BooksHorizontalDisplay books={getRandomItems(fetchedBooks)} displayTitle={"Random used books"} />
			</Box>
		</Container>
	)
}


export default Homepage