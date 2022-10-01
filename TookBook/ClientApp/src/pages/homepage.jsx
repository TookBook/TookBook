import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import CarouselSlides from '../components/CarouselSlides';
import Typography from '@mui/material/Typography';
import BooksRecommended from '../components/BooksRecommended';



const Homepage = () => {

	return (
		<Container maxWidth={false}>

			<Typography align='center'>Homeplaceholder woo</Typography>
			<CarouselSlides />
			<BooksRecommended />
		</Container>
	)
}


export default Homepage