import "../style/bookInfo.css";
import { useParams } from "react-router-dom";
import { fetchedBooksState } from "../atoms";
import Image from '@jy95/material-ui-image'
import { useRecoilValue } from "recoil";
import { minHeight } from "@mui/system";

const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdamrecusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maximedoloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantiummodi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!';

const TestBookInfo = () => {
	const fetchedBooks = useRecoilValue(fetchedBooksState)

	const { id } = useParams()
	const book = fetchedBooks.find(book => book.bookId === id)


	return (
		<div className="book-info-container">
			{/* <p className="picture"></p> */}
			<Image className="picture" style={{ marginRight: "10px", objectFit: "contain", minHeight: "500px" }} src={book.imgUrl} />
			<div className="book-info">
				<h2>{book.title}</h2>
				<ul>
					{book.authors.map((author, i) => <li key={i}> {author.firstName + " " + author.lastName}</li>)}
				</ul>
				<ul>
					{book.categories.map((category, i) => <li key={i}> {category.categoryName} </li>)}
				</ul>
				<div>{book.bookInfo}</div>
			</div>
			<div className="purchase-info">
				<div className="book-price">
					<p>Price: {book.price}</p>
				</div>
				<div className="buy-book">
					<div>
						<p>-</p>
						<p>Amount</p>
						<p>+</p>
					</div>

					<button>Add To the Cart</button>
					<p>In storage: {book.inStock.new + book.inStock.used}</p>

				</div>

			</div>
		</div>
	)
}

export default TestBookInfo;