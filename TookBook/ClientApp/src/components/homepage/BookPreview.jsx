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

	// onclick, add to cart

	return (
		<Box sx={{
			maxHeight: "200px", borderRadius: "0.5rem",
			"&:hover": { transition: "all .2s ease-in-out", transform: "scale(1.1)", boxShadow: "5px 20px 10px black", }
		}}>
			<Box sx={{
				maxWidth: "100%", display: "flex", flexDirection: "column", padding: "10px",
				backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0px 0px 5px black"

			}}>
				<Image src={book.imgUrl} />

				<Typography fontWeight={"bold"} gutterBottom align="center" variant="body1" color="black">{book.title}</Typography>

				<Button color="secondary" variant="contained" endIcon={<ShoppingBasketIcon />}
					sx={{
						minWidth: "90%", display: "flex", justifyContent: "space-between", marginInline: "auto",
						fontSize: "1rem", fontWeight: "bold", paddingTop: "2px", paddingBottom: "2px"
					}} >
					{book.price}
				</Button>
			</Box>

		</Box >
	)
}

export default BookPreview