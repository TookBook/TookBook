import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'



const Error404Page = () => {

	return (
		<Container maxWidth="xl" sx={{}}>
			<Typography color="primary.dark" gutterBottom={false} variant="h1" fontSize="28rem">404</Typography>

			<Typography color="primary.dark" fontSize="2.1rem" fontStyle="italic">Not all those who wander are lost.. </Typography>
			<Typography color="primary.dark" fontSize="1.3rem">— J.R.R. Tolkien, The Riddle of Strider, The Lord of the Rings: The Fellowship of the Ring</Typography>
			<Box marginTop="6rem" sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
				<Typography color="primary.dark" fontSize="1.6rem"> No but seriously, you're lost.</Typography>
				<Button size='large' variant="text" color="primary">
					<Link to="/">Return home?</Link>
				</Button>
			</Box>
		</Container>
	)
}


export default Error404Page