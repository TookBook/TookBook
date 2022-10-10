import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const BookInCart = ({item, increaseAmountInCart, reduceAmountInCart}) => {
	return(
		<Container>
      <div>
      <Paper
          elavation={0}
          sx= {{
            mt:2,
            width: '90%',
            padding: 4,
            justifyContent: 'center',
          }}
          >
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: {item.price} SEK</p>
          <p>Total: {(item.amount * item.price).toFixed(2)} SEK</p>
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
        </Paper>
      </div>
      
      <img src={item.imgUrl} alt={item.title} />
      <Divider></Divider>
      <Box>
          Total: {item.amount * item.price} SEK
      </Box>
      
    </Container>
	)
}
export default BookInCart;