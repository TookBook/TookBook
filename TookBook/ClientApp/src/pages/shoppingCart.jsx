import ShoppingCart from ".//shoppingCart.css";

const ShoppingCart = () => {
	  return (
	<div className="main-container">
		<h1>Your shopping cart</h1>
		<div className="book-info">
			<p>book title here</p>
			<p>authors name here</p>
			<p>-</p>
			<p>2</p>
			<p>+</p>
			</div>

		<div className="book-price">
			<p>xx SEK</p>
			</div>
	  
	</div>
  );
}
export default ShoppingCart;