import "../style/bookInfo.css";
import { useParams } from "react-router-dom";
import { fetchedBooksState } from "../atoms";
import Image from "mui-image";
import { useRecoilValue, useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import { minHeight } from "@mui/system";
import shoppingCartContentsState from "../atoms/shoppingCartContents";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

const TestBookInfo = ({ props }) => {
	const navigate = useNavigate()
	const fetchedBooks = useRecoilValue(fetchedBooksState)
	const [itemsInCart, setItemsInCart] = useRecoilState(shoppingCartContentsState)


	const { id } = useParams()
	const book = fetchedBooks.find(book => book.bookId === id)


	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])

	const handleAddToCartTwo = (e, book) => {
		e.preventDefault()

		setItemsInCart([...itemsInCart, { book }])

	}


	if (book)
		return (
			<Box sx={{ paddingBottom: "10vmin" }}>
				<div className="book-info-container" >
					<Image shift="right" duration={1000} className="picture" style={{ marginRight: "10px", objectFit: "contain", minHeight: "500px", maxHeight: "800px" }} src={book.imgUrl} />
					<div className="book-info">
						<Typography variant={"h2"} >{book.title}</Typography>
						<Typography variant={"h6"} >
							<ul>
								{book.authors.map((author, i) => <li key={i}> {author.firstName + " " + author.lastName}</li>)}
							</ul>
						</Typography>
						<ul>
							{book.categories.map((category, i) => <li key={i}> {category.categoryName} </li>)}
						</ul>
						<div className="description">{book.bookInfo}</div>
					</div>
					<div className="purchase-info">
						<div className="book-price">
							<p>Price: {book.price}</p>
						</div>
						<div className="buy-book" >

							<Button onClick={(e) => handleAddToCartTwo(e, book)} variant="contained">Add To the Cart</Button>

							<p>In storage: {book.inStock.new + book.inStock.used}</p>

						</div>

					</div>
				</div>
			</Box>
		)
	if (!book) navigate("/")
}

export default TestBookInfo;