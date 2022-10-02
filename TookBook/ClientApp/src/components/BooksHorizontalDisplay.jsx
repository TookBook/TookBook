import Carousel from "react-multi-carousel"
import Box from "@mui/material/Box";
import "react-multi-carousel/lib/styles.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'





const gradientLine = {
	background: "radial-gradient(circle, rgba(109,89,122,1) 43%, rgba(255,255,255,1) 96%)",
	padding: "1rem",
	marginTop: "5rem"
}

const BookPlaceholder = () => {

	return (
		<Box sx={{ height: "100px", width: "150px", border: "1px solid black" }}>
			<Typography align="center" variant="body1" color="white">[BOOK INFO WITH PICTURE]</Typography>
		</Box>
	)
}

const BooksRecommended = () => {

	return (
		<>
			<Box border={"1px solid black"} borderLeft={"none"} borderRight={"none"} sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>
					<BookPlaceholder />
					<BookPlaceholder />
					<BookPlaceholder />
					<BookPlaceholder />
					<BookPlaceholder />
				</Box>
			</Box>

			<Box border={"1px solid black"} borderLeft={"none"} borderRight={"none"} sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>
					<BookPlaceholder />
					<BookPlaceholder />
					<BookPlaceholder />
					<BookPlaceholder />
					<BookPlaceholder />
				</Box>
			</Box>

			<Box border={"1px solid black"} borderLeft={"none"} borderRight={"none"} sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>
					<BookPlaceholder />
					<BookPlaceholder />
					<BookPlaceholder />
					<BookPlaceholder />
					<BookPlaceholder />
				</Box>
			</Box>
		</>
	)
}

export default BooksRecommended