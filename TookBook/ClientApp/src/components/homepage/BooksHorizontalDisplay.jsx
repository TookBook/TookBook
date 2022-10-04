import Carousel from "react-multi-carousel"
import Box from "@mui/material/Box";
import "react-multi-carousel/lib/styles.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import BookPreview from "./BookPreview";
import { maxHeight } from "@mui/system";





const gradientLine = {
	background: "radial-gradient(circle, rgba(109,89,122,1) 43%, rgba(255,255,255,1) 96%)",
	padding: "1rem",
	marginTop: "5rem",
	border: "1px solid black",
	borderLeft: "none", borderRight: "none"
}

const tempItems = [1, 2, 3, 4, 5];

const BooksHorizontalDisplay = ({ books }) => {

	return (
		<>
			<Box sx={{ ...gradientLine, maxHeight: "100x", display: "flex", gap: "3rem", justifyContent: "center" }}>
				{tempItems.map((book, i) => <BookPreview key={i} />)}

			</Box>

			{/* <Box border={"1px solid black"} borderLeft={"none"} borderRight={"none"} sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>

				</Box>
			</Box>

			<Box border={"1px solid black"} borderLeft={"none"} borderRight={"none"} sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>

				</Box>
			</Box> */}
		</>
	)
}

export default BooksHorizontalDisplay