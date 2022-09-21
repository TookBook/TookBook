const BookInfo = () => {
	return(
		<div className="book-info-container">
			<p>Cover Picture</p>
			<div className="book-info">
				<h1>Book title</h1>
				<p>Author name</p>
				<p>Book description</p>
				<p>Categories</p>
			</div>
			<div className="book-price">
				<p>xx SEK</p>
			</div>
			<div className="buy-book">
				<p>Amount</p>
				
				<button>Add To the Cart</button>
				<p>In storage/not in storage</p>
			</div>
		</div>
	)

}