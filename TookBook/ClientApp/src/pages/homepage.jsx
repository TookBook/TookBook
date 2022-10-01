import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import CarouselSlides from '../components/CarouselSlides';
import Typography from '@mui/material/Typography';
import BooksHorizontalDisplay from '../components/BooksHorizontalDisplay';



const Homepage = () => {

	return (
		<Container maxWidth={false}>

			<Typography align='center'>Homeplaceholder woo</Typography>
			<Box marginTop={"3rem"}>
				<CarouselSlides />
			</Box>
			<BooksHorizontalDisplay />
		</Container>
	)
}


export default Homepage