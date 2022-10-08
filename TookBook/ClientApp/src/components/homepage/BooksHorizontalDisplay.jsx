import Carousel from "react-multi-carousel"
import Box from "@mui/material/Box";
import "react-multi-carousel/lib/styles.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import BookPreview from "./BookPreview";
import { maxHeight } from "@mui/system";



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
	position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
}

const BooksHorizontalDisplay = ({ books, displayTitle }) => {

	const placeHolderArray = [1, 2, 3, 4, 5];

	const dataToDisplay = () => {
		if (!books)
			return placeHolderArray.map((book, i,) => <BookPreview book={null} key={i}></BookPreview>)
		return books.map((book, i,) => <BookPreview book={book} key={i}></BookPreview>)
	}

	return (
		<>
			<Box margin={"1rem"}>
				<Container maxWidth="md">
					<Typography variant={"h6"} gutterBottom textAlign={""} >{displayTitle}</Typography>
				</Container>

				<Box position={"relative"} sx={{ padding: "2rem" }}>
					<Box sx={{ ...gradientLine, minWidth: "100%" }}> </Box>

					<Container maxWidth="lg">

						<Box sx={{ display: "flex", gap: "3rem", justifyContent: "center", alignItems: "center", }}>
							{/* {books.map((book, i) =>
							<BookPreview book={book} key={i} />) } */}
							{dataToDisplay()}
						</Box>

					</Container>
					{/* <Box border={"1px solid black"} borderLeft={"none"} borderRight={"none"} sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>

				</Box>
			</Box>

			<Box border={"1px solid black"} borderLeft={"none"} borderRight={"none"} sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>

				</Box>
			</Box> */}
				</Box>
			</Box>
		</>
	)
}

/**Carousel style?
 * 					<Carousel
						responsive={responsiveSlides}
						infinite={false}
						autoPlay={false}
						autoPlaySpeed={3000}
						renderButtonGroupOutside={true}
						arrows={false}
						centerMode={false}>

						{tempItems.map((book, i) => <Box sx={{ display: "flex", gap: "3rem", justifyContent: "center" }}>
							<BookPreview key={i} />
						</Box>)}

					</Carousel>
 */

export default BooksHorizontalDisplay