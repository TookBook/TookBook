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

const BooksRecommended = () => {

	return (
		<>
			<Box sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
				</Box>

			</Box>
			<Box sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
				</Box>

			</Box>
			<Box sx={gradientLine}>
				<Box display={"flex"} gap={"1rem"} justifyContent={"center"}>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
					<Typography align="center" variant="body1" color="white">[BOOK HERE WITH PICTURE]</Typography>
				</Box>

			</Box>
		</>
	)
}

export default BooksRecommended