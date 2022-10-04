import Container from '@mui/material/Container';
import { imageSlides } from '../assets/images/index';
import Carousel from "react-multi-carousel"
import Box from "@mui/material/Box";
import "react-multi-carousel/lib/styles.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const responsiveSlides = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 2,
		slidesToSlide: 1,
	},
	tablet: {
		breakpoint: { max: 1058, min: 464 },
		items: 1,
		slidesToSlide: 1
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
};


const slideStyles = {
	slideBackground: {
		position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
		background: "radial-gradient(circle, rgba(109,89,122,1) 43%, rgba(255,255,255,1) 96%)"
	},

	slideFlexBox: {
		display: { sm: "flex" }, justifyContent: "center", alignItems: "center",

	}
}

const CarouselSlides = () => {

	return (
		<Container maxWidth={"lg"} >
			<Box position={"relative"} >
				<Box width={"99vw"} height={"300px"}
					sx={slideStyles.slideBackground}>
				</Box>

				<Carousel
					responsive={responsiveSlides}
					infinite={true}
					autoPlay={true}
					autoPlaySpeed={3000}
					renderButtonGroupOutside={true}
					arrows={false}
					centerMode={false}
					removeArrowOnDeviceType={["tablet", "mobile"]}
				>
					{imageSlides.map((slide, i) => <Box key={i} sx={{ display: { sm: "flex" }, justifyContent: "center", alignItems: "center", padding: "20px" }}>
						<img src={slide} draggable="false" style={{ maxWidth: "100%", boxShadow: "0px 0px 20px #6D597A" }} />
					</Box>)}

				</Carousel>
			</Box >
		</Container >
	)
}


export default CarouselSlides