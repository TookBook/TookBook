import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Image from '@jy95/material-ui-image'
import Button from '@mui/material/Button'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import shoppingCartState from "../../atoms/shoppingCartState";
import { useRecoilState } from "recoil";

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


const BookPreview = ({ book }) => {
	if (book == null)
		book = {
			title: "Placeholder book",
			imgUrl: "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png",
			price: "25"
		}

	const handleBookClick = () => {
		console.log(book.bookId)
	}

	// Split at space after x letters?
	const shouldWordWrap = book.title.length > 30
	const firstBookTitleSection = book.title.substring(0, 30)
	const secondBookTitleSection = book.title.substring(30)
	// TODO: onclick, add to cart

	return (
		<Box sx={{
			maxHeight: "100%", borderRadius: "0.5rem", minWidth: "200px", transition: "all .2s ease-in-out",
			"&:hover": { transform: "scale(1.1)", boxShadow: "5px 20px 10px black", }
		}}>
			<Box sx={{
				maxWidth: "100%", display: "flex", flexDirection: "column", padding: "10px", minHeight: "300px",
				backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0px 0px 5px black"

			}}>
				<Image src={book.imgUrl} />

				<Typography sx={{ textOverflow: "ellipsis", whiteSpace: "normal", overflow: "hidden", wordBreak: "break-word" }}
					fontWeight={"bold"} align="center" variant="body1" color="black">
					{firstBookTitleSection}
					{secondBookTitleSection}
				</Typography>

				{/* <Typography sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", wordBreak: "break-word" }}
					fontWeight={"bold"} align="center" variant="body1" color="black">
					{secondBookTitleSection}
				</Typography> */}

				<Button onClick={handleBookClick} color="secondary" variant="contained" endIcon={<ShoppingBasketIcon />}
					sx={{
						minWidth: "90%", display: "flex", justifyContent: "space-evenly", marginInline: "auto",
						fontSize: "1rem", fontWeight: "bold", paddingTop: "2px", paddingBottom: "2px",
						marginTop: "auto"
					}} >
					{book.price}
				</Button>
			</Box>

		</Box >
	)
}

export default BookPreview