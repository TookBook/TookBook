import "../style/bookInfo.css";

const BookInfo = () => {
	return(
		<div className="book-info-container">
			<p className="picture">Cover Picture</p>
			<div className="book-info">
				<h2>Book title</h2>
				<ul>
					<li>Author</li>
				</ul>
				<ul>
					<li>Genre</li>
				</ul>
				<p>Book description</p>
			</div>
			<div className="purchase-info">
				<div className="book-price">
					<p>xx SEK</p>
				</div>
				<div className="buy-book">
					<div>
						<p>-</p>
						<p>Amount</p>
						<p>+</p>
					</div>

					<button>Add To the Cart</button>
					<p>In storage/not in storage</p>
				</div>
				
			</div>
		</div>
	)
}

export default BookInfo;