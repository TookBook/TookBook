import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import CarouselSlides from '../components/homepage/CarouselSlides';
import Typography from '@mui/material/Typography';
import BooksHorizontalDisplay from '../components/homepage/BooksHorizontalDisplay';
import { fetchedBooksState, fetchedCategoriesState, fetchedUsersState, activeUserState } from "../atoms/index"
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';


const Homepage = () => {

	//import fetched books and sort them in various ways, then stuff them inside the horizontal displays
	const fetchedBooks = useRecoilValue(fetchedBooksState)

	return (
		<Container maxWidth={false}>

			<Typography align='center'>Homeplaceholder woo</Typography>
			<Box marginTop={"3rem"}>
				<CarouselSlides />
			</Box>

			<Box>
				<BooksHorizontalDisplay books={fetchedBooks} displayTitle={"Top 5 books"} />
				<BooksHorizontalDisplay books={""} displayTitle={"Random new books"} />
				<BooksHorizontalDisplay books={""} displayTitle={"Random used books"} />
			</Box>
		</Container>
	)
}


export default Homepage