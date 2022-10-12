import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import Image from 'mui-image';
import shoppingCartContentsState from "../../atoms/shoppingCartContents";
import { useRecoilValue } from "recoil";

const BookInCart = ({book}, {increaseAmountInCart, reduceAmountInCart}) => {

const booksInCart = useRecoilValue(shoppingCartContentsState);
const addedBook = book.book
const booksInStock = addedBook.inStock.new + addedBook.inStock.used;

useEffect(() => {
  console.log("You opened the cart, item:", book)
},[])
  
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
            <Image sx={{ml: 0, }} shift="left" duration={500} style={{ maxHeight: "200px", objectFit: "contain" }} src={addedBook.imgUrl} alt={addedBook.title} />
        <Typography variant={"h5"}>{addedBook.title}</Typography>
        <div className="information">
          <Typography variant={"h6"}>Price: {addedBook.price} SEK</Typography>
          
        </div>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => reduceAmountInCart(book.id)}
          >
            -
          </Button>
          <p>{addedBook.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => increaseAmountInCart(book.id)}
          >
            +
          </Button> */}
          
        </Box>
        </Paper>
      </div>
      
      
     {/* TODO:fix total so it doesn't show wrong amount' */}
      <Box>
          Total: { booksInCart.length * addedBook.price} SEK
      </Box>
      
    </Container>
	)
}
export default BookInCart;