import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import CarouselSlides from '../components/homepage/CarouselSlides';
import Typography from '@mui/material/Typography';
import BooksHorizontalDisplay from '../components/homepage/BooksHorizontalDisplay';
import { useEffect } from 'react';


const Homepage = () => {

	return (
		<Container maxWidth={false}>

			<Typography align='center'>Homeplaceholder woo</Typography>
			<Box marginTop={"3rem"}>
				<CarouselSlides />
			</Box>

			<Box>
				<BooksHorizontalDisplay books={""} />
			</Box>
		</Container>
	)
}


export default Homepage