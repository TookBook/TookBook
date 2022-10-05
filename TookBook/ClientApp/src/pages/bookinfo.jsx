import "../style/bookInfo.css";

const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdamrecusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maximedoloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantiummodi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!';

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
				<div>{lorem}</div>
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