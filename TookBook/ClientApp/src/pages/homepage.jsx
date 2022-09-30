import Container from '@mui/material/Container';
import { DictionaryClichesSlide, TeenHorrorSlide, HitchhikersGuideSlide, SwedenSlide, UsedBookStoreSlide, NumbersRaiseSlide } from '../assets/images/index';
import Carousel from "react-multi-carousel"
import Box from "@mui/material/Box";
import CarouselSlides from '../components/CarouselSlides';
import "react-multi-carousel/lib/styles.css";
import Typography from '@mui/material/Typography';



const Homepage = () => {

	return (
		<Container >

			<Typography align='center'>Homeplaceholder woo</Typography>

			<CarouselSlides />

		</Container>
	)
}


export default Homepage