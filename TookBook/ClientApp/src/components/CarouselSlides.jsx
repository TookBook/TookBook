import Container from '@mui/material/Container';
import { DictionaryClichesSlide, TeenHorrorSlide, HitchhikersGuideSlide, SwedenSlide, UsedBookStoreSlide, NumbersRaiseSlide } from '../assets/images/index';
import Carousel from "react-multi-carousel"
import Box from "@mui/material/Box";
import "react-multi-carousel/lib/styles.css";

const imageSlides = [DictionaryClichesSlide, TeenHorrorSlide, HitchhikersGuideSlide, SwedenSlide, UsedBookStoreSlide, NumbersRaiseSlide]

const responsiveSlides = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 2,
		slidesToSlide: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
		slidesToSlide: 1
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
};

const CarouselSlides = () => {

	return (
		<Box >

			<Carousel responsive={responsiveSlides} infinite={true}
				autoPlay={true}
				autoPlaySpeed={3000}
				renderButtonGroupOutside={true}
				arrows={false}
				centerMode={false}
				removeArrowOnDeviceType={["tablet", "mobile"]}
			>

				{imageSlides.map((slide, i) => <Box key={i} sx={{}}> <img src={slide} draggable="false" style={{}} /> </Box>)}

			</Carousel>
		</Box>
	)
}


export default CarouselSlides