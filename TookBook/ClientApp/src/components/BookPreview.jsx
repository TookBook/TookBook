import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Image from 'mui-image';
import Button from '@mui/material/Button'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import shoppingCartState from "../atoms/shoppingCartState"
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';

/** more horizontal
 * 		<Box sx={{ maxHeight: "200px", maxWidth: "300px", border: "1px solid black", display: "flex", flexDirection: "column" }}>
			<Box sx={{ maxWidth: "100%", display: "flex" }}>

				<Image src={book.imgUrl} />
				<Typography align="center" variant="body1" color="white">{book.title}</Typography>

				<Button variant="contained" sx={{ maxWidth: "100%" }}>
					{book.price}
				</Button>
			</Box>

		</Box>
 */

const CartButton = ({ bookPrice }) => {

	const handleBookClick = () => {
		console.log(book.bookId)

	}

	return (
		<Button onClick={handleBookClick} color="secondary" variant="contained" endIcon={<ShoppingBasketIcon />}
			sx={{
				minWidth: "90%", display: "flex", justifyContent: "space-evenly", marginInline: "auto",
				fontSize: "1rem", fontWeight: "bold", paddingTop: "2px", paddingBottom: "2px",
				marginTop: "auto"
			}} >
			{bookPrice}
		</Button>
	)
}


const BookPreview = ({ book }) => {


	const handleBookClick = () => {
		console.log(book.bookId)

	}


	const splitBookDescription = book.bookInfo.split(" ").slice(0, 40).join(" ");
	//TODO: Border bottom
	return (
		<Box sx={{ display: "flex", justifyContent: "flex-start", padding: "5px", paddingBottom: "2rem" }}>
			<Box sx={{ display: "flex", justifyContent: "flex-start" }}>
				<Image shift="left" duration={1000} style={{ maxHeight: "200px", objectFit: "contain" }} src={book.imgUrl} />
			</Box>
			<Box sx={{ maxWidth: "50%", paddingLeft: "8px" }}>
				<Typography align="left" variant="h6" >{book.title}</Typography>
				<Typography align="left" variant="body1" >by <span style={{ fontWeight: "bold" }}>{book.authors.map((author) => author.firstName + " " + author.lastName)}</span></Typography>
				<Typography variant="body2" fontStyle="italic">{book.categories.map((category) => category.categoryName + " ")}</Typography>
				<Typography> {splitBookDescription} ...</Typography>
			</Box>

		</Box >
	)
}

export default BookPreview