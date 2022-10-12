import Carousel from "react-multi-carousel"
import Box from "@mui/material/Box";
import "react-multi-carousel/lib/styles.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import BookPreviewHomepage from "./BookPreviewHomepage";
import Divider from "@mui/material/Divider";


const responsiveSlides = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 5,
		slidesToSlide: 0,
	},
	tablet: {
		breakpoint: { max: 1058, min: 464 },
		items: 3,
		slidesToSlide: 1
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
};


const gradientLine = {
	background: "radial-gradient(circle, rgba(109,89,122,1) 43%, rgba(255,255,255,1) 96%)",
	padding: "1rem",
	zIndex: "-1",
	border: "1px solid black",
	borderLeft: "none", borderRight: "none",
	borderImage: "radial-gradient(circle, black, transparent) 1",
	position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
}

const BooksHorizontalDisplay = ({ books, displayTitle }) => {

	const placeHolderArray = [1, 2, 3, 4, 5];



	return (
		<>
			<Box margin={"1rem"} sx={{ marginTop: "4rem" }}>
				<Container maxWidth="md">
					<Divider>
						<Typography fontFamily={"lato"} variant={"h5"} gutterBottom textAlign={"center"} sx={{ fontWeight: "bold", color: "primary.dark" }} >{displayTitle}</Typography>
					</Divider>
				</Container>

				<Box position={"relative"} sx={{ padding: "2rem" }}>
					<Box sx={{ ...gradientLine, minWidth: "100%" }}> </Box>

					<Container maxWidth="lg">

						<Box sx={{ display: "flex", gap: "3rem", justifyContent: "center", alignItems: "center", }}>
							{/* {books.map((book, i) =>
							<BookPreviewHomepage book={book} key={i} />) } */}
							{books.map((book, i,) => <BookPreviewHomepage book={book} key={i}></BookPreviewHomepage>)}
						</Box>

					</Container>
				</Box>
			</Box>
		</>
	)
}

export default BooksHorizontalDisplay