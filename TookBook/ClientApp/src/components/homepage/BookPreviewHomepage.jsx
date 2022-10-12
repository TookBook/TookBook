import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Image from 'mui-image';
import Button from '@mui/material/Button'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import shoppingCartContentsState from "../../atoms/shoppingCartContents";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import { Container } from "@mui/material";



const BookPreviewHomepage = ({ book }) => {

	const [itemsInCart, setItemsInCart] = useRecoilState(shoppingCartContentsState);


	function handleAddToCart(id) {
		let exists = itemsInCart.find(item => item.id === id);

		setItemsInCart(currItems => {
			if (exists == null) {
				return [...currItems, { id, amount: 1 }]
			} else {
				return currItems.map(item => {
					if (item.id === id) {
						return { ...item, amount: item.amount + 1 }
					} else {
						return item
					}
				})
			}
		})
		console.log("added to cart")
	}


	const handleAddToCartTwo = (e, book) => {
		e.preventDefault()
		setItemsInCart([...itemsInCart, { book }])
	}

	const firstBookTitleWords = book.title.split(" ").slice(0, 3).join(" ")
	const secondBookTitleWords = book.title.split(" ").slice(3, 7).join(" ")

	return (

		<Box sx={{
			maxHeight: "100%", borderRadius: "0.5rem", minWidth: "200px", transition: "all .2s ease-in-out",
			"&:hover": { transform: "scale(1.1)", boxShadow: "5px 20px 10px black", }
		}}>

			<Box sx={{
				maxWidth: "100%", display: "flex", flexDirection: "column", padding: "10px", minHeight: "350px",
				backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0px 0px 5px black"

			}}>
				<Link style={{ textDecoration: "none" }} to={`/testbook/${book.bookId}`}>
					<Image shift="left" duration={1000} style={{ maxHeight: "200px", objectFit: "contain" }} src={book.imgUrl} />

					<Typography sx={{ color: "primary.dark", textOverflow: "ellipsis", whiteSpace: "wrap", overflow: "hidden", wordBreak: "break-word", paddingTop: "20px" }}
						fontWeight={"bold"} align="center" variant="body1" color="black">
						{firstBookTitleWords}

					</Typography>
					<Typography sx={{ color: "primary.dark", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", wordBreak: "break-word", }}
						fontWeight={"bold"} align="center" variant="body1" color="black">
						{secondBookTitleWords}
					</Typography>
				</Link>

				<Button onClick={(e) => handleAddToCartTwo(e, book)} color="secondary" variant="contained" endIcon={<ShoppingBasketIcon />}
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

export default BookPreviewHomepage