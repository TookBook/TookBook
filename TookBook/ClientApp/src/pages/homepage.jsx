import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import CarouselSlides from '../components/homepage/CarouselSlides';
import Typography from '@mui/material/Typography';
import BooksHorizontalDisplay from '../components/homepage/BooksHorizontalDisplay';
import { fetchedBooksState, fetchedCategoriesState, fetchedUsersState, activeUserState, itemsInCartState } from "../atoms/index"
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Button } from '@mui/material';




const Homepage = () => {

	//Tiias playground
	const testBook = {
		id: 1,
		title: "Testbook",
		imgUrl: "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png",
		price:"42",
		amount:1
	}

	const idRandomizer = () => {
		return Math.floor(Math.random() * 1000000000);
	}


	const [itemsInCart, setItemsInCart] = useRecoilState(itemsInCartState);

	

	const handleAddToCart = (newItem) => {
		let item = {...newItem, id: idRandomizer()};
		setItemsInCart(itemsInCart => [...itemsInCart, item]);
		console.log("added to cart");
		console.log(testBook);	
	}

	const addedToCart = useRecoilValue(itemsInCartState);
	//Slut på Tiias playground

	

	// TODO: import fetched books and sort them in various ways, then stuff them inside the horizontal displays
	const fetchedBooks = useRecoilValue(fetchedBooksState)
	const loggedInUser = useRecoilValue(activeUserState)

	//TODO: get 5 most popular books

	const getRandomItems = (array) => {
		let randomArray = [...array]
		return randomArray.sort(() => Math.random() - 0.5).splice(0, 5);
	}

	useEffect(() => {
		console.log(itemsInCart)
	}, [itemsInCart])

	useEffect(() => {
		console.log(loggedInUser)
	}, [addedToCart])

	return (
		<Container maxWidth={false}>
			<Typography align='center'>Homeplaceholder woo</Typography>
			<Box marginTop={"3rem"}>
				<CarouselSlides />
			</Box>

			<Box>
				<BooksHorizontalDisplay books={fetchedBooks.slice(0, 5)} displayTitle={"Top 5 books"} />
				<Button onClick={() => handleAddToCart(testBook)}>Click me</Button>
				<BooksHorizontalDisplay books={getRandomItems(fetchedBooks)} displayTitle={"Random new books"} />
				<BooksHorizontalDisplay books={getRandomItems(fetchedBooks)} displayTitle={"Random used books"} />
			</Box>
			<Box>
				
			</Box>
		</Container>
	)
}


export default Homepage