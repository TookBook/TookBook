import Container from '@mui/material/Container';

const BookInCart = ({item, increaseAmountInCart, reduceAmountInCart}) => {
	return(
		<Container>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => reduceAmountInCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => increaseAmountInCart(item.id)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.imgUrl} alt={item.title} />
    </Container>
	)
}
export default BookInCart;